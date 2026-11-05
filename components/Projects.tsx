const projects = [
  {
    number: "01",
    title: "Axelfest",
    href: "https://axelfest.nl",
    image: "/projects/axelfest.jpg",
    label: "Festival",
    text: "Ticket sales stay fast when the drop hits.",
  },
  {
    number: "02",
    title: "MK Studios",
    href: "https://mkstudios.vercel.app/",
    image: "/projects/mkstudios.jpg",
    label: "Studio",
    text: "Visitors can drag and turn the 3D models.",
  },
];

const steps = [
  { number: "01", title: "Plan", text: "Decide what the site needs to do." },
  { number: "02", title: "Design", text: "Settle type, spacing, and the screens." },
  { number: "03", title: "Build", text: "Put it together in Next.js and check it in the browser." },
  { number: "04", title: "Deploy", text: "Ship a link someone can open." },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-black/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">Selected work</p>
        <h2 className="mb-12 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight font-bold tracking-tight text-[#071433] sm:text-5xl">
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden border border-black/10 bg-white shadow-[0_22px_50px_-32px_rgba(7,20,51,0.45)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#071433]">
                <img
                  src={project.image}
                  alt={`${project.title} homepage`}
                  width={1440}
                  height={900}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#071433]/45 uppercase">
                  {project.number} — {project.label}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-[#071433]">{project.title}</h3>
                <p className="mt-2 text-sm text-[#071433]/60">{project.text}</p>
                <span className="mt-4 inline-block text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
                  View live site
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 border-t border-black/10 pt-16">
          <p className="mb-10 text-[11px] font-semibold tracking-[0.42em] text-[#071433]/45 uppercase">The process</p>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="group flex items-start gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/20 text-sm font-bold text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  {step.number}
                </span>
                <span>
                  <span className="block text-lg font-bold tracking-wide text-[#071433] uppercase">{step.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#071433]/55">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
