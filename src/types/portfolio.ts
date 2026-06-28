export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  about: string;
  avatar?: string;
  contact: ContactInfo;
  social: SocialLink[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
