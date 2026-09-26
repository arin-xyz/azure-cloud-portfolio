# Azure Cloud / Cloud Operations Portfolio

A production-oriented personal portfolio built with React, Vite, TypeScript, Tailwind CSS, Framer Motion and Lucide React.

## What is included

- Responsive dark-first portfolio UI
- Light/dark theme toggle with localStorage
- Sticky desktop navigation and animated mobile menu
- Scroll-aware active navigation
- Hero, About, Experience, Skills, Projects, Education, Certification and Contact sections
- Academic/lab project clearly separated from professional case studies
- Accessibility-minded focus states and semantic structure
- `prefers-reduced-motion` support
- SEO metadata, Open Graph/Twitter metadata and favicon
- Centralized editable portfolio content in `src/data/portfolio.ts`
- Placeholder `/public/resume.pdf`
- Frontend-only contact form with a clear backend configuration note
- Vercel-ready Vite build

## Quick start

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Personalize the site

Edit `src/data/portfolio.ts` first. Replace:

- `[YOUR FULL NAME]`
- `[YOUR EMAIL]`
- `[ADD DATES]`
- `[ADD YEAR]`
- `[ADD CREDENTIAL LINK]`
- `YOUR_USERNAME`
- GitHub / LinkedIn URLs
- Project GitHub and documentation links

Then update the title and meta description in `index.html` if desired.

## Resume

Replace `public/resume.pdf` with your real resume. Keep the filename `resume.pdf` so the existing buttons continue to work.

## Contact form

The form currently validates locally and intentionally does not pretend to send mail. To make it live, wire the `onSubmit` handler in `src/App.tsx` to Formspree, Resend, a serverless endpoint, or another approved backend.

## Vercel deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

No environment variables are required by the starter version.

## Design notes

The visual direction uses a restrained dark cloud-operations aesthetic: grid texture, subtle cyan/sky accents, technical terminal motif, compact chips, strong typography and minimal motion. It intentionally avoids fake metrics, stock photography, excessive neon, and generic frontend-developer positioning.

## Reference

The original visual reference was used only for broad portfolio storytelling inspiration. This implementation does not reuse its source code, personal content, branding or assets.
