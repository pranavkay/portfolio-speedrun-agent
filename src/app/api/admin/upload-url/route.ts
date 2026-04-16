import { NextRequest, NextResponse } from "next/server";
import { createPresignedUploadUrl } from "@/lib/storage";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_NAME_LENGTH = 50;

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType } = await request.json();

    if (typeof filename !== "string" || typeof contentType !== "string") {
      return NextResponse.json(
        { error: "filename and contentType are required" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: `File type not allowed: ${contentType}` },
        { status: 400 }
      );
    }

    // Generate a safe, unique key on the server (don't trust client filename)
    const ext = filename.split(".").pop()?.toLowerCase() || "bin";
    const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 10);
    const safeName = filename
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, MAX_NAME_LENGTH);
    const key = `uploads/${Date.now()}-${safeName}.${safeExt}`;

    const { uploadUrl, publicUrl } = await createPresignedUploadUrl(key, contentType);

    return NextResponse.json({ uploadUrl, publicUrl, key });
  } catch (e) {
    console.error("POST /api/admin/upload-url failed:", e);
    const message = e instanceof Error ? e.message : "Failed to create upload URL";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
