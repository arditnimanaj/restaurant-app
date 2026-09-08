export const ADMIN_COOKIE_NAME = "admin_session";

const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return secret;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(issuedAt));
  return `${issuedAt}.${toHex(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [issuedAt, signatureHex] = token.split(".");
  if (!issuedAt || !signatureHex) return false;

  const key = await getKey();
  const expectedSignature = await crypto.subtle.sign("HMAC", key, encoder.encode(issuedAt));
  if (!timingSafeEqual(toHex(expectedSignature), signatureHex)) return false;

  const age = Date.now() - Number(issuedAt);
  return age >= 0 && age <= SESSION_MAX_AGE_MS;
}

export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000;
