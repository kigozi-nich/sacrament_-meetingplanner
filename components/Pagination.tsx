"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageUrl(page: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)} className="border border-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white">
          Previous
        </Link>
      ) : <span />}
      <span className="text-sm text-[var(--muted)]">Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)} className="border border-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white">
          Next
        </Link>
      ) : <span />}
    </nav>
  );
}