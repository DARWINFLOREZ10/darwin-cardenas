# Darwin Cardenas

This is my portfolio. I built the page, the printable resumes, and Command, the private workspace I use when I apply.

I am a backend-heavy software engineer in Medellín. I am mid-level. I do not put Senior on the title.

The page, both resumes, and Command read [`data/cv-master.json`](data/cv-master.json). The live site is [darwin-cardenas.vercel.app](https://darwin-cardenas.vercel.app).

## Routes

- `/` — the portfolio. GitHub links only. I do not link an empty live demo.
- `/resume/en` and `/resume/es` — the resumes I print from the browser dialog.
- `/command` — where I prepare a Wellfound application (that is where I apply) and the LinkedIn text (discovery). Password: `CAREER_KIT_PASSWORD`, default `darwin-kit` from [`.env.local.example`](.env.local.example).

## Run

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open `http://127.0.0.1:43127`.

## Public systems

- [Alertfold](https://github.com/DARWINFLOREZ10/relayops)
- [ReleasePilot](https://github.com/DARWINFLOREZ10/releasepilot)
- [Handoff](https://github.com/DARWINFLOREZ10/flowforge-platform)

I do not put client work or CESDE systems in these repositories.
