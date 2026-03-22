# GoRehab Website

Astro 5 + Tailwind CSS v4 static site for GoRehab hand rehabilitation.

## Commands

```
pnpm dev           # Dev server → localhost:4321
pnpm build         # Build to dist/
pnpm preview       # Preview built site
pnpm lint          # Run ESLint
pnpm lint:fix      # Auto-fix ESLint issues
pnpm format        # Check Prettier formatting
pnpm format:fix    # Auto-fix Prettier formatting
```

## Tech Stack

- **Astro 5** — static site generator, zero JS by default
- **Tailwind CSS 4** — via `@tailwindcss/vite` plugin (no separate tailwind.config)
- **TypeScript** — strict mode, Props interfaces on all components
- **Self-hosted Beatrice font** — weights 400 (Regular) and 700 (Bold), WOFF2 format
- **Google Fonts Inter** — body text, weights 300–700
- **@emailjs/browser** — only runtime JS dependency (contact + newsletter forms)
- **@astrojs/sitemap** — auto-generates sitemap on build
- **pnpm** — package manager
- **ESLint** — with `eslint-plugin-astro` + `@typescript-eslint` + `eslint-config-prettier`
- **Prettier** — `semi: false`, `singleQuote: true`, `printWidth: 140`, with `prettier-plugin-astro`, `prettier-plugin-organize-imports`, `prettier-plugin-tailwindcss`

## Project Structure

```
src/
├── pages/              # File-based routing
│   ├── index.astro     # Root redirect → /en/
│   └── [lang]/
│       └── index.astro # Home page (getStaticPaths → en, de)
├── components/         # 8 reusable .astro components
│   ├── Header.astro    # Nav + language switcher (pure HTML links)
│   ├── Footer.astro    # Footer + newsletter form
│   ├── Hero.astro      # Hero section with floating cards
│   ├── Brand.astro     # CSS marquee for partner logos
│   ├── HandTherapy.astro
│   ├── ComingSoon.astro # Newsletter waiting list form
│   ├── About.astro     # Team scroll-snap carousel
│   ├── Contact.astro   # Contact form
│   └── Toast.astro     # Vanilla JS toast notifications
├── layouts/
│   └── BaseLayout.astro # Master layout: <head>, fonts, SEO, Header/Footer
├── styles/
│   └── global.css      # @font-face, Tailwind @theme tokens, marquee animation
├── lib/
│   └── i18n.ts         # getDictionary(lang) utility
└── i18n/
    ├── en.json         # English translations
    └── de.json         # German translations
public/
├── fonts/              # Beatrice WOFF2 files
├── images/             # All static images
│   ├── brand/          # Partner/clinic logos
│   ├── icons/          # UI icons
│   ├── logo/           # GoRehab logo
│   └── *.png/svg       # Section images and decorations
└── favicon.ico
```

## Design Tokens

Defined in `src/styles/global.css` via Tailwind v4 `@theme` block:

| Token              | Value                        | Usage              |
| ------------------ | ---------------------------- | ------------------ |
| `--font-sans`      | `"Inter", sans-serif`        | Body text          |
| `--font-beatrice`  | `"Beatrice", serif`          | Headings           |
| `--color-primary`  | `#ed3350`                    | Brand red          |
| `--color-headText` | `#333331`                    | Dark heading text  |
| `--shadow-3xl`     | `2px 2px 20px 0px #0000000a` | Subtle card shadow |
| `--shadow-4xl`     | `0px 0px 20px 0px #eb4c6080` | Glow shadow        |

Additional theme tokens:

- `--color-green` (`#4a7c62`) — Green accent (buttons, team names, active language)
- `--color-green-hover` (`#5a856f`) — Green hover state
- `--color-green-light` (`#7ab896`) — Light green accent (footer headings)
- `--color-green-bg` (`#EFFAF4`) — Light green section background
- `--color-body` (`#757575`) — Body/paragraph text
- `--color-muted` (`#595959`) — Muted text and borders
- `--color-footer-bg` (`#283646`) — Footer dark background
- `--color-footer-text` (`#CFD3D7`) — Footer text color
- `--color-surface` (`#FAFAFA`) — Surface/card background

## Important Conventions

- **No tailwind.config file**: All theme customization lives in `@theme` block in `global.css`
- **Container**: `container mx-auto` with `max-w-[1230px] mx-auto` inner wrapper
- **Font**: Use `font-beatrice` for headings, default `font-sans` (Inter) for body
- **Images**: Use `loading="lazy"` for below-fold images. All images must have descriptive `alt` text
- **Base path**: All asset URLs must use `import.meta.env.BASE_URL` prefix (e.g., `` `${base}images/logo.png` ``)
- **No Swiper/React**: Carousels use CSS-only solutions (marquee animation for brands, scroll-snap for team)
- **Forms**: Use inline `<script>` tags with EmailJS. Pass i18n strings via `data-*` attributes on the form element
- **Toast**: Use `window.showToast(message, 'success'|'error')` from any inline script
- **i18n**: Static build-time only. Language switcher is pure `<a>` links. No client-side JS for routing

## i18n

- Two locales: `en` and `de` via Astro's built-in i18n routing
- `prefixDefaultLocale: true` — both `/en/` and `/de/` are explicit
- Root `/` redirects to `/en/`
- Dictionary keys: `hero`, `brand`, `hand_therapy`, `coming_soon`, `about`, `contact`, `footer`
- To add a translation key, update both `src/i18n/en.json` and `src/i18n/de.json`

## EmailJS Integration

Three forms use EmailJS:

1. **Contact form** (`Contact.astro`) — uses `sendForm()` with `PUBLIC_EMAILJS_TEMPLATE_ID`
2. **Coming Soon newsletter** (`ComingSoon.astro`) — uses `send()` with `PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID`
3. **Footer newsletter** (`Footer.astro`) — uses `send()` with `PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID`

Environment variables (prefixed `PUBLIC_` for Astro client-side access):

- `PUBLIC_EMAILJS_PUBLIC_KEY`
- `PUBLIC_EMAILJS_SERVICE_ID`
- `PUBLIC_EMAILJS_TEMPLATE_ID`
- `PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID`

## Deployment

- GitHub Actions workflow in `.github/workflows/deploy.yaml`
- Deploys to GitHub Pages on push to `main`
- Base path: `/gorehab-website/` (set in `astro.config.mjs`)
- Add EmailJS variables in GitHub repo Settings → Variables → Actions

## Working Guidelines

- **Keep it static** — no client-side JS except for form submissions and toast
- **Security matters** — validate emails client-side, use EmailJS rate limiting
- **Content is inline** — translations in JSON dictionaries, not CMS
- **Alt text required** — use descriptive `alt` on meaningful images, `alt=""` with `role="presentation"` on decorative images
- **Base path awareness** — all internal links and asset paths must account for `/gorehab-website/` base
