"use client";

import { useEffect } from "react";
import { palettes, fontPairings } from "@/lib/config";
import type { PaletteName, FontPairingName } from "@/lib/config";

export function DemoTheme({
  palette,
  fonts,
  children,
}: {
  palette: string;
  fonts: string;
  children: React.ReactNode;
}) {
  const colors = palettes[palette as PaletteName] ?? palettes.cinema;
  const fontPair = fontPairings[fonts as FontPairingName] ?? fontPairings.classic;
  const isLight = /^#[e-f]/i.test(colors.bg);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--portfolio-bg", colors.bg);
    root.style.setProperty("--portfolio-bg-light", colors.bgLight);
    root.style.setProperty("--portfolio-bg-card", colors.bgCard);
    root.style.setProperty("--portfolio-accent", colors.accent);
    root.style.setProperty("--portfolio-accent-hover", colors.accentHover);
    root.style.setProperty("--portfolio-text", isLight ? "#18181b" : "#e5e5e5");
    root.style.setProperty("--portfolio-text-muted", isLight ? "#71717a" : "#a1a1aa");
    root.style.setProperty("--portfolio-text-on-accent", isLight ? "#ffffff" : "#000000");
    root.style.setProperty("--portfolio-font-serif", fontPair.serif);
    root.style.setProperty("--portfolio-font-sans", fontPair.sans);

    // Also update body background for full-page color
    document.body.style.backgroundColor = colors.bg;
    document.body.style.color = isLight ? "#18181b" : "#e5e5e5";

    return () => {
      // Reset on unmount
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, [colors, fontPair, isLight]);

  return <>{children}</>;
}
