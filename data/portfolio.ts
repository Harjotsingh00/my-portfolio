import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Harjot Singh",
  tagline: "AI & Data Science Enthusiast | Data Storyteller | Open Source Contributor",
  about:
    "I'm a Vibe Coder, turning ideas into fast, accessible, and maintainable web applications. I care deeply about the craft — clean APIs, thoughtful UI, and code that the next developer (or future me) will actually enjoy reading. When I'm not in the editor, I'm probably tinkering with side projects, reading about distributed systems, or making a very average cup of pour-over coffee.",
  avatar: "",
  contact: {
    email: "harjotsinghpb0008@gmail.com",
    phone: "+91 9780172654",
    location: "SAS Nagar, Punjab, India",
  },
  social: [
    { platform: "GitHub", url: "https://github.com/Harjotsingh00", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/harjotsingh97801", icon: "linkedin" },
    { platform: "X", url: "https://x.com/harjotsing54060", icon: "X" },
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "Bash", "C", "C++"],
    },
    {
      category: "AI/Machine Learning",
      items: ["Pytorch", "TensorFlow", "Scikit-learn", "OpenCVt", "Hugging Face", "Pandas", "Numpy", "Jupyter", "LangChain"],
    },
    {
      category: "Web Development",
      items: ["PostgreSQL", "MongoDB", "React", "Supabase", "Next.js", "Node.js", "FastAPI"],
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Git", "Linux", "VS Code", "Kubernetes"],
    },
  ],
  projects: [
    {
      id: "1",
      title: "AI-Startup-CTO",
      description:
        "🤖 AI Startup CTO — A multi-agent AI platform that transforms startup ideas into PRDs, sprint plans, QA strategies, risk assessments, and executive summaries, acting as a virtual CTO for founders and product teams.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "JavaScript", "CSS"],
      liveUrl: "https://ai-startup-akd7r5yo9-harjotsinghpb0008-9210s-projects.vercel.app",
      githubUrl: "https://github.com/Harjotsingh00/AI-Startup-CTO",
      featured: true,
    },
    {
      id: "2",
      title: "Scam Shield India",
      description:
        "ScamShield India AI combines Gemini AI, risk scoring, fraud-pattern matching, and document analysis to help users identify digital scams and phishing attempts.",
      tags: ["React", "OpenAI API", "Node.js", "Python"],
      liveUrl: "scamshieldindia-cgtbp7sihjt229bk2ozvnk.streamlit.app/",
      githubUrl: "https://github.com/Harjotsingh00/ScamShieldIndia",
      featured: true,
    },
    {
      id: "3",
      title: "DocGuard Sentinel",
      description:
        "DocGuard Sentinel is an enterprise-grade, real-time banking underwriting forensics and automated compliance platform. It bridges Computer Vision (Error Level Analysis), Client-Side Behavioral Telemetry, and Multi-Modal Agentic Intelligence (Gemini 1.5 Flash) to instantly detect document tampering, verify financial alignment across distinct files",
      tags: ["Python", "CSS", "PostgreSQL", "Chart.js"],
      githubUrl: "https://github.com/Harjotsingh00/DocGuard-Sentinel",
      featured: false,
    },
    {
      id: "4",
      title: "StudentOS-AI-Agent",
      description:
        "C⚓ StudentOS AI Agent — An AI-powered academic productivity platform that combines intelligent study planning, task orchestration, notes intelligence, and productivity analytics into one futuristic student workspace.",
      tags: ["CSS", "JavaScript", "GitHub API", "TypeScript", "Docker"],
      githubUrl: "https://github.com/Harjotsingh00/StudentOS-AI-Agent",
      featured: false,
    },
  ],
  experience: [
    {
      id: "1",
      company: "Tensorik",
      role: "Human Resources Intern",
      period: "2026 — Present",
      description:
        "Working on building a comprehensive HR management system that streamlines employee onboarding, performance tracking, and payroll processing. Implemented features for automated leave management and real-time employee feedback collection.",
      technologies: ["Leadership", "Communication", "Problem-Solving", "HR Software"],
    },
    {
      id: "2",
      company: "CGC University Mohali",
      role: "Student Liasoning Officer",
      period: "2026",
      description:
        "Collaborated with university administration to enhance student engagement and support services. Organized workshops and events to foster a positive campus environment and improve student satisfaction.",
      technologies: ["Event Planning", "Communication", "Teamwork", "Student Services"],
    },
    {
      id: "3",
      company: "CSRBOX",
      role: "Intern",
      period: "2026",
      description:
        "Assisted in the development of CSR initiatives and sustainability projects. Conducted research on corporate social responsibility trends and contributed to the creation of impactful community programs.",
      technologies: ["GenAI", "Research", "Project Management", "CSR Initiatives"],
    },
  ],
  education: [
    {
      id: "1",
      institution: "CGC University Mohali",
      degree: "B.Tech. in Computer Science",
      period: "2025 — 2029",
      description:
        "Pursuing a Bachelor of Technology in Computer Science, focusing on software development, algorithms, and data structures. Engaged in various projects and research initiatives to enhance practical skills and theoretical knowledge.",
    },
  ],
};
