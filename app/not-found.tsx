import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">404</p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[#071433]">
          This page does not exist.
        </h1>
        <Link
          href="/"
          className="mt-8 inline-flex border border-[#071433] px-8 py-3 text-xs font-bold tracking-[0.2em] text-[#071433] uppercase transition-colors hover:border-brand hover:bg-brand hover:text-white"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
