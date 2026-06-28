import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import type { PortfolioData } from "@/types/portfolio";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const QUOTE = {
  text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  author: "Martin Fowler",
};

export default function AboutSection({ data }: { data: PortfolioData }) {
  const hasAvatar = !!data.avatar;

  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Left */}
        <div>
          <SectionHeader label="01 / about" title="Who I am" />

          {/* Mobile avatar */}
          {hasAvatar && (
            <div className="md:hidden mb-6 avatar-ring w-24 h-24">
              <div className="avatar-ring-inner w-full h-full">
                <Image src={data.avatar!} alt={data.name} width={96} height={96} className="object-cover" />
              </div>
            </div>
          )}

          <p className="text-[var(--muted)] leading-relaxed text-base sm:text-[1.05rem] mb-8">
            {data.about}
          </p>

          {/* Quote */}
          <div className="quote-block">
            <p className="text-sm leading-relaxed text-[var(--foreground)] mb-2">
              {QUOTE.text}
            </p>
            <p className="text-xs text-[rgb(var(--accent-rgb))] font-semibold not-italic tracking-wide">
              — {QUOTE.author}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-5">

          {/* Contact card */}
          <div className="card-hover p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="text-xs font-mono text-[rgb(var(--accent-rgb))] uppercase tracking-widest mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <div className="w-7 h-7 rounded-lg bg-[var(--card-alt)] flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-[rgb(var(--accent-rgb))]" />
                </div>
                <a href={`mailto:${data.contact.email}`} className="hover:text-[rgb(var(--accent-rgb))] transition-colors">
                  {data.contact.email}
                </a>
              </div>
              {data.contact.phone && (
                <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <div className="w-7 h-7 rounded-lg bg-[var(--card-alt)] flex items-center justify-center flex-shrink-0">
                    <Phone size={13} className="text-[rgb(var(--accent-rgb))]" />
                  </div>
                  <span>{data.contact.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <div className="w-7 h-7 rounded-lg bg-[var(--card-alt)] flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-[rgb(var(--accent-rgb))]" />
                </div>
                <span>{data.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div className="card-hover p-6 rounded-2xl border border-[var(--border)]"
            style={{ background: "linear-gradient(135deg, var(--card-alt) 0%, var(--card) 100%)" }}>
            <h3 className="text-xs font-mono text-[rgb(var(--accent-rgb))] uppercase tracking-widest mb-5">
              By the numbers
            </h3>
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: `${data.experience.length}+`, label: "Companies", color: "accent" },
                { value: `${data.projects.length}+`, label: "Projects shipped", color: "pink" },
                { value: `${data.skills.reduce((a, s) => a + s.items.length, 0)}+`, label: "Technologies", color: "teal" },
                { value: `${new Date().getFullYear() - 2019}+`, label: "Years exp.", color: "accent" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold gradient-text mb-0.5"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Currently learning / fun fact */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex items-start gap-4">
            <span className="text-2xl flex-shrink-0 mt-0.5">🚀</span>
            <div>
              <p className="text-xs font-mono text-[rgb(var(--accent-rgb))] uppercase tracking-widest mb-1">Currently exploring</p>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                AI-assisted developer tooling, edge computing patterns, and the intersection of great UX with performant backend systems.
              </p>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}