import { cv } from "@/lib/cv";
import { formatUsd, offer, offerJsonLd, offerMailto, spanishOfferLine, telHref, whatsappHref } from "@/lib/offer";
import type { Metadata } from "next";
import Link from "next/link";

const { identity, en, projects, proof, experience, skills } = cv;
const price = formatUsd(offer.priceUsd);
const entryPrice = formatUsd(offer.entry.priceUsd);
const contactMailto = `mailto:${identity.email}`;
const offerMail = offerMailto(identity.email);
const call = telHref(identity.phone);
const whatsapp = whatsappHref(identity.phone, offer.whatsappText);

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = offerJsonLd(identity);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-line pb-10">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">
          {identity.location} · {identity.timezone} · {identity.workMode} · {identity.availability}
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-6xl">{identity.name}</h1>
        <p className="mt-2 text-lg text-muted">{identity.title}</p>
        <p className="mt-1 text-sm text-muted">{identity.stackLine}</p>
        <p className="mt-6 max-w-3xl text-base leading-7 text-ink">{en.summary}</p>
        <p className="mt-3 max-w-3xl text-sm text-muted">{identity.openTo}</p>
        <nav className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm" aria-label="Primary">
          <Link className="border border-accent bg-accent px-4 py-2 text-ink-dark" href="/resume/en">
            Resume (EN)
          </Link>
          <a className="text-ink underline-offset-4 hover:underline" href={contactMailto}>
            Email
          </a>
          <a className="text-ink underline-offset-4 hover:underline" href={identity.github}>
            GitHub
          </a>
          <a className="text-ink underline-offset-4 hover:underline" href={identity.linkedin}>
            LinkedIn
          </a>
          <Link className="text-ink underline-offset-4 hover:underline" href="/resume/es">
            Hoja de vida
          </Link>
        </nav>
      </header>

      <section className="border-b border-line py-12" aria-labelledby="proof">
        <h2 id="proof" className="font-serif text-3xl tracking-tight">
          What I have shipped
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {proof.map((item) => (
            <article key={item.key} className="border border-line bg-panel p-6">
              <p className="text-xs tracking-[0.18em] text-accent uppercase">{item.kind}</p>
              <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.en.text}</p>
              {item.url ? (
                <a className="mt-4 inline-block text-sm text-accent" href={item.url}>
                  {item.urlLabel}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 border-b border-line py-12 lg:grid-cols-2" aria-labelledby="record">
        <div>
          <h2 id="record" className="font-serif text-3xl tracking-tight">
            Record
          </h2>
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
          <p className="mt-6 text-sm leading-6 text-muted">{offer.employmentLine}</p>
          <p className="mt-3 text-sm">
            <Link className="text-accent" href="/resume/en">
              Printable resume (EN)
            </Link>
            <span className="text-muted"> · </span>
            <Link className="text-accent" href="/resume/es">
              Hoja de vida (ES)
            </Link>
          </p>
        </div>
        <div>
          <h2 className="font-serif text-3xl tracking-tight">How I work</h2>
          <ul className="mt-6 space-y-5">
            {en.howIWork.map((item) => (
              <li key={item} className="text-sm leading-6 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line py-12" aria-labelledby="systems">
        <h2 id="systems" className="font-serif text-3xl tracking-tight">
          Selected systems
        </h2>
        <p className="mt-4 max-w-3xl font-serif text-xl leading-snug text-ink italic">{en.statement}</p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{offer.proofLine}</p>
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

      <section className="border-b border-line py-12" aria-labelledby="stack">
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
      </section>

      <section className="border-b border-line py-12" aria-labelledby="offer">
        <p className="text-xs tracking-[0.18em] text-accent uppercase">{offer.eyebrow}</p>
        <h2 id="offer" className="mt-3 font-serif text-3xl tracking-tight">
          Work with me
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          I also take fixed-scope backend projects. There are two ways to start.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="border border-line bg-panel p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-serif text-2xl">{offer.entry.title}</h3>
              <p className="font-serif text-2xl text-accent">{entryPrice}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{offer.entry.timeframe}</p>
            <p className="mt-4 text-sm leading-6 text-ink">{offer.entry.summary}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              {offer.entry.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="border border-line bg-panel p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-serif text-2xl">{offer.title}</h3>
              <p className="font-serif text-2xl text-accent">
                {offer.pricePrefix} {price}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {offer.timeframe}
              <span aria-hidden="true"> · </span>
              {offer.payment}
            </p>
            <p className="mt-4 text-sm leading-6 text-ink">{offer.failure}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              {offer.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-accent">Not included</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              {offer.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <a className="border border-accent bg-accent px-4 py-2 text-ink-dark" href={offerMail}>
            {offer.cta}
          </a>
          <a className="text-ink underline-offset-4 hover:underline" href={call}>
            {identity.phone}
          </a>
          <a className="text-ink underline-offset-4 hover:underline" href={whatsapp}>
            WhatsApp
          </a>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{offer.startCondition}</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{offer.priceScope}</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{spanishOfferLine()}</p>
      </section>

      <footer className="py-12 text-sm text-muted">
        <a className="text-ink" href={contactMailto}>
          {identity.email}
        </a>
        <span> · </span>
        <a className="text-ink" href={call}>
          {identity.phone}
        </a>
        <span> · </span>
        <a className="text-ink" href={whatsapp}>
          WhatsApp
        </a>
        <span> · </span>
        <a className="text-ink" href={identity.github}>
          github.com/{identity.githubHandle}
        </a>
        <span> · </span>
        <a className="text-ink" href={identity.linkedin}>
          LinkedIn
        </a>
      </footer>
    </main>
  );
}
