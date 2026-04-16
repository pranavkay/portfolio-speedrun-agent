import { describe, it, expect } from "vitest";
import {
  palettes,
  fontPairings,
  resolveColors,
  resolveFonts,
  isLightTheme,
} from "../src/lib/config";
import type { PortfolioConfig } from "../src/lib/config";

const hexRegex = /^#[0-9a-fA-F]{6}$/;

describe("theme system", () => {
  // ── Palettes ────────────────────────────────────────────────────────

  describe("built-in palettes", () => {
    for (const [name, colors] of Object.entries(palettes)) {
      describe(`${name} palette`, () => {
        it("has all required color keys", () => {
          expect(colors.bg).toBeDefined();
          expect(colors.bgLight).toBeDefined();
          expect(colors.bgCard).toBeDefined();
          expect(colors.accent).toBeDefined();
          expect(colors.accentHover).toBeDefined();
        });

        it("all colors are valid hex codes", () => {
          expect(colors.bg).toMatch(hexRegex);
          expect(colors.bgLight).toMatch(hexRegex);
          expect(colors.bgCard).toMatch(hexRegex);
          expect(colors.accent).toMatch(hexRegex);
          expect(colors.accentHover).toMatch(hexRegex);
        });

        it("bg and bgLight are different colors", () => {
          expect(colors.bg).not.toBe(colors.bgLight);
        });
      });
    }

    it("has exactly 5 palettes", () => {
      expect(Object.keys(palettes)).toHaveLength(5);
    });

    it("palette names match expected set", () => {
      expect(Object.keys(palettes).sort()).toEqual(
        ["cinema", "earth", "gallery", "neon", "studio"].sort()
      );
    });
  });

  // ── Font Pairings ──────────────────────────────────────────────────

  describe("built-in font pairings", () => {
    for (const [name, fonts] of Object.entries(fontPairings)) {
      describe(`${name} font pairing`, () => {
        it("has serif and sans families", () => {
          expect(fonts.serif).toBeTruthy();
          expect(fonts.sans).toBeTruthy();
        });

        it("serif and sans are different fonts", () => {
          expect(fonts.serif).not.toBe(fonts.sans);
        });
      });
    }

    it("has exactly 4 font pairings", () => {
      expect(Object.keys(fontPairings)).toHaveLength(4);
    });
  });

  // ── Resolver functions ──────────────────────────────────────────────

  describe("resolveColors", () => {
    it("returns palette colors for named palettes", () => {
      for (const paletteName of Object.keys(palettes)) {
        const config = { theme: { palette: paletteName } } as PortfolioConfig;
        const colors = resolveColors(config);
        expect(colors.bg).toMatch(hexRegex);
        expect(colors.accent).toMatch(hexRegex);
      }
    });

    it("returns custom colors when palette is custom", () => {
      const config = {
        theme: {
          palette: "custom",
          customColors: {
            bg: "#111111",
            bgLight: "#222222",
            bgCard: "#333333",
            accent: "#ff0000",
            accentHover: "#ff3333",
          },
        },
      } as PortfolioConfig;
      const colors = resolveColors(config);
      expect(colors.accent).toBe("#ff0000");
    });

    it("falls back to cinema for unknown palette", () => {
      const config = { theme: { palette: "nonexistent" } } as PortfolioConfig;
      const colors = resolveColors(config);
      expect(colors).toEqual(palettes.cinema);
    });
  });

  describe("resolveFonts", () => {
    it("returns fonts for named pairings", () => {
      for (const fontName of Object.keys(fontPairings)) {
        const config = { theme: { fonts: fontName } } as PortfolioConfig;
        const fonts = resolveFonts(config);
        expect(fonts.serif).toBeTruthy();
        expect(fonts.sans).toBeTruthy();
      }
    });

    it("falls back to classic for unknown pairing", () => {
      const config = { theme: { fonts: "nonexistent" } } as PortfolioConfig;
      const fonts = resolveFonts(config);
      expect(fonts).toEqual(fontPairings.classic);
    });
  });

  describe("isLightTheme", () => {
    it("detects gallery as light theme", () => {
      const config = { theme: { palette: "gallery" } } as PortfolioConfig;
      expect(isLightTheme(config)).toBe(true);
    });

    it("detects cinema as dark theme", () => {
      const config = { theme: { palette: "cinema" } } as PortfolioConfig;
      expect(isLightTheme(config)).toBe(false);
    });

    it("detects neon as dark theme", () => {
      const config = { theme: { palette: "neon" } } as PortfolioConfig;
      expect(isLightTheme(config)).toBe(false);
    });
  });
});
