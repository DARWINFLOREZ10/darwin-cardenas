import { cv } from "@/lib/cv";
import Link from "next/link";

const { identity, en, projects, experience, skills } = cv;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="text-xs tracking-[0.22em] text-accent uppercase">
            {identity.location} · {identity.workMode}
          </p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-6xl">{identity.name}</h1>
          <p className="mt-2 text-lg text-muted">{identity.title}</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Primary">
          <a className="text-accent" href={identity.github}>
            GitHub
          </a>
          <a className="text-ink" href={identity.linkedin}>
            LinkedIn
          </a>
          <a className="text-ink" href={`mailto:${identity.email}`}>
            Email
          </a>
          <Link className="text-ink" href="/resume/en">
            Resume
          </Link>
          <Link className="text-ink" href="/resume/es">
            Hoja de vida
          </Link>
          <Link className="text-ink" href="/command">
            Command
          </Link>
        </nav>
      </header>

      <section className="grid gap-10 border-b border-line py-12 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="font-serif text-3xl leading-snug tracking-tight text-ink italic sm:text-4xl">
            {en.statement}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">{en.summary}</p>
        </div>
        <aside className="border border-line bg-panel p-5">
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Public proof</p>
          <ul className="mt-3 space-y-1 text-sm">
            {projects.map((project) => (
              <li key={project.name}>
                <a className="text-ink underline-offset-4 hover:underline" href={project.repo}>
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs tracking-[0.18em] text-accent uppercase">Contact</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a className="text-ink underline-offset-4 hover:underline" href={identity.github}>
                GitHub
              </a>
            </li>
            <li>
              <a className="text-ink underline-offset-4 hover:underline" href={identity.linkedin}>
                LinkedIn
              </a>
            </li>
            <li>
              <a className="text-ink underline-offset-4 hover:underline" href={`mailto:${identity.email}`}>
                {identity.email}
              </a>
            </li>
          </ul>
        </aside>
      </section>

      <section className="border-b border-line py-12" aria-labelledby="systems">
        <h2 id="systems" className="font-serif text-3xl tracking-tight">
          Selected systems
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Each README says the limit. These are not customer production systems.
        </p>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {projects.map((project, index) => (
            <li key={project.name} className="grid gap-4 py-8 md:grid-cols-[7rem_1fr]">
              <p className="font-serif text-2xl text-accent">0{index + 1}</p>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl">{project.name}</h3>
                  <a className="text-sm text-accent" href={project.repo}>
                    View repository
                  </a>
                </div>
                <p className="mt-1 text-xs tracking-wide text-muted uppercase">{project.stack}</p>
                <dl className="mt-5 space-y-4 text-sm leading-6">
                  <div>
                    <dt className="text-accent">Problem</dt>
                    <dd className="text-ink">{project.en.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-accent">Design</dt>
                    <dd className="text-muted">{project.en.design}</dd>
                  </div>
                  <div>
                    <dt className="text-accent">Evidence</dt>
                    <dd className="text-muted">{project.en.evidence}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-10 border-b border-line py-12 lg:grid-cols-2" aria-labelledby="work">
        <div>
          <h2 id="work" className="font-serif text-3xl tracking-tight">
            How I work
          </h2>
          <ul className="mt-6 space-y-5">
            {en.howIWork.map((item) => (
              <li key={item} className="text-sm leading-6 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl tracking-tight">Record</h2>
          {experience.map((job) => (
            <article key={job.org} className="mt-6">
              <p className="text-sm text-accent">
                {job.start} — {job.end}
              </p>
              <h3 className="mt-1 text-lg">{job.role}</h3>
              <p className="text-sm text-muted">
                {job.org} · {job.location}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
          <p className="mt-6 text-sm">
            <Link className="text-accent" href="/resume/en">
              Printable resume (EN)
            </Link>
            <span className="text-muted"> · </span>
            <Link className="text-accent" href="/resume/es">
              Hoja de vida (ES)
            </Link>
          </p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="stack">
        <h2 id="stack" className="font-serif text-3xl tracking-tight">
          Stack
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill} className="border border-line px-3 py-1 text-sm text-muted">
              {skill}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          <a className="text-ink" href={`mailto:${identity.email}`}>
            {identity.email}
          </a>
          <span> · </span>
          <a className="text-ink" href={identity.github}>
            github.com/{identity.githubHandle}
          </a>
        </p>
      </section>
    </main>
  );
}
