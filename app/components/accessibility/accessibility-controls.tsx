"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { 
  Text, 
  Palette, 
  Ear, 
  Eye, 
  MousePointer, 
  Sparkles,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Laptop,
  Type,
  ZoomIn,
  X
} from "lucide-react"

// Add TypeScript interface to extend Window global
declare global {
  interface Window {
    _screenReaderDisabled?: boolean;
    _blockFontSizeAnnouncements?: boolean;
  }
}

// Helper for screen reader announcements
let lastAnnouncementTime = 0;
const ANNOUNCEMENT_COOLDOWN = 300; // Cooldown in milliseconds to prevent rapid announcements
let lastFontSizeAnnounced = 0; // Track last font size value to prevent duplicate announcements

const announceToScreenReader = (message: string, isActive: boolean = true) => {
  // Do not announce if the screen reader is being turned off
  if (!isActive) return;
  
  // Check the global tracking variable to prevent announcement loops
  if (window && typeof window !== 'undefined') {
    if (window._screenReaderDisabled === true) return;
    
    // Specifically block font size announcements if they match "Font size changed to"
    if (message.startsWith("Font size changed to") && 
        window._blockFontSizeAnnouncements === true) {
      console.log('Font size announcement blocked:', message);
      return;
    }
  }
  
  // Debounce announcements to prevent rapid-fire loops
  const now = Date.now();
  if (now - lastAnnouncementTime < ANNOUNCEMENT_COOLDOWN) {
    console.log('Announcement debounced:', message);
    return;
  }
  lastAnnouncementTime = now;
  
  // Create an accessible live region or use an existing one
  let liveRegion = document.getElementById('screen-reader-announcer');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'screen-reader-announcer';
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
  }
  
  // Update the content to trigger screen reader announcement
  liveRegion.textContent = message;
  
  // Also use speech synthesis for browsers that support it
  if (window.speechSynthesis) {
    // Cancel any existing speech first
    window.speechSynthesis.cancel();
    
    // Small delay to ensure the cancellation completes
    setTimeout(() => {
      const announcement = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(announcement);
    }, 10);
  }
};

// Helper to cancel any ongoing speech synthesis
const cancelSpeech = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  
  // Also clear the live region
  const liveRegion = document.getElementById('screen-reader-announcer');
  if (liveRegion) {
    liveRegion.textContent = '';
  }
  
  // Set global tracking variable to prevent announcement loops
  if (window && typeof window !== 'undefined') {
    window._screenReaderDisabled = true;
  }
};

interface AccessibilityControlsProps {
  onClose: () => void;
}

