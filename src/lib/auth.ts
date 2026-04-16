// Web Crypto API only — works in both Edge Runtime and Node.js

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET not set");
  return secret;
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getKey(): Promise<CryptoKey> {
  const secret = new TextEncoder().encode(getSecret());
  return crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(value: string): Promise<string> {
  const key = await getKey();
  const data = new TextEncoder().encode(value);
  const sig = await crypto.subtle.sign("HMAC", key, data);
  return bufToHex(sig);
}

// Constant-time string comparison (avoids timing leaks)
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return constantTimeEqual(input, expected);
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `admin.${expires}`;
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [role, expiresStr, signature] = parts;
  if (role !== "admin") return false;

  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || expires < Date.now()) return false;

  const expectedSig = await sign(`${role}.${expiresStr}`);
  return constantTimeEqual(signature, expectedSig);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;
