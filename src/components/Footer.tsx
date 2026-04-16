import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { socialIconMap } from "./SocialIcons";
import { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const whatsappUrl = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp}`
    : null;
  const telNumber = settings.phone || (settings.whatsapp ? `+${settings.whatsapp}` : null);

  // Build social links from settings.socials (dynamic, not hardcoded)
  const socialLinks = Object.entries(settings.socials)
    .filter(([, url]) => url && url !== "#")
    .map(([key, url]) => {
      const mapping = socialIconMap[key];
      if (!mapping) return null;
      return { key, url, icon: mapping.icon, label: mapping.label };
    })
    .filter(Boolean) as { key: string; url: string; icon: React.FC<{ className?: string }>; label: string }[];

  return (
    <footer id="contact" className="bg-black border-t border-cinema-accent/20 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <p className="font-serif text-3xl text-white mb-2">
            {settings.name.toUpperCase()}
          </p>
          <p className="text-cinema-accent text-sm tracking-widest uppercase">
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
              <div className="p-3 bg-cinema-900 rounded-full text-gray-400 group-hover:text-black group-hover:bg-cinema-accent transition-all duration-300">
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
              <div className="p-3 bg-cinema-900 rounded-full text-gray-400 group-hover:text-black group-hover:bg-cinema-accent transition-all duration-300">
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
              <div className="p-3 bg-cinema-900 rounded-full text-gray-400 group-hover:text-black group-hover:bg-cinema-accent transition-all duration-300">
                <Phone className="w-5 h-5" />
              </div>
            </a>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-wider">
        <p>
          &copy; {new Date().getFullYear()} {settings.name}. All rights
          reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-cinema-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-cinema-accent transition-colors">Terms</Link>
        </div>
        <p>Based in {settings.location}</p>
      </div>
    </footer>
  );
}
