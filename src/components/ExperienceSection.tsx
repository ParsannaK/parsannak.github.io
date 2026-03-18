import type { CSSProperties } from 'react';
import type { ExperienceItem } from '../types/content';

interface ExperienceSectionProps {
  items: ExperienceItem[];
}

export function ExperienceSection({ items }: ExperienceSectionProps): JSX.Element {
  return (
    <section id="experience" className="section-wrap" data-reveal>
      <div className="section-title-block">
        <p className="eyebrow">Experience</p>
        <h2> Work & Leadership</h2>
      </div>

      <div className="timeline">
        {items.map((item, index) => (
          <article key={`${item.company}-${item.role}`} className="timeline-card" data-reveal style={{ '--delay-index': index } as CSSProperties}>
            <div className="timeline-meta">
              <h3>{item.role}</h3>
              <span>{item.company}</span>
              <small>{item.period}</small>
            </div>
            <p>{item.summary}</p>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
