import MeetingCard from "@/components/MeetingCard";
import { getApiUrl } from "@/lib/api";
import type { SacramentMeeting } from "@/lib/types";

export const metadata = { title: "Meeting archive" };

export default async function MeetingsPage() {
  const response = await fetch(await getApiUrl("/api/meetings"), { cache: "no-store" });
  const meetings: SacramentMeeting[] = await response.json();

  return (
    <section>
      <div className="mb-7 flex items-end justify-between gap-4"><p className="max-w-xl text-[var(--muted)]">Browse recent programs, review the order of worship, and keep a clear record of each Sunday.</p><p className="text-sm font-semibold text-[var(--sage)]">{meetings.length} programs</p></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}</div>
    </section>
  );
}