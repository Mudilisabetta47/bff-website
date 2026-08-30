'use client';

import { useEffect } from 'react';

/** Einzige Client-Insel: lädt die Motion-Engine nach dem Rendern nach. */
export default function MotionRoot() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import('../app/motion').then((m) => {
      if (!cancelled) dispose = m.boot();
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);
  return null;
}
