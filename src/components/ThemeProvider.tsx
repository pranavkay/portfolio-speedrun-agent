"use client";

import { useEffect } from "react";

interface ThemeVars {
  bg: string;
  bgLight: string;
  bgCard: string;
  accent: string;
  accentHover: string;
  text: string;
  textMuted: string;
  textOnAccent: string;
  fontSerif: string;
  fontSans: string;
}

export function ThemeProvider({
  vars,
  children,
}: {
  vars: ThemeVars;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--portfolio-bg", vars.bg);
    root.style.setProperty("--portfolio-bg-light", vars.bgLight);
    root.style.setProperty("--portfolio-bg-card", vars.bgCard);
    root.style.setProperty("--portfolio-accent", vars.accent);
    root.style.setProperty("--portfolio-accent-hover", vars.accentHover);
    root.style.setProperty("--portfolio-text", vars.text);
    root.style.setProperty("--portfolio-text-muted", vars.textMuted);
    root.style.setProperty("--portfolio-text-on-accent", vars.textOnAccent);
    root.style.setProperty("--portfolio-font-serif", vars.fontSerif);
    root.style.setProperty("--portfolio-font-sans", vars.fontSans);
  }, [vars]);

  return <>{children}</>;
}
