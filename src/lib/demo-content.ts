import type { Content } from "./types";
import type { PortfolioConfig, ServiceConfig } from "./config";
import { palettes, fontPairings } from "./config";

export type PresetKey = "videographer" | "photographer" | "designer";

export const presetKeys: PresetKey[] = ["videographer", "photographer", "designer"];

interface DemoPreset {
  config: {
    personal: PortfolioConfig["personal"];
    contact: PortfolioConfig["contact"];
    socials: PortfolioConfig["socials"];
    theme: PortfolioConfig["theme"];
    sections: PortfolioConfig["sections"];
    services: ServiceConfig[];
    portfolioFilters: string[];
    seo: { siteUrl: string; locale: string; serviceTypes: string[]; expertise: string[] };
  };
  content: Content;
  label: string;
  description: string;
}

export const demoPresets: Record<PresetKey, DemoPreset> = {
  // ── Videographer ────────────────────────────────────────────────────
  videographer: {
    label: "Videographer",
    description: "Dark cinematic theme with gold accents. YouTube/Vimeo video grid.",
    config: {
      personal: {
        name: "Alex Rivera",
        role: "Cinematographer",
        tagline: "Cinematographer — Commercials & Brand Films",
        location: "Los Angeles, CA",
        bio: "I craft visual stories that move people. With a background in documentary filmmaking and commercial production, I bring a cinematic eye to every project.\n\nI'm selective about what I take on. I'd rather work on fewer projects that challenge me and demand a certain level of craft.",
        profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop",
        aboutHeading: "Crafting visual narratives with intention.",
      },
      contact: { email: "alex@example.com", bookingUrl: "https://cal.com/example" },
      socials: { youtube: "#", instagram: "#", vimeo: "#", linkedin: "#" },
      theme: { palette: "cinema", fonts: "classic" },
      sections: { hero: true, about: true, services: true, portfolio: true, testimonials: true, contact: true },
      services: [
        { title: "Commercials & Product Films", description: "High-craft product advertisements and commercial spots that make the product the hero of every frame.", icon: "Sparkles" },
        { title: "Brand Films", description: "Story-driven brand films that sell feeling before fact. Cinematic language that stays with the viewer.", icon: "Film" },
        { title: "Event Aftermovies", description: "Corporate launches, conferences, and experiential events captured with energy and attention to detail.", icon: "PlayCircle" },
        { title: "Documentary & Long-form", description: "Patient shooting, honest framing, and post-driven storytelling that respects the subject and the audience.", icon: "Camera" },
      ],
      portfolioFilters: ["Featured", "Commercials", "Brand Films", "Events", "All"],
      seo: { siteUrl: "https://portfolio.startupspeedrun.org", locale: "en-US", serviceTypes: ["Cinematography"], expertise: ["Cinematography"] },
    },
    content: {
      settings: {
        name: "Alex Rivera", role: "Cinematographer", tagline: "Cinematographer — Commercials & Brand Films",
        location: "Los Angeles, CA", bio: "I craft visual stories that move people. With a background in documentary filmmaking and commercial production, I bring a cinematic eye to every project.\n\nI'm selective about what I take on. I'd rather work on fewer projects that challenge me and demand a certain level of craft.",
        heroVideoId: "", profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop",
        aboutHeading: "Crafting visual narratives with intention.", phone: "", whatsapp: "", email: "alex@example.com", bookingUrl: "https://cal.com/example",
        socials: { youtube: "#", instagram: "#", vimeo: "#", linkedin: "#" },
      },
      hero: { images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop"], intervalMs: 6000 },
      projects: [
        { id: "v1", title: "Nike — Air Max Campaign", videoUrl: "https://youtu.be/dQw4w9WgXcQ", videoId: "dQw4w9WgXcQ", platform: "youtube", category: "Commercial", tags: ["Commercials", "Brand Films"], priority: 1, featured: true },
        { id: "v2", title: "Airbnb Experiences", videoUrl: "https://youtu.be/dQw4w9WgXcQ", videoId: "dQw4w9WgXcQ", platform: "youtube", category: "Brand Film", tags: ["Brand Films"], priority: 1, featured: true },
        { id: "v3", title: "TED Conference 2025", videoUrl: "https://youtu.be/dQw4w9WgXcQ", videoId: "dQw4w9WgXcQ", platform: "youtube", category: "Event", tags: ["Events"], priority: 2 },
        { id: "v4", title: "Patagonia — Silent Season", videoUrl: "https://youtu.be/dQw4w9WgXcQ", videoId: "dQw4w9WgXcQ", platform: "youtube", category: "Brand Film", tags: ["Brand Films"], priority: 2, featured: true },
        { id: "v5", title: "Stripe Sessions Aftermovie", videoUrl: "https://youtu.be/dQw4w9WgXcQ", videoId: "dQw4w9WgXcQ", platform: "youtube", category: "Event", tags: ["Events"], priority: 3 },
        { id: "v6", title: "Rivian — Road Ahead", videoUrl: "https://youtu.be/dQw4w9WgXcQ", videoId: "dQw4w9WgXcQ", platform: "youtube", category: "Commercial", tags: ["Commercials"], priority: 2 },
      ],
      testimonials: [
        { id: "vt1", name: "Sarah Chen", role: "VP Marketing, Nike", quote: "Alex has an extraordinary eye for movement and light. The campaign he shot exceeded every metric we set.", order: 0 },
        { id: "vt2", name: "Marcus Webb", role: "Creative Director", quote: "Professional, creative, and incredibly easy to work with. The final film moved our entire team to tears.", order: 1 },
      ],
      filters: ["Featured", "Commercials", "Brand Films", "Events", "All"],
    },
  },

  // ── Photographer ────────────────────────────────────────────────────
  photographer: {
    label: "Photographer",
    description: "Clean, minimal light theme. Image-first gallery layout.",
    config: {
      personal: {
        name: "Maya Chen",
        role: "Photographer",
        tagline: "Portrait & Wedding Photographer — New York",
        location: "New York, NY",
        bio: "I photograph people as they are — not as they think they should be. My work lives in the space between posed and candid, where real expression happens.\n\nWhether it's a wedding, a brand shoot, or a quiet editorial afternoon, I bring patience and a sharp eye.",
        profilePhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1200&fit=crop",
        aboutHeading: "Honest frames. Real people.",
      },
      contact: { email: "maya@example.com", bookingUrl: "https://cal.com/example" },
      socials: { instagram: "#", linkedin: "#" },
      theme: { palette: "gallery", fonts: "editorial" },
      sections: { hero: true, about: true, services: true, portfolio: true, testimonials: true, contact: true },
      services: [
        { title: "Portrait Photography", description: "Headshots, personal branding, and editorial portraits that capture personality and presence.", icon: "User" },
        { title: "Wedding & Events", description: "Documenting your most important moments with a candid, storytelling approach that feels natural.", icon: "Heart" },
        { title: "Commercial & Product", description: "Clean, compelling product and lifestyle photography for brands, e-commerce, and campaigns.", icon: "ShoppingBag" },
        { title: "Editorial & Fashion", description: "Creative, magazine-quality shoots with a strong point of view. Concept to final delivery.", icon: "Aperture" },
      ],
      portfolioFilters: ["Featured", "Portraits", "Weddings", "Commercial", "All"],
      seo: { siteUrl: "https://portfolio.startupspeedrun.org", locale: "en-US", serviceTypes: ["Photography"], expertise: ["Photography"] },
    },
    content: {
      settings: {
        name: "Maya Chen", role: "Photographer", tagline: "Portrait & Wedding Photographer — New York",
        location: "New York, NY", bio: "I photograph people as they are — not as they think they should be. My work lives in the space between posed and candid, where real expression happens.\n\nWhether it's a wedding, a brand shoot, or a quiet editorial afternoon, I bring patience and a sharp eye.",
        heroVideoId: "", profilePhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1200&fit=crop",
        aboutHeading: "Honest frames. Real people.", phone: "", whatsapp: "", email: "maya@example.com", bookingUrl: "https://cal.com/example",
        socials: { instagram: "#", linkedin: "#" },
      },
      hero: { images: ["https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&h=1080&fit=crop"], intervalMs: 5000 },
      projects: [
        { id: "p1", title: "Emma & James — Brooklyn Wedding", videoUrl: "#", videoId: "", platform: "instagram", category: "Wedding", tags: ["Weddings"], priority: 1, featured: true, thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop" },
        { id: "p2", title: "Vogue Italia Editorial", videoUrl: "#", videoId: "", platform: "instagram", category: "Editorial", tags: ["Commercial"], priority: 1, featured: true, thumbnailUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=450&fit=crop" },
        { id: "p3", title: "Corporate Headshots — Stripe", videoUrl: "#", videoId: "", platform: "instagram", category: "Portrait", tags: ["Portraits"], priority: 2, featured: true, thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop" },
        { id: "p4", title: "Aesop Product Campaign", videoUrl: "#", videoId: "", platform: "instagram", category: "Commercial", tags: ["Commercial"], priority: 2, thumbnailUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=450&fit=crop" },
        { id: "p5", title: "Sara & David — Napa Valley", videoUrl: "#", videoId: "", platform: "instagram", category: "Wedding", tags: ["Weddings"], priority: 3, thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=450&fit=crop" },
        { id: "p6", title: "The Line Hotel — Interiors", videoUrl: "#", videoId: "", platform: "instagram", category: "Commercial", tags: ["Commercial"], priority: 3, thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop" },
      ],
      testimonials: [
        { id: "pt1", name: "Emma Torres", role: "Bride", quote: "Maya captured moments we didn't even know were happening. Looking through our photos feels like reliving the best day of our lives.", order: 0 },
        { id: "pt2", name: "David Kim", role: "Marketing Lead, Aesop", quote: "Her eye for composition and light is extraordinary. The product shots she delivered were gallery-worthy.", order: 1 },
      ],
      filters: ["Featured", "Portraits", "Weddings", "Commercial", "All"],
    },
  },

  // ── Designer ────────────────────────────────────────────────────────
  designer: {
    label: "Designer",
    description: "Bold dark theme with purple accents. Behance/Dribbble showcase.",
    config: {
      personal: {
        name: "Jordan Patel",
        role: "Brand Designer",
        tagline: "Brand Designer & Creative Director — London",
        location: "London, UK",
        bio: "I build brands that people remember. From early-stage startups to established companies looking for a refresh, I work at the intersection of strategy and aesthetics.\n\nEvery project starts with understanding who you're trying to reach — then designing the visual language to get there.",
        profilePhotoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&h=1200&fit=crop",
        aboutHeading: "Brands people remember.",
      },
      contact: { email: "jordan@example.com", bookingUrl: "https://cal.com/example" },
      socials: { behance: "#", dribbble: "#", instagram: "#", linkedin: "#" },
      theme: { palette: "neon", fonts: "modern" },
      sections: { hero: true, about: true, services: true, portfolio: true, testimonials: true, contact: true },
      services: [
        { title: "Brand Identity", description: "Logos, color systems, typography, and brand guidelines that give your business a cohesive visual language.", icon: "Palette" },
        { title: "UI/UX Design", description: "User interfaces and experiences for web and mobile. Research-driven design that looks great and works better.", icon: "Layout" },
        { title: "Print & Packaging", description: "Business cards, brochures, packaging, and environmental design. Tangible design that makes an impression.", icon: "Printer" },
        { title: "Illustration", description: "Custom illustrations, icons, and visual assets for digital and print. Unique artwork that tells your story.", icon: "PenTool" },
      ],
      portfolioFilters: ["Featured", "Branding", "UI/UX", "Print", "All"],
      seo: { siteUrl: "https://portfolio.startupspeedrun.org", locale: "en-US", serviceTypes: ["Design"], expertise: ["Design"] },
    },
    content: {
      settings: {
        name: "Jordan Patel", role: "Brand Designer", tagline: "Brand Designer & Creative Director — London",
        location: "London, UK", bio: "I build brands that people remember. From early-stage startups to established companies looking for a refresh, I work at the intersection of strategy and aesthetics.\n\nEvery project starts with understanding who you're trying to reach — then designing the visual language to get there.",
        heroVideoId: "", profilePhotoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&h=1200&fit=crop",
        aboutHeading: "Brands people remember.", phone: "", whatsapp: "", email: "jordan@example.com", bookingUrl: "https://cal.com/example",
        socials: { behance: "#", dribbble: "#", instagram: "#", linkedin: "#" },
      },
      hero: { images: ["https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&h=1080&fit=crop"], intervalMs: 5000 },
      projects: [
        { id: "d1", title: "Monzo — Brand Refresh", videoUrl: "#", videoId: "", platform: "behance", category: "Branding", tags: ["Branding"], priority: 1, featured: true, thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop" },
        { id: "d2", title: "Notion — Dashboard Redesign", videoUrl: "#", videoId: "", platform: "dribbble", category: "UI/UX", tags: ["UI/UX"], priority: 1, featured: true, thumbnailUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=450&fit=crop" },
        { id: "d3", title: "Oatly — Packaging System", videoUrl: "#", videoId: "", platform: "behance", category: "Print", tags: ["Print"], priority: 2, featured: true, thumbnailUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=450&fit=crop" },
        { id: "d4", title: "Arc Browser — Icon Set", videoUrl: "#", videoId: "", platform: "dribbble", category: "UI/UX", tags: ["UI/UX"], priority: 2, thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop" },
        { id: "d5", title: "Gymshark — Visual Identity", videoUrl: "#", videoId: "", platform: "behance", category: "Branding", tags: ["Branding"], priority: 3, thumbnailUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&h=450&fit=crop" },
        { id: "d6", title: "Stripe Press — Book Design", videoUrl: "#", videoId: "", platform: "behance", category: "Print", tags: ["Print"], priority: 3, thumbnailUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=450&fit=crop" },
      ],
      testimonials: [
        { id: "dt1", name: "Lisa Park", role: "CEO, Monzo", quote: "Jordan took our brief and turned it into something we couldn't have imagined. The rebrand increased our brand recognition by 40%.", order: 0 },
        { id: "dt2", name: "Tom Wright", role: "Product Lead, Notion", quote: "Thoughtful, precise, and fast. Jordan's UI work is as functional as it is beautiful.", order: 1 },
      ],
      filters: ["Featured", "Branding", "UI/UX", "Print", "All"],
    },
  },
};
