import Link from "next/link";

export default function MeetingsLayout({ children }: LayoutProps<"/meetings">) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-col gap-3 border-l-4 border-[var(--sun)] pl-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--sage)]">The archive</p><h1 className="mt-2 font-serif text-3xl text-[var(--ink)]">Meeting programs</h1></div>
        <Link href="/meetings/current" className="text-sm font-semibold text-[var(--sage)] underline decoration-[var(--sun)] decoration-2 underline-offset-4">Jump to this Sunday</Link>
      </div>
      {children}
    </div>
  );
}