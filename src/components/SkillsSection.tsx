import type { CSSProperties } from 'react';
import type { SkillGroup } from '../types/content';

interface SkillsSectionProps {
  skills: SkillGroup[];
}

export function SkillsSection({ skills }: SkillsSectionProps): JSX.Element {
  return (
    <section id="skills" className="section-wrap" data-reveal>
      <div className="section-title-block">
        <p className="eyebrow">Skills</p>
        <h2>Tools I Use To Build and Ship</h2>
      </div>

      <div className="skills-grid">
        {skills.map((group, index) => (
          <article
            key={group.title}
            className="skill-card"
            style={{ '--delay-index': index } as CSSProperties}
            data-reveal
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
