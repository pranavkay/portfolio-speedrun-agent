import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal, Settings, Zap, Palette, Globe, Search, Share2, Smartphone, Code2 } from "lucide-react";
import { CopyPromptButton } from "./CopyPromptButton";

export const metadata: Metadata = {
  title: "Portfolio Builder — Startup Speedrun",
  description: "Free, open-source portfolio for creative freelancers. Paste one prompt into Claude Code or Codex. AI builds the rest. Part of the give-it-forward initiative.",
};

const REPO_URL = "https://github.com/pranavkay/portfolio-speedrun-agent";
const SPEEDRUN_URL = "https://www.startupspeedrun.org";

const THE_PROMPT = `Clone https://github.com/pranavkay/portfolio-speedrun-agent and help me set up my portfolio website. I'm a [photographer/videographer/designer]. Read the CLAUDE.md for instructions.`;

const presets = [
  {
    key: "videographer",
    label: "Videographer",
    persona: "Alex Rivera",
    description: "Dark cinematic theme with gold accents. YouTube & Vimeo video embeds.",
    gradient: "from-[#1e1e1e] to-[#050505]",
    accent: "#c0a062",
    accentName: "Cinema",
    services: "Commercials · Brand Films · Events",
  },
  {
    key: "photographer",
    label: "Photographer",
    persona: "Maya Chen",
    description: "Clean, minimal light theme. Image-first gallery layout.",
    gradient: "from-[#f5f5f5] to-[#fafafa]",
    accent: "#18181b",
    accentName: "Gallery",
    services: "Portraits · Weddings · Commercial",
    light: true,
  },
  {
    key: "designer",
    label: "Designer",
    persona: "Jordan Patel",
    description: "Bold dark theme with purple accents. Behance & Dribbble support.",
    gradient: "from-[#262626] to-[#0a0a0a]",
    accent: "#a855f7",
    accentName: "Neon",
    services: "Branding · UI/UX · Print",
  },
];

const features = [
  { icon: Settings, title: "Single Config File", text: "One file controls your entire site." },
  { icon: Zap, title: "Admin Panel", text: "Visual dashboard. No code needed." },
  { icon: Palette, title: "5 Palettes", text: "Cinema, Studio, Gallery, Neon, Earth." },
  { icon: Globe, title: "Free Hosting", text: "Deploy on Vercel. Zero cost." },
  { icon: Search, title: "SEO Built In", text: "Schema.org, Open Graph, sitemap." },
  { icon: Share2, title: "10 Socials", text: "Instagram, YouTube, Behance, more." },
  { icon: Smartphone, title: "Responsive", text: "Mobile, tablet, desktop." },
  { icon: Code2, title: "Open Source", text: "MIT licensed. Fork it. Own it." },
];

const faqs = [
  { q: "Do I need to know how to code?", a: "No. You paste one prompt and the AI handles everything — cloning, installing, customizing, and deploying." },
  { q: "What AI tools work?", a: "Claude Code, OpenAI Codex, and Cursor. The project includes a CLAUDE.md that teaches any AI how to set up your portfolio." },
  { q: "How much does it cost?", a: "The template and hosting are free. You just need a subscription to an AI coding tool." },
  { q: "Can I change things later?", a: "Yes. Your site has an admin panel at /admin for updating portfolio items, bio, photos — no code needed." },
  { q: "Can I use my own domain?", a: "Yes. Vercel lets you connect a custom domain for free." },
];

function RetroWindowBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#111] text-white">
      <div className="flex gap-[6px]">
        <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#27C93F]" />
      </div>
      <span className="pixel-text ml-2 text-white/70">{title}</span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111] antialiased" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav className="border-b-[3px] border-[#111] px-6 py-4 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href={SPEEDRUN_URL} className="flex items-center gap-3 group">
            {/* Lightning bolt icon */}
            <div className="w-8 h-8 bg-[#8B78E6] rounded flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none"><polygon points="18,2 6,18 15,18 14,30 26,14 17,14" fill="white"/></svg>
            </div>
            <span className="font-bold text-sm tracking-wide uppercase" style={{ fontFamily: "var(--font-syne)" }}>
              Startup Speedrun
            </span>
            <span className="hidden sm:inline px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#8B78E6] text-white rounded-sm pixel-text">
              Portfolio Builder
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B7B] hover:text-[#111] transition-colors tracking-wider uppercase hidden sm:inline" style={{ fontFamily: "var(--font-syne)" }}>
              GitHub
            </Link>
            <Link
              href="#start"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F02DF0] text-white border-[3px] border-[#111] shadow-[3px_3px_0_#111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all pixel-text"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero (dark) ────────────────────────────────────────────── */}
      <section className="relative bg-[#111] text-white py-20 md:py-28 px-6 overflow-hidden">
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)" }} />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <p className="pixel-text text-[#F02DF0] mb-8 tracking-wider">FREE TOOL &middot; GIVE IT FORWARD</p>

          <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            Your creative portfolio.
            <br />
            <span className="text-[#8B78E6]">One prompt.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Paste one prompt into Claude Code or Codex. The AI clones the project, asks about your work, builds your site, and deploys it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#start"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F02DF0] text-white border-[3px] border-white/20 shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_rgba(255,255,255,0.1)] transition-all pixel-text"
            >
              <Terminal className="w-4 h-4" />
              Copy the Prompt
            </Link>
            <Link
              href="#demos"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-white border-[3px] border-white/20 hover:border-[#8B78E6] hover:text-[#8B78E6] transition-all pixel-text"
            >
              See Demos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Prompt ─────────────────────────────────────────────── */}
      <section id="start" className="py-16 md:py-24 px-6 bg-[#F5F3FA]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="pixel-text text-[#8B78E6] mb-4">STEP 1</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: "var(--font-syne)" }}>Copy this prompt.</h2>
            <p className="text-[#6B6B7B]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Open{" "}
              <Link href="https://claude.ai/code" target="_blank" className="text-[#8B78E6] hover:text-[#7264C4]">Claude Code</Link>,{" "}
              <Link href="https://openai.com/codex" target="_blank" className="text-[#8B78E6] hover:text-[#7264C4]">Codex</Link>, or{" "}
              <Link href="https://cursor.com" target="_blank" className="text-[#8B78E6] hover:text-[#7264C4]">Cursor</Link>{" "}
              and paste it in.
            </p>
          </div>

          {/* Retro terminal window */}
          <div className="retro-window">
            <div className="flex items-center justify-between px-3 py-2 bg-[#111]">
              <div className="flex items-center gap-2">
                <div className="flex gap-[6px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#27C93F]" />
                </div>
                <span className="pixel-text ml-2 text-white/70">Terminal</span>
              </div>
              <CopyPromptButton prompt={THE_PROMPT} />
            </div>
            <div className="p-5 md:p-6 bg-[#0d0d0d]">
              <p className="text-[14px] md:text-[15px] text-green-300 leading-relaxed" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                {THE_PROMPT}
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-[#6B6B7B] mt-5">
            Replace <span className="text-[#111] font-medium">[photographer/videographer/designer]</span> with your profession.
          </p>

          {/* What happens next — 4 steps */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "1", label: "AI clones the project" },
              { n: "2", label: "Asks about your work" },
              { n: "3", label: "Builds your site" },
              { n: "4", label: "Deploys it for free" },
            ].map(({ n, label }) => (
              <div key={n} className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-[#8B78E6] text-white border-[3px] border-[#111] shadow-[2px_2px_0_#111] flex items-center justify-center pixel-text">
                  {n}
                </div>
                <span className="text-xs text-[#6B6B7B]" style={{ fontFamily: "var(--font-geist-sans)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content Kit ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="pixel-text text-[#8B78E6] mb-4">STEP 0</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: "var(--font-syne)" }}>Before you paste.</h2>
            <p className="text-[#6B6B7B]" style={{ fontFamily: "var(--font-geist-sans)" }}>Have these ready. The AI will ask for them.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="retro-window">
              <RetroWindowBar title="MUST HAVE" />
              <div className="p-5 space-y-3 text-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                <p className="flex gap-3"><span className="text-[#8B78E6] font-bold">→</span> 5-10 portfolio pieces (links or images)</p>
                <p className="flex gap-3"><span className="text-[#8B78E6] font-bold">→</span> A profile photo</p>
                <p className="flex gap-3"><span className="text-[#8B78E6] font-bold">→</span> A short bio (1-2 paragraphs)</p>
                <p className="flex gap-3"><span className="text-[#8B78E6] font-bold">→</span> Your email address</p>
                <p className="flex gap-3"><span className="text-[#8B78E6] font-bold">→</span> 3-5 services you offer</p>
              </div>
            </div>
            <div className="border-[3px] border-[#D4CCE8] bg-white overflow-hidden shadow-[4px_4px_0_#D4CCE8]">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#D4CCE8]">
                <span className="pixel-text text-[#6B6B7B]">NICE TO HAVE</span>
              </div>
              <div className="p-5 space-y-3 text-sm text-[#6B6B7B]" style={{ fontFamily: "var(--font-geist-sans)" }}>
                <p className="flex gap-3"><span>→</span> Client testimonials</p>
                <p className="flex gap-3"><span>→</span> Social media links</p>
                <p className="flex gap-3"><span>→</span> Hero background image</p>
                <p className="flex gap-3"><span>→</span> A tagline</p>
                <p className="flex gap-3 italic"><span className="opacity-0">→</span> Add later via /admin panel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Demos ─────────────────────────────────────────────── */}
      <section id="demos" className="py-16 md:py-24 px-6 bg-[#F5F3FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="pixel-text text-[#8B78E6] mb-4">LIVE DEMOS</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: "var(--font-syne)" }}>See what you&apos;ll get.</h2>
            <p className="text-[#6B6B7B]" style={{ fontFamily: "var(--font-geist-sans)" }}>Three presets. Click to explore.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {presets.map((preset) => (
              <Link
                key={preset.key}
                href={`/demo/${preset.key}`}
                className="group retro-window hover:-translate-y-1 hover:shadow-[6px_6px_0_#111] transition-all duration-200"
              >
                <RetroWindowBar title={preset.accentName.toUpperCase()} />
                {/* Swatch */}
                <div className={`h-32 bg-gradient-to-br ${preset.gradient} flex flex-col items-center justify-center`}>
                  <span className="text-[10px] font-extrabold tracking-[4px] uppercase" style={{ color: preset.accent, fontFamily: "var(--font-syne)" }}>
                    {preset.persona}
                  </span>
                  <span className="pixel-text mt-2 opacity-40" style={{ color: preset.light ? "#000" : "#fff", fontSize: "8px" }}>
                    {preset.services}
                  </span>
                </div>
                {/* Info */}
                <div className="p-4">
                  <h3 className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>{preset.label}</h3>
                  <p className="text-xs text-[#6B6B7B] leading-relaxed" style={{ fontFamily: "var(--font-geist-sans)" }}>{preset.description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 pixel-text text-[#8B78E6] text-[8px] group-hover:gap-2 transition-all">
                    VIEW DEMO <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal Demo (dark) ────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-[#111] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="pixel-text text-[#F02DF0] mb-4">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>AI does the heavy lifting.</h2>
          </div>
          <div className="retro-window">
            <RetroWindowBar title="CLAUDE CODE" />
            <div className="p-5 md:p-6 bg-[#0d0d0d] space-y-4 text-[13px] leading-relaxed" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
              <div><span className="text-[#8B78E6]">claude:</span> <span className="text-white/50">Cloning portfolio-speedrun-agent... Done.</span></div>
              <div><span className="text-[#8B78E6]">claude:</span> <span className="text-white/50">Before we build, do you have your Content Kit ready?</span></div>
              <div><span className="text-[#F02DF0]">you:</span> <span className="text-white/80">Yes! I have 8 wedding galleries and my bio.</span></div>
              <div><span className="text-[#8B78E6]">claude:</span> <span className="text-white/50">I&apos;ll use the Photographer preset — light, minimal. What&apos;s your name?</span></div>
              <div><span className="text-[#F02DF0]">you:</span> <span className="text-white/80">Maya Chen, based in Brooklyn.</span></div>
              <div><span className="text-[#8B78E6]">claude:</span> <span className="text-white/50">Config updated. Projects added. Dev server starting...</span></div>
              <div><span className="text-[#8B78E6]">claude:</span> <span className="text-white/50">Portfolio running at</span> <span className="text-[#27C93F]">localhost:3000</span> <span className="text-white/50">— want to change anything?</span></div>
              <div><span className="text-[#F02DF0]">you:</span> <span className="text-white/80">Ship it.</span></div>
              <div><span className="text-[#8B78E6]">claude:</span> <span className="text-[#27C93F]">mayachen.vercel.app is live. ✓</span></div>
              <div className="text-white/20 animate-blink">▌</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-[#F5F3FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="pixel-text text-[#8B78E6] mb-4">FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ fontFamily: "var(--font-syne)" }}>What you get.</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white border-[3px] border-[#111] p-4 shadow-[2px_2px_0_#111]">
                <Icon className="w-5 h-5 text-[#8B78E6] mb-2" />
                <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "var(--font-syne)" }}>{title}</h3>
                <p className="text-xs text-[#6B6B7B]" style={{ fontFamily: "var(--font-geist-sans)" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="pixel-text text-[#8B78E6] mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ fontFamily: "var(--font-syne)" }}>Questions</h2>
          </div>
          {faqs.map(({ q, a }) => (
            <div key={q} className="border-b-[3px] border-[#EAE5F5] py-5">
              <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-syne)" }}>{q}</h3>
              <p className="text-sm text-[#6B6B7B] leading-relaxed" style={{ fontFamily: "var(--font-geist-sans)" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA (dark) ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#111] text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)" }} />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>Ready?</h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Open your AI tool. Paste the prompt. Your portfolio is live before lunch.
          </p>
          <Link
            href="#start"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F02DF0] text-white border-[3px] border-white/20 shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_rgba(255,255,255,0.1)] transition-all pixel-text"
          >
            <Terminal className="w-4 h-4" />
            Copy the Prompt
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t-[3px] border-[#111] bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#8B78E6] rounded flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 32 32" fill="none"><polygon points="18,2 6,18 15,18 14,30 26,14 17,14" fill="white"/></svg>
            </div>
            <span className="text-xs text-[#6B6B7B]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Part of{" "}
              <Link href={SPEEDRUN_URL} target="_blank" className="text-[#8B78E6] hover:text-[#7264C4]">Startup Speedrun</Link>
              {" "}&middot; Give It Forward
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#6B6B7B]">
            <Link href={REPO_URL} target="_blank" className="hover:text-[#111] transition-colors">GitHub</Link>
            <span>&middot;</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
