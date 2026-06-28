"use client";

import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import type { PortfolioData } from "@/types/portfolio";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  twitter: <Twitter size={18} />,
};

export default function ContactSection({ data }: { data: PortfolioData }) {
  return (
    <SectionWrapper id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeader
          label="06 / contact"
          title="Let's work together"
          description="I'm open to freelance projects, full-time roles, and interesting conversations. Drop me a message."
        />

        <a
          href={`mailto:${data.contact.email}`}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent hover:bg-accent-dark text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-accent/20 active:scale-95 mb-10 text-sm"
        >
          <Mail size={17} />
          {data.contact.email}
        </a>

        <div className="flex items-center justify-center gap-4">
          {data.social.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-accent/40 transition-all text-sm"
            >
              {iconMap[s.icon] ?? null}
              <span>{s.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
