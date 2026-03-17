interface AboutSectionProps {
  paragraphs: string[];
}

export function AboutSection({ paragraphs }: AboutSectionProps): JSX.Element {
  return (
    <section id="about" className="section-wrap" data-reveal>
      <div className="section-title-block">
        <p className="eyebrow">About</p>
        <h2>Building Useful, Beautiful, and Fast Products</h2>
      </div>

      <div className="about-layout">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
