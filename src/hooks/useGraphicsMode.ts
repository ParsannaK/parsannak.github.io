import { useMemo } from 'react';
import { useReducedMotion } from './useReducedMotion';

function hasWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return Boolean(gl);
}

function isConstrainedDevice(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number };

  const memoryConstrained = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;
  const cpuConstrained = (nav.hardwareConcurrency ?? 8) <= 4;

  return memoryConstrained || cpuConstrained;
}

export function useGraphicsMode(): { enable3D: boolean; reducedMotion: boolean } {
  const reducedMotion = useReducedMotion();

  const enable3D = useMemo(() => {
    if (typeof window === 'undefined') return false;
    if (reducedMotion) return false;
    if (isConstrainedDevice()) return false;
    return hasWebGLSupport();
  }, [reducedMotion]);

  return { enable3D, reducedMotion };
}
