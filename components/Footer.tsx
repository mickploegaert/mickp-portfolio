"use client";

import { useState, useEffect, useRef } from 'react';

export default function Footer() {
  const [scale, setScale] = useState(1);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      
      const footer = footerRef.current;
      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // When footer starts entering viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how much of footer has entered the viewport
        const enteredHeight = Math.max(0, windowHeight - rect.top);
        const footerHeight = rect.height;
        const progress = Math.min(1, enteredHeight / (footerHeight * 0.5)); // Scale over first 50%
        
        // Scale from 1 to 1.3 as footer enters viewport
        const newScale = 1 + (progress * 0.3);
        setScale(newScale);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-black">
      {/* Footer that scales on scroll */}
      <div 
        ref={footerRef}
        className="relative bg-black text-white transition-transform duration-300 ease-out"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-12 lg:p-20">
          {/* Left Text */}
          <div className="lg:col-span-7 lg:col-start-1">
            <h3 
              className="text-[48px] lg:text-[64px] font-black mb-8"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                letterSpacing: '-0.06em',
                fontWeight: 700 
              }}
            >
              Curious about what we can create together?
            </h3>
            <p 
              className="text-[32px] lg:text-[40px] mb-8"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                letterSpacing: '-0.06em',
                fontWeight: 700 
              }}
            >
              Let's bring something extraordinary to life!
            </p>
            
            {/* Contact Button */}
            <button 
              className="bg-white text-black px-8 py-4 rounded-full text-[24px] font-bold hover:bg-gray-200 transition-colors duration-200"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                letterSpacing: '-0.04em',
                fontWeight: 700
              }}
              onClick={() => window.location.href = 'mailto:243338@student.scalda.nl'}
            >
              Contact
            </button>
          </div>

          {/* Top Right Social Icons */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1 flex justify-end lg:justify-start gap-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          {/* Bottom Left Contact Info */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span 
                  className="text-[24px]"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    letterSpacing: '-0.04em',
                    fontWeight: 500 
                  }}
                >
                  243338@student.scalda.nl
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span 
                  className="text-[24px]"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    letterSpacing: '-0.04em',
                    fontWeight: 500 
                  }}
                >
                  +32 123 45 67 89
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Right Copyright */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-2 flex lg:justify-end items-end">
            <p 
              className="text-[18px] text-gray-400"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                letterSpacing: '-0.02em',
                fontWeight: 400 
              }}
            >
              © 2024 Mick Ploegaert. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}