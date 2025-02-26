"use client"

import { useState } from "react"
import { Button } from "./components/ui/button"

export default function TestPage() {
  const [counter, setCounter] = useState(0)
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Test Page</h1>
      <p className="mb-5">This is a test page to verify accessibility settings persistence.</p>
      
      <div className="flex flex-col gap-4 max-w-md">
        <div className="p-4 border rounded-md">
          <p className="mb-2">Counter: {counter}</p>
          <Button onClick={() => setCounter(prev => prev + 1)}>Increment</Button>
        </div>
        
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Current Settings:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Font Size: <span className="font-mono" id="current-font-size">Unknown</span></li>
            <li>Theme: <span className="font-mono" id="current-theme">Unknown</span></li>
            <li>High Contrast: <span className="font-mono" id="current-high-contrast">Unknown</span></li>
            <li>Reduce Motion: <span className="font-mono" id="current-reduce-motion">Unknown</span></li>
          </ul>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        // Update display of current settings
        function updateSettingsDisplay() {
          const fontSizeEl = document.getElementById('current-font-size');
          const themeEl = document.getElementById('current-theme');
          const highContrastEl = document.getElementById('current-high-contrast');
          const reduceMotionEl = document.getElementById('current-reduce-motion');
          
          if (fontSizeEl) fontSizeEl.textContent = document.documentElement.style.fontSize || 'Default';
          if (themeEl) themeEl.textContent = document.documentElement.classList.contains('dark') ? 'Dark' : 'Light';
          if (highContrastEl) highContrastEl.textContent = document.documentElement.classList.contains('high-contrast') ? 'On' : 'Off';
          if (reduceMotionEl) reduceMotionEl.textContent = document.documentElement.classList.contains('reduce-motion') ? 'On' : 'Off';
        }
        
        // Run on load and on any relevant changes
        window.addEventListener('load', updateSettingsDisplay);
        const observer = new MutationObserver(updateSettingsDisplay);
        observer.observe(document.documentElement, { 
          attributes: true, 
          attributeFilter: ['class', 'style'] 
        });
      ` }} />
    </div>
  )
} 