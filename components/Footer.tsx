export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--ink)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="font-serif text-lg">A quiet place to prepare and remember.</p>
        <p className="text-white/60">Cedar Ridge Ward &middot; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}