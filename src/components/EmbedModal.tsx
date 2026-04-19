"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { Project } from "@/lib/types";

export function EmbedModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (project) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
      previousFocusRef.current?.focus();
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [project]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") { closeButtonRef.current?.focus(); e.preventDefault(); }
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [project, handleKeyDown]);

  if (!project) return null;

  const renderEmbed = () => {
    switch (project.platform) {
      case "youtube":
        return (
          <iframe
            src={`https://www.youtube.com/embed/${encodeURIComponent(project.videoId)}?autoplay=1&rel=0&modestbranding=1`}
            title={project.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
          />
        );
      case "drive":
        return (
          <iframe
            src={`https://drive.google.com/file/d/${encodeURIComponent(project.videoId)}/preview`}
            title={project.title}
            className="w-full h-full"
            allow="autoplay"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${project.title}`}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-5xl aspect-video bg-surface-deep shadow-2xl rounded-lg overflow-hidden border border-border">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-surface-deep/50 hover:bg-surface-light text-heading rounded-full transition-colors backdrop-blur-md"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        {renderEmbed()}
      </div>
    </div>
  );
}
