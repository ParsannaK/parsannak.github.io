import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CHARSET = '01{}[]<>$#*+=-_~/\\';

export function MatrixRain(): JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let frameId = 0;
    let width = 0;
    let height = 0;
    let fontSize = 15;
    let columns = 0;
    let drops: number[] = [];

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = width < 900 ? 13 : 15;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
    };

    const draw = (timestamp: number): void => {
      context.fillStyle = 'rgba(2, 10, 24, 0.085)';
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px "Space Grotesk", monospace`;
      context.textBaseline = 'top';

      const wave = timestamp * 0.0012;

      for (let i = 0; i < columns; i += 1) {
        const char = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const glow = 0.46 + Math.sin(wave + i * 0.26) * 0.22;
        const g = Math.floor(198 + glow * 36);
        const b = Math.floor(140 + glow * 58);

        context.fillStyle = `rgba(92, ${g}, ${b}, 0.55)`;
        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.976) {
          drops[i] = 0;
        } else {
          drops[i] += 0.78 + Math.random() * 0.62;
        }
      }

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
