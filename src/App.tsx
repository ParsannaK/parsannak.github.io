import { useEffect, useMemo, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CommandPalette, type PaletteCommand } from './components/CommandPalette';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { MatrixRain } from './components/MatrixRain';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { SkillsSection } from './components/SkillsSection';
import { assertValidSiteContent } from './content/validateContent';
import { siteContent } from './content/siteContent';
import { useActiveSection } from './hooks/useActiveSection';
import { useGraphicsMode } from './hooks/useGraphicsMode';
import { useRevealAnimations } from './hooks/useRevealAnimations';

assertValidSiteContent(siteContent);

function isEditableElement(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (!element) return false;

  const tagName = element.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') return true;
  return element.isContentEditable;
}

function App(): JSX.Element {
  useRevealAnimations();

  const [paletteOpen, setPaletteOpen] = useState(false);
  const { enable3D, reducedMotion } = useGraphicsMode();
  const sectionIds = useMemo(() => siteContent.navigation.map((item) => item.id), []);
  const heroSocialLinks = useMemo(
    () => siteContent.contact.social.filter((link) => link.icon === 'github' || link.icon === 'linkedin'),
    [],
  );
  const activeSection = useActiveSection(sectionIds);

  const commands = useMemo<PaletteCommand[]>(() => {
    const navigationCommands = siteContent.navigation.map((item) => ({
      id: `navigate-${item.id}`,
      title: `Go To ${item.label}`,
      description: `Scroll to ${item.label} section`,
      action: () => {
        const section = document.getElementById(item.id);
        if (!section) return;
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${item.id}`);
      },
    }));

    const githubLink = siteContent.contact.social.find((link) => link.icon === 'github')?.url;
    const linkedinLink = siteContent.contact.social.find((link) => link.icon === 'linkedin')?.url;

    return [
      ...navigationCommands,
      {
        id: 'open-resume',
        title: 'Open Resume',
        description: 'Open resume PDF in a new tab',
        action: () => window.open(siteContent.resume.filePath, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'copy-email',
        title: 'Copy Email',
        description: siteContent.contact.email,
        action: () => {
          void navigator.clipboard?.writeText(siteContent.contact.email);
        },
      },
      ...(githubLink
        ? [
            {
              id: 'open-github',
              title: 'Open GitHub',
              description: githubLink,
              action: () => window.open(githubLink, '_blank', 'noopener,noreferrer'),
            },
          ]
        : []),
      ...(linkedinLink
        ? [
            {
              id: 'open-linkedin',
              title: 'Open LinkedIn',
              description: linkedinLink,
              action: () => window.open(linkedinLink, '_blank', 'noopener,noreferrer'),
            },
          ]
        : []),
    ];
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (isEditableElement(event.target)) return;
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="app-shell">
      <CustomCursor />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
      <MatrixRain />
      <div className="starfield starfield-a" aria-hidden="true" />
      <div className="starfield starfield-b" aria-hidden="true" />
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <Navbar items={siteContent.navigation} activeSection={activeSection} />

      <main>
        <HeroSection profile={siteContent.profile} socialLinks={heroSocialLinks} enable3D={enable3D} />
        <AboutSection paragraphs={siteContent.about} />
        <SkillsSection skills={siteContent.skills} />
        <ProjectsSection projects={siteContent.projects} disableTilt={reducedMotion} />
        <ExperienceSection items={siteContent.experience} />
        <ResumeSection resume={siteContent.resume} />
        <ContactSection
          headline={siteContent.contact.headline}
          email={siteContent.contact.email}
          social={siteContent.contact.social}
        />
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Parsanna Koirala</p>
      </footer>
    </div>
  );
}

export default App;
