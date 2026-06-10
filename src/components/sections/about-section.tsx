"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/content-schema";

export function AboutSection({ profile }: { profile: Profile }) {
  const [expanded, setExpanded] = useState(false);
  const truncatedSummary = profile.summary.slice(0, 140) + "…";

  return (
    <section className="section-band py-20 sm:py-28" id="about">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          description="A compact profile for teams and labs evaluating XR engineering, graphics systems work, and research fit."
          eyebrow="About"
          title="Engineering spatial systems with research-grade care."
        />

        <div className="grid gap-5" data-gsap-reveal>
          <div className="technical-panel rounded-md p-6">
            <AnimatePresence mode="wait" initial={false}>
              {expanded ? (
                <motion.p
                  key="full"
                  className="text-lg leading-8 text-neutral-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {profile.summary}
                </motion.p>
              ) : (
                <motion.p
                  key="truncated"
                  className="text-lg leading-8 text-neutral-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {truncatedSummary}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-primary transition hover:text-accent"
              data-sound
              onClick={() => setExpanded((prev) => !prev)}
              type="button"
            >
              {expanded ? "Show less" : "Read more"}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <div className="mt-6 flex flex-wrap gap-2">
              {profile.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Education", "VIT Bhopal (B.Tech CSE)"],
              ["Duration", "Aug 2022 – May 2026"],
              ["CGPA", "7.86"]
            ].map(([label, value]) => (
              <div
                className="rounded-md border border-white/10 bg-white/[0.03] p-5"
                key={label}
              >
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  {label}
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
