import type { Skill, ExperienceEntry } from '@/types';

export const GITHUB_USERNAME = 'Santhosh7474';

export const SITE_CONFIG = {
  name: 'Santhosh',
  tagline: 'I craft digital experiences that feel alive',
  roles: ['Full Stack Developer', 'Flutter Engineer', 'Open Source Builder', 'UI/UX Craftsman'],
  email: 'buchalasanthosh@gmail.com',
  github: 'https://github.com/Santhosh7474',
  linkedin: 'https://www.linkedin.com/in/buchala-santhosh/',
  twitter: '',
};

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'HTML5', icon: '🌐', category: 'frontend', level: 5 },
  { name: 'CSS3', icon: '🎨', category: 'frontend', level: 5 },
  { name: 'JavaScript', icon: '⚡', category: 'frontend', level: 4 },
  { name: 'TypeScript', icon: '🔷', category: 'frontend', level: 3 },
  { name: 'React', icon: '⚛️', category: 'frontend', level: 3 },
  { name: 'Next.js', icon: '▲', category: 'frontend', level: 3 },
  { name: 'Tailwind', icon: '💨', category: 'frontend', level: 4 },
  { name: 'Framer Motion', icon: '🎬', category: 'frontend', level: 3 },

  // Backend
  { name: 'Python', icon: '🐍', category: 'backend', level: 4 },
  { name: 'Node.js', icon: '🟢', category: 'backend', level: 3 },
  { name: 'Firebase', icon: '🔥', category: 'backend', level: 4 },
  { name: 'REST APIs', icon: '🔗', category: 'backend', level: 4 },

  // Mobile
  { name: 'Flutter', icon: '🦋', category: 'mobile', level: 5 },
  { name: 'Dart', icon: '🎯', category: 'mobile', level: 5 },

  // Tools
  { name: 'Git', icon: '🌿', category: 'tools', level: 4 },
  { name: 'GitHub', icon: '🐙', category: 'tools', level: 4 },
  { name: 'Figma', icon: '🖌️', category: 'tools', level: 3 },
  { name: 'VS Code', icon: '💻', category: 'tools', level: 5 },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'Flutter Developer',
    company: 'Herdsman Development',
    dateRange: 'Feb 2026 – Apr 2026',
    location: 'Remote',
    bullets: [
      'Built and enhanced the Punyadaan donation platform, developing 3 integrated dashboards (Donee, Donor, Admin) to streamline end-to-end donation workflows.',
      'Designed a modern UI using a glassmorphism theme, improving visual appeal and delivering a more engaging and intuitive user experience.',
      'Implemented key features such as subscription models, promotional campaigns, distance-based matching, and transaction history tracking, boosting user interaction and platform usability.',
      'Collaborated on full-stack development, learning scalable architecture and contributing to a structured, user-friendly donation ecosystem.',
    ],
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Glassmorphism UI'],
  },
];

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  PHP: '#4F5D95',
};

export const CURRENTLY_LEARNING = [
  'Exploring Rust for systems programming',
  'Deep-diving into Three.js & WebGL shaders',
  'Building scalable Flutter architectures',
  'Learning AI/ML integration with Python',
  'Mastering advanced Framer Motion animations',
];

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
