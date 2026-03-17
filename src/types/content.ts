export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'resume'
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  availability: string;
  heroStats: Array<{ label: string; value: string }>;
  portrait: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

export type SocialIcon = 'github' | 'linkedin' | 'email';

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIcon;
}

export interface ResumeConfig {
  filePath: string;
  downloadLabel: string;
  updatedAt: string;
}

export interface SiteContent {
  navigation: NavItem[];
  profile: Profile;
  about: string[];
  skills: SkillGroup[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  resume: ResumeConfig;
  contact: {
    headline: string;
    email: string;
    social: SocialLink[];
  };
}
