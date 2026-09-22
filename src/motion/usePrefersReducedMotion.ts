import { useEffect, useState } from 'react';
import { REDUCED_MOTION_QUERY } from './motionConfig';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(query.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return reduced;
}
