# GoRehab Website

Marketing website for [GoRehab](https://gorehab.ch) — interactive hand rehabilitation with the DextEgg System. Built with Astro 5 and Tailwind CSS v4, deployed to GitHub Pages.

## Tech Stack

- **Astro 5** — static site generator, zero JS by default
- **Tailwind CSS 4** — via `@tailwindcss/vite` plugin
- **TypeScript** — strict mode
- **Self-hosted Beatrice font** — weights 400 (Regular) and 700 (Bold)
- **Google Fonts Inter** — body text
- **@emailjs/browser** — contact and newsletter forms (only runtime JS)
- **@astrojs/sitemap** — auto-generated sitemap

## Getting Started

```sh
pnpm install
pnpm dev           # Dev server at localhost:4321
```

### Environment Variables

Create a `.env` file for EmailJS integration:

```
PUBLIC_EMAILJS_PUBLIC_KEY=your_key
PUBLIC_EMAILJS_SERVICE_ID=your_service_id
PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=your_newsletter_template_id
```

Forms will silently fail without these — the site still renders and works otherwise.

## Commands

| Command           | Action                               |
| :---------------- | :----------------------------------- |
| `pnpm install`    | Install dependencies                 |
| `pnpm dev`        | Start dev server at `localhost:4321` |
| `pnpm build`      | Build production site to `./dist/`   |
| `pnpm preview`    | Preview the production build locally |
| `pnpm lint`       | Run ESLint on `src/`                 |
| `pnpm lint:fix`   | Auto-fix ESLint issues               |
| `pnpm format`     | Check Prettier formatting            |
| `pnpm format:fix` | Auto-fix Prettier formatting         |

## Project Structure

```
src/
├── pages/           # File-based routing
│   ├── index.astro  # Redirect → /en/
│   └── [lang]/      # EN + DE language routes
├── components/      # 8 reusable .astro components
├── layouts/         # BaseLayout (master template)
├── styles/          # global.css (Tailwind + theme tokens)
├── lib/             # i18n utility
└── i18n/            # EN/DE JSON translation dictionaries
public/
├── fonts/           # Beatrice OTF files
├── images/          # Static images (logos, icons, photos)
└── favicon.ico      # Browser tab icon
```

## Internationalization

The site supports English and German via `[lang]` dynamic routes:

- `/en/` — English version
- `/de/` — German version
- `/` — Redirects to `/en/`

Translations live in `src/i18n/en.json` and `src/i18n/de.json`. The language switcher in the header is pure HTML links — no client-side JS needed.

## Deployment

Deployed automatically via GitHub Actions on push to `master`. The workflow builds the site and deploys to GitHub Pages.

**Required setup**: Add the 4 `PUBLIC_EMAILJS_*` secrets in GitHub repo Settings > Secrets > Actions.
