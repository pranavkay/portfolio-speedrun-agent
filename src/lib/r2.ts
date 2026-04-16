import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Content } from "./types";
import { defaultContent } from "./data";

const CONTENT_KEY = "content.json";

function getClient(): S3Client | null {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function getBucket(): string {
  return process.env.R2_BUCKET_NAME || "portfolio-content";
}

export function getPublicUrl(key: string): string {
  const base = process.env.R2_PUBLIC_URL || "";
  return `${base.replace(/\/$/, "")}/${key}`;
}

async function streamToString(stream: ReadableStream | NodeJS.ReadableStream): Promise<string> {
  if (stream instanceof ReadableStream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
    return result + decoder.decode();
  }

  const chunks: Buffer[] = [];
  for await (const chunk of stream as NodeJS.ReadableStream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export async function getContent(): Promise<Content> {
  const client = getClient();
  if (!client) return defaultContent;

  try {
    const response = await client.send(
      new GetObjectCommand({ Bucket: getBucket(), Key: CONTENT_KEY })
    );
    if (!response.Body) return defaultContent;

    const text = await streamToString(response.Body as ReadableStream | NodeJS.ReadableStream);
    return JSON.parse(text) as Content;
  } catch (e: unknown) {
    const err = e as { name?: string };
    if (err.name === "NoSuchKey") {
      // First-time setup — content.json doesn't exist yet, seed with defaults
      await putContent(defaultContent);
      return defaultContent;
    }
    console.error("R2 getContent failed, using local fallback:", e);
    return defaultContent;
  }
}

export async function putContent(content: Content): Promise<void> {
  const client = getClient();
  if (!client) {
    throw new Error("R2 not configured — cannot save content");
  }

  await client.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: CONTENT_KEY,
      Body: JSON.stringify(content, null, 2),
      ContentType: "application/json",
      CacheControl: "no-cache",
    })
  );
}

export async function createPresignedUploadUrl(
  key: string,
  contentType: string
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const client = getClient();
  if (!client) {
    throw new Error("R2 not configured — cannot create upload URL");
  }

  const command = new PutObjectCommand({
    Bucket: getBucket(),
    Key: key,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  });

  // 10 min is enough for even very large uploads
  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 600 });
  return { uploadUrl, publicUrl: getPublicUrl(key) };
}
