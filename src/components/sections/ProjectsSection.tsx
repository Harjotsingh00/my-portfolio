import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import type { PortfolioData } from "@/types/portfolio";
import { ExternalLink, Github, Layers } from "lucide-react";

/* Deterministic gradient per project so it looks varied but stable */
const gradients = [
  "linear-gradient(135deg, rgba(109,40,217,0.12) 0%, rgba(219,39,119,0.08) 100%)",
  "linear-gradient(135deg, rgba(13,148,136,0.10) 0%, rgba(109,40,217,0.08) 100%)",
  "linear-gradient(135deg, rgba(219,39,119,0.09) 0%, rgba(234,179,8,0.06) 100%)",
  "linear-gradient(135deg, rgba(59,130,246,0.10) 0%, rgba(13,148,136,0.07) 100%)",
];

export default function ProjectsSection({ data }: { data: PortfolioData }) {
  const featured = data.projects.filter((p) => p.featured);
  const others = data.projects.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        label="03 / projects"
        title="Things I've built"
        description="A selection of projects — personal, open source, and professional."
        gradient
      />

      {/* Featured grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {featured.map((project, i) => (
          <div key={project.id}
            className="group card-hover rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col bg-[var(--card)]">

            {/* Image / gradient banner */}
            <div className="h-36 w-full relative overflow-hidden flex items-center justify-center"
              style={{ background: gradients[i % gradients.length] }}>
              <div className="absolute inset-0 dot-grid opacity-40" />
              <div className="relative z-10 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Layers size={22} className="text-white/80" />
              </div>
              {/* Hover links appear on banner */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="p-2 rounded-lg bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all">
                    <Github size={14} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live"
                    className="p-2 rounded-lg bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-accent">Featured</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}>
                {project.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-mono
                    bg-[var(--card-alt)] text-[var(--muted)] border border-[var(--border)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other projects */}
      {others.length > 0 && (
        <>
          <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-4">Other projects</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((project, i) => (
              <div key={project.id}
                className="group card-hover p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[rgb(var(--accent-rgb))]/30">
                {/* Mini color bar */}
                <div className="h-1 w-10 rounded-full mb-4" style={{ background: gradients[i % gradients.length].replace("linear-gradient(135deg, ", "").split(" 0%")[0].replace("rgba", "rgb").replace(/,\s*[\d.]+\)/, ")") }} />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[var(--foreground)] text-sm" style={{ fontFamily: "var(--font-display)" }}>
                    {project.title}
                  </h3>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-[var(--muted)] bg-[var(--card-alt)] px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  );
}