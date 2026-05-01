export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
  topics: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools';
  level: number; // 1-5
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  dateRange: string;
  location?: string;
  bullets: string[];
  tech?: string[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}
