# Portfolio Speedrun Agent

**Build your creative portfolio in 30 minutes. No coding required.**

An AI-powered portfolio template for videographers, photographers, and designers. Edit one config file (or let Claude Code / Codex do it for you) and deploy to Vercel for free.

Part of the [Startup Speedrun](https://github.com/example) project.

---

## Quick Start

### Option A: Use AI (recommended)

1. Clone this repo
2. Open it in [Claude Code](https://claude.ai/code), [Codex](https://openai.com/codex), or [Cursor](https://cursor.com)
3. Say: **"Help me set up my portfolio"**
4. The AI will walk you through everything — just answer its questions

### Option B: Use the setup wizard

```bash
git clone https://github.com/example/portfolio-speedrun-agent.git
cd portfolio-speedrun-agent
npm install
npm run setup
npm run dev
```

### Option C: Manual setup

1. Clone and install: `git clone ... && cd portfolio-speedrun-agent && npm install`
2. Copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD` and `ADMIN_SECRET`
3. Edit `portfolio.config.ts` with your info
4. Run `npm run dev` and open http://localhost:3000

---

## What You'll Need (Content Kit)

Before you start, gather these items. See [docs/content-kit.md](docs/content-kit.md) for the full checklist.

**Must-have:**
- 5-10 portfolio pieces (video links or high-res images)
- Professional headshot
- Short bio (1-2 paragraphs)
- Email address
- 3-5 services you offer

**Nice-to-have:**
- Client testimonials
- Social media links
- Hero background image
- Tagline

---

## Features

- **Single-file configuration** — `portfolio.config.ts` drives the entire site
- **3 profession presets** — Videographer, Photographer, Designer
- **5 color palettes** — Cinema, Studio, Gallery (light), Neon, Earth
- **4 font pairings** — Classic, Modern, Editorial, Minimal
- **Built-in admin panel** — manage content without touching code
- **Local-first storage** — works with zero external dependencies
- **Optional R2 backend** — Cloudflare R2 for image uploads
- **10 social platforms** — Instagram, YouTube, LinkedIn, Behance, Dribbble, Vimeo, TikTok, X, GitHub, Website
- **SEO built-in** — Schema.org, Open Graph, sitemap, robots.txt
- **Responsive** — mobile, tablet, desktop
- **Accessible** — skip links, ARIA labels, keyboard navigation

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript 5

---

## Configuration

Everything lives in `portfolio.config.ts`:

```typescript
const config: PortfolioConfig = {
  personal: { name, role, tagline, location, bio, ... },
  contact: { email, whatsapp, bookingUrl },
  socials: { instagram, youtube, linkedin, behance, ... },
  theme: { palette: "cinema", fonts: "classic" },
  sections: { hero: true, about: true, services: true, ... },
  services: [{ title, description, icon }, ...],
  portfolioFilters: ["Featured", "Brand Films", "Events", "All"],
  storage: "local",  // or "r2"
};
```

### Palettes

| Name | Vibe | Background | Accent |
|------|------|-----------|--------|
| `cinema` | Gold on dark | #050505 | #c0a062 |
| `studio` | Blue on dark | #0a0f1a | #3b82f6 |
| `gallery` | Minimal light | #fafafa | #18181b |
| `neon` | Purple on dark | #0a0a0a | #a855f7 |
| `earth` | Warm amber | #1a1410 | #d97706 |

### Presets

| Preset | Theme | Services |
|--------|-------|----------|
| Videographer | Cinema + Classic | Commercials, Brand Films, Events, Documentary |
| Photographer | Gallery + Editorial | Portraits, Weddings, Commercial, Editorial |
| Designer | Neon + Modern | Brand Identity, UI/UX, Print, Illustration |

---

## Admin Panel

Visit `/admin` to manage content through a visual interface:

- **Settings** — name, bio, contact, socials, profile photo
- **Hero** — background images and carousel
- **Projects** — add/edit portfolio items with auto video detection
- **Testimonials** — client quotes with avatars

Set `ADMIN_PASSWORD` in `.env.local` to enable login.

---

## Deploy

### Vercel (recommended, free)

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add env vars: `ADMIN_PASSWORD`, `ADMIN_SECRET`
4. Deploy

### Other platforms

Works with Netlify, Cloudflare Pages, Railway, or any Node.js host.

---

## License

MIT

---

Built with the Portfolio Speedrun Agent by [Startup Speedrun](https://github.com/example).
