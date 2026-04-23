"use client";

import { useState } from "react";
import { Copy, Check, Star } from "lucide-react";

declare global {
  interface Window {
    posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void };
  }
}

export function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const [showStarNudge, setShowStarNudge] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setShowStarNudge(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowStarNudge(false), 10000);
    window.posthog?.capture("prompt_copied");
  };

  return (
    <div className="flex items-center gap-2">
      {showStarNudge && (
        <a
          href="https://github.com/pranavkay/portfolio-speedrun-agent"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.posthog?.capture("star_nudge_clicked", { source: "copy_button" })}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F9D300] text-[#111] border-[2px] border-[#111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all animate-fade-slide-up"
          style={{ fontFamily: "var(--font-pixel, 'Press Start 2P', monospace)", fontSize: "8px", letterSpacing: "0.05em" }}
        >
          <Star className="w-3 h-3 fill-[#111]" />
          <span className="hidden sm:inline">★ Give us a star</span>
          <span className="sm:hidden">★ Star us</span>
        </a>
      )}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#8B78E6] text-white border-[2px] border-white/20 hover:bg-[#7264C4] transition-colors cursor-pointer"
        style={{ fontFamily: "var(--font-pixel, 'Press Start 2P', monospace)", fontSize: "8px", letterSpacing: "0.05em" }}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-[#27C93F]" />
            COPIED!
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            COPY
          </>
        )}
      </button>
    </div>
  );
}
