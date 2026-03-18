import { lazy, Suspense } from 'react';
import { IconGlyph } from './IconGlyph';
import type { Profile, SocialLink } from '../types/content';

const HeroScene = lazy(() => import('./HeroScene'));

interface HeroSectionProps {
  profile: Profile;
  socialLinks: SocialLink[];
  enable3D: boolean;
}

export function HeroSection({ profile, socialLinks, enable3D }: HeroSectionProps): JSX.Element {
  return (
    <section id="home" className="hero section-wrap" data-reveal>
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">Software Engineer Portfolio</p>
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-meta">
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
        </div>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#resume" className="btn btn-ghost">
            Resume
          </a>
        </div>

        <div className="hero-social">
          {socialLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label}>
              <IconGlyph icon={link.icon} />
            </a>
          ))}
        </div>
      </div>

      <div className="hero-visual" data-reveal>
        {enable3D ? (
          <div className="hero-canvas-shell" aria-label="Decorative 3D hero animation">
            <Suspense fallback={<div className="hero-fallback-loading">Loading 3D scene...</div>}>
              <HeroScene />
            </Suspense>
          </div>
        ) : (
          <div className="hero-fallback" aria-label="Static hero visual fallback">
            <img src={profile.portrait} alt="Portrait of Parsanna Koirala" loading="eager" />
          </div>
        )}
      </div>
    </section>
  );
}
