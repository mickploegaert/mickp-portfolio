"use client";

import { scrollToSection } from "../lib/navigation";

export default function HamburgerMenu({
  navItems,
  isOpen,
  onToggle,
  onClose,
}: {
  navItems: Array<{ href: string; label: string }>;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (scrollToSection(href)) {
      e.preventDefault();
    }
    onClose();
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        onClick={onToggle}
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

      <div className="absolute right-0 top-full mt-3">
        <div
          id="mobile-nav"
          inert={isOpen ? undefined : true}
          aria-hidden={!isOpen}
          className={`origin-top-right rounded-xl bg-white shadow-2xl overflow-hidden transition-opacity duration-300 ease-out ${
            isOpen ? "opacity-100" : "invisible opacity-0"
          }`}
          style={{ border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="flex flex-col py-2 px-1 text-black">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-bold hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
                style={{
                  letterSpacing: "-0.06em",
                  fontWeight: 700,
                }}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
