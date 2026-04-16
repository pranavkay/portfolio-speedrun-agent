import type { PortfolioConfig } from "../src/lib/config";

/**
 * Photographer Preset
 *
 * Optimized for photographers of all kinds.
 * - Image-heavy gallery grid (thumbnails are the star, not video)
 * - Clean, minimal theme (Gallery palette — light mode!)
 * - Services geared toward portrait, wedding, and commercial photography
 */

const preset: Omit<PortfolioConfig, "personal" | "contact" | "seo" | "analytics"> = {
  socials: {
    instagram: "https://instagram.com/example",
    linkedin: "https://linkedin.com/in/example",
    website: "https://example.com",
  },

  theme: {
    palette: "gallery",
    fonts: "editorial",
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
      title: "Portrait Photography",
      description:
        "Headshots, personal branding, and editorial portraits that capture personality and presence.",
      icon: "User",
    },
    {
      title: "Wedding & Events",
      description:
        "Documenting your most important moments with a candid, storytelling approach that feels natural.",
      icon: "Heart",
    },
    {
      title: "Commercial & Product",
      description:
        "Clean, compelling product and lifestyle photography for brands, e-commerce, and campaigns.",
      icon: "ShoppingBag",
    },
    {
      title: "Editorial & Fashion",
      description:
        "Creative, magazine-quality shoots with a strong point of view. Concept to final delivery.",
      icon: "Aperture",
    },
  ],

  portfolioFilters: ["Featured", "Portraits", "Weddings", "Commercial", "Editorial", "All"],

  platforms: ["instagram", "behance", "dribbble"],

  hero: {
    backgroundMedia: [
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&h=1080&fit=crop",
    ],
    intervalMs: 5000,
  },

  storage: "local",
};

export default preset;