export function AccessibilityControls({ onClose }: AccessibilityControlsProps) {
  // Font size state and settings - initialize from localStorage or current document state
  const [fontSize, setFontSize] = useState(() => {
    if (typeof document !== 'undefined') {
      // Try to get font size from the document's style
      const currentFontSize = document.documentElement.style.fontSize;
      if (currentFontSize) {
        const percentage = parseInt(currentFontSize);
        if (!isNaN(percentage)) return percentage;
      }
      
      // If not in document, try localStorage
      const savedFontSize = localStorage.getItem('accessibility-font-size');
      if (savedFontSize) return parseInt(savedFontSize);
    }
    return 100; // Default
  });
  
  // Check if dark mode is currently active before initializing state
  const [colorTheme, setColorTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof document !== 'undefined') {
      const isDarkMode = document.documentElement.classList.contains('dark');
      const savedTheme = localStorage.getItem('accessibility-color-theme') as 'light' | 'dark' | 'system' | null;
      if (savedTheme) return savedTheme;
      return isDarkMode ? 'dark' : 'light';
    }
    return 'light'; // Default
  });
  
  // Assistive features - initialize from document classes
  const [screenReader, setScreenReader] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('accessibility-screen-reader') === 'true';
    }
    return false;
  });
  
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('high-contrast');
    }
    return false;
  });
  
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('reduce-motion');
    }
    return false;
  });
  
  const [focusIndicators, setFocusIndicators] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('focus-visible');
    }
    return false;
  });

  // Refs for handling screen reader functionality
  const screenReaderObserver = useRef<MutationObserver | null>(null);
  const hoverListenersAttached = useRef(false);
  
  // Refs for focus management
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Refs for initialization tracking
  const isInitialMount = useRef(true);
  const previousFontSize = useRef(fontSize);
  
  // Apply font size changes
  useEffect(() => {
    // Prevent server-side rendering issues
    if (typeof window === 'undefined') return;
    
    try {
      // Apply font size to document
      document.documentElement.style.fontSize = `${fontSize}%`;
      localStorage.setItem('accessibility-font-size', fontSize.toString());
      
      // Only announce font size changes if:
      // 1. Screen reader is active
      // 2. It's not the initial render
      // 3. Font size is different from previous
      // 4. Font size is not the default (100%)
      // 5. We aren't globally blocking font size announcements
      if (screenReader && 
          !isInitialMount.current && 
          fontSize !== previousFontSize.current && 
          fontSize !== 100 &&
          !(window._blockFontSizeAnnouncements === true)) {
        
        // Store this announcement to prevent duplicates
        lastFontSizeAnnounced = fontSize;
        
        // Announce the font size change
        announceToScreenReader(`Font size changed to ${fontSize} percent`, screenReader);
      }
      
      // Update previous font size
      previousFontSize.current = fontSize;
      
      // Mark that we're no longer on initial mount
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
    } catch (error) {
      console.error("Error updating font size:", error);
    }
  }, [fontSize, screenReader]);
  
  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('theme-light', 'theme-dark')
    
    // Determine theme
    let activeTheme = colorTheme
    if (activeTheme === 'system') {
      activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    
    // Apply theme
    if (activeTheme === 'dark') {
      root.classList.add('dark', 'theme-dark')
      if (screenReader) announceToScreenReader("Dark theme applied", true);
    } else {
      root.classList.add('theme-light')
      root.classList.remove('dark')
      if (screenReader) announceToScreenReader("Light theme applied", true);
    }
    
    localStorage.setItem('accessibility-color-theme', colorTheme)
  }, [colorTheme, screenReader])
  
  // Set up screen reader functionality
  useEffect(() => {
    const root = document.documentElement;
    
    // Set global tracking variable based on screen reader state
    if (window && typeof window !== 'undefined') {
      window._screenReaderDisabled = !screenReader;
    }
    
    // Capture references to event listeners so they can be removed
    const focusEventMap = new Map();
    
    if (screenReader) {
      root.setAttribute('data-screen-reader-active', 'true');
      announceToScreenReader("Screen reader activated", true);
      
      // Screen reader content observer with specific excluded selectors
      if (!screenReaderObserver.current) {
        screenReaderObserver.current = new MutationObserver((mutations) => {
          // Skip if screen reader is disabled globally
          if (window && typeof window !== 'undefined') {
            if (window._screenReaderDisabled === true) return;
          }
          
          for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              // Find text nodes to announce
              for (let i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i];
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element;
                  
                  // Skip announcer elements and hidden elements to prevent feedback loops
                  // MUCH more comprehensive check
                  if (element.id === 'screen-reader-announcer' || 
                      (element.parentElement && element.parentElement.id === 'screen-reader-announcer') ||
                      element.closest('#screen-reader-announcer') || 
                      element.getAttribute('aria-hidden') === 'true' ||
                      element.classList.contains('screen-reader-announcement') ||
                      element.classList.contains('sr-only') ||
                      !element.isConnected) {
                    continue;
                  }
                  
                  const text = element.textContent?.trim();
                  if (text && text.length > 10) {
                    announceToScreenReader(text, true);
                    // Only announce one element at a time to prevent overwhelming
                    break;
                  }
                }
              }
            }
          }
        });
        
        // Start observing BUT NOT the screen reader announcer itself
        const announcer = document.getElementById('screen-reader-announcer');
        screenReaderObserver.current.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        // Explicitly disconnect from the announcer to prevent loops
        if (announcer) {
          screenReaderObserver.current.disconnect();
          screenReaderObserver.current.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }
      
      // Add focus listeners for interactive elements if not already added
      if (!hoverListenersAttached.current) {
        const attachFocusListeners = () => {
          // Clear existing focus listeners first to prevent duplicates
          document.querySelectorAll('a, button, [role="button"], input, select, [tabindex="0"]').forEach(el => {
            const existingListener = focusEventMap.get(el);
            if (existingListener) {
              el.removeEventListener('focus', existingListener);
            }
          });
          
          document.querySelectorAll('a, button, [role="button"], input, select, [tabindex="0"]').forEach(el => {
            const focusHandler = (e: Event) => {
              // Skip if screen reader is disabled globally
              if (window && typeof window !== 'undefined') {
                if (window._screenReaderDisabled === true) return;
              }
              
              const target = e.currentTarget as HTMLElement;
              let announcement = '';
              
              if (target.tagName === 'A') {
                announcement = `Link: ${target.textContent || target.getAttribute('aria-label') || 'Unnamed link'}`;
                if (target.getAttribute('href')) {
                  announcement += `, goes to ${target.getAttribute('href')}`;
                }
              } else if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
                announcement = `Button: ${target.textContent || target.getAttribute('aria-label') || 'Unnamed button'}`;
                if (target.getAttribute('aria-expanded') === 'true') {
                  announcement += ', expanded';
                } else if (target.getAttribute('aria-expanded') === 'false') {
                  announcement += ', collapsed';
                }
              } else if (target.tagName === 'INPUT') {
                const inputType = (target as HTMLInputElement).type;
                const label = target.getAttribute('aria-label') || 
                             document.querySelector(`label[for="${target.id}"]`)?.textContent || 
                             'Unnamed input';
                announcement = `${inputType} input: ${label}`;
                if (inputType === 'checkbox' || inputType === 'radio') {
                  announcement += (target as HTMLInputElement).checked ? ', checked' : ', unchecked';
                }
              } else if (target.tagName === 'SELECT') {
                announcement = `Dropdown: ${target.getAttribute('aria-label') || 'Select an option'}`;
                const selectedOption = (target as HTMLSelectElement).options[(target as HTMLSelectElement).selectedIndex];
                if (selectedOption) {
                  announcement += `, currently selected: ${selectedOption.text}`;
                }
              }
              
              if (announcement) {
                announceToScreenReader(announcement, true);
              }
            };
            
            // Store reference to event listener
            focusEventMap.set(el, focusHandler);
            el.addEventListener('focus', focusHandler);
          });
        };
        
        // Attach focus listeners immediately
        attachFocusListeners();
        
        hoverListenersAttached.current = true;
      }
      
    } else {
      // Cleanup when screen reader is deactivated
      root.setAttribute('data-screen-reader-active', 'false');
      
      // Set global tracking variable first to prevent any further announcements
      if (window && typeof window !== 'undefined') {
        window._screenReaderDisabled = true;
      }
      
      // Cancel any speech synthesis that might be ongoing
      cancelSpeech();
      
      if (screenReaderObserver.current) {
        screenReaderObserver.current.disconnect();
        screenReaderObserver.current = null;
      }
      
      // Remove ALL event listeners explicitly
      document.querySelectorAll('a, button, [role="button"], input, select, [tabindex="0"]').forEach(el => {
        const listener = focusEventMap.get(el);
        if (listener) {
          el.removeEventListener('focus', listener);
        }
      });
      
      // Clear the focus event map
      focusEventMap.clear();
      
      // Reset hover listeners attached flag
      hoverListenersAttached.current = false;
    }
    
    // Save the screen reader state to localStorage
    localStorage.setItem('accessibility-screen-reader', screenReader.toString());
    
    // Cleanup on component unmount
    return () => {
      if (screenReaderObserver.current) {
        screenReaderObserver.current.disconnect();
        screenReaderObserver.current = null;
      }
      
      // Always cancel speech when unmounting
      cancelSpeech();
      
      // Remove all focus event listeners
      document.querySelectorAll('a, button, [role="button"], input, select, [tabindex="0"]').forEach(el => {
        const listener = focusEventMap.get(el);
        if (listener) {
          el.removeEventListener('focus', listener);
        }
      });
    };
  }, [screenReader]);
  
  // Apply assistive features
  useEffect(() => {
    const root = document.documentElement
    
    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast')
      if (screenReader) announceToScreenReader("High contrast mode enabled", true);
    } else {
      root.classList.remove('high-contrast')
      if (screenReader && root.classList.contains('high-contrast')) announceToScreenReader("High contrast mode disabled", true);
    }
    
    // Reduce motion
    if (reduceMotion) {
      root.classList.add('reduce-motion')
      if (screenReader) announceToScreenReader("Reduced motion enabled", true);
    } else {
      root.classList.remove('reduce-motion')
      if (screenReader && root.classList.contains('reduce-motion')) announceToScreenReader("Reduced motion disabled", true);
    }
    
    // Focus indicators
    if (focusIndicators) {
      root.classList.add('focus-visible')
      if (screenReader) announceToScreenReader("Focus indicators enabled", true);
    } else {
      root.classList.remove('focus-visible')
      if (screenReader && root.classList.contains('focus-visible')) announceToScreenReader("Focus indicators disabled", true);
    }
    
    // Save settings
    localStorage.setItem('accessibility-screen-reader', screenReader.toString())
    localStorage.setItem('accessibility-high-contrast', highContrast.toString())
    localStorage.setItem('accessibility-reduce-motion', reduceMotion.toString())
    localStorage.setItem('accessibility-focus-indicators', focusIndicators.toString())
  }, [screenReader, highContrast, reduceMotion, focusIndicators])
  
  // Handle screen reader toggle separately
  const toggleScreenReader = (enabled: boolean) => {
    // If turning off, cancel any speech in progress FIRST
    if (!enabled) {
      // Block font size announcements IMMEDIATELY
      if (window && typeof window !== 'undefined') {
        window._blockFontSizeAnnouncements = true;
      }
      
      // Set global tracking variable to prevent further announcements
      if (window && typeof window !== 'undefined') {
        window._screenReaderDisabled = true;
      }
      
      // Cancel speech before state change to prevent any announcements
      cancelSpeech();
      
      // Immediately update data attribute to prevent any style-based announcements
      document.documentElement.setAttribute('data-screen-reader-active', 'false');
    } else {
      // Re-enable font size announcements when screen reader is turned on
      if (window && typeof window !== 'undefined') {
        window._blockFontSizeAnnouncements = false;
      }
    }
    
    setScreenReader(enabled);
  };
  
  // Reset all settings
  const resetSettings = () => {
    if (screenReader) {
      announceToScreenReader("Resetting accessibility settings to default values", true);
    }
    
    setFontSize(100)
    setColorTheme('system')
    setScreenReader(false)
    setHighContrast(false)
    setReduceMotion(false)
    setFocusIndicators(false)
  }
  
  // Font size presets
  const fontSizePresets = [
    { name: "Small", size: 85 },
    { name: "Medium", size: 100 },
    { name: "Large", size: 115 },
    { name: "Extra Large", size: 130 }
  ]

  // Set up focus trap
  useEffect(() => {
    // Auto-focus on open
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    
    // Focus trap handler
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      // If shift + tab and on first element, move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If tab and on last element, cycle back to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    // Set up escape key to close
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleTabKey);
    window.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      window.removeEventListener('keydown', handleTabKey);
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <Card ref={dialogRef} className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle id="accessibility-title">Accessibility Settings</CardTitle>
          <Button 
            ref={closeButtonRef}
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            aria-label="Close accessibility panel"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="text-size">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="text-size" className="flex items-center">
                <Type className="mr-2 h-4 w-4" />
                <span>Text Size</span>
              </TabsTrigger>
              <TabsTrigger value="themes" className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                <span>Color Themes</span>
              </TabsTrigger>
              <TabsTrigger value="assistive" className="flex items-center">
                <Ear className="mr-2 h-4 w-4" />
                <span>Assistive Features</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Text Size Tab */}
            <TabsContent value="text-size" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Type className="h-4 w-4" />
                <span className="text-sm font-medium mx-2">Font Size: {fontSize}%</span>
                <ZoomIn className="h-4 w-4" />
              </div>
              <Slider 
                value={[fontSize]} 
                min={80} 
                max={150} 
                step={5} 
                onValueChange={(value: number[]) => setFontSize(value[0])}
                aria-label="Font size"
                className="mb-6"
              />
              <div className="grid grid-cols-4 gap-2">
                {fontSizePresets.map((preset) => (
                  <Button 
                    key={preset.name}
                    variant={fontSize === preset.size ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFontSize(preset.size)}
                    className="w-full"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-sm mb-2">Text Size Preview:</p>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-xs mb-1">Small text</p>
                  <p className="mb-1">Normal text</p>
                  <p className="text-lg mb-1">Large text</p>
                  <p className="text-xl">Extra large text</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Color Themes Tab */}
            <TabsContent value="themes" className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant={colorTheme === 'light' ? "default" : "outline"}
                  onClick={() => setColorTheme('light')}
                  className="flex flex-col items-center justify-center h-24 p-2"
                >
                  <Sun className="h-6 w-6 mb-2" />
                  <span>Light</span>
                </Button>
                <Button 
                  variant={colorTheme === 'dark' ? "default" : "outline"}
                  onClick={() => setColorTheme('dark')}
                  className="flex flex-col items-center justify-center h-24 p-2"
                >
                  <Moon className="h-6 w-6 mb-2" />
                  <span>Dark</span>
                </Button>
                <Button 
                  variant={colorTheme === 'system' ? "default" : "outline"}
                  onClick={() => setColorTheme('system')}
                  className="flex flex-col items-center justify-center h-24 p-2"
                >
                  <Laptop className="h-6 w-6 mb-2" />
                  <span>System</span>
                </Button>
              </div>
              <div className="bg-muted p-3 rounded-md mt-4">
                <p className="font-medium mb-2">Theme Preview</p>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded-full bg-background border"></div>
                  <div className="w-6 h-6 rounded-full bg-foreground"></div>
                  <div className="w-6 h-6 rounded-full bg-primary"></div>
                  <div className="w-6 h-6 rounded-full bg-secondary"></div>
                  <div className="w-6 h-6 rounded-full bg-gold"></div>
                </div>
              </div>
            </TabsContent>
            
            {/* Assistive Features Tab */}
            <TabsContent value="assistive" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-2">
                    {screenReader ? (
                      <Volume2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-gray-400" />
                    )}
                    <Label htmlFor="screen-reader" className="font-medium">Screen Reader</Label>
                  </div>
                  <Switch 
                    id="screen-reader" 
                    checked={screenReader} 
                    onCheckedChange={toggleScreenReader}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-2">
                    <Eye className={`h-4 w-4 ${highContrast ? 'text-green-500' : 'text-gray-400'}`} />
                    <Label htmlFor="high-contrast" className="font-medium">High Contrast</Label>
                  </div>
                  <Switch 
                    id="high-contrast" 
                    checked={highContrast} 
                    onCheckedChange={setHighContrast}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-2">
                    <MousePointer className={`h-4 w-4 ${reduceMotion ? 'text-green-500' : 'text-gray-400'}`} />
                    <Label htmlFor="reduce-motion" className="font-medium">Reduce Motion</Label>
                  </div>
                  <Switch 
                    id="reduce-motion" 
                    checked={reduceMotion} 
                    onCheckedChange={setReduceMotion}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MousePointer className={`h-4 w-4 ${focusIndicators ? 'text-green-500' : 'text-gray-400'}`} />
                    <Label htmlFor="focus-indicators" className="font-medium">Focus Indicators</Label>
                  </div>
                  <Switch 
                    id="focus-indicators" 
                    checked={focusIndicators} 
                    onCheckedChange={setFocusIndicators}
                  />
                </div>
              </div>
              
              {screenReader && (
                <div className="mt-4 p-3 bg-primary/10 rounded-md">
                  <h4 className="font-medium mb-2">Screen Reader Info</h4>
                  <p className="text-sm mb-2">Screen reader is now active. It will:</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Announce changes to settings</li>
                    <li>Read focused elements</li>
                    <li>Describe buttons and links</li>
                    <li>Announce new content</li>
                  </ul>
                  <p className="text-sm mt-2">Use Tab key to navigate and Enter to select.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={resetSettings}>
              Reset to Default
            </Button>
          </div>
          
          {/* Hidden live region for screen reader announcements */}
          <div 
            id="screen-reader-announcer" 
            className="sr-only" 
            aria-live="assertive" 
            aria-atomic="true"
          ></div>
        </CardContent>
      </Card>
    </div>
  )
} 