import type { ResumeConfig } from '../types/content';

interface ResumeSectionProps {
  resume: ResumeConfig;
}

export function ResumeSection({ resume }: ResumeSectionProps): JSX.Element {
  return (
    <section id="resume" className="section-wrap" data-reveal>
      <div className="section-title-block">
        <p className="eyebrow">Resume</p>
        <h2>Recruiter-Ready Snapshot</h2>
      </div>

      <div className="resume-actions" data-reveal>
        <a className="btn btn-primary" href={resume.filePath} download>
          {resume.downloadLabel}
        </a>
        <span>{resume.updatedAt}</span>
      </div>

      <div className="resume-preview" data-reveal>
        <object data={resume.filePath} type="application/pdf" aria-label="Embedded resume preview">
          <p>
            Resume preview is unavailable in this browser.{' '}
            <a href={resume.filePath} target="_blank" rel="noreferrer">
              Open the PDF
            </a>
            .
          </p>
        </object>
      </div>
    </section>
  );
}
