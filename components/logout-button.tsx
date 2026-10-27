"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function lock() {
    await fetch("/api/command/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button type="button" onClick={lock} className="text-sm text-accent underline-offset-4 hover:underline">
      Lock workspace
    </button>
  );
}
