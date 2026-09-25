"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function MeetingSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleDateSearch = useDebouncedCallback((date: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (date) {
      params.set("date", date);
    } else {
      params.delete("date");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-7 flex flex-wrap justify-end gap-3">
      <div>
        <label htmlFor="meeting-search" className="sr-only">Search meetings</label>
        <input
          id="meeting-search"
          type="search"
          placeholder="Search by speaker, leader, or type"
          defaultValue={searchParams.get("query") ?? ""}
          onChange={(event) => handleSearch(event.target.value)}
          aria-label="Search meetings"
          className="w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-slate-500"
        />
      </div>
      <div>
        <label htmlFor="meeting-date" className="sr-only">Filter meetings by date</label>
        <input
          id="meeting-date"
          type="date"
          defaultValue={searchParams.get("date") ?? ""}
          onChange={(event) => handleDateSearch(event.target.value)}
          aria-label="Filter meetings by date"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
        />
      </div>
    </div>
  );
}