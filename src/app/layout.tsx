import type { Metadata, Viewport } from "next";
import {
  Playfair_Display, Inter, DM_Serif_Display, DM_Sans,
  Cormorant_Garamond, Montserrat, Libre_Baskerville, Source_Sans_3,
  Syne, Press_Start_2P,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";

// ── Portfolio preset fonts ──────────────────────────────────────────
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-cormorant", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre", display: "swap" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });

// ── Startup Speedrun brand fonts ────────────────────────────────────
const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-syne", display: "swap" });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });

const fontVars = [
  playfair.variable, inter.variable, dmSerif.variable, dmSans.variable,
  cormorant.variable, montserrat.variable, libreBaskerville.variable, sourceSans.variable,
  syne.variable, pressStart.variable,
  GeistSans.variable, GeistMono.variable,
].join(" ");

// ── Metadata ────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.startupspeedrun.org"),
  title: {
    default: "Portfolio Builder — Startup Speedrun",
    template: "%s | Portfolio Builder — Startup Speedrun",
  },
  description: "Free, open-source portfolio template for creative freelancers. Paste one prompt into Claude Code or Codex. AI builds the rest. Part of the Startup Speedrun give-it-forward initiative.",
};

export const viewport: Viewport = {
  themeColor: "#8B78E6",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Script id="posthog" strategy="afterInteractive">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('phc_BZkt5iPiWRYcaGdFTYNQ43dG3JV234N8cf8DYZESumvc',{api_host:'https://us.i.posthog.com',person_profiles:'anonymous'})`}
        </Script>
      </body>
    </html>
  );
}
