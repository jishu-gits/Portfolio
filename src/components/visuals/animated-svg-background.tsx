"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import type { CSSProperties } from "react";

export function AnimatedSvgBackground() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 24 });
  const maskPosition = useMotionTemplate`${smoothX}% ${smoothY}%`;

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      mouseX.set((event.clientX / window.innerWidth) * 100);
      mouseY.set((event.clientY / window.innerHeight) * 100);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-research-grid bg-[length:76px_76px] opacity-70"
        style={{
          maskImage:
            "radial-gradient(circle at var(--mask-position), black 0, black 22%, transparent 58%)",
          WebkitMaskImage:
            "radial-gradient(circle at var(--mask-position), black 0, black 22%, transparent 58%)",
          "--mask-position": maskPosition
        } as CSSProperties & { "--mask-position": unknown }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="trace" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
            <stop offset="48%" stopColor="#2dd4bf" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          animate={{ pathLength: [0.18, 0.92, 0.18], opacity: [0.2, 0.72, 0.2] }}
          d="M-40 612 C 260 484, 360 720, 642 492 S 1010 238, 1484 360"
          fill="none"
          initial={false}
          stroke="url(#trace)"
          strokeLinecap="round"
          strokeWidth="2"
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.path
          animate={{ pathLength: [0.12, 0.86, 0.12], opacity: [0.16, 0.55, 0.16] }}
          d="M-60 230 C 220 330, 376 100, 640 220 C 910 342, 1034 608, 1500 520"
          fill="none"
          initial={false}
          stroke="#2dd4bf"
          strokeLinecap="round"
          strokeWidth="1.5"
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 0.7 }}
        />
      </svg>
      <div className="absolute left-0 right-0 top-1/4 h-px bg-scan-line opacity-40" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-scan-line opacity-30" />
    </div>
  );
}
