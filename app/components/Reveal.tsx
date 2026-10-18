'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scroll-triggered reveal. Wraps a block and fades/rises it into place the
 * first time it enters the viewport, driving the `.reveal` / `.is-visible`
 * styles already defined in globals.css.
 *
 * Reverent, one-shot (disconnects after revealing). Reduced-motion users are
 * handled by the CSS media query, which forces the content visible.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already in view on mount (e.g. tall viewport) → reveal without waiting.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? ' is-visible' : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
