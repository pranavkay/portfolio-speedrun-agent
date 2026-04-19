import Image from "next/image";
import { SiteSettings } from "@/lib/types";

export function About({ settings }: { settings: SiteSettings }) {
  const paragraphs = settings.bio.split("\n\n").filter(Boolean);

  return (
    <section id="about" className="py-24 bg-surface-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-surface to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700 ease-out">
              <Image
                src={settings.profilePhotoUrl}
                alt={`Portrait of ${settings.name}`}
                width={900}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-surface/80 backdrop-blur-md p-4 border-l-2 border-accent">
                  <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">
                    Current Base
                  </p>
                  <p className="text-heading font-serif">{settings.location}</p>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-6 -left-6 w-full h-full border border-accent/30 rounded-lg" />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <p className="text-accent font-sans font-bold tracking-widest text-sm uppercase mb-4">
              About Me
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-heading mb-8 leading-tight">
              {settings.aboutHeading}
            </h2>

            <div className="space-y-4 mb-8">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-muted text-lg leading-relaxed font-light">
                  {p}
                </p>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-surface-card hover:bg-accent/10 border border-border text-heading rounded transition-colors text-sm font-medium tracking-wide"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
