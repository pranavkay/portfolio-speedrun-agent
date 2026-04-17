import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Settings, Palette, Globe, Search, Share2, Smartphone, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio Speedrun — Build Your Creative Portfolio in 30 Minutes",
  description: "Free, open-source portfolio template for videographers, photographers, and designers. AI-powered setup. Deploy in 30 minutes.",
};

const REPO_URL = "https://github.com/pranavkay/portfolio-speedrun-agent";

const presets = [
  {
    key: "videographer",
    label: "Videographer",
    persona: "Alex Rivera",
    description: "Dark cinematic theme with gold accents. YouTube & Vimeo video embeds. Built for filmmakers and video producers.",
    gradient: "from-[#1e1e1e] to-[#050505]",
    accent: "#c0a062",
    services: "Commercials · Brand Films · Events · Documentary",
  },
  {
    key: "photographer",
    label: "Photographer",
    persona: "Maya Chen",
    description: "Clean, minimal light theme. Image-first gallery layout. Perfect for portrait and wedding photographers.",
    gradient: "from-[#f5f5f5] to-[#fafafa]",
    accent: "#18181b",
    services: "Portraits · Weddings · Commercial · Editorial",
    light: true,
  },
  {
    key: "designer",
    label: "Designer",
    persona: "Jordan Patel",
    description: "Bold dark theme with purple accents. Behance & Dribbble support. Made for graphic and UI/UX designers.",
    gradient: "from-[#262626] to-[#0a0a0a]",
    accent: "#a855f7",
    services: "Brand Identity · UI/UX · Print · Illustration",
  },
];

const features = [
  { icon: Settings, title: "Single Config File", text: "One file controls your entire site — name, colors, fonts, sections, everything." },
  { icon: Zap, title: "Built-in Admin Panel", text: "Update portfolio, testimonials, and settings from a visual dashboard. No code." },
  { icon: Palette, title: "5 Color Palettes", text: "Cinema, Studio, Gallery, Neon, Earth — or define your own custom colors." },
  { icon: Globe, title: "Zero-Cost Hosting", text: "Deploy on Vercel free tier. No monthly bills, no hidden fees." },
  { icon: Search, title: "SEO Built In", text: "Schema.org, Open Graph, sitemap, robots.txt — all generated automatically." },
  { icon: Share2, title: "10 Social Platforms", text: "Instagram, YouTube, LinkedIn, Behance, Dribbble, Vimeo, TikTok, and more." },
  { icon: Smartphone, title: "Fully Responsive", text: "Looks great on phones, tablets, and desktops. Every breakpoint tested." },
  { icon: Code2, title: "Open Source", text: "MIT licensed. Free forever. Fork it, customize it, make it yours." },
];

