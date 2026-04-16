import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, DM_Serif_Display, DM_Sans, Cormorant_Garamond, Montserrat, Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import config from "../../portfolio.config";
import { resolveColors, resolveFonts } from "@/lib/config";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const colors = resolveColors(config);
const fonts = resolveFonts(config);

// ── Google Font Loaders ─────────────────────────────────────────────
// We load all font pairings but only apply the configured one.
// Next.js tree-shakes unused fonts at build time.

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-serif", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-serif", display: "swap" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const fontMap: Record<string, { serif: typeof playfair; sans: typeof inter }> = {
  classic: { serif: playfair, sans: inter },
  modern: { serif: dmSerif, sans: dmSans },
  editorial: { serif: cormorant, sans: montserrat },
  minimal: { serif: libreBaskerville, sans: sourceSans },
};

const activeFonts = fontMap[config.theme.fonts] || fontMap.classic;

// ── Metadata ────────────────────────────────────────────────────────

const siteUrl = config.seo.siteUrl || "https://example.com";
const GA_ID = config.analytics.googleAnalyticsId;

const description = `${config.personal.name} — ${config.personal.tagline}. Based in ${config.personal.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${config.personal.name} — ${config.personal.role}`,
    template: `%s | ${config.personal.name}`,
  },
  description,
  keywords: [
    config.personal.role.toLowerCase(),
    config.personal.location,
    ...config.seo.serviceTypes.map((s) => s.toLowerCase()),
    config.personal.name,
  ],
  openGraph: {
    type: "website",
    locale: config.seo.locale,
    url: siteUrl,
    siteName: `${config.personal.name} — ${config.personal.role}`,
    title: `${config.personal.name} — ${config.personal.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.personal.name} — ${config.personal.role}`,
    description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: colors.bg,
  colorScheme: /^#[e-f]/i.test(colors.bg) ? "light" : "dark",
  width: "device-width",
  initialScale: 1,
};

// ── Theme variables for client-side injection ───────────────────────

const isLight = /^#[e-f]/i.test(colors.bg);
const themeVars = {
  bg: colors.bg,
  bgLight: colors.bgLight,
  bgCard: colors.bgCard,
  accent: colors.accent,
  accentHover: colors.accentHover,
  text: isLight ? "#18181b" : "#e5e5e5",
  textMuted: isLight ? "#71717a" : "#a1a1aa",
  textOnAccent: isLight ? "#ffffff" : "#000000",
  fontSerif: fonts.serif,
  fontSans: fonts.sans,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${activeFonts.serif.variable} ${activeFonts.sans.variable}`}>
      <body className="min-h-screen bg-cinema-950 text-gray-100 font-sans antialiased">
        <ThemeProvider vars={themeVars}>
          {children}
        </ThemeProvider>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
