import Link from "next/link";
import { contactEmail, phoneDisplay, phoneHref } from "../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f4f5f7] px-6 pt-20 pb-8 sm:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-black/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#071433] sm:text-4xl">
              Let&apos;s build something clear and useful.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand uppercase"
            >
              {contactEmail}
              <span aria-hidden>→</span>
            </a>
            <a href={phoneHref} className="mt-3 block text-sm text-[#071433]/60">
              {phoneDisplay}
            </a>
          </div>
          <div className="md:col-span-3">
            <p className="mb-6 border-b border-black/10 pb-4 text-[11px] font-bold tracking-[0.25em] text-[#071433]/40 uppercase">
              Navigate
            </p>
            <ul className="space-y-3 text-sm text-[#071433]/70">
              <li><a href="/#projects" className="hover:text-brand">Projects</a></li>
              <li><a href="/#about" className="hover:text-brand">About</a></li>
              <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="mb-6 border-b border-black/10 pb-4 text-[11px] font-bold tracking-[0.25em] text-[#071433]/40 uppercase">
              Social
            </p>
            <ul className="space-y-3 text-sm text-[#071433]/70">
              <li>
                <a href="https://www.linkedin.com/in/mick-ploegaert" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/mickploegaert" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="pt-8 text-xs tracking-[0.08em] text-[#071433]/45 uppercase">
          © 2026 Mick Ploegaert
        </p>
      </div>
    </footer>
  );
}
