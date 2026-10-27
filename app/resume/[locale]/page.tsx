import { PrintButton } from "@/components/print-button";
import { cv, isLocale, type Locale } from "@/lib/cv";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "en" ? "Resume" : "Hoja de vida",
    robots: { index: true, follow: true },
  };
}

const labels: Record<
  Locale,
  { print: string; other: string; otherHref: string; summary: string; experience: string; systems: string; skills: string }
> = {
  en: {
    print: "Print / Save PDF",
    other: "Versión en español",
    otherHref: "/resume/es",
    summary: "Summary",
    experience: "Experience",
    systems: "Selected systems",
    skills: "Skills",
  },
  es: {
    print: "Imprimir / Guardar PDF",
    other: "English version",
    otherHref: "/resume/en",
    summary: "Perfil",
    experience: "Experiencia",
    systems: "Sistemas seleccionados",
    skills: "Habilidades",
  },
};

export default async function ResumePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = labels[locale];
  const { identity, experience, projects, skills } = cv;
  const localized = cv[locale];
  const end = (job: (typeof experience)[number]) => (locale === "es" ? job.endEs : job.end);
  const site = identity.portfolioUrl.replace(/^https?:\/\//, "");

  return (
    <article className="resume-sheet">
      <div className="resume-page">
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link href="/">Portfolio</Link>
          <div className="flex gap-3">
            <Link href={copy.otherHref}>{copy.other}</Link>
            <PrintButton label={copy.print} />
          </div>
        </div>

        <header className="border-b border-black/20 pb-3">
          <h1 className="font-serif text-[1.6rem] leading-tight tracking-tight">{identity.name}</h1>
          <p className="mt-1 text-base">{identity.title}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[0.8rem] leading-5">
            <span>{identity.location}</span>
            <span aria-hidden="true">·</span>
            <a className="whitespace-nowrap" href={`mailto:${identity.email}`}>
              {identity.email}
            </a>
            <span aria-hidden="true">·</span>
            <a className="whitespace-nowrap" href={identity.github}>
              github.com/{identity.githubHandle}
            </a>
            <span aria-hidden="true">·</span>
            <a className="whitespace-nowrap" href={identity.linkedin}>
              LinkedIn
            </a>
            {site ? (
              <>
                <span aria-hidden="true">·</span>
                <a className="whitespace-nowrap" href={identity.portfolioUrl}>
                  {site}
                </a>
              </>
            ) : null}
          </p>
        </header>

        <section className="mt-4">
          <h2 className="border-b border-black/15 pb-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
            {copy.summary}
          </h2>
          <p className="mt-2 text-[0.84rem] leading-5">{localized.summary}</p>
        </section>

        <section className="mt-4">
          <h2 className="border-b border-black/15 pb-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
            {copy.experience}
          </h2>
          {experience.map((job) => (
            <div key={job.org} className="resume-block mt-3">
              <div className="flex items-baseline justify-between gap-4 text-[0.84rem]">
                <p className="font-medium">
                  {locale === "es" ? job.roleEs : job.role}
                  {" · "}
                  {locale === "es" ? job.orgEs : job.org}
                </p>
                <p className="shrink-0">
                  {job.start} — {end(job)}
                </p>
              </div>
              <p className="text-[0.78rem]">{job.location}</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[0.84rem] leading-5">
                {(locale === "es" ? job.bulletsEs : job.bullets).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-4">
          <h2 className="border-b border-black/15 pb-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
            {copy.systems}
          </h2>
          {projects.map((project) => {
            const text = project[locale];
            return (
              <div key={project.name} className="resume-block mt-3">
                <p className="text-[0.84rem] font-medium">
                  <a href={project.repo}>{project.name}</a>
                  <span className="font-normal"> · {project.stack}</span>
                </p>
                <p className="mt-0.5 text-[0.84rem] leading-5">{text.problem}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-4">
          <h2 className="border-b border-black/15 pb-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
            {copy.skills}
          </h2>
          <p className="mt-2 text-[0.84rem] leading-5">{skills.join(" · ")}</p>
        </section>
      </div>
    </article>
  );
}
