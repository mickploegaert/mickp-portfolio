import Link from "next/link";

export default function Cta() {
  return (
    <section className="border-t border-black/10 px-6 py-24 text-center sm:px-10 sm:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-tight text-[#071433] sm:text-5xl">
          Open to an internship{" "}
          <span className="text-[#071433]/40">or a junior role.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#071433]/55">
          Frontend work, from a first conversation to a live site.
        </p>
        <Link
          href="/contact"
          className="group relative mt-10 inline-flex items-center justify-center overflow-hidden border border-[#071433] px-10 py-4 text-xs font-bold tracking-[0.2em] text-[#071433] uppercase transition-colors hover:border-brand"
        >
          <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact</span>
        </Link>
      </div>
    </section>
  );
}
