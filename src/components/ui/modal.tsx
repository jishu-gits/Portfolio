"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 34,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
  }
};

export function Modal({ open, onClose, children, title }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleEscape]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate="visible"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-12 sm:py-16"
          exit="hidden"
          initial="hidden"
          role="dialog"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            variants={backdropVariants}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-xl border border-white/10 bg-[#0c0c0c]/95 shadow-2xl backdrop-blur-xl"
            ref={panelRef}
            variants={panelVariants}
          >
            {/* Close button */}
            <button
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              data-sound
              onClick={onClose}
              type="button"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="p-6 pt-12 sm:p-8 sm:pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
