import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import type { PortfolioData } from "@/types/portfolio";

export default function SkillsSection({ data }: { data: PortfolioData }) {
  return (
    <SectionWrapper id="skills">
      <SectionHeader
        label="02 / skills"
        title="What I work with"
        description="Technologies and tools I reach for when building products."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.skills.map((group) => (
          <div
            key={group.category}
            className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-accent/30 transition-colors"
          >
            <h3 className="text-xs font-mono text-accent uppercase tracking-wider mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-accent/30 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
