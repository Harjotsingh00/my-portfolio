"use client";

import { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/usePortfolio";
import type { PortfolioData, Skill, Project, Experience, Education, SocialLink } from "@/types/portfolio";
import { Save, RotateCcw, ArrowLeft, Plus, Trash2, ExternalLink, Check } from "lucide-react";
import Link from "next/link";

type Tab = "general" | "about" | "skills" | "projects" | "experience" | "education" | "contact";

const TABS: { key: Tab; label: string }[] = [
  { key: "general", label: "General" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "contact", label: "Contact" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function Field({
  label, value, onChange, textarea = false, placeholder = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; placeholder?: string;
}) {
  const base =
    "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all placeholder:text-[var(--muted)]";
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`${base} resize-y`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}

function Card({ children, title, onDelete }: { children: React.ReactNode; title?: string; onDelete?: () => void }) {
  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4 relative">
      {title && <p className="text-xs font-mono text-accent mb-2">{title}</p>}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 text-[var(--muted)] hover:text-red-500 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      )}
      {children}
    </div>
  );
}

// ─── Tab panels ─────────────────────────────────────────────────────────────

function GeneralTab({ data, set }: { data: PortfolioData; set: (d: PortfolioData) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Full Name" value={data.name} onChange={(v) => set({ ...data, name: v })} placeholder="Jane Doe" />
      <Field label="Tagline" value={data.tagline} onChange={(v) => set({ ...data, tagline: v })} placeholder="Frontend engineer · Building things for the web" />
      <div>
        <p className="text-xs font-medium text-[var(--muted)] mb-3">Social Links</p>
        <div className="space-y-3">
          {data.social.map((s, i) => (
            <div key={i} className="grid grid-cols-[80px_1fr_80px_auto] gap-2 items-center">
              <input
                value={s.platform}
                onChange={(e) => {
                  const next = [...data.social];
                  next[i] = { ...s, platform: e.target.value };
                  set({ ...data, social: next });
                }}
                placeholder="Platform"
                className="px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <input
                value={s.url}
                onChange={(e) => {
                  const next = [...data.social];
                  next[i] = { ...s, url: e.target.value };
                  set({ ...data, social: next });
                }}
                placeholder="https://..."
                className="px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <select
                value={s.icon}
                onChange={(e) => {
                  const next = [...data.social];
                  next[i] = { ...s, icon: e.target.value };
                  set({ ...data, social: next });
                }}
                className="px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] focus:outline-none"
              >
                <option value="github">github</option>
                <option value="linkedin">linkedin</option>
                <option value="twitter">twitter</option>
              </select>
              <button onClick={() => set({ ...data, social: data.social.filter((_, j) => j !== i) })}
                className="text-[var(--muted)] hover:text-red-500 transition-colors p-1">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => set({ ...data, social: [...data.social, { platform: "", url: "", icon: "github" } as SocialLink] })}
            className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
          >
            <Plus size={13} /> Add social link
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutTab({ data, set }: { data: PortfolioData; set: (d: PortfolioData) => void }) {
  return (
    <div className="space-y-4">
      <Field
        label="About Text"
        value={data.about}
        onChange={(v) => set({ ...data, about: v })}
        textarea
        placeholder="Tell visitors about yourself..."
      />
    </div>
  );
}

function SkillsTab({ data, set }: { data: PortfolioData; set: (d: PortfolioData) => void }) {
  const updateGroup = (i: number, updated: Skill) => {
    const next = [...data.skills];
    next[i] = updated;
    set({ ...data, skills: next });
  };

  return (
    <div className="space-y-4">
      {data.skills.map((group, i) => (
        <Card key={i} title={`Category ${i + 1}`} onDelete={() => set({ ...data, skills: data.skills.filter((_, j) => j !== i) })}>
          <Field label="Category name" value={group.category} onChange={(v) => updateGroup(i, { ...group, category: v })} />
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Items (comma-separated)</label>
            <input
              value={group.items.join(", ")}
              onChange={(e) => updateGroup(i, { ...group, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="React, TypeScript, Tailwind..."
            />
          </div>
        </Card>
      ))}
      <button
        onClick={() => set({ ...data, skills: [...data.skills, { category: "", items: [] }] })}
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
      >
        <Plus size={13} /> Add category
      </button>
    </div>
  );
}

function ProjectsTab({ data, set }: { data: PortfolioData; set: (d: PortfolioData) => void }) {
  const updateProject = (i: number, updated: Project) => {
    const next = [...data.projects];
    next[i] = updated;
    set({ ...data, projects: next });
  };

  return (
    <div className="space-y-4">
      {data.projects.map((project, i) => (
        <Card key={project.id} title={`Project ${i + 1}`} onDelete={() => set({ ...data, projects: data.projects.filter((_, j) => j !== i) })}>
          <Field label="Title" value={project.title} onChange={(v) => updateProject(i, { ...project, title: v })} />
          <Field label="Description" value={project.description} onChange={(v) => updateProject(i, { ...project, description: v })} textarea />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Live URL" value={project.liveUrl ?? ""} onChange={(v) => updateProject(i, { ...project, liveUrl: v })} placeholder="https://..." />
            <Field label="GitHub URL" value={project.githubUrl ?? ""} onChange={(v) => updateProject(i, { ...project, githubUrl: v })} placeholder="https://github.com/..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Tags (comma-separated)</label>
            <input
              value={project.tags.join(", ")}
              onChange={(e) => updateProject(i, { ...project, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="Next.js, TypeScript..."
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--muted)]">
            <input
              type="checkbox"
              checked={project.featured}
              onChange={(e) => updateProject(i, { ...project, featured: e.target.checked })}
              className="accent-indigo-500 w-4 h-4"
            />
            Featured project
          </label>
        </Card>
      ))}
      <button
        onClick={() => set({
          ...data,
          projects: [...data.projects, { id: Date.now().toString(), title: "", description: "", tags: [], featured: false }]
        })}
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
      >
        <Plus size={13} /> Add project
      </button>
    </div>
  );
}

function ExperienceTab({ data, set }: { data: PortfolioData; set: (d: PortfolioData) => void }) {
  const updateExp = (i: number, updated: Experience) => {
    const next = [...data.experience];
    next[i] = updated;
    set({ ...data, experience: next });
  };

  return (
    <div className="space-y-4">
      {data.experience.map((exp, i) => (
        <Card key={exp.id} title={`Position ${i + 1}`} onDelete={() => set({ ...data, experience: data.experience.filter((_, j) => j !== i) })}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Company" value={exp.company} onChange={(v) => updateExp(i, { ...exp, company: v })} />
            <Field label="Role" value={exp.role} onChange={(v) => updateExp(i, { ...exp, role: v })} />
          </div>
          <Field label="Period" value={exp.period} onChange={(v) => updateExp(i, { ...exp, period: v })} placeholder="2022 — Present" />
          <Field label="Description" value={exp.description} onChange={(v) => updateExp(i, { ...exp, description: v })} textarea />
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">Technologies (comma-separated)</label>
            <input
              value={exp.technologies.join(", ")}
              onChange={(e) => updateExp(i, { ...exp, technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="Next.js, PostgreSQL..."
            />
          </div>
        </Card>
      ))}
      <button
        onClick={() => set({
          ...data,
          experience: [...data.experience, { id: Date.now().toString(), company: "", role: "", period: "", description: "", technologies: [] }]
        })}
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
      >
        <Plus size={13} /> Add position
      </button>
    </div>
  );
}

function EducationTab({ data, set }: { data: PortfolioData; set: (d: PortfolioData) => void }) {
  const updateEdu = (i: number, updated: Education) => {
    const next = [...data.education];
    next[i] = updated;
    set({ ...data, education: next });
  };

  return (
    <div className="space-y-4">
      {data.education.map((edu, i) => (
        <Card key={edu.id} title={`Degree ${i + 1}`} onDelete={() => set({ ...data, education: data.education.filter((_, j) => j !== i) })}>
          <Field label="Institution" value={edu.institution} onChange={(v) => updateEdu(i, { ...edu, institution: v })} />
          <Field label="Degree" value={edu.degree} onChange={(v) => updateEdu(i, { ...edu, degree: v })} />
          <Field label="Period" value={edu.period} onChange={(v) => updateEdu(i, { ...edu, period: v })} placeholder="2015 — 2019" />
          <Field label="Description (optional)" value={edu.description ?? ""} onChange={(v) => updateEdu(i, { ...edu, description: v })} textarea />
        </Card>
      ))}
      <button
        onClick={() => set({
          ...data,
          education: [...data.education, { id: Date.now().toString(), institution: "", degree: "", period: "" }]
        })}
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
      >
        <Plus size={13} /> Add education
      </button>
    </div>
  );
}

function ContactTab({ data, set }: { data: PortfolioData; set: (d: PortfolioData) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Email" value={data.contact.email} onChange={(v) => set({ ...data, contact: { ...data.contact, email: v } })} placeholder="you@example.com" />
      <Field label="Phone (optional)" value={data.contact.phone ?? ""} onChange={(v) => set({ ...data, contact: { ...data.contact, phone: v } })} placeholder="+1 (555) 000-0000" />
      <Field label="Location" value={data.contact.location} onChange={(v) => set({ ...data, contact: { ...data.contact, location: v } })} placeholder="San Francisco, CA" />
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const { data: savedData, save, reset } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(savedData);
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);

  // sync draft when saved data loads from localStorage
  useEffect(() => {
    setDraft(savedData);
  }, [savedData]);

  const handleSave = () => {
    save(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all changes and restore default data?")) {
      reset();
      setSaved(false);
    }
  };

  const tabContent: Record<Tab, React.ReactNode> = {
    general: <GeneralTab data={draft} set={setDraft} />,
    about: <AboutTab data={draft} set={setDraft} />,
    skills: <SkillsTab data={draft} set={setDraft} />,
    projects: <ProjectsTab data={draft} set={setDraft} />,
    experience: <ExperienceTab data={draft} set={setDraft} />,
    education: <EducationTab data={draft} set={setDraft} />,
    contact: <ContactTab data={draft} set={setDraft} />,
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--background)]/90 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <span className="font-mono text-sm font-semibold text-[var(--foreground)]">Portfolio Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--muted)] border border-[var(--border)] hover:border-accent/40 transition-all"
            >
              <ExternalLink size={12} /> Preview
            </Link>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--muted)] border border-[var(--border)] hover:border-red-400/40 hover:text-red-400 transition-all"
            >
              <RotateCcw size={12} /> Reset
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                saved
                  ? "bg-green-500 text-white"
                  : "bg-accent hover:bg-accent-dark text-white"
              }`}
            >
              {saved ? <Check size={12} /> : <Save size={12} />}
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        {/* Sidebar tabs */}
        <aside className="hidden sm:block w-40 flex-shrink-0">
          <nav className="space-y-1 sticky top-20">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  activeTab === tab.key
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tab bar */}
        <div className="sm:hidden flex gap-1.5 flex-wrap mb-6 w-full">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-accent/10 text-accent"
                  : "text-[var(--muted)] bg-[var(--card)] border border-[var(--border)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6 capitalize">
            {activeTab === "general" ? "General Info" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          {tabContent[activeTab]}
        </main>
      </div>
    </div>
  );
}
