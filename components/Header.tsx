import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  const currentDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date());

  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3" aria-label="Cedar Ridge Ward home">
          <span className="grid h-10 w-10 place-items-center bg-[var(--ink)] text-lg font-semibold text-[var(--sun)] transition-transform group-hover:-rotate-6">CR</span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Cedar Ridge</span>
            <span className="block font-serif text-xl font-semibold text-[var(--ink)]">Ward programs</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-4 sm:gap-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{currentDate}</p>
          <NavLinks />
        </div>
      </div>
    </header>
  );
}