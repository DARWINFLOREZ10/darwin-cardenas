import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "career_kit_session";

export function expectedPassword(): string | null {
  const value = process.env.CAREER_KIT_PASSWORD?.trim();
  return value ? value : null;
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function passwordMatches(input: string): boolean {
  const expected = expectedPassword();
  if (!expected || !input) return false;
  return timingSafeEqual(digest(input), digest(expected));
}

export function sessionValue(): string {
  const expected = expectedPassword();
  if (!expected) throw new Error("CAREER_KIT_PASSWORD is not set");
  return createHmac("sha256", expected).update("career-kit-session-v1").digest("hex");
}

export function tokenMatches(token: string): boolean {
  if (!token || !expectedPassword()) return false;
  return timingSafeEqual(digest(token), digest(sessionValue()));
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? "";
  if (!token) return false;
  return tokenMatches(token);
}
