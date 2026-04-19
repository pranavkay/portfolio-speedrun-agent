"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const getThumbnail = () => {
    if (project.thumbnailUrl) return project.thumbnailUrl;
    if (project.platform === "youtube") {
      return imgError
        ? `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`
        : `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  const thumbnailUrl = getThumbnail();
  const isExternal = project.platform === "instagram";

  const handleClick = () => {
    if (isExternal) {
      window.open(project.videoUrl, "_blank", "noopener,noreferrer");
    } else {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const label = isExternal
    ? `View ${project.title} on Instagram`
    : `Play ${project.title}`;

  return (
    <div
      className="group relative aspect-video bg-surface-light rounded-lg overflow-hidden cursor-pointer border border-border hover:border-accent/30 transition-all duration-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-surface-card to-surface flex items-center justify-center">
          <span className="text-accent text-4xl font-serif" aria-hidden="true">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-overlay-light group-hover:bg-transparent transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/90 via-surface-deep/20 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-accent/90 text-on-accent rounded-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {project.category}
        </span>
        <h3 className="text-white text-lg font-medium leading-tight line-clamp-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
      </div>

      {/* Play / Link Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 border border-white/20" aria-hidden="true">
        {isExternal ? (
          <ExternalLink className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        )}
      </div>
    </div>
  );
}
