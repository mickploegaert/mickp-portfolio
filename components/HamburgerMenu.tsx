"use client";

import { useState, useRef, useEffect } from "react";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!panelRef.current) return;
      if (open && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Fancy trigger button */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={`group relative grid place-items-center w-12 h-12 rounded-full bg-black/90 text-white shadow-lg shadow-black/10 transition-transform duration-300 ease-out ${open ? "rotate-45" : "hover:scale-105"}`}
      >
        {/* Closed state: 2 horizontal lines */}
        <svg
          className={`absolute transition-all duration-300 ${open ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
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

        {/* Open state: X icon */}
        <svg
          className={`absolute transition-all duration-300 ${open ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
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

      {/* Dropdown panel: slides out to the left */}
      <div className="absolute right-0 top-full mt-3 overflow-visible pointer-events-none">
        <div
          className={`origin-top-right rounded-xl bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-out pointer-events-auto ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          style={{ 
            border: '1px solid rgba(0,0,0,0.08)',
            pointerEvents: open ? 'auto' : 'none'
          }}
        >
          <nav className="flex flex-col py-2 px-1 text-black">
            {[
              { href: "#projects", label: "Projects" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-6 py-3.5 text-[18px] font-medium hover:bg-black/5 active:bg-black/10 transition-all duration-200"
                style={{
                  letterSpacing: '-0.06em',
                  fontFamily: 'Inter, sans-serif',
                  transitionDelay: open ? `${(idx + 1) * 80}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(16px)',
                  transitionProperty: 'opacity, transform, background-color'
                }}
                onClick={() => setOpen(false)}
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
