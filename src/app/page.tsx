"use client";

import { usePortfolio } from "@/lib/usePortfolio";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { data, loaded } = usePortfolio();

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar name={data.name} />
      <main>
        <HeroSection data={data} />
        <div className="border-t border-[var(--border)]" />
        <AboutSection data={data} />
        <div className="border-t border-[var(--border)]" />
        <SkillsSection data={data} />
        <div className="border-t border-[var(--border)]" />
        <ProjectsSection data={data} />
        <div className="border-t border-[var(--border)]" />
        <ExperienceSection data={data} />
        <div className="border-t border-[var(--border)]" />
        <EducationSection data={data} />
        <div className="border-t border-[var(--border)]" />
        <ContactSection data={data} />
      </main>
      <Footer name={data.name} />
    </>
  );
}
