import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata = { title: "Meeting archive" };

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string; date?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const date = searchParams?.date;
  const requestedPage = Number(searchParams?.page ?? "1");
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage, date),
    getMeetingsTotalPages(query, date),
  ]);

  return (
    <section>
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><h2 className="text-4xl font-bold tracking-tight text-slate-900">All Meetings</h2><p className="text-sm font-semibold text-slate-500">{meetings.length} programs</p></div>
      <MeetingSearch />
      {meetings.length > 0 ? <div className="grid gap-5">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}</div> : <p className="border border-dashed border-slate-300 px-5 py-10 text-center text-slate-500">No meetings found. Try a different search.</p>}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}