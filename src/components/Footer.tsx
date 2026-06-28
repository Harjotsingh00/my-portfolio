export default function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <span>
          © {year}{" "}
          <span className="text-[var(--foreground)] font-medium">{name}</span>
        </span>
        <span className="font-mono">
          Built with{" "}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Next.js
          </a>{" "}
          &{" "}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Tailwind
          </a>
        </span>
        <a href="/admin" className="hover:text-[var(--foreground)] transition-colors">
          Admin ↗
        </a>
      </div>
    </footer>
  );
}
