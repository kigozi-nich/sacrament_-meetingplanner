"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/meetings", label: "All meetings" },
  { href: "/meetings/current", label: "This Sunday" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-2">
      {links.map((link) => {
        const active = link.href === "/meetings" ? pathname === "/meetings" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`border px-4 py-2 text-sm font-semibold transition-colors ${active ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-transparent text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--ink)]"}`}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}