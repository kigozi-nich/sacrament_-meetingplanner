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
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{meetingTypeLabels[meeting.meetingType]}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{formatMeetingDate(meeting.date)}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">#{meeting.id}</span>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p><span className="font-medium text-slate-800">Presiding:</span> {meeting.presiding}</p>
        <p><span className="font-medium text-slate-800">Conducting:</span> {meeting.conducting}</p>
        <p><span className="font-medium text-slate-800">Opening hymn:</span> {meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
        {featuredSpeaker && <p className="text-slate-800">&ldquo;{featuredSpeaker.topic}&rdquo;</p>}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href={`/meetings/${meeting.id}`} className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4">Open program</Link>
        <Link href={`/meetings/${meeting.id}/edit`} className="text-sm font-medium text-slate-600 underline underline-offset-4">Edit</Link>
        <form action={deleteMeeting} className="ml-auto">
          <input type="hidden" name="id" value={meeting.id} />
          <button type="submit" className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:border-red-300 hover:bg-red-50" aria-label={`Delete meeting on ${formatMeetingDate(meeting.date)}`}>
            Delete meeting
          </button>
        </form>
      </div>
    </article>
  );
}