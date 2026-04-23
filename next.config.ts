import type { NextConfig } from "next";

const sharedHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Allow images from any R2 public URL (pub-*.r2.dev or custom domain configured via R2_PUBLIC_URL)
const r2Hostname = (() => {
  try {
    const url = process.env.R2_PUBLIC_URL;
    return url ? new URL(url).hostname : "*.r2.dev";
  } catch {
    return "*.r2.dev";
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: r2Hostname },
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
    ],
  },

  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
        permanent: true,
      },
    ];
  },

  async headers() {
    const cspImgSrc = [
      "'self'",
      "data:",
      "blob:",
      "https://img.youtube.com",
      "https://images.unsplash.com",
      "https://*.r2.dev",
      "https://*.r2.cloudflarestorage.com",
    ].join(" ");

    return [
      {
        source: "/(.*)",
        headers: [
          ...sharedHeaders,
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.i.posthog.com https://*.posthog.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' https://fonts.gstatic.com",
              `img-src ${cspImgSrc}`,
              "frame-src https://www.youtube.com https://drive.google.com",
              "frame-ancestors 'none'",
              "connect-src 'self' https://*.r2.cloudflarestorage.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.i.posthog.com https://*.posthog.com https://api.github.com",
              "media-src 'self' https://*.r2.dev",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
