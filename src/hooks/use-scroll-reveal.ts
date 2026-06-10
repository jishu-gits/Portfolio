"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type ScrollRevealOptions = {
  threshold?: number;
  once?: boolean;
};

/**
 * Returns [ref, isVisible] — attach the ref to an element and
 * use isVisible to drive Framer Motion animate states.
 */
export function useScrollReveal(
  options: ScrollRevealOptions = {}
): [RefObject<HTMLElement | null>, boolean] {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, isVisible];
}
