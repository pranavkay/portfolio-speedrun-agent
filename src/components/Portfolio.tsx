"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { EmbedModal } from "./EmbedModal";

function matchesFilter(project: Project, filter: string): boolean {
  if (filter === "All") return true;
  if (filter === "Featured") return !!project.featured;
  return project.tags.includes(filter);
}

export function Portfolio({
  projects,
  filters,
}: {
  projects: Project[];
  filters: string[];
}) {
  const defaultFilter = filters.length > 0 ? filters[0] : "All";
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleCount = projects.filter((p) => matchesFilter(p, activeFilter)).length;

  return (
    <section id="portfolio" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
            Selected Works
          </h2>
          <div className="h-1 w-20 bg-cinema-accent" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-gray-500 mr-2 md:hidden" aria-hidden="true" />
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                role="tab"
                aria-selected={activeFilter === filter}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                  activeFilter === filter
                    ? "bg-white text-black border-white font-medium"
                    : "bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/*
        All projects are rendered in the DOM so crawlers (and JS-off users) see
        every one — we hide non-matching ones via CSS based on the active filter.
        This is the right tradeoff for SEO: static HTML contains the full portfolio.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project) => {
          const visible = matchesFilter(project, activeFilter);
          return (
            <div
              key={project.id}
              className={visible ? "" : "hidden"}
              aria-hidden={!visible}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          );
        })}
      </div>

      {visibleCount === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>No projects found in this category.</p>
        </div>
      )}

      <EmbedModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
