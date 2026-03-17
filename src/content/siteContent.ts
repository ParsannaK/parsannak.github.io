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
    role: 'Software Developer',
    tagline: 'Building thoughtful products at the edge of full-stack and intelligent systems.',
    summary:
      'Computer Science student at the University of Michigan focused on product-minded engineering, scalable web systems, and machine-learning-driven applications.',
    location: 'Ann Arbor, Michigan',
    availability: 'Open to software engineering internships and collaborative projects.',
    heroStats: [
      { label: 'Featured Projects', value: '6' },
      { label: 'Focus Areas', value: 'Full-Stack + ML' },
      { label: 'Current Goal', value: 'Ship high-impact products' },
    ],
    portrait: '/assets/portrait.jpg',
  },
  about: [
    'I enjoy taking ideas from concept to polished product with a strong emphasis on usability, maintainability, and performance. My recent work includes computer-vision systems, API-driven apps, and practical developer tooling.',
    'I bring a collaborative mindset shaped by technical projects and operations leadership roles. I am especially motivated by teams that care about user outcomes and engineering quality.',
    'TODO: Replace these paragraphs with your latest personal story, interests, and long-term direction.',
  ],
  skills: [
    {
      title: 'Core Engineering',
      items: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Data Structures', 'Algorithms'],
    },
    {
      title: 'Frontend & Product',
      items: ['React', 'HTML/CSS', 'Responsive UI', 'Accessibility', 'State Management'],
    },
    {
      title: 'Backend & Systems',
      items: ['Node.js', 'REST APIs', 'SQL', 'Firebase', 'Cloud Fundamentals'],
    },
    {
      title: 'Machine Learning',
      items: ['PyTorch', 'Computer Vision', 'Model Training', 'Real-time Inference'],
    },
  ],
  projects: [
    {
      title: 'DCNN Lane Detection',
      description:
        'Developed DCNN and DRNN models for real-time lane detection from live video streams, improving robustness under varying road and lighting conditions.',
      stack: ['Python', 'PyTorch', 'OpenCV', 'Deep Learning'],
      image: '/assets/project1.png',
      repoUrl:
        'https://github.com/AwrodHaghiTabrizi/UMARV-CV-LaneDetection/tree/users/Parsanna/models/model_2y4c4shn',
    },
    {
      title: 'Notes Web App',
      description:
        'Built a persistent notes application with local storage so users can create, edit, and revisit notes across browser sessions.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
      image: '/assets/project2.png',
      demoUrl: 'https://parsannak.github.io/notesApp/',
    },
    {
      title: 'Weather Web App',
      description:
        'Created a city-based weather dashboard with real-time temperature, humidity, and wind speed using the OpenWeather API.',
      stack: ['JavaScript', 'REST API', 'OpenWeather', 'Responsive Design'],
      image: '/assets/project3.png',
      demoUrl: 'https://parsannak.github.io/WeatherWebApp/',
    },
    {
      title: 'Random Password Generator',
      description:
        'Implemented a customizable password generator focused on usability and practical security for everyday users.',
      stack: ['JavaScript', 'UI Design', 'Security Basics'],
      image: '/assets/project4.png',
      demoUrl: 'https://parsannak.github.io/RandomPasswordGenerator/',
    },
    {
      title: 'To-Do List Web App',
      description:
        'Designed a task manager with local persistence, fast interaction patterns, and a clean workflow for daily productivity.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
      image: '/assets/project5.png',
      demoUrl: 'https://parsannak.github.io/ToDoListWeb/',
    },
    {
      title: 'Custom Quiz App',
      description:
        'Developed an interactive quiz platform with instant answer feedback and score tracking to improve engagement.',
      stack: ['JavaScript', 'UX', 'State Handling'],
      image: '/assets/project6.png',
      demoUrl: 'https://parsannak.github.io/customQuizWebApp/',
    },
  ],
  experience: [
    {
      company: 'University of Michigan Autonomous Robotic Vehicle Team',
      role: 'Computer Vision Contributor',
      period: '2024 - Present',
      summary: 'Developed and evaluated deep-learning lane-detection pipelines for autonomous navigation research.',
      highlights: [
        'Built real-time model variants and compared performance across changing visual conditions.',
        'Collaborated with peers on experimentation strategy and validation methodology.',
      ],
    },
    {
      company: 'University Recreation Sports Center',
      role: 'Building Supervisor',
      period: '2023 - Present',
      summary: 'Lead shift operations and coordinate student staff while maintaining service quality and safety standards.',
      highlights: [
        'Managed frontline operations and escalations during high-traffic hours.',
        'Strengthened leadership, communication, and decision-making in fast-paced scenarios.',
      ],
    },
    {
      company: 'Next Experience Slot',
      role: 'TODO: Add latest internship or role',
      period: 'TODO: Add dates',
      summary: 'TODO: Replace with your newest experience summary.',
      highlights: ['TODO: Add measurable outcomes.', 'TODO: Add technologies and impact.'],
    },
  ],
  resume: {
    filePath: '/Parsanna_Resume.pdf',
    downloadLabel: 'Download Resume (PDF)',
    updatedAt: 'Updated March 2026',
  },
  contact: {
    headline: 'Let\'s build something ambitious together.',
    email: 'hello@parsannak.dev',
    social: [
      { label: 'GitHub', url: 'https://github.com/ParsannaK', icon: 'github' },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/parsanna-koirala-931b5b250/',
        icon: 'linkedin',
      },
      { label: 'Email', url: 'mailto:hello@parsannak.dev', icon: 'email' },
    ],
  },
};
