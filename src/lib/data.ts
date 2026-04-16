import { Content } from "./types";
import config from "../../portfolio.config";

/**
 * Default content generated from portfolio.config.ts.
 * This serves as the fallback when no content.json exists in storage.
 * Users customize their site by editing portfolio.config.ts (for structure)
 * and using the admin panel (for content like projects and testimonials).
 */
export const defaultContent: Content = {
  settings: {
    name: config.personal.name,
    role: config.personal.role,
    tagline: config.personal.tagline,
    location: config.personal.location,
    bio: config.personal.bio,
    heroVideoId: "",
    profilePhotoUrl: config.personal.profilePhotoUrl,
    aboutHeading: config.personal.aboutHeading,
    phone: config.contact.phone || "",
    whatsapp: config.contact.whatsapp || "",
    email: config.contact.email,
    bookingUrl: config.contact.bookingUrl || "",
    socials: Object.fromEntries(
      Object.entries(config.socials).filter(([, v]) => v && v !== "#")
    ),
  },
  hero: {
    images: config.hero.backgroundMedia,
    intervalMs: config.hero.intervalMs,
  },
  projects: [
    {
      id: "demo-1",
      title: "Project One",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ",
      platform: "youtube",
      category: "Brand Film",
      tags: [config.portfolioFilters[1] || "Brand Films"],
      priority: 1,
      featured: true,
    },
    {
      id: "demo-2",
      title: "Project Two",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ",
      platform: "youtube",
      category: "Commercial",
      tags: [config.portfolioFilters[1] || "Commercials"],
      priority: 2,
    },
    {
      id: "demo-3",
      title: "Project Three",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ",
      platform: "youtube",
      category: "Event",
      tags: [config.portfolioFilters[3] || "Events"],
      priority: 3,
    },
  ],
  testimonials: [
    {
      id: "demo-t1",
      name: "Jane Smith",
      role: "Marketing Director",
      quote:
        "Working together was seamless from start to finish. The final result exceeded our expectations and perfectly captured what our brand is about.",
      order: 0,
    },
    {
      id: "demo-t2",
      name: "Marcus Chen",
      role: "Founder & CEO",
      quote:
        "Professional, creative, and incredibly easy to work with. The project was delivered on time and the quality speaks for itself.",
      order: 1,
    },
  ],
  filters: config.portfolioFilters,
};
