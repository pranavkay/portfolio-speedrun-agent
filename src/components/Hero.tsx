import { Calendar, MessageCircle, Mail } from "lucide-react";
import { SiteSettings, HeroConfig } from "@/lib/types";
import { HeroGallery } from "./HeroGallery";

export function Hero({
  settings,
  hero,
}: {
  settings: SiteSettings;
  hero: HeroConfig;
}) {
  const images = hero.images.length > 0 ? hero.images : [""];
  const isGallery = images.length > 1;

  // Build primary CTA
  const primaryCta = settings.bookingUrl
    ? { href: settings.bookingUrl, label: "Book a Call", icon: Calendar, external: true }
    : null;

  // Build secondary CTA
  const secondaryCta = settings.whatsapp
    ? {
        href: `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi ${settings.name}, I'd like to discuss a project`)}`,
        label: "WhatsApp",
        icon: MessageCircle,
        external: true,
      }
    : {
        href: `mailto:${settings.email}`,
        label: "Get in Touch",
        icon: Mail,
        external: false,
      };

  return (
    <section
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-black">
        {isGallery ? (
          <HeroGallery
            images={images}
            intervalMs={hero.intervalMs}
            altPrefix={settings.name}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 scale-105"
            role="img"
            aria-label={`Background for ${settings.name}`}
            style={{ backgroundImage: `url('${images[0]}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/40 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(5,5,5,0.2),rgba(5,5,5,1))] opacity-80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <p className="text-cinema-accent font-sans font-medium tracking-[0.2em] text-sm md:text-base uppercase mb-6 border-b border-cinema-accent/30 pb-2">
          {settings.location}
        </p>

        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl text-white font-bold mb-6 leading-none tracking-tight">
          <span className="block">{settings.name.toUpperCase()}</span>
          <span className="sr-only"> — {settings.role} in {settings.location}</span>
        </h1>

        <p className="text-gray-300 italic text-xl md:text-3xl max-w-2xl mx-auto mb-12 font-light tracking-wide">
          {settings.tagline}
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          {primaryCta && (
            <a
              href={primaryCta.href}
              target={primaryCta.external ? "_blank" : undefined}
              rel={primaryCta.external ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-cinema-accent text-black hover:bg-white transition-all duration-500 rounded-sm"
            >
              <primaryCta.icon className="w-4 h-4" aria-hidden="true" />
              <span className="font-sans font-semibold tracking-widest text-sm uppercase">
                {primaryCta.label}
              </span>
            </a>
          )}
          <a
            href={secondaryCta.href}
            target={secondaryCta.external ? "_blank" : undefined}
            rel={secondaryCta.external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white border border-white/30 hover:border-cinema-accent hover:text-cinema-accent transition-all duration-500 rounded-sm"
          >
            <secondaryCta.icon className="w-4 h-4" aria-hidden="true" />
            <span className="font-sans font-semibold tracking-widest text-sm uppercase">
              {secondaryCta.label}
            </span>
          </a>
          <a
            href="#portfolio"
            className="text-white/70 hover:text-cinema-accent transition-colors font-sans text-sm tracking-widest uppercase border-b border-transparent hover:border-cinema-accent pb-1"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
