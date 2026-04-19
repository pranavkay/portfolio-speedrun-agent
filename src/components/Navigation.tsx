"use client";

import { useState, useEffect } from "react";
import { SiteSettings } from "@/lib/types";
import config from "../../portfolio.config";

export function Navigation({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaUrl = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi ${settings.name}, I'd like to discuss a project`)}`
    : settings.bookingUrl || `mailto:${settings.email}`;
  const ctaExternal = !!settings.whatsapp || !!settings.bookingUrl;

  const navLinks: { label: string; href: string }[] = [];
  if (config.sections.about) navLinks.push({ label: "About", href: "#about" });
  if (config.sections.portfolio) navLinks.push({ label: "Work", href: "#portfolio" });
  if (config.sections.contact) navLinks.push({ label: "Contact", href: "#contact" });

  const nameParts = settings.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-on-accent focus:font-bold focus:text-sm focus:rounded"
      >
        Skip to content
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? "bg-overlay backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
        aria-label="Main navigation"
      >
        <a href="#main-content" className="text-xl font-serif font-bold tracking-widest text-heading">
          <span className="text-accent">{firstName.toUpperCase()}</span>
          {lastName ? ` ${lastName.toUpperCase()}` : ""}
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-muted hover:text-accent transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={ctaUrl}
          target={ctaExternal ? "_blank" : undefined}
          rel={ctaExternal ? "noopener noreferrer" : undefined}
          className="hidden md:inline-block px-5 py-2 text-xs font-bold tracking-widest uppercase border border-border-accent text-muted hover:border-accent hover:text-accent transition-colors rounded-sm"
        >
          Let&apos;s Talk
        </a>

        <button
          className="md:hidden p-2 text-heading"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-overlay backdrop-blur-md md:hidden border-t border-border"
            role="menu"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-sm font-medium tracking-widest uppercase">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-muted hover:text-accent transition-colors" role="menuitem">
                  {link.label}
                </a>
              ))}
              <a
                href={ctaUrl}
                target={ctaExternal ? "_blank" : undefined}
                rel={ctaExternal ? "noopener noreferrer" : undefined}
                className="px-5 py-2 text-xs font-bold tracking-widest uppercase border border-accent text-accent rounded-sm"
                role="menuitem"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
