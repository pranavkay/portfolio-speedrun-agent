"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
  );
}
