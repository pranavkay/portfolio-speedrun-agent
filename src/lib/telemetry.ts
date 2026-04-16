/**
 * Telemetry — anonymous, opt-in usage tracking via PostHog.
 *
 * Tracks structural events only (preset chosen, setup completed, deploy).
 * Never sends content, personal info, or portfolio data.
 *
 * Opt-in: set TELEMETRY_ENABLED=true in .env.local
 * Opt-out: leave it unset or set to false (the default)
 */

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

function isEnabled(): boolean {
  // Client-side check
  if (typeof window !== "undefined") {
    return (
      !!POSTHOG_KEY &&
      localStorage.getItem("telemetry_opted_out") !== "true"
    );
  }
  // Server-side check
  return process.env.TELEMETRY_ENABLED === "true" && !!POSTHOG_KEY;
}

// ── Event types ─────────────────────────────────────────────────────

export type TelemetryEvent =
  | { event: "setup_started"; properties: { preset: string; tool?: string } }
  | { event: "setup_completed"; properties: { preset: string; duration_seconds?: number } }
  | { event: "deploy_completed"; properties: { platform: string; storage: string } }
  | { event: "site_active"; properties: { sections_enabled: number; projects_count: number } };

// ── Send event ──────────────────────────────────────────────────────

export async function trackEvent(telemetryEvent: TelemetryEvent): Promise<void> {
  if (!isEnabled()) return;

  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event: telemetryEvent.event,
        properties: {
          ...telemetryEvent.properties,
          $lib: "portfolio-speedrun-agent",
          $lib_version: "0.1.0",
        },
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Telemetry failures are silent — never block the user
  }
}

// ── Opt-out (client-side) ───────────────────────────────────────────

export function optOut(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("telemetry_opted_out", "true");
  }
}

export function optIn(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("telemetry_opted_out");
  }
}
