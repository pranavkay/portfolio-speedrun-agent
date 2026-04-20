"use client";

declare global {
  interface Window {
    posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void };
  }
}

export function TrackClick({
  event,
  properties,
  children,
}: {
  event: string;
  properties?: Record<string, unknown>;
  children: React.ReactNode;
}) {
  return (
    <span onClick={() => window.posthog?.capture(event, properties)}>
      {children}
    </span>
  );
}
