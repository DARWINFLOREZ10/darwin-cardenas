import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "career_kit_session";

export function expectedPassword(): string {
  return process.env.CAREER_KIT_PASSWORD || "darwin-kit";
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function passwordMatches(input: string): boolean {
  return timingSafeEqual(digest(input), digest(expectedPassword()));
}

export function sessionValue(): string {
  return createHmac("sha256", expectedPassword()).update("career-kit-session-v1").digest("hex");
}

export function tokenMatches(token: string): boolean {
  return timingSafeEqual(digest(token), digest(sessionValue()));
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? "";
  if (!token) return false;
  return tokenMatches(token);
}
