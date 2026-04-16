import { Mail, MessageCircle, Phone } from "lucide-react";
import { SiteSettings } from "@/lib/types";

export function ContactCTA({ settings }: { settings: SiteSettings }) {
  const whatsappUrl = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi ${settings.name}, I have a project in mind`)}`
    : null;

  const phoneUrl = settings.phone ? `tel:${settings.phone}` : null;

  return (
    <section className="py-24 bg-cinema-900 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
          Have a vision in mind?
        </h2>
        <p className="text-gray-400 mb-10 text-lg font-light max-w-xl mx-auto">
          Let&apos;s collaborate to bring your ideas to life.
          Open for projects in {settings.location} and worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-cinema-accent text-cinema-950 font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(192,160,98,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          ) : (
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-cinema-accent text-cinema-950 font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(192,160,98,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          )}

          {phoneUrl && (
            <a
              href={phoneUrl}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/20 text-white font-bold tracking-widest uppercase text-sm hover:border-cinema-accent hover:text-cinema-accent transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
