import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/storage";
import config from "../../portfolio.config";
import type { Project } from "@/lib/types";

// Revalidate at most once per minute (ISR safety net)
export const revalidate = 60;

const siteUrl = config.seo.siteUrl || "https://example.com";

function iso8601Duration(minutes?: number): string | undefined {
  if (!minutes || minutes <= 0) return undefined;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `PT${h ? `${h}H` : ""}${m || !h ? `${m}M` : ""}`;
}

function buildVideoObject(p: Project, authorName: string) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: p.title,
    description: `${p.title} — a ${p.category.toLowerCase()} by ${authorName}.`,
    thumbnailUrl: `https://img.youtube.com/vi/${p.videoId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${p.videoId}`,
    contentUrl: `https://youtu.be/${p.videoId}`,
    author: { "@type": "Person", name: authorName },
    keywords: p.tags.join(", "),
  };
  if (p.uploadDate) base.uploadDate = p.uploadDate;
  const duration = iso8601Duration(p.durationMinutes);
  if (duration) base.duration = duration;
  return base;
}

export default async function Home() {
  const content = await getContent();
  const { settings, hero, projects, testimonials, filters } = content;

  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  const sameAs = Object.values(settings.socials).filter((url) => url && url !== "#");

  const profileImageUrl = settings.profilePhotoUrl;

  // Collapse bio to a single-paragraph description without mid-word truncation
  const cleanBio = settings.bio.replace(/\s+/g, " ").trim();
  const personDescription =
    cleanBio.length <= 300 ? cleanBio : cleanBio.slice(0, cleanBio.lastIndexOf(" ", 297)) + "\u2026";

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: settings.name,
    jobTitle: settings.role,
    description: personDescription,
    url: siteUrl,
    image: profileImageUrl,
    email: settings.email,
    ...(settings.whatsapp ? { telephone: `+${settings.whatsapp}` } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.location.split(",")[0]?.trim(),
      addressCountry: settings.location.split(",").pop()?.trim(),
    },
    worksFor: {
      "@type": "Organization",
      name: `${settings.name} ${settings.role}`,
    },
    knowsAbout: config.seo.expertise,
    sameAs,
  };

  const businessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: `${settings.name} — ${settings.role}`,
    description: `${settings.name} — ${settings.tagline}. Based in ${settings.location}.`,
    url: siteUrl,
    image: profileImageUrl,
    founder: { "@id": `${siteUrl}/#person` },
    email: settings.email,
    ...(settings.whatsapp ? { telephone: `+${settings.whatsapp}` } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.location.split(",")[0]?.trim(),
      addressCountry: settings.location.split(",").pop()?.trim(),
    },
    serviceType: config.seo.serviceTypes,
    sameAs,
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${settings.name} — ${settings.role}`,
    description: `${settings.name} — ${settings.tagline}.`,
    inLanguage: config.seo.locale.replace("_", "-"),
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const videoLd = sortedProjects
    .filter((p) => p.platform === "youtube")
    .map((p) => buildVideoObject(p, settings.name));

  const reviewsLd = testimonials && testimonials.length > 0
    ? testimonials.map((t) => ({
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: { "@id": `${siteUrl}/#business` },
        reviewBody: t.quote,
        author: {
          "@type": "Person",
          name: t.name,
          ...(t.role ? { jobTitle: t.role } : {}),
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      }))
    : [];

  const heroImageForPreload = hero.images?.[0];

  return (
    <>
      {heroImageForPreload && (
        <link
          rel="preload"
          as="image"
          href={heroImageForPreload}
          fetchPriority="high"
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
      />
      {videoLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
      {reviewsLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsLd) }}
        />
      )}

      <main id="main-content" className="selection:bg-cinema-accent selection:text-black">
        <Navigation settings={settings} />
        {config.sections.hero && <Hero settings={settings} hero={hero} />}
        {config.sections.about && <About settings={settings} />}
        {config.sections.services && <Services />}
        {config.sections.portfolio && <Portfolio projects={sortedProjects} filters={filters} />}
        {config.sections.testimonials && <Testimonials testimonials={testimonials} />}
        {config.sections.contact && <ContactCTA settings={settings} />}
        <Footer settings={settings} />
      </main>
    </>
  );
}
