"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"];

function isVideo(src: string): boolean {
  try {
    const pathname = new URL(src).pathname.toLowerCase();
    return VIDEO_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  } catch {
    return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
  }
}

function HeroVideo({
  src,
  active,
  altPrefix,
  index,
}: {
  src: string;
  active: boolean;
  altPrefix: string;
  index: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (active) {
      ref.current.currentTime = 0;
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity ease-in-out"
      style={{
        opacity: active ? 0.6 : 0,
        transitionDuration: "1500ms",
      }}
      muted
      loop
      playsInline
      preload={index === 0 ? "auto" : "metadata"}
      aria-label={`${altPrefix} background video ${index + 1}`}
    >
      <source src={src} />
    </video>
  );
}

export function HeroGallery({
  images,
  intervalMs,
  altPrefix,
}: {
  images: string[];
  intervalMs: number;
  altPrefix: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (reducedMotion || images.length <= 1) return;

    // For videos: let the video play through, then advance
    // For images: use the intervalMs timer
    const currentSrc = images[currentIndex];
    if (isVideo(currentSrc)) {
      // Video handles its own timing — advance after intervalMs as a fallback
      // (video also loops, so user sees it if carousel has only 1 video)
      const id = setInterval(advance, Math.max(intervalMs, 5000));
      return () => clearInterval(id);
    }

    const id = setInterval(advance, Math.max(intervalMs, 2000));
    return () => clearInterval(id);
  }, [images.length, intervalMs, reducedMotion, currentIndex, images, advance]);

  return (
    <>
      {images.map((src, i) => {
        const active = i === currentIndex;
        if (isVideo(src)) {
          return (
            <HeroVideo
              key={src + i}
              src={src}
              active={active}
              altPrefix={altPrefix}
              index={i}
            />
          );
        }
        return (
          <div
            key={src + i}
            role="img"
            aria-label={`${altPrefix} background ${i + 1}`}
            className="absolute inset-0 bg-cover bg-center scale-105 transition-opacity ease-in-out"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: active ? 0.6 : 0,
              transitionDuration: "1500ms",
            }}
          />
        );
      })}
    </>
  );
}
