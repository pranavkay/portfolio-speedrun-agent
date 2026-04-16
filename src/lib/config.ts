/**
 * Portfolio Speedrun Agent — Configuration System
 *
 * This is the single source of truth for your portfolio site.
 * Edit this file to customize your site, or let an AI assistant do it for you.
 */

export interface PortfolioConfig {
  /** Your personal information */
  personal: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    bio: string;
    profilePhotoUrl: string;
    aboutHeading: string;
  };

  /** Contact information */
  contact: {
    email: string;
    phone?: string;
    whatsapp?: string;
    bookingUrl?: string;
  };

  /** Social media links — only include the ones you use */
  socials: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
    behance?: string;
    dribbble?: string;
    vimeo?: string;
    tiktok?: string;
    github?: string;
    website?: string;
  };

  /** Theme and visual styling */
  theme: {
    /** Choose a built-in palette or define custom colors */
    palette: "cinema" | "studio" | "gallery" | "neon" | "earth" | "custom";
    /** Only used when palette is "custom" */
    customColors?: {
      bg: string;
      bgLight: string;
      bgCard: string;
      accent: string;
      accentHover: string;
    };
    /** Font pairing preset */
    fonts: "classic" | "modern" | "editorial" | "minimal";
  };

  /** Which sections to show on the site */
  sections: {
    hero: boolean;
    about: boolean;
    services: boolean;
    portfolio: boolean;
    testimonials: boolean;
    contact: boolean;
  };

  /** Services you offer — displayed in the Services section */
  services: ServiceConfig[];

  /** Portfolio filter categories (shown as tabs above the grid) */
  portfolioFilters: string[];

  /** Supported embed platforms for portfolio items */
  platforms: ("youtube" | "vimeo" | "instagram" | "behance" | "dribbble" | "drive")[];

  /** Hero section configuration */
  hero: {
    /** Background images or video URLs for the hero carousel */
    backgroundMedia: string[];
    /** Carousel interval in milliseconds (min 2000) */
    intervalMs: number;
  };

  /** SEO and metadata */
  seo: {
    siteUrl: string;
    locale: string;
    /** Professional service type for schema.org (e.g. "Cinematography", "Photography") */
    serviceTypes: string[];
    /** Knowledge areas for schema.org Person markup */
    expertise: string[];
  };

  /** Analytics */
  analytics: {
    googleAnalyticsId?: string;
  };

  /** Storage backend — "local" requires no external services */
  storage: "local" | "r2";
}

export interface ServiceConfig {
  title: string;
  description: string;
  /** Lucide icon name (e.g. "Film", "Camera", "Sparkles", "Palette") */
  icon: string;
}

// ─── Built-in Color Palettes ────────────────────────────────────────────────

export const palettes = {
  cinema: {
    bg: "#050505",
    bgLight: "#121212",
    bgCard: "#1e1e1e",
    accent: "#c0a062",
    accentHover: "#e0c078",
  },
  studio: {
    bg: "#0a0f1a",
    bgLight: "#111827",
    bgCard: "#1f2937",
    accent: "#3b82f6",
    accentHover: "#60a5fa",
  },
  gallery: {
    bg: "#fafafa",
    bgLight: "#f5f5f5",
    bgCard: "#ffffff",
    accent: "#18181b",
    accentHover: "#3f3f46",
  },
  neon: {
    bg: "#0a0a0a",
    bgLight: "#171717",
    bgCard: "#262626",
    accent: "#a855f7",
    accentHover: "#c084fc",
  },
  earth: {
    bg: "#1a1410",
    bgLight: "#292018",
    bgCard: "#3d3024",
    accent: "#d97706",
    accentHover: "#f59e0b",
  },
} as const;

export type PaletteName = keyof typeof palettes;

// ─── Built-in Font Pairings ─────────────────────────────────────────────────

export const fontPairings = {
  classic: {
    serif: "Playfair Display",
    sans: "Inter",
  },
  modern: {
    serif: "DM Serif Display",
    sans: "DM Sans",
  },
  editorial: {
    serif: "Cormorant Garamond",
    sans: "Montserrat",
  },
  minimal: {
    serif: "Libre Baskerville",
    sans: "Source Sans 3",
  },
} as const;

export type FontPairingName = keyof typeof fontPairings;

// ─── Resolve config to concrete values ──────────────────────────────────────

export function resolveColors(config: PortfolioConfig) {
  if (config.theme.palette === "custom" && config.theme.customColors) {
    return config.theme.customColors;
  }
  return palettes[config.theme.palette as PaletteName] ?? palettes.cinema;
}

export function resolveFonts(config: PortfolioConfig) {
  return fontPairings[config.theme.fonts] ?? fontPairings.classic;
}

/** Check if the palette is light-themed (for text color decisions) */
export function isLightTheme(config: PortfolioConfig): boolean {
  const colors = resolveColors(config);
  // Simple heuristic: if bg starts with #f or #e, it's light
  return /^#[e-f]/i.test(colors.bg);
}
