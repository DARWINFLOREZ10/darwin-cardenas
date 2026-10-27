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

const labels: Record<Locale, { print: string; other: string; otherHref: string; summary: string; experience: string; systems: string; skills: string; focus: string }> = {
  en: {
    print: "Print / Save PDF",
    other: "Versión en español",
    otherHref: "/resume/es",
    summary: "Summary",
    experience: "Experience",
    systems: "Selected systems",
    skills: "Skills",
    focus: "Focus",
  },
  es: {
    print: "Imprimir / Guardar PDF",
    other: "English version",
    otherHref: "/resume/en",
    summary: "Perfil",
    experience: "Experiencia",
    systems: "Sistemas seleccionados",
    skills: "Habilidades",
    focus: "Enfoque",
  },
};

export default async function ResumePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = labels[locale];
  const { identity, experience, projects, skills } = cv;
  const localized = cv[locale];
  const end = (job: (typeof experience)[number]) => (locale === "es" ? job.endEs : job.end);

  return (
    <article className="resume-sheet">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link href="/">Portfolio</Link>
          <div className="flex gap-3">
            <Link href={copy.otherHref}>{copy.other}</Link>
            <PrintButton label={copy.print} />
          </div>
        </div>

        <header className="border-b border-black/15 pb-5">
          <h1 className="font-serif text-4xl tracking-tight">{identity.name}</h1>
          <p className="mt-1 text-lg">{identity.title}</p>
          <p className="mt-3 text-sm leading-6">
            {identity.location} · {identity.workMode} · {identity.level}
            <br />
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            {" · "}
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
            {" · "}
            <a href={identity.linkedin}>LinkedIn</a>
            {identity.portfolioUrl ? (
              <>
                {" · "}
                <a href={identity.portfolioUrl}>{identity.portfolioUrl.replace(/^https?:\/\//, "")}</a>
              </>
            ) : null}
          </p>
        </header>

        <section className="mt-6">
          <h2 className="text-xs tracking-[0.16em] uppercase">{copy.summary}</h2>
          <p className="mt-2 text-sm leading-6">{localized.summary}</p>
        </section>

        <section className="mt-6">
          <h2 className="text-xs tracking-[0.16em] uppercase">{copy.focus}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
            {localized.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xs tracking-[0.16em] uppercase">{copy.experience}</h2>
          {experience.map((job) => (
            <div key={job.org} className="mt-3">
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <p className="font-medium">
                  {locale === "es" ? job.roleEs : job.role}
                  {" · "}
                  {locale === "es" ? job.orgEs : job.org}
                </p>
                <p>
                  {job.start} — {end(job)}
                </p>
              </div>
              <p className="text-sm">{job.location}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                {(locale === "es" ? job.bulletsEs : job.bullets).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="text-xs tracking-[0.16em] uppercase">{copy.systems}</h2>
          {projects.map((project) => {
            const text = project[locale];
            return (
              <div key={project.name} className="mt-3">
                <p className="text-sm font-medium">
                  <a href={project.repo}>{project.name}</a>
                  <span className="font-normal"> · {project.stack}</span>
                </p>
                <p className="mt-1 text-sm leading-6">{text.problem}</p>
                <p className="mt-1 text-sm leading-6">{text.design}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-6">
          <h2 className="text-xs tracking-[0.16em] uppercase">{copy.skills}</h2>
          <p className="mt-2 text-sm leading-6">{skills.join(" · ")}</p>
        </section>
      </div>
    </article>
  );
}
