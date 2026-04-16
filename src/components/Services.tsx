import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import config from "../../portfolio.config";

function getIcon(name: string): LucideIcon {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Star;
}

export function Services() {
  if (!config.sections.services) return null;

  return (
    <section
      id="services"
      className="py-24 px-4 md:px-8 bg-cinema-900 border-y border-white/5"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cinema-accent font-sans font-bold tracking-widest text-xs uppercase mb-3">
            What I Do
          </p>
          <h2
            id="services-heading"
            className="font-serif text-3xl md:text-5xl text-white leading-tight"
          >
            Services tailored to your vision.
          </h2>
          <div className="h-1 w-20 bg-cinema-accent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {config.services.map(({ title, description, icon }) => {
            const Icon = getIcon(icon);
            return (
              <article
                key={title}
                className="group relative bg-cinema-950 border border-white/5 rounded-lg p-8 hover:border-cinema-accent/30 transition-colors"
              >
                <Icon
                  className="w-8 h-8 text-cinema-accent mb-5"
                  aria-hidden="true"
                />
                <h3 className="font-serif text-2xl text-white mb-3">{title}</h3>
                <p className="text-gray-400 text-base leading-relaxed font-light">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
