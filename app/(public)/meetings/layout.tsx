import Link from "next/link";

export default function MeetingsLayout({ children }: LayoutProps<"/meetings">) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Meetings</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Agenda Hub</h1></div>
        <Link href="/meetings/current" className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900">Jump to this Sunday</Link>
      </div>
      {children}
    </div>
  );
}