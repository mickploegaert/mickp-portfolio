"use client";

import { useState } from 'react';

export default function HamburgerMenu({ navItems, isOpen, onClose }: {
  navItems: Array<{ href: string; label: string }>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const elementId = href.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    onClose();
  };
  return (
    <div className="relative">
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => onClose()}
        className={`group relative grid place-items-center w-8 h-8 sm:w-10 sm:h-12 rounded-full bg-black text-white shadow-lg transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "hover:scale-105"}`}
      >
        <svg
          className={`absolute w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <line x1="4" y1="7" x2="16" y2="7" />
          <line x1="4" y1="13" x2="16" y2="13" />
        </svg>

        <svg
          className={`absolute w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <line x1="5" y1="5" x2="15" y2="15" />
          <line x1="15" y1="5" x2="5" y2="15" />
        </svg>
      </button>

      <div className="absolute right-0 top-full mt-3 overflow-visible pointer-events-none">
        <div
          className={`origin-top-right rounded-xl bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-out pointer-events-auto ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          style={{ 
            border: '1px solid rgba(0,0,0,0.08)',
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
        >
          <nav className="flex flex-col py-2 px-1 text-black">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base lg:text-[18px] font-bold hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
                style={{
                  letterSpacing: '-0.06em',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  transitionDelay: isOpen ? `${(idx + 1) * 80}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(16px)',
                  transitionProperty: 'opacity, transform, background-color'
                }}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}