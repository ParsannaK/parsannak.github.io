import { useEffect } from 'react';

export function usePointerParallax(): void {
  useEffect(() => {
    let animationFrame = 0;

    const target = { x: 50, y: 45 };
    const current = { x: 50, y: 45 };

    const update = (): void => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      const nx = (current.x - 50) / 50;
      const ny = (current.y - 50) / 50;

      const root = document.documentElement;
      root.style.setProperty('--pointer-x', `${current.x.toFixed(2)}%`);
      root.style.setProperty('--pointer-y', `${current.y.toFixed(2)}%`);
      root.style.setProperty('--pointer-nx', nx.toFixed(4));
      root.style.setProperty('--pointer-ny', ny.toFixed(4));
      root.style.setProperty('--pointer-shift-x', `${(nx * 24).toFixed(2)}px`);
      root.style.setProperty('--pointer-shift-y', `${(ny * 16).toFixed(2)}px`);
      root.style.setProperty('--pointer-shift-x-neg', `${(nx * -20.4).toFixed(2)}px`);
      root.style.setProperty('--pointer-shift-y-neg', `${(ny * -13.6).toFixed(2)}px`);
      root.style.setProperty('--pointer-soft-a-x', `${(50 + nx * 14).toFixed(2)}%`);
      root.style.setProperty('--pointer-soft-a-y', `${(30 + ny * 12).toFixed(2)}%`);
      root.style.setProperty('--pointer-soft-b-x', `${(40 - nx * 10).toFixed(2)}%`);
      root.style.setProperty('--pointer-soft-b-y', `${(70 - ny * 8).toFixed(2)}%`);
      root.style.setProperty('--star-a-x', `${(nx * 7.2).toFixed(2)}px`);
      root.style.setProperty('--star-a-y', `${(ny * 4.8).toFixed(2)}px`);
      root.style.setProperty('--star-b-x', `${(nx * -5.8).toFixed(2)}px`);
      root.style.setProperty('--star-b-y', `${(ny * -3.8).toFixed(2)}px`);

      animationFrame = window.requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent): void => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      target.x = (event.clientX / width) * 100;
      target.y = (event.clientY / height) * 100;
    };

    animationFrame = window.requestAnimationFrame(update);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);
}
