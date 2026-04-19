import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { socialIconMap } from "./SocialIcons";
import { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const whatsappUrl = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp}`
    : null;
  const telNumber = settings.phone || (settings.whatsapp ? `+${settings.whatsapp}` : null);

  const socialLinks = Object.entries(settings.socials)
    .filter(([, url]) => url && url !== "#")
    .map(([key, url]) => {
      const mapping = socialIconMap[key];
      if (!mapping) return null;
      return { key, url, icon: mapping.icon, label: mapping.label };
    })
    .filter(Boolean) as { key: string; url: string; icon: React.FC<{ className?: string }>; label: string }[];

  return (
    <footer id="contact" className="bg-surface-deep border-t border-accent/20 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <p className="font-serif text-3xl text-heading mb-2">
            {settings.name.toUpperCase()}
          </p>
          <p className="text-accent text-sm tracking-widest uppercase">
            {settings.role}
          </p>
        </div>

        <div className="flex items-center gap-8">
          {socialLinks.map(({ key, url, icon: Icon, label }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label={label}
            >
              <div className="p-3 bg-surface-light rounded-full text-muted group-hover:text-on-accent group-hover:bg-accent transition-all duration-300">
                <Icon />
              </div>
            </a>
          ))}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label="WhatsApp"
            >
              <div className="p-3 bg-surface-light rounded-full text-muted group-hover:text-on-accent group-hover:bg-accent transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
              </div>
            </a>
          )}
          {telNumber && (
            <a
              href={`tel:${telNumber.replace(/\s/g, "")}`}
              className="group flex flex-col items-center gap-2"
              aria-label="Call"
            >
              <div className="p-3 bg-surface-light rounded-full text-muted group-hover:text-on-accent group-hover:bg-accent transition-all duration-300">
                <Phone className="w-5 h-5" />
              </div>
            </a>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-faint uppercase tracking-wider">
        <p>&copy; {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-accent transition-colors">Terms</Link>
        </div>
        <p>Based in {settings.location}</p>
      </div>

      <div className="max-w-6xl mx-auto mt-6 text-center">
        <a
          href="https://github.com/pranavkay/portfolio-speedrun-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] text-faint/50 hover:text-faint transition-colors tracking-wider uppercase"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          Built with Portfolio Speedrun
        </a>
      </div>
    </footer>
  );
}
