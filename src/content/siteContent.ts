import type { SiteContent } from '../types/content';

export const siteContent: SiteContent = {
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ],
  profile: {
    name: 'Parsanna Koirala',
    role: 'Software Engineer',
    tagline: 'Computer Science graduate from the University of Michigan.',
    summary:
      'Software engineer with hands-on experience in product development, AI, and computer vision. I build scalable applications across web, mobile, and backend systems with a focus on strong architecture, performance, and user impact.',
    location: 'United States',
    availability: 'Open to full-time software engineering opportunities.',
    portrait: '/assets/portrait.jpg',
  },
  about: [
    'I enjoy building products end-to-end, from architecture and technical planning to implementation and launch. My work spans native iOS apps, cross-platform React Native systems, and AI-driven tooling.',
    'Most recently, I have been developing production-facing software in fintech, building resilient Java and SQL components while collaborating with engineering and product teams on high-impact workflows.',
    'I care deeply about clear problem framing, maintainable code, and delivering polished experiences that users actually rely on.',
  ],
  skills: [
    {
      title: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'Swift', 'Java', 'C++', 'Node.js', 'C#'],
    },
    {
      title: 'Frameworks & Tools',
      items: ['React', 'React Native', 'Expo', 'SwiftUI', 'Git', 'Maven', 'SQL', 'Oracle'],
    },
    {
      title: 'Cloud, Backend & Data',
      items: ['Supabase', 'Render', 'Cloudflare R2', 'REST APIs', 'System Design', 'Databases'],
    },
    {
      title: 'AI/ML & Engineering Practices',
      items: [
        'Machine Learning',
        'Deep Learning',
        'Computer Vision',
        'CoreML',
        'OpenCV',
        'Agile Development',
      ],
    },
  ],
  projects: [
    {
      title: 'FloraGuide: AI Garden Assistant',
      description:
        'Built and deployed a cross-platform gardening assistant for iOS, Android, and web using a unified TypeScript architecture. Integrated AI-powered plant guidance, real-time data sync, secure auth, and cloud-backed image storage.',
      stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Render', 'Cloudflare R2', 'Node.js'],
      image: '/assets/MyPlantsScreen.png',
      links: [
        { label: 'Live Site', url: 'https://floraguide.onrender.com/' },
        { label: 'GitHub', url: 'https://github.com/ParsannaK/FloraGuide' },
      ],
    },
    {
      title: 'My2Do: Tasks & Habits',
      description:
        'Engineered and published a native iOS productivity app with task scheduling, habit tracking, and workflow customization. Shipped to the App Store with polished UX and scalable architecture.',
      stack: ['Swift', 'SwiftUI', 'CoreML', 'SwiftData', 'iOS', 'App Store Connect'],
      image: '/assets/my2doImg.png',
      links: [
        { label: 'Landing Page', url: 'https://my2do-site.vercel.app/' },
        {
          label: 'App Store',
          url: 'https://apps.apple.com/us/app/my2do-tasks-habits/id6756674181',
        },
      ],
    },
    {
      title: 'Autonomous Lane Detection',
      description:
        'Led model development for lane and driveable-area perception on the University of Michigan Autonomous Robotic Vehicle Team. Designed and optimized DCNN/DRNN pipelines for real-time video processing under real-world constraints.',
      stack: ['Python', 'PyTorch', 'OpenCV', 'Computer Vision', 'Deep Learning'],
      image: '/assets/project1.png',
      links: [
        {
          label: 'Research Repo',
          url: 'https://github.com/AwrodHaghiTabrizi/UMARV-CV-LaneDetection/tree/users/Parsanna/models/model_2y4c4shn',
        },
      ],
    },
    {
      title: 'Weather Intelligence Dashboard',
      description:
        'Built a responsive weather web app that delivers real-time city weather details with API-driven data handling and clean interaction design. This project highlights practical frontend engineering and external API integration.',
      stack: ['JavaScript', 'REST API', 'OpenWeather', 'Responsive UI'],
      image: '/assets/project3.png',
      links: [{ label: 'Live Demo', url: 'https://parsannak.github.io/WeatherWebApp/' }],
    },
  ],
  experience: [
    {
      company: 'ECS Fin',
      role: 'Software Engineer & Product Management Intern',
      period: 'Jan 2026 - Present',
      summary:
        'Developing enterprise fintech software by combining backend engineering, data systems, and product-oriented execution in Agile teams.',
      highlights: [
        'Developed scalable financial messaging components using Java EE and enterprise design patterns for resilient distributed workflows.',
        'Built and optimized SQL queries, stored procedures, and triggers across Oracle and SQL Server to support high-volume transactions.',
        'Translated business requirements into technical specifications, user stories, and implementation plans with cross-functional stakeholders.',
      ],
    },
    {
      company: 'University of Michigan Autonomous Robotic Vehicle Team',
      role: 'Lead Developer',
      period: 'Jan 2023 - Dec 2025',
      summary:
        'Led AI/ML perception development for autonomous robotics competition use cases.',
      highlights: [
        'Designed DCNN and DRNN architectures for live video streams, reaching 87% accuracy in driveable area prediction.',
        'Directed iterative model evaluation and optimization under real-time and environment-variation constraints.',
      ],
    },
    {
      company: 'University of Michigan - Ann Arbor',
      role: 'Building Supervisor',
      period: 'Apr 2024 - Dec 2025',
      summary:
        'Managed operations and frontline support in a high-traffic environment while leading a 20-person student staff team.',
      highlights: [
        'Coordinated scheduling, issue resolution, and service standards in a fast-paced customer-facing setting.',
        'Strengthened leadership, communication, and operational problem-solving through day-to-day team management.',
      ],
    },
  ],
  resume: {
    filePath: '/Parsanna_Resume.pdf',
    downloadLabel: 'Download Resume (PDF)',
    updatedAt: 'Updated March 2026',
  },
  contact: {
    headline: 'Let\'s build something ambitious together.',
    email: 'prasanna.koirala302@gmail.com',
    social: [
      { label: 'GitHub', url: 'https://github.com/ParsannaK', icon: 'github' },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/parsanna-koirala-931b5b250/',
        icon: 'linkedin',
      },
      { label: 'Email', url: 'mailto:prasanna.koirala302@gmail.com', icon: 'email' },
    ],
  },
};
