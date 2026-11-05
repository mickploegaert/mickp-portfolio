const points = [
  {
    title: "Learn",
    text: "I get better by building something, then building it again until it feels clear.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Build",
    text: "Pages, components, and the occasional 3D model, put together in the browser.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Finish",
    text: "A project counts when someone else can open the link.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const tools = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-black/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24">
          <div>
            <p className="mb-4 text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">About</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-tight text-[#071433] sm:text-5xl lg:text-6xl">
              Building software{" "}
              <span className="text-[#071433]/40">that ships.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#071433]/75 sm:text-lg">
              I&apos;m a 19-year-old software development student at Scalda in Terneuzen. I&apos;m passionate about learning, creating, and improving my coding skills every day.
            </p>
            <p className="mt-4 max-w-xl border-l border-black/10 pl-4 text-sm leading-relaxed text-[#071433]/60 sm:text-base">
              In my free time I play football, game, and run. Staying active helps me stay focused and balanced.
            </p>
          </div>
          <figure className="mx-auto w-fit lg:mx-0">
            <img
              src="/portrait.png"
              alt="Portrait of Mick Ploegaert"
              width={512}
              height={512}
              className="h-auto w-[min(72vw,300px)]"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mt-5 text-center text-[11px] font-semibold tracking-[0.42em] text-[#071433]/45 uppercase">
              Terneuzen
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 grid gap-12 border-t border-black/10 pt-16 md:grid-cols-3 lg:gap-16">
          {points.map((point) => (
            <div key={point.title} className="group">
              <div className="mb-6 text-[#071433]/30 transition-colors duration-300 group-hover:text-[#071433]">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#071433]">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-[#071433]/55">{point.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-black/10 pt-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#071433] sm:text-4xl">
              Tools
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-[#071433]/55 sm:text-base">
              The stack behind this site and the live projects.
            </p>
          </div>
          <ul className="mt-10 flex flex-wrap gap-4">
            {tools.map((tool) => (
              <li
                key={tool}
                className="border border-black/10 px-6 py-3 text-sm font-bold tracking-wide text-[#071433]/60 transition-colors duration-300 hover:border-black/30 hover:text-[#071433]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
