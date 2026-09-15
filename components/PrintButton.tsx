"use client";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="no-print border border-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white">
      Print program
    </button>
  );
}