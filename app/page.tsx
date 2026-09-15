import Image from "next/image";
import Link from "next/link";
import { formatMeetingDate } from "@/lib/format";
import { getMostRecentMeeting } from "@/lib/meetings-db";

export default function Home() {
  const currentMeeting = getMostRecentMeeting();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8 lg:py-16">
      <section className="grid overflow-hidden bg-[var(--ink)] text-white lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative flex min-h-[430px] flex-col justify-between p-8 sm:p-12">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[24px] border-[var(--sun)]/80" aria-hidden="true" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sun)]">{formatMeetingDate(currentMeeting.date)}</p>
          <div className="relative max-w-xl">
            <h1 className="font-serif text-5xl leading-[0.98] sm:text-7xl">Gather with purpose.</h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/70">A clear, calm place for the Cedar Ridge Ward to prepare this week&apos;s meeting and revisit the Sundays that shaped us.</p>
            <Link href={`/meetings/${currentMeeting.id}`} className="mt-8 inline-flex items-center gap-3 bg-[var(--sun)] px-5 py-3 font-semibold text-[var(--ink)] transition-transform hover:translate-x-1">
              View this Sunday <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
          <p className="relative text-sm text-white/50">Meeting planner / 2026</p>
        </div>
        <div className="relative min-h-[300px] overflow-hidden bg-[var(--sage)] p-8 sm:p-12">
          <Image src="/window.svg" alt="A simple window illustration representing a Sunday gathering" width={240} height={240} className="absolute bottom-8 right-8 h-52 w-52 opacity-25 invert" priority />
          <div className="relative flex h-full flex-col justify-end">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/65">On the agenda</p>
            <p className="mt-3 max-w-xs font-serif text-3xl leading-tight">Faith in Jesus Christ, covenant belonging, and a musical offering.</p>
          </div>
        </div>
      </section>
      <section className="grid gap-5 py-10 sm:grid-cols-3">
        <div className="border-t-2 border-[var(--sun)] pt-4"><p className="font-serif text-3xl">{currentMeeting.speakers.length}</p><p className="mt-1 text-sm text-[var(--muted)]">voices and offerings</p></div>
        <div className="border-t-2 border-[var(--sage)] pt-4"><p className="font-serif text-3xl">{currentMeeting.wardBusiness.length}</p><p className="mt-1 text-sm text-[var(--muted)]">ward business items</p></div>
        <div className="border-t-2 border-[var(--ink)] pt-4"><Link href="/meetings" className="font-serif text-2xl underline decoration-[var(--sun)] decoration-2 underline-offset-4">Browse the archive</Link><p className="mt-1 text-sm text-[var(--muted)]">five recent programs</p></div>
      </section>
    </div>
  );
}
