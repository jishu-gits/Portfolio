"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import type { TimelineItem } from "@/lib/content-schema";

export function TimelineSection({ timeline }: { timeline: TimelineItem[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setExpandedIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="section-band py-20 sm:py-28" id="timeline">
      <div className="container">
        <SectionHeading
          description="Click any milestone to explore the full story."
          eyebrow="Timeline"
          title="Milestones in XR, graphics, and procedural systems."
        />

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:block" />

          <div className="grid gap-4">
            {timeline.map((item, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <motion.article
                  className="group relative cursor-pointer md:ml-12"
                  data-gsap-reveal
                  initial={{ opacity: 0, x: -10 }}
                  key={`${item.year}-${item.title}`}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Year dot on the line */}
                  <div className="absolute -left-12 top-6 hidden md:block">
                    <span
                      className={[
                        "grid h-8 w-8 place-items-center rounded-full border font-mono text-xs transition-colors duration-300",
                        isExpanded
                          ? "border-primary bg-primary text-primary-foreground shadow-signal-sm"
                          : "border-white/15 bg-background text-muted-foreground group-hover:border-primary/40 group-hover:text-primary"
                      ].join(" ")}
                    >
                      {item.year.slice(-2)}
                    </span>
                  </div>

                  <div
                    className={[
                      "technical-panel rounded-md p-5 transition-all duration-300",
                      isExpanded
                        ? "border-primary/25"
                        : "hover:border-white/15"
                    ].join(" ")}
                    onClick={() => handleToggle(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggle(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="accent">{item.year}</Badge>
                        <h3 className="text-base font-semibold text-foreground sm:text-lg">
                          {item.title}
                        </h3>
                      </div>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="shrink-0 text-muted-foreground"
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded ? (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
