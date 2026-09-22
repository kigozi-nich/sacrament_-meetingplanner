export default function Loading() {
  return <div role="status" aria-label="Loading meeting programs" className="grid gap-5 sm:grid-cols-2"><span className="sr-only">Loading meeting programs</span><div className="h-64 animate-pulse bg-[var(--line)]" /><div className="h-64 animate-pulse bg-[var(--line)]" /></div>;
}