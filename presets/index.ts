/**
 * Preset Loader
 *
 * Merges a profession preset with user-provided personal info
 * to generate a complete portfolio.config.ts file.
 */

import type { PortfolioConfig } from "../src/lib/config";

export type PresetName = "videographer" | "photographer" | "designer";

export const presetNames: PresetName[] = ["videographer", "photographer", "designer"];

export const presetDescriptions: Record<PresetName, string> = {
  videographer: "Video-first portfolio with YouTube/Vimeo embeds and cinematic dark theme",
  photographer: "Image-heavy gallery with clean, minimal light theme",
  designer: "Case-study portfolio with Behance/Dribbble and bold neon theme",
};

/** User-provided info that differs per person */
export interface UserInfo {
  name: string;
  role: string;
  tagline: string;
  location: string;
  bio: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  bookingUrl?: string;
  profilePhotoUrl?: string;
  siteUrl?: string;
}

/**
 * Load a preset by name and merge it with user info to produce
 * a complete PortfolioConfig.
 */
export async function loadPreset(
  presetName: PresetName,
  userInfo: UserInfo
): Promise<PortfolioConfig> {
  const presetModule = await import(`./${presetName}`);
  const preset = presetModule.default;

  const config: PortfolioConfig = {
    ...preset,
    personal: {
      name: userInfo.name,
      role: userInfo.role,
      tagline: userInfo.tagline,
      location: userInfo.location,
      bio: userInfo.bio,
      profilePhotoUrl:
        userInfo.profilePhotoUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop",
      aboutHeading: "About Me",
    },
    contact: {
      email: userInfo.email,
      phone: userInfo.phone,
      whatsapp: userInfo.whatsapp,
      bookingUrl: userInfo.bookingUrl,
    },
    seo: {
      siteUrl: userInfo.siteUrl || "https://example.com",
      locale: "en-US",
      serviceTypes: preset.services.map(
        (s: { title: string }) => s.title
      ),
      expertise: preset.services.map(
        (s: { title: string }) => s.title
      ),
    },
    analytics: {
      googleAnalyticsId: "",
    },
  };

  return config;
}

/**
 * Generate the contents of a portfolio.config.ts file from a config object.
 * This produces a human-readable TypeScript file that users can edit.
 */
export function generateConfigFile(config: PortfolioConfig): string {
  return `import type { PortfolioConfig } from "./src/lib/config";

const config: PortfolioConfig = ${JSON.stringify(config, null, 2)};

export default config;
`;
}
