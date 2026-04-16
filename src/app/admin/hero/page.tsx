"use client";

import { useContent } from "@/components/admin/ContentProvider";
import {
  FormField,
  TextInput,
  Button,
  Card,
  SaveStatus,
} from "@/components/admin/AdminUI";
import { MultiImageUploader } from "@/components/admin/ImageUploader";

export default function HeroPage() {
  const { content, loading, error, status, update, save } = useContent();

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (!content) return null;

  const setHero = (next: Partial<typeof content.hero>) =>
    update((c) => ({ ...c, hero: { ...c.hero, ...next } }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl text-white">Hero Section</h1>
        <div className="flex items-center gap-4">
          <SaveStatus status={status} />
          <Button onClick={save} disabled={status === "saving"}>
            Save
          </Button>
        </div>
      </div>

      <Card className="space-y-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-cinema-accent">
          Showreel
        </h2>
        <FormField
          label="YouTube Video ID"
          hint="The ID from the URL, e.g. for youtu.be/2M3c8id9_oI use 2M3c8id9_oI"
        >
          <TextInput
            value={content.settings.heroVideoId}
            onChange={(e) =>
              update((c) => ({
                ...c,
                settings: { ...c.settings, heroVideoId: e.target.value },
              }))
            }
          />
        </FormField>
      </Card>

      <Card className="space-y-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-cinema-accent">
          Background Gallery
        </h2>
        <p className="text-sm text-gray-400">
          Upload one image for a static background, or multiple images to create a slow crossfade
          carousel.
        </p>
        <MultiImageUploader
          value={content.hero.images}
          onChange={(images) => setHero({ images })}
          acceptVideo
        />
      </Card>

      <Card className="space-y-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-cinema-accent">
          Crossfade Settings
        </h2>
        <FormField label="Interval (seconds)" hint="Time each image is shown before crossfading">
          <input
            type="range"
            min="3"
            max="15"
            step="1"
            value={content.hero.intervalMs / 1000}
            onChange={(e) => setHero({ intervalMs: parseInt(e.target.value, 10) * 1000 })}
            className="w-full accent-cinema-accent"
          />
          <span className="text-sm text-gray-400 mt-1 block">
            {content.hero.intervalMs / 1000} seconds per image
          </span>
        </FormField>
      </Card>

      <div className="flex justify-end gap-4">
        <SaveStatus status={status} />
        <Button onClick={save} disabled={status === "saving"}>
          Save All
        </Button>
      </div>
    </div>
  );
}
