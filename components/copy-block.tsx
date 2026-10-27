"use client";

import { useState } from "react";

export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <section className="border border-line bg-panel">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <h3 className="text-sm tracking-wide text-accent">{label}</h3>
        <button
          type="button"
          onClick={copy}
          className="border border-accent px-3 py-1 text-xs tracking-wide text-accent hover:bg-accent hover:text-paper"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-4 font-sans text-sm leading-6 text-ink">
        {text}
      </pre>
    </section>
  );
}
