"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/**
 * Animated number counter that counts from 0 to `target` when
 * the element enters the viewport. Returns [ref, displayValue].
 */
export function useCounter(
  target: number,
  duration = 1400
): [RefObject<HTMLElement | null>, number] {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          function step(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          }

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, value];
}
