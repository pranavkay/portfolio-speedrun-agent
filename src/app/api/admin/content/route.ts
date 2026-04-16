import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, putContent } from "@/lib/storage";
import { Content } from "@/lib/types";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (e) {
    console.error("GET /api/admin/content failed:", e);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as Content;

    // Basic shape validation
    if (!body || typeof body !== "object" || !body.settings || !Array.isArray(body.projects)) {
      return NextResponse.json({ error: "Invalid content shape" }, { status: 400 });
    }

    await putContent(body);
    revalidatePath("/");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PUT /api/admin/content failed:", e);
    const message = e instanceof Error ? e.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
