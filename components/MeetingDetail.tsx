import Link from "next/link";
import { formatMeetingDate, meetingTypeLabels } from "@/lib/format";
import type { SacramentMeeting, SpeakerItem } from "@/lib/types";
import PrintButton from "./PrintButton";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function AgendaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-[var(--line)] py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sage)]">{label}</dt>
      <dd className="text-[var(--ink)]">{children}</dd>
    </div>
  );
}

function SpeakerLine({ item }: { item: SpeakerItem }) {
  return (
    <li className="flex gap-4">
      <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--sun)]" aria-hidden="true" />
      <span>
        <span className="block font-semibold text-[var(--ink)]">{item.name}</span>
        {item.topic && <span className="text-[var(--muted)]">{item.topic}</span>}
      </span>
    </li>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="bg-[var(--paper)] px-5 py-8 sm:px-10 sm:py-12 print:p-0">
      <div className="no-print mb-8 flex items-center justify-between gap-4">
        <Link href="/meetings" className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)]">&lt;- All meetings</Link>
        <div className="flex items-center gap-3">
          <Link href={`/meetings/${meeting.id}/edit`} className="text-sm font-semibold text-[var(--sage)] underline decoration-[var(--sun)] decoration-2 underline-offset-4">Edit</Link>
          <PrintButton />
        </div>
      </div>
      <header className="border-b-2 border-[var(--ink)] pb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sage)]">{meetingTypeLabels[meeting.meetingType]}</p>
        <div className="mt-3 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif text-4xl leading-tight text-[var(--ink)] sm:text-5xl">{formatMeetingDate(meeting.date)}</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">Cedar Ridge Ward &middot; Sacrament meeting program</p>
          </div>
          <div className="text-sm sm:text-right"><p><span className="font-semibold">Presiding</span> {meeting.presiding}</p><p className="mt-1"><span className="font-semibold">Conducting</span> {meeting.conducting}</p></div>
        </div>
      </header>

      <dl className="mt-5">
        {meeting.announcements && meeting.announcements.length > 0 && <AgendaRow label="Announcements"><ul className="space-y-2">{meeting.announcements.map((announcement) => <li key={announcement}>{announcement}</li>)}</ul></AgendaRow>}
        <AgendaRow label="Opening hymn"><span className="font-semibold">#{meeting.openingHymn.number}</span> &middot; {meeting.openingHymn.title}</AgendaRow>
        <AgendaRow label="Opening prayer">{meeting.openingPrayer}</AgendaRow>
        {meeting.wardBusiness.length > 0 && <AgendaRow label="Ward business"><ul className="space-y-2">{meeting.wardBusiness.map((item) => <li key={item.description}>{item.description}</li>)}</ul></AgendaRow>}
        {meeting.stakeBusiness && <AgendaRow label="Stake business">Stake business included</AgendaRow>}
        <AgendaRow label="Sacrament hymn"><span className="font-semibold">#{meeting.sacramentHymn.number}</span> &middot; {meeting.sacramentHymn.title}</AgendaRow>
        <AgendaRow label="Speakers and music"><ul className="space-y-4">{meeting.speakers.length > 0 ? meeting.speakers.map((item) => <SpeakerLine item={item} key={`${item.name}-${item.topic}`} />) : <li className="text-[var(--muted)]">Open testimony meeting</li>}</ul></AgendaRow>
        <AgendaRow label="Closing hymn"><span className="font-semibold">#{meeting.closingHymn.number}</span> &middot; {meeting.closingHymn.title}</AgendaRow>
        <AgendaRow label="Closing prayer">{meeting.closingPrayer}</AgendaRow>
      </dl>
    </article>
  );
}