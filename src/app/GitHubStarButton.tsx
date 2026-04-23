"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const REPO = "pranavkay/portfolio-speedrun-agent";

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function GitHubStarButton({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem("gh_stars");
    const cachedTs = localStorage.getItem("gh_stars_ts");
    const now = Date.now();

    if (cached && cachedTs && now - parseInt(cachedTs) < 5 * 60 * 1000) {
      setStars(parseInt(cached));
      return;
    }

    fetch(`https://api.github.com/repos/${REPO}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") {
          setStars(d.stargazers_count);
          localStorage.setItem("gh_stars", String(d.stargazers_count));
          localStorage.setItem("gh_stars_ts", String(now));
        }
      })
      .catch(() => {});
  }, []);

  const isDark = variant === "dark";
  const borderColor = isDark ? "border-white/20" : "border-[#111]";
  const bg = isDark ? "bg-white/5" : "bg-white";
  const hoverBg = isDark ? "hover:bg-white/10" : "hover:bg-[#F5F3FA]";
  const text = isDark ? "text-white" : "text-[#111]";
  const shadowDark = "shadow-[2px_2px_0_rgba(255,255,255,0.15)]";
  const shadowLight = "shadow-[2px_2px_0_#111]";

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => window.posthog?.capture("github_star_clicked")}
      className={`inline-flex items-center gap-2 px-3 py-1.5 border-[2px] ${borderColor} ${bg} ${hoverBg} ${text} transition-all hover:translate-x-[1px] hover:translate-y-[1px] ${isDark ? shadowDark : shadowLight}`}
      style={{ fontFamily: "var(--font-pixel, 'Press Start 2P', monospace)", fontSize: "8px", letterSpacing: "0.05em" }}
    >
      <Star className="w-3 h-3 fill-[#F9D300] text-[#F9D300]" />
      STAR
      {stars !== null && (
        <span className={`pl-2 ml-1 border-l ${isDark ? "border-white/20" : "border-[#111]/20"}`}>
          {formatCount(stars)}
        </span>
      )}
    </a>
  );
}
