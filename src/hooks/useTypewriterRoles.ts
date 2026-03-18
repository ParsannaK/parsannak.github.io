import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useTypewriterRoles(roles: string[]): string {
  const reducedMotion = useReducedMotion();
  const safeRoles = useMemo(() => (roles.length ? roles : ['Software Engineer']), [roles]);
  const [text, setText] = useState(safeRoles[0]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setText(safeRoles[0]);
      setIsDeleting(false);
      setRoleIndex(0);
      return;
    }

    const currentRole = safeRoles[roleIndex];
    let timeoutId = 0;

    if (!isDeleting) {
      if (text !== currentRole) {
        timeoutId = window.setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, 82);
      } else {
        timeoutId = window.setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    } else if (text.length > 0) {
      timeoutId = window.setTimeout(() => {
        setText(currentRole.slice(0, text.length - 1));
      }, 48);
    } else {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((index) => (index + 1) % safeRoles.length);
      }, 220);
    }

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, reducedMotion, roleIndex, safeRoles, text]);

  return text;
}
