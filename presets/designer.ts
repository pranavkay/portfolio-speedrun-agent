import type { PortfolioConfig } from "../src/lib/config";

/**
 * Designer Preset
 *
 * Optimized for graphic designers, UI/UX designers, and brand designers.
 * - Case-study oriented portfolio with Behance/Dribbble support
 * - Bold, creative theme (Neon palette — dark with vibrant purple accent)
 * - Services geared toward brand identity, UI/UX, and print
 */

const preset: Omit<PortfolioConfig, "personal" | "contact" | "seo" | "analytics"> = {
  socials: {
    behance: "https://behance.net/example",
    dribbble: "https://dribbble.com/example",
    instagram: "https://instagram.com/example",
    linkedin: "https://linkedin.com/in/example",
  },

  theme: {
    palette: "neon",
    fonts: "modern",
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
      title: "Brand Identity",
      description:
        "Logos, color systems, typography, and brand guidelines that give your business a cohesive visual language.",
      icon: "Palette",
    },
    {
      title: "UI/UX Design",
      description:
        "User interfaces and experiences for web and mobile. Research-driven design that looks great and works better.",
      icon: "Layout",
    },
    {
      title: "Print & Packaging",
      description:
        "Business cards, brochures, packaging, and environmental design. Tangible design that makes an impression.",
      icon: "Printer",
    },
    {
      title: "Illustration",
      description:
        "Custom illustrations, icons, and visual assets for digital and print. Unique artwork that tells your story.",
      icon: "PenTool",
    },
  ],

  portfolioFilters: ["Featured", "Branding", "UI/UX", "Print", "Illustration", "All"],

  platforms: ["behance", "dribbble", "instagram"],

  hero: {
    backgroundMedia: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&h=1080&fit=crop",
    ],
    intervalMs: 5000,
  },

  storage: "local",
};

export default preset;
