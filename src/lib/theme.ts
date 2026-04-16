/**
 * Theme system — resolves portfolio.config.ts into CSS custom properties
 * and utility values used by components.
 */

import config from "../../portfolio.config";
import { resolveColors, resolveFonts, isLightTheme } from "./config";

const colors = resolveColors(config);
const fonts = resolveFonts(config);
const light = isLightTheme(config);

/**
 * CSS custom properties injected into globals.css via the theme.
 * These map to Tailwind's @theme inline block.
 */
export const themeColors = {
  "--color-theme-bg": colors.bg,
  "--color-theme-bg-light": colors.bgLight,
  "--color-theme-bg-card": colors.bgCard,
  "--color-theme-accent": colors.accent,
  "--color-theme-accent-hover": colors.accentHover,
} as const;

export const themeFonts = {
  serif: fonts.serif,
  sans: fonts.sans,
} as const;

/** Text color that contrasts with the background */
export const textColor = light ? "#18181b" : "#e5e5e5";
export const textMuted = light ? "#71717a" : "#a1a1aa";
export const textOnAccent = light ? "#ffffff" : "#000000";

/** Border colors */
export const borderSubtle = light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.05)";
export const borderAccent = light
  ? `${colors.accent}40`
  : `${colors.accent}30`;

/** Whether to use light mode styling */
export const isLight = light;

/** Export resolved config for components that need it */
export { config };
