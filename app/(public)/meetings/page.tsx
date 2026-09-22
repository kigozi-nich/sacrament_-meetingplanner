import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata = { title: "Meeting archive" };

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const requestedPage = Number(searchParams?.page ?? "1");
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section>
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-xl text-[var(--muted)]">Browse recent programs, review the order of worship, and keep a clear record of each Sunday.</p><p className="text-sm font-semibold text-[var(--sage)]">{meetings.length} programs</p></div>
      <MeetingSearch />
      {meetings.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}</div> : <p className="border border-dashed border-[var(--line)] px-5 py-10 text-center text-[var(--muted)]">No meetings found. Try a different search.</p>}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}