import type { PortfolioConfig } from "./src/lib/config";

/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  Portfolio Speedrun Agent — Your Portfolio Configuration            ║
 * ║                                                                    ║
 * ║  Edit this file to customize your portfolio site.                  ║
 * ║  Or just tell Claude Code / Codex what you want — it knows how.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

const config: PortfolioConfig = {
  // ── Personal Info ───────────────────────────────────────────────────
  personal: {
    name: "Alex Rivera",
    role: "Cinematographer",
    tagline: "Cinematographer — Commercials & Brand Films",
    location: "Los Angeles, CA",
    bio: "I craft visual stories that move people. With a background in documentary filmmaking and commercial production, I bring a cinematic eye to every project — whether it's a 30-second spot or a full-length brand film.\n\nI'm selective about what I take on. I'd rather work on fewer projects that challenge me and demand a certain level of craft.",
    profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop",
    aboutHeading: "Crafting visual narratives with intention.",
  },

  // ── Contact ─────────────────────────────────────────────────────────
  contact: {
    email: "hello@example.com",
    bookingUrl: "https://cal.com/example",
  },

  // ── Social Links (only include ones you use) ────────────────────────
  socials: {
    instagram: "https://instagram.com/example",
    youtube: "https://youtube.com/@example",
    linkedin: "https://linkedin.com/in/example",
  },

  // ── Theme ───────────────────────────────────────────────────────────
  theme: {
    palette: "cinema",
    fonts: "classic",
  },

  // ── Sections (toggle on/off) ────────────────────────────────────────
  sections: {
    hero: true,
    about: true,
    services: true,
    portfolio: true,
    testimonials: true,
    contact: true,
  },

  // ── Services ────────────────────────────────────────────────────────
  services: [
    {
      title: "Commercials & Product Films",
      description:
        "High-craft product advertisements and commercial spots that make the product the hero of every frame.",
      icon: "Sparkles",
    },
    {
      title: "Brand Films",
      description:
        "Story-driven brand films that sell feeling before fact. Cinematic language that stays with the viewer.",
      icon: "Film",
    },
    {
      title: "Event Coverage",
      description:
        "Corporate launches, conferences, and experiential events captured with energy and attention to detail.",
      icon: "PlayCircle",
    },
    {
      title: "Documentary & Long-form",
      description:
        "Patient shooting, honest framing, and post-driven storytelling that respects the subject and the audience.",
      icon: "Camera",
    },
  ],

  // ── Portfolio ───────────────────────────────────────────────────────
  portfolioFilters: ["Featured", "Commercials", "Brand Films", "Events", "All"],

  platforms: ["youtube", "vimeo", "instagram", "drive"],

  // ── Hero ─────────────────────────────────────────────────────────────
  hero: {
    backgroundMedia: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop",
    ],
    intervalMs: 6000,
  },

  // ── SEO ──────────────────────────────────────────────────────────────
  seo: {
    siteUrl: "https://example.com",
    locale: "en-US",
    serviceTypes: [
      "Cinematography",
      "Video production",
      "Commercial filmmaking",
    ],
    expertise: [
      "Cinematography",
      "Brand Films",
      "Commercials",
      "Documentary filmmaking",
      "Visual storytelling",
    ],
  },

  // ── Analytics ────────────────────────────────────────────────────────
  analytics: {
    googleAnalyticsId: "",
  },

  // ── Storage ──────────────────────────────────────────────────────────
  storage: "local",
};

export default config;
