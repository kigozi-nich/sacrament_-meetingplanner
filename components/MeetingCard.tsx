import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
import { formatMeetingDate, meetingTypeLabels } from "@/lib/format";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const featuredSpeaker = meeting.speakers.find((item) => item.type === "speaker");

  return (
    <article className="group border border-[var(--line)] bg-[var(--paper)] p-5 transition-all hover:-translate-y-1 hover:border-[var(--sage)] hover:shadow-[6px_6px_0_var(--sun)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sage)]">{meetingTypeLabels[meeting.meetingType]}</p>
          <h2 className="mt-2 font-serif text-2xl text-[var(--ink)]">{formatMeetingDate(meeting.date)}</h2>
        </div>
        <span className="grid h-9 w-9 place-items-center border border-[var(--line)] text-sm text-[var(--muted)]">{meeting.id.toString().padStart(2, "0")}</span>
      </div>
      <div className="mt-6 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">
        <p><span className="font-semibold text-[var(--ink)]">Presiding:</span> {meeting.presiding}</p>
        <p className="mt-1"><span className="font-semibold text-[var(--ink)]">Conducting:</span> {meeting.conducting}</p>
        {featuredSpeaker && <p className="mt-4 text-[var(--ink)]">&ldquo;{featuredSpeaker.topic}&rdquo;</p>}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href={`/meetings/${meeting.id}`} className="inline-flex text-sm font-bold text-[var(--ink)] underline decoration-[var(--sun)] decoration-2 underline-offset-4 group-hover:text-[var(--sage)]">Open program <span className="ml-2" aria-hidden="true">-&gt;</span></Link>
        <Link href={`/meetings/${meeting.id}/edit`} className="text-sm font-semibold text-[var(--sage)] underline decoration-[var(--sun)] decoration-2 underline-offset-4">Edit</Link>
        <form action={deleteMeeting} className="ml-auto">
          <input type="hidden" name="id" value={meeting.id} />
          <button type="submit" className="text-sm font-semibold text-[var(--muted)] underline decoration-[var(--sun)] decoration-2 underline-offset-4 hover:text-[var(--ink)]" aria-label={`Delete meeting on ${formatMeetingDate(meeting.date)}`}>
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}