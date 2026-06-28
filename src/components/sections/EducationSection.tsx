import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import type { PortfolioData } from "@/types/portfolio";
import { GraduationCap } from "lucide-react";

export default function EducationSection({ data }: { data: PortfolioData }) {
  return (
    <SectionWrapper id="education">
      <SectionHeader label="05 / education" title="Academic background" />
      <div className="grid sm:grid-cols-2 gap-6">
        {data.education.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-accent/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <GraduationCap size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug">{edu.institution}</h3>
                  <span className="text-xs font-mono text-[var(--muted)] whitespace-nowrap">{edu.period}</span>
                </div>
                <p className="text-sm text-accent mb-2">{edu.degree}</p>
                {edu.description && (
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{edu.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
