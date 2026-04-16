import type { PortfolioConfig } from "../src/lib/config";

/**
 * Videographer Preset
 *
 * Optimized for cinematographers, videographers, and video producers.
 * - Video-first portfolio grid with YouTube/Vimeo embeds
 * - Dark, cinematic theme (Cinema palette)
 * - Services geared toward commercial and brand film work
 */

const preset: Omit<PortfolioConfig, "personal" | "contact" | "seo" | "analytics"> = {
  socials: {
    youtube: "https://youtube.com/@example",
    instagram: "https://instagram.com/example",
    vimeo: "https://vimeo.com/example",
    linkedin: "https://linkedin.com/in/example",
  },

  theme: {
    palette: "cinema",
    fonts: "classic",
  },

  sections: {
    hero: true,
    about: true,
    services: true,
    portfolio: true,
    testimonials: true,
    contact: true,
  },

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
      title: "Event Aftermovies",
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

  portfolioFilters: ["Featured", "Commercials", "Brand Films", "Events", "Documentary", "All"],

  platforms: ["youtube", "vimeo", "instagram", "drive"],

  hero: {
    backgroundMedia: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop",
    ],
    intervalMs: 6000,
  },

  storage: "local",
};

export default preset;
