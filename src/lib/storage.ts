/**
 * Storage abstraction — supports "local" (JSON file) and "r2" (Cloudflare R2) backends.
 * Configured via portfolio.config.ts `storage` field.
 */

import { Content } from "./types";
import { defaultContent } from "./data";
import config from "../../portfolio.config";
import fs from "fs/promises";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "content.json");

// ── Local JSON File Storage ─────────────────────────────────────────

async function getContentLocal(): Promise<Content> {
  try {
    const text = await fs.readFile(CONTENT_FILE, "utf-8");
    return JSON.parse(text) as Content;
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "ENOENT") {
      // First-time setup — create content.json with defaults
      await putContentLocal(defaultContent);
      return defaultContent;
    }
    console.error("Local getContent failed, using defaults:", e);
    return defaultContent;
  }
}

async function putContentLocal(content: Content): Promise<void> {
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}

// ── R2 Storage (imported dynamically to avoid loading AWS SDK when not needed) ──

async function getContentR2(): Promise<Content> {
  const { getContent: r2Get } = await import("./r2");
  return r2Get();
}

async function putContentR2(content: Content): Promise<void> {
  const { putContent: r2Put } = await import("./r2");
  return r2Put(content);
}

// ── Public API ──────────────────────────────────────────────────────

export async function getContent(): Promise<Content> {
  if (config.storage === "local") {
    return getContentLocal();
  }
  return getContentR2();
}

export async function putContent(content: Content): Promise<void> {
  if (config.storage === "local") {
    return putContentLocal(content);
  }
  return putContentR2(content);
}

/** Image upload is only supported with R2 storage */
export async function createPresignedUploadUrl(
  key: string,
  contentType: string
): Promise<{ uploadUrl: string; publicUrl: string }> {
  if (config.storage === "local") {
    throw new Error(
      "Image uploads require R2 storage. Set storage: \"r2\" in portfolio.config.ts and configure R2 environment variables."
    );
  }
  const { createPresignedUploadUrl: r2Upload } = await import("./r2");
  return r2Upload(key, contentType);
}
