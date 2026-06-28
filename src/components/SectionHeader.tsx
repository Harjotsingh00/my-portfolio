interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  gradient?: boolean;
}

export default function SectionHeader({ label, title, description, gradient = false }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-px bg-gradient-to-r from-[rgb(var(--accent-rgb))] to-[rgb(var(--pink-rgb))] opacity-70" />
        <p className="text-xs font-mono text-[rgb(var(--accent-rgb))] uppercase tracking-widest">{label}</p>
      </div>
      <h2
        className={`text-3xl sm:text-4xl font-bold mb-3 leading-tight ${
          gradient ? "gradient-text" : "text-[var(--foreground)]"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-[var(--muted)] max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}