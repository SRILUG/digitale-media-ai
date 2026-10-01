# DIGITALE MEDIA

Creative × Growth × Technology × Experiences.

A founder-led agency website and project-intake system built with Next.js, TypeScript and Supabase.

## Routes

- `/` — homepage
- `/work` — selected work
- `/services` — capabilities
- `/experiences` — live experiences
- `/about` — founders and philosophy
- `/insights` — editorial thinking
- `/start` — project diagnostic
- `/api/project-intake` — validated lead intake
- `/api/health` — health check

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run verify
npm run build
```

`verify` runs TypeScript checking and media validation before production builds.

## Project intake

The intake flow validates submissions server-side, stores accepted briefs in Supabase and can dispatch a Slack notification when the webhook is configured.

Required server environment variables are documented in `.env.example`.

## Production checklist

- Configure production Supabase credentials.
- Configure the Slack webhook if lead alerts are required.
- Set the canonical domain in metadata, robots and sitemap if the production domain changes.
- Replace founder placeholders with approved photography when available.
- Run `npm run verify && npm run build` before deployment.
