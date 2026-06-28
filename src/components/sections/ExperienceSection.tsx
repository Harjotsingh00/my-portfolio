import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import type { PortfolioData } from "@/types/portfolio";

export default function ExperienceSection({ data }: { data: PortfolioData }) {
  return (
    <SectionWrapper id="experience">
      <SectionHeader label="04 / experience" title="Where I've worked" />
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border)] hidden sm:block" />

        <div className="space-y-10">
          {data.experience.map((exp, i) => (
            <div key={exp.id} className="sm:pl-8 relative">
              {/* Dot */}
              <div className="hidden sm:block absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent border-2 border-[var(--background)]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                <h3 className="font-semibold text-[var(--foreground)]">{exp.role}</h3>
                <span className="text-accent font-medium text-sm">{exp.company}</span>
                <span className="text-xs text-[var(--muted)] font-mono ml-auto">{exp.period}</span>
              </div>

              <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs rounded-full border border-[var(--border)] text-[var(--muted)] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {i < data.experience.length - 1 && (
                <div className="mt-10 border-b border-[var(--border)] sm:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
