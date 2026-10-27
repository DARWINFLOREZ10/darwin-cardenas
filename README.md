# Darwin Cardenas

Portfolio, printable resumes, and a private apply workspace for Darwin Cardenas Florez. Backend-heavy software engineer, Medellín. Mid-level. The public title is not Senior.

The page, both resumes, and Command read [`data/cv-master.json`](data/cv-master.json). `identity.portfolioUrl` stays empty until the Vercel URL exists.

## Routes

- `/` — portfolio. GitHub links only. No empty live demo.
- `/resume/en` and `/resume/es` — ATS resumes. Use the browser print dialog for the PDF.
- `/command` — my private workspace for Wellfound (where I apply) and LinkedIn (discovery). Password: `CAREER_KIT_PASSWORD`, default `darwin-kit` from [`.env.local.example`](.env.local.example).

## Run

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open `http://127.0.0.1:43127`.

## Public systems

- [RelayOps](https://github.com/DARWINFLOREZ10/relayops)
- [ReleasePilot](https://github.com/DARWINFLOREZ10/releasepilot)
- [FlowForge](https://github.com/DARWINFLOREZ10/flowforge-platform)

Client work and CESDE systems are not in these repositories.
