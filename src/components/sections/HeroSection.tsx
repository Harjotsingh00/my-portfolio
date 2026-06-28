import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import Image from "next/image";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  twitter: <Twitter size={18} />,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* Typing animation for roles */
function useTypingRoles(roles: string[]) {
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 40 : 80;
    const pause = deleting ? 400 : 1800;

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
      return;
    }
    const t = setTimeout(() => {
      setCharIdx((c) => c + (deleting ? -1 : 1));
      setDisplay(current.slice(0, charIdx + (deleting ? -1 : 1)));
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx, roles]);

  return display;
}

export default function HeroSection({ data }: { data: PortfolioData }) {
  const firstName = data.name.split(" ")[0];
  const nameWords = data.name.split(" ");

  const roles = ["Full-Stack Developer", "UI/UX Enthusiast", "Open Source Contributor", "Problem Solver"];
  const typedRole = useTypingRoles(roles);

  const hasAvatar = !!data.avatar;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 dot-grid overflow-hidden"
    >
      {/* Orbs */}
      <div className="orb-1 absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)" }} />
      <div className="orb-2 absolute bottom-1/4 right-10 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(219,39,119,0.07) 0%, transparent 70%)" }} />
      <div className="orb-3 absolute top-20 right-1/4 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)" }} />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">

          {/* Left — text */}
          <motion.div variants={container} initial="hidden" animate="show">

            {/* Greeting */}
            <motion.p variants={item}
              className="text-sm font-medium text-[var(--muted)] mb-5 flex items-center gap-2">
              <span className="wave-emoji text-lg">👋</span>
              Hi there, I&apos;m {firstName} — nice to meet you
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {nameWords.map((word, i) => (
                <span
                  key={i}
                  className={`inline-block mr-3 ${i === nameWords.length - 1 ? "gradient-text" : "text-[var(--foreground)]"}`}
                >
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Typing role */}
            <motion.div variants={item} className="flex items-center gap-2 mb-4 h-8">
              <span className="text-lg sm:text-xl font-semibold text-[var(--muted)]"
                style={{ fontFamily: "var(--font-display)" }}>
                {typedRole}
              </span>
              <span className="cursor-blink text-2xl leading-none">|</span>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={item}
              className="text-base text-[var(--muted)] mb-3 max-w-lg leading-relaxed">
              {data.tagline}
            </motion.p>

            {/* Status pill */}
            <motion.div variants={item} className="mb-8">
              <span className="badge badge-teal">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--teal-rgb))] animate-pulse" />
                {data.contact.location} · Open to remote
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-7 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 active:scale-95 flex items-center gap-2 hover:shadow-2xl hover:shadow-[rgb(var(--accent-rgb))]/30"
                style={{ background: "linear-gradient(135deg, rgb(var(--accent-rgb)), rgb(var(--pink-rgb)))" }}
              >
                See my work
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3 rounded-xl border border-[var(--border)] hover:border-[rgb(var(--accent-rgb))]/40 text-[var(--foreground)] font-semibold text-sm transition-all duration-200 hover:bg-[var(--card)] active:scale-95"
              >
                Get in touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="text-xs text-[var(--muted)] font-mono">find me on</span>
              <div className="w-px h-4 bg-[var(--border)]" />
              {data.social.map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[rgb(var(--accent-rgb))]/40 hover:bg-[var(--card)] transition-all">
                  {iconMap[s.icon] ?? s.platform[0]}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-center gap-4"
          >
            <div className="avatar-ring w-52 h-52">
              <div className="avatar-ring-inner w-full h-full">
                {hasAvatar ? (
                  <Image src={data.avatar!} alt={data.name} width={208} height={208} className="object-cover" />
                ) : (
                  /* Placeholder initials avatar */
                  <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold gradient-text select-none"
                    style={{ fontFamily: "var(--font-display)", background: "var(--card-alt)" }}>
                    {data.name.split(" ").map(w => w[0]).join("")}
                  </div>
                )}
              </div>
            </div>

            {/* Floating stat chips around avatar */}
            <div className="flex gap-3">
              <div className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
                <p className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                  {new Date().getFullYear() - 2019}+
                </p>
                <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Years</p>
              </div>
              <div className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
                <p className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                  {data.projects.length}+
                </p>
                <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Projects</p>
              </div>
              <div className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
                <p className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                  {data.skills.reduce((a, s) => a + s.items.length, 0)}+
                </p>
                <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Skills</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--muted)] hover:text-[rgb(var(--accent-rgb))] transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}