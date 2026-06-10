"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import type { SkillGroup } from "@/lib/content-schema";

function SkillCategoryCard({
  group,
  isExpanded,
  onToggle
}: {
  group: SkillGroup;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="technical-panel card-hover-lift cursor-pointer rounded-md p-6"
      data-gsap-reveal
    >
      <button
        className="flex w-full items-start justify-between gap-4 text-left"
        data-sound
        onClick={onToggle}
        type="button"
      >
        <div>
          <Badge variant="accent">{group.category}</Badge>
          <p className="mt-3 text-sm text-muted-foreground">
            {group.summary}
          </p>
          <p className="mt-2 font-mono text-xs text-primary">
            {group.items.length} skills
          </p>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="mt-1 shrink-0 text-muted-foreground"
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
              {group.items.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.focus}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-primary">
                      {item.level}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.15
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setExpandedIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="section-band py-20 sm:py-28" id="skills">
      <div className="container">
        <SectionHeading
          description="Click a category to explore skills, experience levels, and focus areas."
          eyebrow="Skills"
          title="A practical stack for immersive graphics systems."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skills.map((group, index) => (
            <SkillCategoryCard
              group={group}
              isExpanded={expandedIndex === index}
              key={group.category}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
