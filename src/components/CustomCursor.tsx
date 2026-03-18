import { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

function supportsFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches;
}

export function CustomCursor(): JSX.Element | null {
  const reducedMotion = useReducedMotion();
  const enabled = useMemo(() => !reducedMotion && supportsFinePointer(), [reducedMotion]);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('custom-cursor-enabled');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPosition = { x: target.x, y: target.y };
    const ringPosition = { x: target.x, y: target.y };
    let frameId = 0;
    let visible = false;

    const showCursor = (): void => {
      if (visible) return;
      dot.classList.remove('hidden');
      ring.classList.remove('hidden');
      visible = true;
    };

    const update = (): void => {
      dotPosition.x += (target.x - dotPosition.x) * 0.42;
      dotPosition.y += (target.y - dotPosition.y) * 0.42;
      ringPosition.x += (target.x - ringPosition.x) * 0.18;
      ringPosition.y += (target.y - ringPosition.y) * 0.18;

      dot.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`;

      frameId = window.requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent): void => {
      target.x = event.clientX;
      target.y = event.clientY;
      showCursor();
    };

    const onPointerDown = (): void => ring.classList.add('pressed');
    const onPointerUp = (): void => ring.classList.remove('pressed');

    const onMouseOver = (event: MouseEvent): void => {
      const targetNode = event.target as HTMLElement | null;
      if (!targetNode) return;
      const interactive = targetNode.closest(
        'a,button,input,textarea,select,label,[role="button"],[data-cursor="interactive"]',
      );
      ring.classList.toggle('active', Boolean(interactive));
    };

    const onMouseLeaveWindow = (): void => {
      dot.classList.add('hidden');
      ring.classList.add('hidden');
      visible = false;
    };

    frameId = window.requestAnimationFrame(update);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseleave', onMouseLeaveWindow);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseleave', onMouseLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot hidden" aria-hidden="true" />
    </>
  );
}
