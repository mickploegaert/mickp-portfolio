"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "../lib/navigation";

const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (scrollToSection(href)) event.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-black/10 bg-[#f4f5f7]/90 shadow-[0_8px_32px_rgba(7,20,51,0.04)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link
            href="/"
            className="font-[family-name:var(--font-brand)] text-[13px] font-semibold tracking-[0.22em] text-[#071433] uppercase"
          >
            Mick Ploegaert
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="text-[11px] font-bold tracking-[0.22em] text-[#071433]/70 uppercase transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="relative z-[60] flex h-10 w-10 items-center justify-center border border-black/20 transition-colors hover:border-brand md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`block h-0.5 bg-[#071433] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 bg-[#071433] transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-3/4 bg-[#071433] transition-transform ${open ? "w-full -translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#071433]/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        id="mobile-nav"
        inert={open ? undefined : true}
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[55] flex w-[min(100%,24rem)] flex-col justify-center border-l border-black/10 bg-white px-8 transition-transform duration-500 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start gap-2" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className="font-[family-name:var(--font-brand)] py-2 text-4xl font-medium tracking-tight text-[#071433]/70 transition-colors hover:text-[#071433]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex border border-[#071433] px-8 py-4 text-xs font-bold tracking-[0.2em] text-[#071433] uppercase transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}
