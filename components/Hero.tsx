"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { contactEmail } from "../lib/site";

const MacBook = dynamic(() => import("./MacBook"), { ssr: false });

export default function Hero() {
  return (
    <section className="px-6 pt-28 pb-16 sm:px-10 sm:pt-36 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,48%)] lg:gap-8">
        <div>
          <p className="mb-6 text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">
            Software development
          </p>
          <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[1.02] font-bold tracking-tight text-[#071433] sm:text-7xl">
            Mick Ploegaert
          </h1>
          <p className="mt-8 max-w-xl border-l border-brand/50 pl-4 text-base leading-relaxed text-[#071433]/80 sm:text-lg">
            Software development student at Scalda in Terneuzen. Frontend development, open to an internship or a junior role.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/#projects"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-[#071433] px-8 py-3 text-xs font-bold tracking-[0.2em] text-[#071433] uppercase transition-colors hover:border-brand"
            >
              <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Projects</span>
            </a>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-[#071433] px-8 py-3 text-xs font-bold tracking-[0.2em] text-[#071433] uppercase transition-colors hover:border-brand"
            >
              <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact</span>
            </Link>
          </div>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand uppercase"
          >
            {contactEmail}
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="relative h-[340px] sm:h-[460px] lg:h-[560px]">
          <MacBook />
        </div>
      </div>
    </section>
  );
}
