"use client"

import { Button } from "./ui/button"
import { Accessibility } from "lucide-react"
import { useEffect, useRef, forwardRef } from "react"

interface AccessibilityButtonProps {
  onClick: () => void
}

export const AccessibilityButton = forwardRef<HTMLButtonElement, AccessibilityButtonProps>(
  ({ onClick }, ref) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const buttonRef = ref || localRef;
    
    // Handle keyboard shortcuts for accessibility panel
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Alt+A is a common accessibility shortcut
        if (e.altKey && e.key === 'a') {
          e.preventDefault();
          onClick();
          // Focus the button after opening
          if (buttonRef && 'current' in buttonRef && buttonRef.current) {
            buttonRef.current.focus();
          }
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClick, buttonRef]);

    return (
      <div className="container mx-auto py-2 flex justify-end">
        <Button 
          ref={buttonRef}
          onClick={onClick}
          className="bg-gold text-black hover:bg-gold/90 focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 flex items-center"
          size="sm"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-label="Open accessibility settings"
        >
          <Accessibility className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Accessibility</span>
        </Button>
        <span className="sr-only">(Press Alt+A to open accessibility settings)</span>
      </div>
    )
  }
)

AccessibilityButton.displayName = "AccessibilityButton"; 