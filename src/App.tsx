import { useMemo } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
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

function App(): JSX.Element {
  useRevealAnimations();

  const { enable3D, reducedMotion } = useGraphicsMode();
  const sectionIds = useMemo(() => siteContent.navigation.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <Navbar items={siteContent.navigation} activeSection={activeSection} />

      <main>
        <HeroSection profile={siteContent.profile} enable3D={enable3D} />
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
