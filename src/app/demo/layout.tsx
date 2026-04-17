import Link from "next/link";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Floating back-link banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Portfolio Speedrun
        </Link>
        <span className="text-white/40 text-xs tracking-wider uppercase hidden sm:inline">
          Live Demo
        </span>
        <Link
          href="https://github.com/pranavkay/portfolio-speedrun-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white text-xs tracking-wider uppercase transition-colors"
        >
          Get This Template →
        </Link>
      </div>
      {/* Push content down so it doesn't hide under the banner */}
      <div className="pt-[41px]">
        {children}
      </div>
    </>
  );
}
