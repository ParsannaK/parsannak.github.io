import type { CSSProperties, MouseEvent } from 'react';
import type { ProjectItem } from '../types/content';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  disableTilt: boolean;
}

function onCardMove(event: MouseEvent<HTMLElement>): void {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  const rotateY = ((event.clientX - centerX) / bounds.width) * 13;
  const rotateX = -((event.clientY - centerY) / bounds.height) * 10;

  card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
  card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
  card.classList.add('is-tilting');
}

function resetCard(event: MouseEvent<HTMLElement>): void {
  const card = event.currentTarget;
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
  card.classList.remove('is-tilting');
}

export function ProjectsSection({ projects, disableTilt }: ProjectsSectionProps): JSX.Element {
  return (
    <section id="projects" className="section-wrap" data-reveal>
      <div className="section-title-block">
        <p className="eyebrow">Projects</p>
        <h2>Selected Work</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="project-card"
            data-reveal
            style={{ '--delay-index': index } as CSSProperties}
            onMouseMove={disableTilt ? undefined : onCardMove}
            onMouseLeave={disableTilt ? undefined : resetCard}
          >
            <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
            <div className="project-copy">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>

            <ul className="project-stack">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <div className="project-actions">
              {project.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
