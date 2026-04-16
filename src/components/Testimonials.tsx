"use client";

import { useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/lib/types";

const AUTOPLAY_MS = 8000;

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const sorted = [...(testimonials || [])].sort((a, b) => a.order - b.order);
  const count = sorted.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused, next]);

  if (count === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-24 px-4 md:px-8 max-w-4xl mx-auto"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Kind Words</h2>
        <div className="h-1 w-20 bg-cinema-accent mx-auto" />
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {sorted.map((t) => (
              <figure
                key={t.id}
                className="relative w-full shrink-0 px-2 md:px-6"
                aria-hidden={sorted[index].id !== t.id}
              >
                <div className="relative bg-cinema-900 border border-white/5 rounded-lg p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
                  <Quote
                    className="absolute top-6 right-6 w-10 h-10 text-cinema-accent/20"
                    aria-hidden="true"
                  />
                  <blockquote className="text-gray-300 text-lg md:text-xl leading-relaxed font-light italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    {t.avatarUrl && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={t.avatarUrl}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-cinema-accent/30"
                      />
                    )}
                    <div>
                      <p className="text-white font-medium">{t.name}</p>
                      {t.role && (
                        <p className="text-xs text-cinema-accent tracking-widest uppercase mt-1">
                          {t.role}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-3 bg-cinema-900/80 border border-white/10 rounded-full text-white hover:text-cinema-accent hover:border-cinema-accent/40 transition-colors backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-3 bg-cinema-900/80 border border-white/10 rounded-full text-white hover:text-cinema-accent hover:border-cinema-accent/40 transition-colors backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
              {sorted.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "bg-cinema-accent w-8" : "bg-white/20 w-3 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
