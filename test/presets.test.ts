import { describe, it, expect } from "vitest";
import { palettes, fontPairings } from "../src/lib/config";
import type { PortfolioConfig } from "../src/lib/config";

// Import all presets
import videographer from "../presets/videographer";
import photographer from "../presets/photographer";
import designer from "../presets/designer";

type PresetConfig = Omit<PortfolioConfig, "personal" | "contact" | "seo" | "analytics">;

const presets: Record<string, PresetConfig> = {
  videographer,
  photographer,
  designer,
};

const validPalettes = [...Object.keys(palettes), "custom"];
const validFonts = Object.keys(fontPairings);
const validPlatforms = ["youtube", "vimeo", "instagram", "behance", "dribbble", "drive"];

describe("profession presets", () => {
  for (const [name, preset] of Object.entries(presets)) {
    describe(`${name} preset`, () => {
      // ── Theme ─────────────────────────────────────────────────────
      it("has a valid palette", () => {
        expect(validPalettes).toContain(preset.theme.palette);
      });

      it("has a valid font pairing", () => {
        expect(validFonts).toContain(preset.theme.fonts);
      });

      // ── Sections ──────────────────────────────────────────────────
      it("has all section toggles", () => {
        const sections = ["hero", "about", "services", "portfolio", "testimonials", "contact"] as const;
        for (const section of sections) {
          expect(typeof preset.sections[section]).toBe("boolean");
        }
      });

      // ── Services ──────────────────────────────────────────────────
      it("has at least 3 services", () => {
        expect(preset.services.length).toBeGreaterThanOrEqual(3);
      });

      it("each service has title, description, and icon", () => {
        for (const service of preset.services) {
          expect(service.title.length).toBeGreaterThan(0);
          expect(service.description.length).toBeGreaterThan(10);
          expect(service.icon.length).toBeGreaterThan(0);
        }
      });

      it("service descriptions are substantial (not placeholders)", () => {
        for (const service of preset.services) {
          // At least 40 chars to avoid "Lorem ipsum" type descriptions
          expect(service.description.length).toBeGreaterThan(40);
        }
      });

      // ── Portfolio Filters ─────────────────────────────────────────
      it("has at least 3 portfolio filters", () => {
        expect(preset.portfolioFilters.length).toBeGreaterThanOrEqual(3);
      });

      it('includes "All" in filters', () => {
        expect(preset.portfolioFilters).toContain("All");
      });

      it('includes "Featured" in filters', () => {
        expect(preset.portfolioFilters).toContain("Featured");
      });

      // ── Platforms ─────────────────────────────────────────────────
      it("has at least one platform", () => {
        expect(preset.platforms.length).toBeGreaterThan(0);
      });

      it("only contains valid platforms", () => {
        for (const platform of preset.platforms) {
          expect(validPlatforms).toContain(platform);
        }
      });

      // ── Hero ──────────────────────────────────────────────────────
      it("has hero background media", () => {
        expect(preset.hero.backgroundMedia.length).toBeGreaterThan(0);
      });

      it("has a reasonable carousel interval", () => {
        expect(preset.hero.intervalMs).toBeGreaterThanOrEqual(2000);
        expect(preset.hero.intervalMs).toBeLessThanOrEqual(15000);
      });

      // ── Socials ───────────────────────────────────────────────────
      it("has at least 2 default social links", () => {
        const socialCount = Object.values(preset.socials).filter(Boolean).length;
        expect(socialCount).toBeGreaterThanOrEqual(2);
      });

      // ── Storage ───────────────────────────────────────────────────
      it("defaults to local storage", () => {
        expect(preset.storage).toBe("local");
      });
    });
  }

  // ── Cross-preset uniqueness ───────────────────────────────────────

  describe("presets are visually distinct", () => {
    it("each preset uses a different palette", () => {
      const paletteSet = new Set(Object.values(presets).map((p) => p.theme.palette));
      expect(paletteSet.size).toBe(Object.keys(presets).length);
    });

    it("each preset uses a different font pairing", () => {
      const fontSet = new Set(Object.values(presets).map((p) => p.theme.fonts));
      expect(fontSet.size).toBe(Object.keys(presets).length);
    });

    it("each preset has different service titles", () => {
      const allTitles = Object.values(presets).flatMap((p) =>
        p.services.map((s) => s.title)
      );
      const uniqueTitles = new Set(allTitles);
      // All titles should be unique across presets
      expect(uniqueTitles.size).toBe(allTitles.length);
    });
  });
});
