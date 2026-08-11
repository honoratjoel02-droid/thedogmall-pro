const CREDENTIALS_KEY = "thedogmall.auth";
const UNLOCKED_KEY = "thedogmall.auth.unlocked";

const PBKDF2_ITERATIONS = 150_000;

interface StoredCredentials {
  salt: string;
  hash: string;
}

function toBase64(bytes: Uint8Array | ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function fromBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}

async function derivePasswordHash(
  password: string,
  salt: Uint8Array,
): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return toBase64(bits);
}

function readCredentials(): StoredCredentials | null {
  const raw = localStorage.getItem(CREDENTIALS_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredCredentials;
  } catch {
    return null;
  }
}

export function hasPassword(): boolean {
  return readCredentials() !== null;
}

export async function setPassword(password: string): Promise<void> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePasswordHash(password, salt);

  const credentials: StoredCredentials = { salt: toBase64(salt), hash };

  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
}

export async function verifyPassword(password: string): Promise<boolean> {
  const credentials = readCredentials();
  if (!credentials) return false;

  const candidateHash = await derivePasswordHash(
    password,
    fromBase64(credentials.salt),
  );

  return candidateHash === credentials.hash;
}

export function isUnlocked(): boolean {
  return sessionStorage.getItem(UNLOCKED_KEY) === "1";
}

export function markUnlocked(): void {
  sessionStorage.setItem(UNLOCKED_KEY, "1");
}

export function lock(): void {
  sessionStorage.removeItem(UNLOCKED_KEY);
}