const faqs = [
  { q: "Do I need to know how to code?", a: "No. The AI assistant handles all the code. You just answer questions about your work, pick colors, and review the result." },
  { q: "How much does it cost?", a: "The template is free and open source. Hosting on Vercel is free. The only cost is your AI assistant subscription (Claude, Codex, or Cursor)." },
  { q: "Can I change things after I deploy?", a: "Yes. Your site has a built-in admin panel at /admin where you can update everything — portfolio items, bio, photos, testimonials — without touching code." },
  { q: "What if I want a custom design?", a: "Start with a preset and customize from there. Change colors, fonts, sections, and layout. For advanced work, the code is clean and well-organized." },
  { q: "Can I use my own domain?", a: "Yes. Vercel lets you connect a custom domain for free. Buy a domain from any registrar and point it to your Vercel project." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans antialiased">
      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav className="border-b border-white/[0.06] px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-lg font-extrabold tracking-[3px] uppercase">
            <span className="text-[#c0a062]">Portfolio</span> Speedrun
          </span>
          <div className="flex items-center gap-6">
            <Link href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors tracking-wider uppercase hidden sm:inline">
              GitHub
            </Link>
            <Link href={REPO_URL} target="_blank" rel="noopener noreferrer" className="px-5 py-2 text-xs font-bold tracking-widest uppercase bg-[#c0a062] text-black hover:bg-white transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-[2px] uppercase text-[#c0a062] border border-[#c0a062]/20 rounded-full bg-[#c0a062]/5">
            Open Source &middot; Free Forever
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8">
            Your creative portfolio.
            <br />
            <span className="text-[#c0a062]">Live in 30 minutes.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            A beautiful portfolio template for videographers, photographers, and designers. AI does the hard part — you just answer questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase bg-[#c0a062] text-black hover:bg-white transition-all">
              <Code2 className="w-4 h-4" />
              Get Started
            </Link>
            <Link href="#demos" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase border border-white/20 text-white hover:border-[#c0a062] hover:text-[#c0a062] transition-all">
              See Live Demos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Live Demos ─────────────────────────────────────────────── */}
      <section id="demos" className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Pick your profession. See it live.
            </h2>
            <p className="text-lg text-gray-400">Three presets, each designed for a specific creative field. Click to explore.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {presets.map((preset) => (
              <Link
                key={preset.key}
                href={`/demo/${preset.key}`}
                className="group block border border-white/[0.06] rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Color swatch */}
                <div className={`h-40 bg-gradient-to-br ${preset.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
                  <span
                    className="text-sm font-extrabold tracking-[4px] uppercase"
                    style={{ color: preset.accent }}
                  >
                    {preset.persona}
                  </span>
                  <span className="text-[10px] tracking-[3px] uppercase mt-2 opacity-50" style={{ color: preset.light ? "#000" : "#fff" }}>
                    {preset.services}
                  </span>
                  {/* Hover arrow */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                      View Demo <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{preset.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{preset.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Three steps. That&apos;s it.</h2>
            <p className="text-lg text-gray-400">No coding skills needed. The AI handles everything.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Prepare Your Content", text: "Gather 5-10 portfolio pieces, a bio, your services, and a headshot. That's your Content Kit." },
              { num: "2", title: "Talk to the AI", text: "Open Claude Code, Codex, or Cursor and say \"help me build my portfolio.\" It asks questions, you answer." },
              { num: "3", title: "Go Live", text: "Deploy to Vercel for free. Your portfolio is on the internet. Update it anytime from the admin panel." },
            ].map((step) => (
              <div key={step.num} className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg p-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#c0a062]/10 text-[#c0a062] text-xl font-extrabold mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal Demo ──────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">AI does the heavy lifting.</h2>
            <p className="text-lg text-gray-400">Here&apos;s what a setup conversation looks like.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg overflow-hidden font-mono text-sm">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-gray-500">Terminal — Claude Code</span>
            </div>
            {/* Content */}
            <div className="p-6 space-y-4 text-[13px] leading-relaxed">
              <div>
                <span className="text-[#c0a062]">you:</span>{" "}
                <span className="text-gray-300">Help me set up my portfolio. I&apos;m a wedding photographer in NYC.</span>
              </div>
              <div>
                <span className="text-blue-400">claude:</span>{" "}
                <span className="text-gray-400">Great! Let&apos;s get your portfolio live. First — do you have your Content Kit ready? I need at least 5 portfolio pieces, a bio, and your services.</span>
              </div>
              <div>
                <span className="text-[#c0a062]">you:</span>{" "}
                <span className="text-gray-300">Yes! I have 8 wedding galleries on my Google Drive and my bio is ready.</span>
              </div>
              <div>
                <span className="text-blue-400">claude:</span>{" "}
                <span className="text-gray-400">Perfect. I&apos;ll set you up with the Photographer preset — light, minimal theme that lets your images do the talking. What&apos;s your full name?</span>
              </div>
              <div className="text-gray-600">...</div>
              <div>
                <span className="text-blue-400">claude:</span>{" "}
                <span className="text-gray-400">Done! Your portfolio is running at</span>{" "}
                <span className="text-green-400">http://localhost:3000</span>
                <span className="text-gray-400">. Take a look and tell me what you&apos;d like to change.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Everything you need. Nothing you don&apos;t.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon className="w-5 h-5 text-[#c0a062] mb-3" />
                <h3 className="text-base font-bold mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">Questions</h2>
          <div className="space-y-0">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-white/[0.06] py-6">
                <h3 className="text-lg font-semibold mb-2">{q}</h3>
                <p className="text-gray-400 text-[15px] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 text-center border-t border-white/[0.06]">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to build?</h2>
        <p className="text-lg text-gray-400 mb-10">Your portfolio could be live by the end of the hour.</p>
        <Link href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold tracking-widest uppercase bg-[#c0a062] text-black hover:bg-white transition-all">
          Get Started — It&apos;s Free
        </Link>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-white/[0.06] text-center">
        <p className="text-xs text-gray-600 tracking-wider uppercase">
          Portfolio Speedrun — by{" "}
          <Link href="https://github.com/pranavkay" target="_blank" rel="noopener noreferrer" className="text-[#c0a062] hover:text-[#e0c078] transition-colors">
            Startup Speedrun
          </Link>
          {" "}&middot; MIT License
        </p>
      </footer>
    </div>
  );
}
