"use client"

import { Header } from "./header"
import { AIAssistant } from "./accessibility/ai-assistant"
import { AccessibilityControls } from './accessibility/accessibility-controls'
import { AccessibilityButton } from '../components/accessibility-button'
import { useState, useEffect, useRef } from "react"

// Add TypeScript interface to extend Window global
declare global {
  interface Window {
    _screenReaderDisabled?: boolean;
    _blockFontSizeAnnouncements?: boolean;
  }
}

// Helper to ensure speech synthesis is properly canceled
const ensureSpeechSynthesisCanceled = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    // Cancel any currently speaking utterances
    window.speechSynthesis.cancel();
    
    // Set global flags to prevent further announcements
    window._screenReaderDisabled = true;
    window._blockFontSizeAnnouncements = true;
    
    // Force clear any pending announcements in the announcer element
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      // Set to an empty string first (important for some screen readers)
      announcer.textContent = '';
      
      // Create a temporary dummy text node and immediately remove it
      // This forces any mutation observers to disconnect and reconnect
      const dummyNode = document.createTextNode('');
      announcer.appendChild(dummyNode);
      announcer.removeChild(dummyNode);
    }
    
    // Monitor speech queue for 2 seconds to ensure it's fully cleared
    let checkCount = 0;
    const maxChecks = 20; // 20 checks, 100ms apart = 2 seconds total
    
    const checkInterval = setInterval(() => {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
        
        // Force check for "Font size changed" announcements
        const announcer = document.getElementById('screen-reader-announcer');
        if (announcer && announcer.textContent && 
            announcer.textContent.includes('Font size changed')) {
          announcer.textContent = '';
        }
      } else {
        checkCount++;
      }
      
      if (checkCount >= maxChecks) {
        clearInterval(checkInterval);
      }
    }, 100);
    
    // Ensure the interval is cleared if the page is navigated away
    window.addEventListener('beforeunload', () => {
      clearInterval(checkInterval);
    }, { once: true });
  }
};

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const accessibilityButtonRef = useRef<HTMLButtonElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const toggleAccessibility = () => {
    // If we're about to open the panel, save the current focus
    if (!isAccessibilityOpen) {
      lastFocusRef.current = document.activeElement as HTMLElement;
      // Announce for screen reader users
      if (isScreenReaderActive) {
        const announcer = document.getElementById('screen-reader-announcer');
        if (announcer) {
          announcer.textContent = "Accessibility panel opened. Use tab to navigate settings.";
        }
      }
    } else {
      // If we're closing, return focus to the last element
      setTimeout(() => {
        if (lastFocusRef.current) {
          lastFocusRef.current.focus();
        } else if (accessibilityButtonRef.current) {
          accessibilityButtonRef.current.focus();
        }
        
        // Announce for screen reader users
        if (isScreenReaderActive) {
          const announcer = document.getElementById('screen-reader-announcer');
          if (announcer) {
            announcer.textContent = "Accessibility panel closed.";
          }
        }
      }, 50);
    }
    
    // Update the button's aria-expanded state
    const accessibilityButtons = document.querySelectorAll('button[aria-haspopup="dialog"]');
    accessibilityButtons.forEach(button => {
      button.setAttribute('aria-expanded', (!isAccessibilityOpen).toString());
    });
    
    setIsAccessibilityOpen(prev => !prev);
  };
  
  // Check for screen reader state on mount
  useEffect(() => {
    const screenReaderActive = localStorage.getItem('accessibility-screen-reader') === 'true';
    setIsScreenReaderActive(screenReaderActive);
    
    // Set data attribute on document element
    document.documentElement.setAttribute('data-screen-reader-active', screenReaderActive ? 'true' : 'false');
    
    // Set global tracking variable
    if (typeof window !== 'undefined') {
      window._screenReaderDisabled = !screenReaderActive;
    }
    
    // Add listener for screen reader updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessibility-screen-reader') {
        const newValue = e.newValue === 'true';
        setIsScreenReaderActive(newValue);
        document.documentElement.setAttribute('data-screen-reader-active', newValue ? 'true' : 'false');
        
        // Update global tracking variable
        if (typeof window !== 'undefined') {
          window._screenReaderDisabled = !newValue;
        }
        
        // If turning off, ensure speech synthesis is canceled
        if (!newValue) {
          ensureSpeechSynthesisCanceled();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Setup a MutationObserver to watch for screen reader announcements
    if (process.env.NODE_ENV === 'development') {
      observerRef.current = new MutationObserver((mutations) => {
        // Skip if screen reader is disabled
        if (typeof window !== 'undefined') {
          if (window._screenReaderDisabled === true) return;
        }
        
        for (const mutation of mutations) {
          if (mutation.type === 'childList' && 
              (mutation.target as Element).id === 'screen-reader-announcer' && 
              mutation.target.textContent) {
            setAnnouncement(mutation.target.textContent);
            // Clear after 5 seconds
            setTimeout(() => setAnnouncement(null), 5000);
          }
        }
      });
      
      // Wait for the DOM to be ready
      const timeoutId = setTimeout(() => {
        const announcer = document.getElementById('screen-reader-announcer');
        if (announcer && observerRef.current) {
          observerRef.current.observe(announcer, {
            childList: true,
            subtree: true,
          });
        }
      }, 1000);
      
      return () => {
        clearTimeout(timeoutId);
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    }
    
    // Listen for escape key to close panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAccessibilityOpen) {
        toggleAccessibility();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('keydown', handleKeyDown);
      
      // Always ensure speech synthesis is canceled when unmounting
      ensureSpeechSynthesisCanceled();
    };
  }, [isAccessibilityOpen, isScreenReaderActive]);

  // Effect to ensure speech synthesis is canceled when screen reader is toggled off
  useEffect(() => {
    if (!isScreenReaderActive && typeof window !== 'undefined') {
      // Set global tracking variable first to prevent further announcements
      window._screenReaderDisabled = true;
      
      // Cancel any ongoing speech when screen reader is turned off
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Clear any text in the announcer element
      const announcer = document.getElementById('screen-reader-announcer');
      if (announcer) {
        announcer.textContent = '';
      }
      
      // Force disconnection of any mutation observers
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      // Also remove the announcement visualization immediately
      setAnnouncement(null);
    }
  }, [isScreenReaderActive]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <AccessibilityButton onClick={toggleAccessibility} ref={accessibilityButtonRef} />
      <main id="main-content">
        {children}
      </main>
      {isAccessibilityOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="accessibility-title">
          <AccessibilityControls onClose={toggleAccessibility} />
        </div>
      )}
      
      {/* AI Assistant */}
      <AIAssistant />
      
      {/* Screen reader announcer */}
      <div id="screen-reader-announcer" className="sr-only" aria-live="polite"></div>
      
      {/* Development-only visual indicator for screen reader announcements */}
      {process.env.NODE_ENV === 'development' && announcement && (
        <div className="screen-reader-announcement">
          <p>Screen Reader: {announcement}</p>
        </div>
      )}
    </>
  );
} 