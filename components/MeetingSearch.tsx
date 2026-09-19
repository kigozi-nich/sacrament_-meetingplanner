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

  return (
    <div className="mb-7">
      <label htmlFor="meeting-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[var(--sage)]">
        Search programs
      </label>
      <input
        id="meeting-search"
        type="search"
        placeholder="Search speakers, leaders, or meeting type"
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search meetings"
        className="w-full border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--sage)] sm:max-w-xl"
      />
    </div>
  );
}