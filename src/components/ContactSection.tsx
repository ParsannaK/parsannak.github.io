import { IconGlyph } from './IconGlyph';
import type { SocialLink } from '../types/content';

interface ContactSectionProps {
  headline: string;
  email: string;
  social: SocialLink[];
}

export function ContactSection({ headline, email, social }: ContactSectionProps): JSX.Element {
  return (
    <section id="contact" className="section-wrap" data-reveal>
      <div className="section-title-block">
        <p className="eyebrow">Contact</p>
        <h2>{headline}</h2>
      </div>

      <div className="contact-card" data-reveal>
        <a className="btn btn-primary" href={`mailto:${email}`}>
          {email}
        </a>
        <p>Fastest response: email or LinkedIn message.</p>

        <div className="social-row">
          {social.map((item) => (
            <a key={item.label} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label}>
              <IconGlyph icon={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
