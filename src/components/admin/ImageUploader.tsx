"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

/**
 * Uploads a file directly to Cloudflare R2 using a presigned URL.
 * Returns the public URL where the file can be accessed.
 *
 * Flow:
 *   1. POST to /api/admin/upload-url → server returns presigned PUT URL
 *   2. PUT file directly to R2 using that URL (bypasses Vercel)
 *   3. Return publicUrl for use in the content form
 *
 * This bypasses Vercel's 4.5 MB request body limit.
 */
async function uploadToR2(file: File): Promise<string> {
  // Step 1: ask the server for a presigned URL
  const urlRes = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  });

  if (!urlRes.ok) {
    let message = `Upload URL request failed (${urlRes.status})`;
    try {
      const data = await urlRes.json();
      if (data.error) message = data.error;
    } catch {
      const text = await urlRes.text().catch(() => "");
      if (text) message = text.slice(0, 200);
    }
    throw new Error(message);
  }

  const { uploadUrl, publicUrl } = await urlRes.json();

  // Step 2: PUT the file directly to R2
  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!putRes.ok) {
    const text = await putRes.text().catch(() => "");
    throw new Error(
      `R2 upload failed (${putRes.status}): ${text.slice(0, 200) || "no response body"}`
    );
  }

  return publicUrl;
}

export function SingleImageUploader({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const publicUrl = await uploadToR2(file);
      onChange(publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label || "Image preview"}
            className="max-h-48 rounded border border-white/10"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 p-1 bg-black border border-white/20 rounded-full text-white hover:bg-red-500"
            aria-label="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase border border-white/20 text-white rounded hover:border-cinema-accent hover:text-cinema-accent transition-colors disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : value ? "Replace" : "Upload"}
        </button>
        {error && <span className="ml-3 text-xs text-red-400">{error}</span>}
      </div>
    </div>
  );
}

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"];

function isVideoUrl(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return VIDEO_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  } catch {
    return VIDEO_EXTENSIONS.some((ext) => url.toLowerCase().endsWith(ext));
  }
}

export function MultiImageUploader({
  value,
  onChange,
  acceptVideo = false,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  acceptVideo?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setError(null);
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const publicUrl = await uploadToR2(file);
        uploaded.push(publicUrl);
      }
      onChange([...value, ...uploaded]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...value];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === value.length - 1) return;
    const next = [...value];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {value.map((url, i) => (
            <div key={url + i} className="relative group">
              {isVideoUrl(url) ? (
                <video
                  src={url}
                  className="w-full aspect-video object-cover rounded border border-white/10"
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={url}
                  alt={`Hero ${i + 1}`}
                  className="w-full aspect-video object-cover rounded border border-white/10"
                />
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute -top-2 -right-2 p-1 bg-black border border-white/20 rounded-full text-white hover:bg-red-500"
                aria-label="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="px-2 py-1 text-xs bg-black/70 text-white rounded disabled:opacity-30"
                >
                  ←
                </button>
                <span className="px-2 py-1 text-xs bg-black/70 text-white rounded">{i + 1}</span>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i === value.length - 1}
                  className="px-2 py-1 text-xs bg-black/70 text-white rounded disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptVideo ? "image/*,video/mp4,video/webm,video/quicktime" : "image/*"}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase border border-white/20 text-white rounded hover:border-cinema-accent hover:text-cinema-accent transition-colors disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : acceptVideo ? "Add images or videos" : "Add images"}
        </button>
        {error && <span className="ml-3 text-xs text-red-400">{error}</span>}
      </div>
    </div>
  );
}
