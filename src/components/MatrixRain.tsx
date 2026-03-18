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
    if (reducedMotion) return;

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
    const targetFrameInterval = lowPowerDevice ? 1000 / 14 : 1000 / 24;

    const resize = (): void => {
      const dpr = lowPowerDevice ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = width < 900 ? (lowPowerDevice ? 16 : 15) : lowPowerDevice ? 20 : 18;
      columnWidth = Math.floor(fontSize * (lowPowerDevice ? 1.45 : 1.32));
      columns = Math.floor(width / columnWidth);
      drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
    };

    const draw = (timestamp: number): void => {
      if (timestamp - lastFrame < targetFrameInterval) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;

      context.fillStyle = lowPowerDevice ? 'rgba(2, 10, 24, 0.13)' : 'rgba(2, 10, 24, 0.09)';
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px "Space Grotesk", monospace`;
      context.textBaseline = 'top';

      const wave = timestamp * (lowPowerDevice ? 0.0005 : 0.00075);

      for (let i = 0; i < columns; i += 1) {
        const char = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        const x = i * columnWidth;
        const y = drops[i] * fontSize;
        const glow = 0.44 + Math.sin(wave + i * 0.22) * (lowPowerDevice ? 0.12 : 0.18);
        const g = Math.floor(198 + glow * 36);
        const b = Math.floor(140 + glow * 58);

        context.fillStyle = `rgba(92, ${g}, ${b}, ${lowPowerDevice ? '0.42' : '0.5'})`;
        context.fillText(char, x, y);

        if (y > height && Math.random() > (lowPowerDevice ? 0.996 : 0.992)) {
          drops[i] = 0;
        } else {
          drops[i] += lowPowerDevice ? 0.17 + Math.random() * 0.14 : 0.25 + Math.random() * 0.2;
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

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
