"use client";

import { useEffect, useMemo, useState } from "react";

export function useTypewriter(
  phrases: string[],
  typingSpeed = 38,
  holdDelay = 1800,
  deleteSpeed = 22
) {
  const safePhrases = useMemo(
    () => (phrases.length > 0 ? phrases : ["Building real-time systems."]),
    [phrases]
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = safePhrases[phraseIndex] ?? safePhrases[0];
    const isComplete = charIndex === phrase.length;
    const isEmpty = charIndex === 0;
    const delay = isDeleting
      ? deleteSpeed
      : isComplete
        ? holdDelay
        : typingSpeed;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % safePhrases.length);
        return;
      }

      setCharIndex((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    charIndex,
    deleteSpeed,
    holdDelay,
    isDeleting,
    phraseIndex,
    safePhrases,
    typingSpeed
  ]);

  return safePhrases[phraseIndex].slice(0, charIndex);
}
