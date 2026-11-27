import {useEffect, useRef, useState} from 'react';

interface UseCountUpOptions {
  target: number;
  decimals?: number;
  durationMs?: number;
  startOnMount?: boolean;
}

export function useCountUp<T extends HTMLElement = HTMLElement>({
  target,
  decimals = 1,
  durationMs = 1100,
  startOnMount = false,
}: UseCountUpOptions) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [displayValue, setDisplayValue] = useState<number>(
    prefersReducedMotion ? target : 0
  );
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setDisplayValue(target);
      return;
    }

    setDisplayValue(0);

    let animationFrame = 0;
    let hasStarted = false;

    const runAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;
      const startTime = performance.now();
      const factor = Math.pow(10, decimals);

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        setDisplayValue(Math.round(current * factor) / factor);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(tick);
        } else {
          setDisplayValue(target);
        }
      };

      animationFrame = requestAnimationFrame(tick);
    };

    const element = ref.current;
    if (
      startOnMount ||
      typeof IntersectionObserver === 'undefined' ||
      !element
    ) {
      runAnimation();
      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      {threshold: 0.1, rootMargin: '40px 0px'}
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, decimals, durationMs, startOnMount]);

  return {ref, displayValue};
}
