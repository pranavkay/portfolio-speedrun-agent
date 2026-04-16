"use client";

import { useState } from "react";
import { useContent } from "@/components/admin/ContentProvider";
import {
  FormField,
  TextInput,
  Button,
  Card,
  SaveStatus,
} from "@/components/admin/AdminUI";
import { SingleImageUploader } from "@/components/admin/ImageUploader";
import { Project } from "@/lib/types";
import { Trash2, Plus } from "lucide-react";

function extractVideoInfo(url: string): {
  platform: Project["platform"];
  videoId: string;
} | null {
  try {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    if (ytMatch) return { platform: "youtube", videoId: ytMatch[1] };

    // Instagram reel
    const igMatch = url.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
    if (igMatch) return { platform: "instagram", videoId: igMatch[1] };

    // Google Drive
    const drMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (drMatch) return { platform: "drive", videoId: drMatch[1] };
  } catch {
    return null;
  }
  return null;
}

const blankProject = (): Project => ({
  id: Date.now().toString(),
  title: "",
  videoUrl: "",
  videoId: "",
  platform: "youtube",
  category: "",
  tags: [],
  priority: 2,
});

export default function ProjectsPage() {
  const { content, loading, error, status, update, save } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (!content) return null;

  const projects = [...content.projects].sort(
    (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
  );

  const updateProject = (id: string, patch: Partial<Project>) => {
    update((c) => ({
      ...c,
      projects: c.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    if (!confirm("Delete this project?")) return;
    update((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== id) }));
  };

  const addProject = () => {
    const p = blankProject();
    update((c) => ({ ...c, projects: [...c.projects, p] }));
    setEditingId(p.id);
  };

  const handleUrlChange = (id: string, url: string) => {
    const info = extractVideoInfo(url);
    if (info) {
      updateProject(id, { videoUrl: url, ...info });
    } else {
      updateProject(id, { videoUrl: url });
    }
  };

  const allTags = Array.from(new Set(content.projects.flatMap((p) => p.tags))).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl text-white">Projects</h1>
        <div className="flex items-center gap-4">
          <SaveStatus status={status} />
          <Button onClick={addProject} variant="secondary">
            <Plus className="w-3 h-3 inline mr-2" /> Add
          </Button>
          <Button onClick={save} disabled={status === "saving"}>
            Save
          </Button>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Sorted by priority (1 = highest, 3 = lowest). Click any project to edit.
      </p>

      <div className="space-y-3">
        {projects.map((p) => {
          const isEditing = editingId === p.id;
          return (
            <Card key={p.id} className="!p-4">
              {!isEditing ? (
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setEditingId(p.id)}
                >
                  <span className="px-2 py-1 text-xs bg-cinema-accent/20 text-cinema-accent rounded">
                    P{p.priority}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate">{p.title || "(untitled)"}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {p.platform} · {p.category} · {p.tags.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(p.id);
                    }}
                    className="p-2 text-gray-500 hover:text-red-400"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <FormField label="Title">
                    <TextInput
                      value={p.title}
                      onChange={(e) => updateProject(p.id, { title: e.target.value })}
                      autoFocus
                    />
                  </FormField>
                  <FormField label="Thumbnail" hint="Optional. If not set, YouTube auto-thumbnail is used.">
                    <SingleImageUploader
                      value={p.thumbnailUrl || ""}
                      onChange={(url) => updateProject(p.id, { thumbnailUrl: url || undefined })}
                      label={`${p.title} thumbnail`}
                    />
                  </FormField>
                  <FormField label="Video URL" hint="Paste YouTube, Instagram, or Drive URL — platform/ID auto-detected">
                    <TextInput
                      value={p.videoUrl}
                      onChange={(e) => handleUrlChange(p.id, e.target.value)}
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Platform">
                      <select
                        value={p.platform}
                        onChange={(e) =>
                          updateProject(p.id, { platform: e.target.value as Project["platform"] })
                        }
                        className="w-full px-4 py-3 bg-cinema-900 border border-white/10 rounded text-white focus:outline-none focus:border-cinema-accent"
                      >
                        <option value="youtube">YouTube</option>
                        <option value="instagram">Instagram</option>
                        <option value="drive">Google Drive</option>
                      </select>
                    </FormField>
                    <FormField label="Video ID">
                      <TextInput
                        value={p.videoId}
                        onChange={(e) => updateProject(p.id, { videoId: e.target.value })}
                      />
                    </FormField>
                  </div>
                  <FormField label="Category" hint="e.g. Brand Film, Event Aftermovie">
                    <TextInput
                      value={p.category}
                      onChange={(e) => updateProject(p.id, { category: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Tags" hint="Comma-separated. Used by the homepage filter bar.">
                    <TextInput
                      value={p.tags.join(", ")}
                      onChange={(e) =>
                        updateProject(p.id, {
                          tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                        })
                      }
                    />
                    {allTags.length > 0 && (
                      <span className="block text-xs text-gray-600 mt-1">
                        Existing tags: {allTags.join(", ")}
                      </span>
                    )}
                  </FormField>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={p.featured || false}
                      onChange={(e) => updateProject(p.id, { featured: e.target.checked })}
                      className="w-4 h-4 accent-cinema-accent"
                    />
                    <span className="text-xs font-bold tracking-widest uppercase text-cinema-accent">
                      Featured
                    </span>
                    <span className="text-xs text-gray-500">Show in the Featured tab on homepage</span>
                  </label>
                  <FormField label="Priority" hint="1 = highest (shown first), 3 = lowest">
                    <select
                      value={p.priority}
                      onChange={(e) =>
                        updateProject(p.id, { priority: parseInt(e.target.value, 10) })
                      }
                      className="w-full px-4 py-3 bg-cinema-900 border border-white/10 rounded text-white focus:outline-none focus:border-cinema-accent"
                    >
                      <option value="1">1 — Highest</option>
                      <option value="2">2 — Medium</option>
                      <option value="3">3 — Lowest</option>
                    </select>
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Upload Date" hint="When the video was published (improves SEO for video rich results)">
                      <TextInput
                        type="date"
                        value={p.uploadDate ? p.uploadDate.slice(0, 10) : ""}
                        onChange={(e) =>
                          updateProject(p.id, {
                            uploadDate: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Duration (minutes)" hint="Optional. Improves video rich results.">
                      <TextInput
                        type="number"
                        min="0"
                        value={p.durationMinutes ?? ""}
                        onChange={(e) =>
                          updateProject(p.id, {
                            durationMinutes: e.target.value ? parseInt(e.target.value, 10) : undefined,
                          })
                        }
                      />
                    </FormField>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={() => setEditingId(null)}>
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end gap-4">
        <SaveStatus status={status} />
        <Button onClick={save} disabled={status === "saving"}>
          Save All
        </Button>
      </div>
    </div>
  );
}
