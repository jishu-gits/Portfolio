"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type { ReactNode } from "react";

type SoundKind = "hover" | "select";

type SoundContextValue = {
  muted: boolean;
  toggleMuted: () => void;
  play: (kind?: SoundKind) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

type WebAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-sound-muted");
    if (stored) {
      setMuted(stored === "true");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-sound-muted", String(muted));
  }, [muted]);

  const getAudioContext = useCallback(() => {
    if (audioContextRef.current) {
      return audioContextRef.current;
    }

    const AudioCtor =
      window.AudioContext || (window as WebAudioWindow).webkitAudioContext;

    if (!AudioCtor) {
      return null;
    }

    audioContextRef.current = new AudioCtor();
    return audioContextRef.current;
  }, []);

  const play = useCallback(
    (kind: SoundKind = "hover") => {
      if (muted) {
        return;
      }

      const audioContext = getAudioContext();
      if (!audioContext) {
        return;
      }

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const now = audioContext.currentTime;
      const frequency = kind === "select" ? 540 : 360;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.35, now + 0.08);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(kind === "select" ? 0.045 : 0.022, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.14);
    },
    [getAudioContext, muted]
  );

  useEffect(() => {
    function handlePointer(event: Event) {
      const target = event.target as HTMLElement | null;
      const soundTarget = target?.closest<HTMLElement>("[data-sound]");

      if (!soundTarget) {
        return;
      }

      play(event.type === "click" ? "select" : "hover");
    }

    document.addEventListener("click", handlePointer);
    document.addEventListener("pointerenter", handlePointer, true);

    return () => {
      document.removeEventListener("click", handlePointer);
      document.removeEventListener("pointerenter", handlePointer, true);
    };
  }, [play]);

  const value = useMemo(
    () => ({
      muted,
      toggleMuted: () => setMuted((current) => !current),
      play
    }),
    [muted, play]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }

  return context;
}
