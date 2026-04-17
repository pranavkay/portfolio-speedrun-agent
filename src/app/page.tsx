import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Settings, Palette, Globe, Search, Share2, Smartphone, Code2, Copy, Terminal } from "lucide-react";
import { CopyPromptButton } from "./CopyPromptButton";

export const metadata: Metadata = {
  title: "Portfolio Speedrun — Build Your Creative Portfolio in 30 Minutes",
  description: "Free, open-source portfolio template for videographers, photographers, and designers. Paste one prompt into Claude Code or Codex. AI builds the rest.",
};

const REPO_URL = "https://github.com/pranavkay/portfolio-speedrun-agent";

const THE_PROMPT = `Clone https://github.com/pranavkay/portfolio-speedrun-agent and help me set up my portfolio website. I'm a [photographer/videographer/designer]. Read the CLAUDE.md for instructions.`;

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
  { q: "Do I need to know how to code?", a: "No. You paste one prompt and the AI handles everything — cloning the project, installing dependencies, customizing your content, and deploying." },
  { q: "What AI tools work with this?", a: "Claude Code, OpenAI Codex, and Cursor all work. The project includes a CLAUDE.md file that teaches any AI assistant how to set up your portfolio." },
  { q: "How much does it cost?", a: "The template is free and open source. Hosting on Vercel is free. You just need a subscription to an AI coding tool." },
  { q: "Can I change things after I deploy?", a: "Yes. Your site has a built-in admin panel at /admin where you can update everything — portfolio items, bio, photos, testimonials — without touching code." },
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
            <Link href="#start" className="px-5 py-2 text-xs font-bold tracking-widest uppercase bg-[#c0a062] text-black hover:bg-white transition-colors">
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
            <span className="text-[#c0a062]">One prompt.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Paste one prompt into Claude Code or Codex. The AI clones the project, asks about your work, builds your site, and deploys it. You just answer questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#start" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase bg-[#c0a062] text-black hover:bg-white transition-all">
              <Terminal className="w-4 h-4" />
              Copy the Prompt
            </Link>
            <Link href="#demos" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase border border-white/20 text-white hover:border-[#c0a062] hover:text-[#c0a062] transition-all">
              See Live Demos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Prompt ─────────────────────────────────────────────── */}
      <section id="start" className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">One prompt. That&apos;s it.</h2>
            <p className="text-lg text-gray-400">
              Open <Link href="https://claude.ai/code" target="_blank" rel="noopener noreferrer" className="text-[#c0a062] hover:text-[#e0c078]">Claude Code</Link>,{" "}
              <Link href="https://openai.com/codex" target="_blank" rel="noopener noreferrer" className="text-[#c0a062] hover:text-[#e0c078]">Codex</Link>, or{" "}
              <Link href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="text-[#c0a062] hover:text-[#e0c078]">Cursor</Link> and paste this:
            </p>
          </div>

          {/* Prompt box */}
          <div className="relative bg-[#0a0a0a] border border-[#c0a062]/30 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <CopyPromptButton prompt={THE_PROMPT} />
            </div>
            <div className="p-6 md:p-8">
              <p className="font-mono text-[15px] md:text-base text-gray-200 leading-relaxed whitespace-pre-wrap">
                {THE_PROMPT}
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Replace <span className="text-gray-300">[photographer/videographer/designer]</span> with your profession. The AI handles everything else.
          </p>

          {/* What happens next */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {[
              { step: "1", label: "AI clones the project" },
              { step: "2", label: "Asks about your work" },
              { step: "3", label: "Builds your site" },
              { step: "4", label: "Deploys it for free" },
            ].map(({ step, label }) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#c0a062]/10 text-[#c0a062] font-bold text-sm flex items-center justify-center">
                  {step}
                </div>
                <span className="text-sm text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before You Start ───────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Before you paste.</h2>
            <p className="text-lg text-gray-400">Have these ready. The AI will ask for them.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg p-8">
              <h3 className="text-lg font-bold mb-4 text-[#c0a062]">Must-have</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-3"><span className="text-[#c0a062]">→</span> 5-10 portfolio pieces (links or images)</li>
                <li className="flex gap-3"><span className="text-[#c0a062]">→</span> A profile photo</li>
                <li className="flex gap-3"><span className="text-[#c0a062]">→</span> A short bio (1-2 paragraphs)</li>
                <li className="flex gap-3"><span className="text-[#c0a062]">→</span> Your email address</li>
                <li className="flex gap-3"><span className="text-[#c0a062]">→</span> 3-5 services you offer</li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg p-8">
              <h3 className="text-lg font-bold mb-4 text-gray-500">Nice-to-have</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex gap-3"><span>→</span> Client testimonials</li>
                <li className="flex gap-3"><span>→</span> Social media links</li>
                <li className="flex gap-3"><span>→</span> Hero background image</li>
                <li className="flex gap-3"><span>→</span> A tagline</li>
                <li className="flex gap-3"><span className="opacity-0">→</span> <span className="italic">Can add all of these later via /admin</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Demos ─────────────────────────────────────────────── */}
      <section id="demos" className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              See what you&apos;ll get.
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
                <div className={`h-40 bg-gradient-to-br ${preset.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
                  <span className="text-sm font-extrabold tracking-[4px] uppercase" style={{ color: preset.accent }}>
                    {preset.persona}
                  </span>
                  <span className="text-[10px] tracking-[3px] uppercase mt-2 opacity-50" style={{ color: preset.light ? "#000" : "#fff" }}>
                    {preset.services}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                      View Demo <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{preset.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{preset.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal Demo ──────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">What happens after you paste.</h2>
            <p className="text-lg text-gray-400">The AI has a conversation with you and builds your site.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg overflow-hidden font-mono text-sm">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-gray-500">Claude Code</span>
            </div>
            <div className="p-6 space-y-4 text-[13px] leading-relaxed">
              <div><span className="text-blue-400">claude:</span> <span className="text-gray-400">Cloning portfolio-speedrun-agent... Done. Installing dependencies...</span></div>
              <div><span className="text-blue-400">claude:</span> <span className="text-gray-400">Before we start building, do you have your Content Kit ready?</span></div>
              <div><span className="text-[#c0a062]">you:</span> <span className="text-gray-300">Yes! I have 8 wedding galleries and my bio is ready.</span></div>
              <div><span className="text-blue-400">claude:</span> <span className="text-gray-400">I&apos;ll set you up with the Photographer preset — light, minimal theme. What&apos;s your full name?</span></div>
              <div><span className="text-[#c0a062]">you:</span> <span className="text-gray-300">Maya Chen. I&apos;m based in Brooklyn.</span></div>
              <div><span className="text-blue-400">claude:</span> <span className="text-gray-400">Great. I&apos;ve updated your config and added your projects. Let me start the dev server...</span></div>
              <div><span className="text-blue-400">claude:</span> <span className="text-gray-400">Your portfolio is running at</span> <span className="text-green-400">localhost:3000</span><span className="text-gray-400">. Want to change anything?</span></div>
              <div><span className="text-[#c0a062]">you:</span> <span className="text-gray-300">Love it. Let&apos;s deploy.</span></div>
              <div><span className="text-blue-400">claude:</span> <span className="text-gray-400">Deployed to Vercel.</span> <span className="text-green-400">https://mayachen.vercel.app</span> <span className="text-gray-400">is live. ✓</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">What you get.</h2>
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
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready?</h2>
        <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto">Open your AI coding tool. Paste the prompt. Answer a few questions. Your portfolio is live.</p>
        <Link href="#start" className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold tracking-widest uppercase bg-[#c0a062] text-black hover:bg-white transition-all">
          <Terminal className="w-4 h-4" />
          Copy the Prompt
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
