import { describe, it, expect } from "vitest";
import config from "../portfolio.config";
import { palettes, fontPairings, resolveColors, resolveFonts } from "../src/lib/config";
import type { PortfolioConfig } from "../src/lib/config";

describe("portfolio.config.ts schema validation", () => {
  it("exports a valid config object", () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe("object");
  });

  // ── Personal ────────────────────────────────────────────────────────

  it("has all required personal fields", () => {
    const { personal } = config;
    expect(personal.name).toBeTruthy();
    expect(personal.role).toBeTruthy();
    expect(personal.tagline).toBeTruthy();
    expect(personal.location).toBeTruthy();
    expect(personal.bio).toBeTruthy();
    expect(personal.profilePhotoUrl).toBeTruthy();
    expect(personal.aboutHeading).toBeTruthy();
  });

  // ── Contact ─────────────────────────────────────────────────────────

  it("has a valid email in contact", () => {
    expect(config.contact.email).toBeTruthy();
    expect(config.contact.email).toContain("@");
  });

  // ── Theme ───────────────────────────────────────────────────────────

  it("has a valid palette name or custom", () => {
    const validPalettes = [...Object.keys(palettes), "custom"];
    expect(validPalettes).toContain(config.theme.palette);
  });

  it("has a valid font pairing name", () => {
    const validFonts = Object.keys(fontPairings);
    expect(validFonts).toContain(config.theme.fonts);
  });

  it("provides customColors when palette is custom", () => {
    if (config.theme.palette === "custom") {
      expect(config.theme.customColors).toBeDefined();
      expect(config.theme.customColors!.bg).toBeTruthy();
      expect(config.theme.customColors!.accent).toBeTruthy();
    }
  });

  // ── Sections ────────────────────────────────────────────────────────

  it("has all section toggles defined as booleans", () => {
    const requiredSections = ["hero", "about", "services", "portfolio", "testimonials", "contact"] as const;
    for (const section of requiredSections) {
      expect(typeof config.sections[section]).toBe("boolean");
    }
  });

  // ── Services ────────────────────────────────────────────────────────

  it("has at least one service when services section is enabled", () => {
    if (config.sections.services) {
      expect(config.services.length).toBeGreaterThan(0);
    }
  });

  it("each service has title, description, and icon", () => {
    for (const service of config.services) {
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.icon).toBeTruthy();
    }
  });

  // ── Portfolio Filters ───────────────────────────────────────────────

  it("has at least one portfolio filter", () => {
    expect(config.portfolioFilters.length).toBeGreaterThan(0);
  });

  it('includes "All" as the last filter', () => {
    expect(config.portfolioFilters[config.portfolioFilters.length - 1]).toBe("All");
  });

  // ── Platforms ───────────────────────────────────────────────────────

  it("has at least one platform", () => {
    expect(config.platforms.length).toBeGreaterThan(0);
  });

  it("only contains valid platform names", () => {
    const validPlatforms = ["youtube", "vimeo", "instagram", "behance", "dribbble", "drive"];
    for (const platform of config.platforms) {
      expect(validPlatforms).toContain(platform);
    }
  });

  // ── Hero ────────────────────────────────────────────────────────────

  it("has hero configuration", () => {
    expect(config.hero.backgroundMedia).toBeDefined();
    expect(Array.isArray(config.hero.backgroundMedia)).toBe(true);
    expect(config.hero.intervalMs).toBeGreaterThanOrEqual(2000);
  });

  // ── SEO ─────────────────────────────────────────────────────────────

  it("has SEO configuration", () => {
    expect(config.seo.siteUrl).toBeTruthy();
    expect(config.seo.locale).toBeTruthy();
    expect(config.seo.serviceTypes.length).toBeGreaterThan(0);
  });

  // ── Storage ─────────────────────────────────────────────────────────

  it("has a valid storage backend", () => {
    expect(["local", "r2"]).toContain(config.storage);
  });

  // ── Resolver functions ──────────────────────────────────────────────

  it("resolveColors returns valid hex colors", () => {
    const colors = resolveColors(config);
    const hexRegex = /^#[0-9a-fA-F]{6}$/;
    expect(colors.bg).toMatch(hexRegex);
    expect(colors.bgLight).toMatch(hexRegex);
    expect(colors.bgCard).toMatch(hexRegex);
    expect(colors.accent).toMatch(hexRegex);
    expect(colors.accentHover).toMatch(hexRegex);
  });

  it("resolveFonts returns font family strings", () => {
    const fonts = resolveFonts(config);
    expect(fonts.serif).toBeTruthy();
    expect(fonts.sans).toBeTruthy();
  });
});
