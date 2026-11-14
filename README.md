# Nabil Takiyuddin: portfolio

Personal portfolio site built with Next.js (App Router), TypeScript and Tailwind CSS v4.
A dark "mission control" design with a HUD navigation bar, command palette, case-study pages and full SEO / AI-answer-engine metadata.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL with no trailing slash. Used for canonical URLs, sitemap, robots, Open Graph, JSON-LD and `llms.txt`. Defaults to `https://nabil-takiyuddin.vercel.app`. |
| `RESEND_API_KEY` | No | [Resend](https://resend.com) API key for the contact form. |
| `CONTACT_TO_EMAIL` | No | Inbox that receives contact-form messages. |
| `CONTACT_FROM_EMAIL` | No | Verified Resend sender, e.g. `Portfolio <hello@yourdomain.com>`. Defaults to `Portfolio <onboarding@resend.dev>`, which only delivers to the Resend account owner's address. |

Contact form behaviour: the form posts to `/api/contact`. If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing, the route returns `503` and the browser opens a prefilled `mailto:` instead, so the form works before Resend is set up. The route validates input, has a honeypot field and a small per-IP rate limit.

## Editing content

All text lives in typed files under `content/`. Components never need to change.

| File | Contents |
| --- | --- |
| `content/profile.ts` | Name, pitch, about text, languages, impact tiles, education, certifications |
| `content/experience.ts` | Work history |
| `content/skills.ts` | Skill groups |
| `content/projects.ts` | Case studies and the smaller project cards |

### Add a case study

Append an object to `caseStudies` in `content/projects.ts`:

```ts
{
  slug: "my-new-project",            // URL: /projects/my-new-project
  code: "CS-06",
  title: "Full project title",
  shortTitle: "Short title",
  schemaType: "CreativeWork",        // or "ScholarlyArticle"
  course: { code: "ABC123", name: "Course name" },
  format: "Individual",
  formatLabel: "Individual project",
  metaTitle: "50 to 60 characters | Nabil Takiyuddin",
  metaDescription: "150 to 160 characters.",
  summary: "One or two sentences.",
  highlight: { value: "95%", label: "what the number means" },
  problem: ["Paragraph one.", "Paragraph two."],
  approach: [{ title: "Step", text: "What was done." }],
  results: { metrics: [{ value: "95%", label: "Accuracy" }], notes: ["Plain-sentence result."] },
  tools: ["Python"],
  role: "What your role was.",
  team: ["Teammate", "Nabil Takiyuddin"],   // optional
  tags: ["ML"],
  keywords: ["keyword"],
}
```

That one entry creates the page, its Open Graph image and JSON-LD, and adds it to the home page, footer, sitemap, `llms.txt` and command palette.

### Add a small project card

Append an object to `moreProjects` in the same file. `tags` drives the filter buttons.

## Project structure

```
app/
  layout.tsx, page.tsx, globals.css   Shell, home page, design tokens
  projects/[slug]/                    Case-study page + OG/Twitter images
  api/contact/route.ts                Contact form handler (Resend)
  llms.txt/route.ts                   /llms.txt, generated from content
  sitemap.ts, robots.ts, manifest.ts  SEO files
  opengraph-image.tsx, icon.svg       Social image and icons
components/
  nav/        HudNav (top bar, side rail, mobile menu), CommandPalette
  fx/         NetworkField (canvas), Decode, Counter, RevealObserver
  sections/   Home page sections
content/      All site content
lib/          Site URL, JSON-LD builders, OG renderer, nav config
scripts/      screenshots.cjs, make-icons.cjs (need Playwright)
```

## Navigation and shortcuts

- `Cmd/Ctrl + K` or `/` opens the command palette: jump to any section or case study, copy the email address, open LinkedIn.
- Arrow keys move, `Enter` selects, `Esc` closes.
- The top bar shows the active section and scroll progress. Wide screens also get a side index.
- On small screens the menu button opens a full-screen menu.

## Deploy to Vercel (personal account)

Use your **personal** GitHub (`nabiledler92`) and **personal** Vercel account, not a work account.

1. Create an empty repository on GitHub under `nabiledler92`, for example `portfolio`.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/nabiledler92/portfolio.git
   git push -u origin main
   ```
3. Sign in to [vercel.com](https://vercel.com) with the personal account and check the account switcher (top left) shows your personal scope.
4. Add New → Project → import `nabiledler92/portfolio`. Vercel detects Next.js; keep the defaults.
5. Add the environment variables from the table above (Production and Preview). Set `NEXT_PUBLIC_SITE_URL` to the final address.
6. Deploy. To get `nabil-takiyuddin.vercel.app`, set the project name to `nabil-takiyuddin`, or add that domain under Project → Settings → Domains.
7. After changing `NEXT_PUBLIC_SITE_URL` or adding a custom domain, redeploy so the sitemap, canonical URLs and `llms.txt` pick it up.

After launch: add the site to Google Search Console and Bing Webmaster Tools and submit `/sitemap.xml`.

## Privacy rules for this site

- Do not add a phone number, student ID or the resume PDF to the repository or `public/`.
- Public contact details are the email address, LinkedIn and the contact form only.

## Fonts

Space Grotesk and JetBrains Mono are self-hosted from `app/fonts/` (SIL Open Font License; licence files included), loaded with `next/font/local`.
