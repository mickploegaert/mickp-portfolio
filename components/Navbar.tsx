"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-4">
      {/* Logo */}
      <div 
        className="text-[26px] text-black" 
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          letterSpacing: '-0.06em', 
          fontWeight: 500,
          animation: 'slideUpFade 0.8s ease-out 0.2s both'
        }}
      >
        MIPL
      </div>

      {/* Hamburger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-12 h-12 rounded-full bg-black/90 flex items-center justify-center hover:scale-105 transition-transform"
        style={{ animation: 'slideUpFade 0.8s ease-out 0.4s both' }}
        aria-label="Menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="7" x2="16" y2="7" />
          <line x1="4" y1="13" x2="16" y2="13" />
        </svg>
      </button>

      {/* Menu items - slide from left on white background */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-white"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Menu items */}
          <div className="relative z-50 flex flex-col gap-8">
            {[
              { href: "#projects", label: "Projects", delay: "0ms" },
              { href: "#about", label: "About", delay: "80ms" },
              { href: "#contact", label: "Contact", delay: "160ms" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[60px] text-black hover:opacity-60 transition-opacity"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.06em',
                  fontWeight: 400,
                  animation: `slideFromLeft 0.4s ease-out ${item.delay} both`
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
