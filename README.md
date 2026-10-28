# Zain Studio — Premium Digital Creative Agency Website

## Project Overview
- **Name**: Zain Studio
- **Goal**: Transform the existing zainstudio.vercel.app portfolio into a premium, cinematic, scroll-driven creative agency website — while preserving the exact orange Z brand mark, all real client projects, team, contact details and the EmailJS lead form.
- **Services**: Web Development · App Development · UI/UX Design · Graphic Design · Video Production · Digital Marketing

## URLs
- **Current live site (old)**: https://zainstudio.vercel.app
- **Sandbox preview**: see GetServiceUrl output (port 3000)
- **API health**: `/api/health`

## Analysis of the original site (what was found)
| Area | Original | Redesign |
|---|---|---|
| Stack | React 19 + Vite SPA, framer-motion, lucide-react, @emailjs/browser, plain CSS (Inter, #e86132) | Same stack family kept — React 19 + Vite + Framer Motion 13 + Lenis + lucide + EmailJS; deployed via Hono worker on Cloudflare Pages |
| Logo | Text "Zain **Studio**" + small orange dot; favicon `orange_circle_favicon_16x16.png` | **The supplied orange Z mark used exactly as provided** (background removed, glow preserved via alpha) in navbar, footer, hero, preloader, CTA backdrop, favicon set, OG image |
| Portfolio images | Generic Unsplash stock photos | **Real screenshots** of the live client sites (Okair, Royal Fumigation, HealthGru, The Gross Margin, Hundo Play Store) |
| Layout | Light-only, glass cards, uniform sections | Dark / light rhythm, editorial typography (Syne + Inter + JetBrains Mono), 8px grid, orange used only as accent |
| Motion | Basic whileInView fades | Preloader, line-mask text reveals, scroll-scrubbed statement, parallax, magnetic buttons, custom cursor, marquees, process progress line, mobile overlay menu |

## Completed features
- **Preloader** – black → orange Z scales in → curtain lifts (≈1.3s, skipped for reduced-motion)
- **Navbar** – fixed, compacts + blurs on scroll, active-section dot indicator, "Let's Talk" CTA, animated full-screen mobile menu (clip-path reveal, staggered links, Esc to close, scroll lock)
- **Hero** – line-by-line headline reveal, outlined word, pointer-reactive Z mark with tilt/parallax + ambient glow, magnetic CTAs, `01 / Scroll` indicator
- **About / Intro** – scroll-scrubbed word-by-word statement with orange highlights, animated counters
- **Marquees ×2** – GPU-friendly infinite marquee (filled dark / outlined light, reverse direction)
- **Services** – 6 editorial rows; desktop hover reveals floating preview image + expands details; mobile tap-to-expand accordion with image
- **Work** – 6 real projects in a varied 12-col grid (large / offset / small), parallax image, shine sweep, "VIEW" cursor label, live links, tech tags, links to video reel + graphic design Drive folders
- **Why Zain Studio** – sticky headline + numbered advantage list with drawn dividers
- **Process** – 5 steps with a scroll-driven progress line (vertical on mobile, horizontal on desktop) that lights each dot
- **Team + Testimonials + FAQ** – 5 leads, animated testimonial switcher, accordion FAQ
- **CTA / Contact** – "Have an idea? Let's build it." with drifting Z backdrop, expandable EmailJS form (same service/template IDs as original, now includes Digital Marketing option)
- **Footer** – Z mark, services, navigation, LinkedIn / WhatsApp / phone, giant outlined wordmark, back-to-top
- **Cursor** – tiny orange dot that grows into a labelled disc; desktop + fine pointer only
- **Smooth scrolling** – Lenis (disabled under `prefers-reduced-motion`)
- **SEO** – title, description, canonical, OG/Twitter (1200×630 image), JSON-LD `ProfessionalService`, manifest, robots, sitemap, semantic landmarks, alt text
- **Accessibility** – focus-visible rings, aria-expanded/controls on menus & accordions, `MotionConfig reducedMotion="user"`, keyboard support on service rows

## Functional entry points
| Path | Purpose |
|---|---|
| `/` | Single-page site; anchors `#home #about #services #work #why #process #team #contact` |
| `/api/health` | Worker health JSON |
| `/brand/*` | Logo assets (`zain-logo.png`, `zain-logo-tight.png`, `zain-mark-160.png`, `icon-*.png`, `og-image.jpg`) |
| `/work/*.jpg` | Portfolio images |
| `/robots.txt`, `/sitemap.xml`, `/site.webmanifest` | SEO / PWA meta |

## Project structure
```
src/
  main.tsx, App.tsx              # entry + section composition
  components/  ui.tsx            # Logo, Button, Magnetic, Reveal, SplitLines, SectionHeading, Counter, Marquee
               Navbar.tsx Preloader.tsx Cursor.tsx Footer.tsx
  sections/    Hero Intro Services Work Why Process Team Contact
  hooks/       useLenisScroll.ts useMedia.ts
  data/        site.ts           # all copy, projects, team, FAQ, contact, EmailJS ids
  styles/      global.css (design tokens) components.css
  worker/      index.ts          # Hono edge worker (assets + /api)
public/  brand/  work/  favicon.ico  _routes.json ...
```

## Data architecture
- **Storage**: none required — static content in `src/data/site.ts`; lead form posts to EmailJS (client-side, same as before).
- **Edge**: Hono worker (`dist/_worker.js`) serves `/api/*`; Pages serves static assets.

## Development
```bash
npm install
npm run dev            # Vite dev server (5173)
npm run build          # client + worker → dist/
pm2 start ecosystem.config.cjs   # wrangler pages dev dist on :3000
npm run typecheck
```

## Deployment
- **Platform**: Cloudflare Pages (`wrangler pages deploy dist`) — or any static host (Vercel) using `dist/` from `npm run build:client`.
- **Status**: ✅ builds clean, 0 console errors, 0 horizontal overflow at 390 / 1440
- **Tech stack**: React 19 · Vite 8 · Framer Motion 13 · Lenis · Hono · TypeScript
- **Last updated**: 2026-09-14

## Not yet implemented / next steps
1. Optionally replace `/work/marketing.jpg` (branded placeholder) with a real campaign dashboard screenshot. Meri Gari uses the official logo; Video & Graphic cards link to the Google Drive portfolios.
2. Optional: case-study detail pages per project.
3. Optional: move EmailJS send to a Hono `/api/contact` route with a server-side secret.
4. Add real testimonial logos and team photos if available.
