"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print border border-ink-dark px-3 py-1.5 text-sm"
    >
      {label}
    </button>
  );
}
