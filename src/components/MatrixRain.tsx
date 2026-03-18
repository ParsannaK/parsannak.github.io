import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CHARSET = '01{}[]<>$#*+=-_~/\\';

export function MatrixRain(): JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const lowPowerDevice =
    typeof navigator !== 'undefined' &&
    (((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4 ||
      (navigator.hardwareConcurrency ?? 8) <= 4);

  useEffect(() => {
    if (reducedMotion || lowPowerDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let frameId = 0;
    let lastFrame = 0;
    let width = 0;
    let height = 0;
    let fontSize = 18;
    let columnWidth = 24;
    let columns = 0;
    let drops: number[] = [];
    const targetFrameInterval = 1000 / 22;

    const resize = (): void => {
      const dpr = 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = width < 900 ? 15 : 18;
      columnWidth = Math.floor(fontSize * 1.32);
      columns = Math.floor(width / columnWidth);
      drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
    };

    const draw = (timestamp: number): void => {
      if (timestamp - lastFrame < targetFrameInterval) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;

      context.fillStyle = 'rgba(2, 10, 24, 0.1)';
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px "Space Grotesk", monospace`;
      context.textBaseline = 'top';

      const wave = timestamp * 0.00075;

      for (let i = 0; i < columns; i += 1) {
        const char = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        const x = i * columnWidth;
        const y = drops[i] * fontSize;
        const glow = 0.44 + Math.sin(wave + i * 0.22) * 0.18;
        const g = Math.floor(198 + glow * 36);
        const b = Math.floor(140 + glow * 58);

        context.fillStyle = `rgba(92, ${g}, ${b}, 0.44)`;
        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.992) {
          drops[i] = 0;
        } else {
          drops[i] += 0.25 + Math.random() * 0.2;
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
  }, [reducedMotion, lowPowerDevice]);

  if (reducedMotion || lowPowerDevice) return null;

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
