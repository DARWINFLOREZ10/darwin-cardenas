import { CopyBlock } from "@/components/copy-block";
import { LoginForm } from "@/components/login-form";
import { LogoutButton } from "@/components/logout-button";
import { cv } from "@/lib/cv";
import { isAuthed } from "@/lib/session";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Command",
  robots: { index: false, follow: false },
};

export default async function CommandPage() {
  const authed = await isAuthed();
  const { identity, en, projects } = cv;
  const command = en.command;
  const portfolioLine = identity.portfolioUrl
    ? identity.portfolioUrl
    : "Not published yet. When I have the Vercel URL, I put it in identity.portfolioUrl and paste it here.";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-xs tracking-[0.22em] text-accent uppercase">My private workspace</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-4xl tracking-tight">My Command Center</h1>
        {authed ? <LogoutButton /> : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        This is where I prepare an application before I send it. {identity.primaryChannel} is the channel I use.{" "}
        {identity.discoveryChannel} is how people find me.
      </p>
      <p className="mt-3 text-sm">
        <Link className="text-accent" href="/">
          Back to the portfolio
        </Link>
      </p>

      {authed ? (
        <div className="mt-10 space-y-10">
          <section>
            <h2 className="font-serif text-2xl">Before I apply</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted">
              {command.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl">Wellfound</h2>
            <p className="text-sm text-muted">I paste these fields when I apply. Portfolio URL: {portfolioLine}</p>
            <CopyBlock label="Headline" text={command.wellfoundHeadline} />
            <CopyBlock label="About" text={command.wellfoundAbout} />
            <CopyBlock
              label="Projects"
              text={projects.map((project) => `${project.name} — ${project.repo}\n${project.talk}`).join("\n\n")}
            />
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl">LinkedIn, for discovery</h2>
            <CopyBlock label="Headline" text={command.linkedinHeadline} />
            <CopyBlock label="About" text={command.linkedinAbout} />
            <div className="border border-line p-4">
              <h3 className="text-sm text-accent">What I do not put on LinkedIn</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {command.doNotSay.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl">How I talk about the systems</h2>
            {projects.map((project) => (
              <CopyBlock key={project.name} label={project.name} text={project.talk} />
            ))}
          </section>

          <section>
            <h2 className="font-serif text-2xl">Resumes</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              I print from the page. The browser PDF is the file I attach.
            </p>
            <p className="mt-3 flex gap-4 text-sm">
              <Link className="text-accent" href="/resume/en">
                /resume/en
              </Link>
              <Link className="text-accent" href="/resume/es">
                /resume/es
              </Link>
            </p>
          </section>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="font-serif text-2xl">Open my workspace</h2>
          <p className="mt-3 mb-6 max-w-md text-sm leading-6 text-muted">
            The password lives in my environment as CAREER_KIT_PASSWORD. Locally it matches the example file.
          </p>
          <LoginForm />
        </div>
      )}
    </main>
  );
}
