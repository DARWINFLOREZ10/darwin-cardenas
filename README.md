# Darwin Cardenas

This is my portfolio. I built the page, the printable resumes, and Command, the private workspace I use when I apply.

I am a backend software engineer in Medellín.

The page, both resumes, and Command read [`data/cv-master.json`](data/cv-master.json). The live site is [darwin-cardenas.vercel.app](https://darwin-cardenas.vercel.app).

## Routes

- `/` — the portfolio. GitHub links only. I do not link an empty live demo.
- `/resume/en` and `/resume/es` — the resumes I print from the browser dialog.
- `/command` — my private page for the Wellfound and LinkedIn text. The password is `CAREER_KIT_PASSWORD` in the environment. It is not in this repository.

## Run

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open `http://127.0.0.1:43127`.

## Public systems

- [Alertfold](https://github.com/DARWINFLOREZ10/Alertfold)
- [ReleasePilot](https://github.com/DARWINFLOREZ10/releasepilot)
- [Handoff](https://github.com/DARWINFLOREZ10/Handoff)

I do not put client work or CESDE systems in these repositories.
