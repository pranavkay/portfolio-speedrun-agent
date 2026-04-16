#!/usr/bin/env node

/**
 * Portfolio Speedrun Agent — Interactive Setup Wizard
 *
 * Usage: node bin/setup.mjs
 *
 * Walks the user through choosing a preset and entering their info,
 * then generates portfolio.config.ts and .env.local.
 */

import * as readline from "node:readline";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Terminal helpers ─────────────────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function print(msg = "") {
  console.log(msg);
}

function bold(text) {
  return `\x1b[1m${text}\x1b[0m`;
}

function accent(text) {
  return `\x1b[33m${text}\x1b[0m`;
}

function dim(text) {
  return `\x1b[2m${text}\x1b[0m`;
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  print();
  print(accent("╔══════════════════════════════════════════════════════════╗"));
  print(accent("║") + bold("  Portfolio Speedrun Agent — Setup Wizard") + "               " + accent("║"));
  print(accent("║") + "  Let's build your portfolio in under 30 minutes.       " + accent("║"));
  print(accent("╚══════════════════════════════════════════════════════════╝"));
  print();

  // ── Content Kit Check ──────────────────────────────────────────────
  print(bold("Before we start, make sure you have:"));
  print("  • 5-10 portfolio pieces (video links or images)");
  print("  • A profile photo");
  print("  • A short bio (1-2 paragraphs)");
  print("  • Your email address");
  print("  • 3-5 services you offer");
  print();
  print(dim("See docs/content-kit.md for the full checklist."));
  print();

  const ready = await ask("Do you have your content ready? (y/n): ");
  if (ready.toLowerCase() !== "y" && ready.toLowerCase() !== "yes") {
    print();
    print("No worries! Take a few minutes to gather your content first.");
    print(`Check ${accent("docs/content-kit.md")} for what you'll need.`);
    print("Run this setup again when you're ready.");
    rl.close();
    return;
  }

  // ── Preset Selection ───────────────────────────────────────────────
  print();
  print(bold("Step 1: Choose your profession"));
  print();
  print("  " + accent("1") + "  Videographer — dark cinematic theme, video embeds");
  print("  " + accent("2") + "  Photographer — clean light theme, image gallery");
  print("  " + accent("3") + "  Designer     — bold neon theme, Behance/Dribbble");
  print();

  let presetChoice = "";
  while (!["1", "2", "3"].includes(presetChoice)) {
    presetChoice = await ask("Choose (1/2/3): ");
  }

  const presetMap = { "1": "videographer", "2": "photographer", "3": "designer" };
  const presetName = presetMap[presetChoice];
  print(`  → ${bold(presetName.charAt(0).toUpperCase() + presetName.slice(1))} preset selected`);

  // ── Personal Info ──────────────────────────────────────────────────
  print();
  print(bold("Step 2: Your info"));
  print();

  const name = await ask("Full name: ");
  const role = await ask("Professional title (e.g. Cinematographer): ");
  const tagline = await ask(`Tagline (e.g. "${role} — Commercials & Brand Films"): `) || `${role}`;
  const location = await ask("City, Country (e.g. Los Angeles, CA): ");

  print();
  print("Write a short bio (1-2 sentences is fine for now, you can edit later):");
  const bio = await ask("> ");

  print();
  const email = await ask("Email: ");
  const whatsapp = await ask("WhatsApp number with country code (or press Enter to skip): ");
  const bookingUrl = await ask("Booking link / Calendly URL (or press Enter to skip): ");

  // ── Social Links ───────────────────────────────────────────────────
  print();
  print(bold("Step 3: Social links") + dim(" (press Enter to skip any)"));
  print();

  const instagram = await ask("Instagram URL: ");
  const youtube = await ask("YouTube URL: ");
  const linkedin = await ask("LinkedIn URL: ");
  const behance = await ask("Behance URL: ");
  const dribbble = await ask("Dribbble URL: ");
  const vimeo = await ask("Vimeo URL: ");

  // ── Generate Config ────────────────────────────────────────────────
  print();
  print(bold("Generating your configuration..."));

  // Load preset defaults
  const presetDefaults = {
    videographer: { palette: "cinema", fonts: "classic" },
    photographer: { palette: "gallery", fonts: "editorial" },
    designer: { palette: "neon", fonts: "modern" },
  };

  // Read the preset file to get services and filters
  const presetPath = path.join(ROOT, `presets/${presetName}.ts`);
  const presetSource = fs.readFileSync(presetPath, "utf-8");

  // Extract services array from preset (simple regex, good enough for templates)
  const servicesMatch = presetSource.match(/services:\s*\[([\s\S]*?)\],\s*\n\s*portfolio/);
  const filtersMatch = presetSource.match(/portfolioFilters:\s*(\[[\s\S]*?\])/);
  const platformsMatch = presetSource.match(/platforms:\s*(\[[\s\S]*?\])/);

  const defaults = presetDefaults[presetName];

  const socials = {};
  if (instagram) socials.instagram = instagram;
  if (youtube) socials.youtube = youtube;
  if (linkedin) socials.linkedin = linkedin;
  if (behance) socials.behance = behance;
  if (dribbble) socials.dribbble = dribbble;
  if (vimeo) socials.vimeo = vimeo;

  // Write portfolio.config.ts
  const configContent = `import type { PortfolioConfig } from "./src/lib/config";

const config: PortfolioConfig = {
  personal: {
    name: ${JSON.stringify(name)},
    role: ${JSON.stringify(role)},
    tagline: ${JSON.stringify(tagline)},
    location: ${JSON.stringify(location)},
    bio: ${JSON.stringify(bio)},
    profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop",
    aboutHeading: "About Me",
  },

  contact: {
    email: ${JSON.stringify(email)},
${whatsapp ? `    whatsapp: ${JSON.stringify(whatsapp)},\n` : ""}${bookingUrl ? `    bookingUrl: ${JSON.stringify(bookingUrl)},\n` : ""}  },

  socials: ${JSON.stringify(socials, null, 4).replace(/\n/g, "\n  ")},

  theme: {
    palette: ${JSON.stringify(defaults.palette)},
    fonts: ${JSON.stringify(defaults.fonts)},
  },

  sections: {
    hero: true,
    about: true,
    services: true,
    portfolio: true,
    testimonials: true,
    contact: true,
  },

  // Services from ${presetName} preset — customize these to match your actual offerings
  services: ${servicesMatch ? servicesMatch[0].replace(/,\s*\n\s*portfolio/, "") + "," : "[]"},

  portfolioFilters: ${filtersMatch ? filtersMatch[1] : '["Featured", "All"]'},

  platforms: ${platformsMatch ? platformsMatch[1] : '["youtube"]'},

  hero: {
    backgroundMedia: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop",
    ],
    intervalMs: 6000,
  },

  seo: {
    siteUrl: "https://example.com",
    locale: "en-US",
    serviceTypes: [${JSON.stringify(role)}],
    expertise: [${JSON.stringify(role)}],
  },

  analytics: {
    googleAnalyticsId: "",
  },

  storage: "local",
};

export default config;
`;

  fs.writeFileSync(path.join(ROOT, "portfolio.config.ts"), configContent, "utf-8");

  // Write .env.local if it doesn't exist
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) {
    const envContent = `# Admin panel credentials
ADMIN_PASSWORD=change-me-please
ADMIN_SECRET=${generateRandomString(32)}
`;
    fs.writeFileSync(envPath, envContent, "utf-8");
    print(`  → Created ${accent(".env.local")} with admin credentials`);
  }

  print(`  → Updated ${accent("portfolio.config.ts")} with your info`);

  // ── Done! ──────────────────────────────────────────────────────────
  print();
  print(accent("════════════════════════════════════════════════════════════"));
  print();
  print(bold("  You're all set! Here's what to do next:"));
  print();
  print(`  1. Run ${accent("npm run dev")} to start the dev server`);
  print(`  2. Open ${accent("http://localhost:3000")} to see your portfolio`);
  print(`  3. Add your portfolio pieces via ${accent("/admin")} or by editing content.json`);
  print(`  4. Customize colors/fonts in ${accent("portfolio.config.ts")}`);
  print();
  print(`  When you're ready to go live:`);
  print(`  5. Push to GitHub and deploy on Vercel (free tier)`);
  print();
  print(dim("  Tip: You can also use Claude Code or Codex to customize your site."));
  print(dim("  Just say what you want changed — the AI knows how this project works."));
  print();

  rl.close();
}

function generateRandomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
