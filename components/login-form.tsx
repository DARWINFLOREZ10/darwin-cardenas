"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/command/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (!response.ok) {
      setError("That password does not match.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md border border-line bg-panel p-6">
      <label htmlFor="password" className="block text-sm text-muted">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-2 w-full border border-line bg-paper px-3 py-2 text-ink"
        aria-invalid={error ? true : undefined}
      />
      {error ? (
        <p role="alert" className="mt-3 text-sm text-accent">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 border border-accent bg-accent px-4 py-2 text-sm font-medium text-paper disabled:opacity-60"
      >
        {pending ? "Checking" : "Open my workspace"}
      </button>
    </form>
  );
}
