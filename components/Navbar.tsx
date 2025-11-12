"use client";

import { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ['projects', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      {/* Logo */}
      <div 
        className="text-[32px] text-black cursor-pointer hover:opacity-70 transition-opacity duration-200" 
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          letterSpacing: '-0.06em', 
          fontWeight: 700,
          animation: 'slideUpFade 0.8s ease-out 0.2s both'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        MICKP
      </div>

      {/* Desktop Navigation links */}
      <div className="hidden md:flex gap-8" style={{ animation: 'slideUpFade 0.8s ease-out 0.4s both' }}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`relative text-[20px] transition-all duration-200 hover:opacity-70 ${
              activeSection === item.href.slice(1) 
                ? 'text-black font-bold' 
                : 'text-black/80 hover:text-black'
            }`}
            style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.05em',
              fontWeight: 700,
            }}
          >
            {item.label}
            {activeSection === item.href.slice(1) && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black rounded-full" />
            )}
          </a>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <HamburgerMenu 
          navItems={navItems}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>

      <style jsx>{`
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
