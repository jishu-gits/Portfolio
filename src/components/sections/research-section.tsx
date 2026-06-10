"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Research } from "@/lib/content-schema";

export function ResearchSection({ research }: { research: Research }) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const truncatedStatement =
    research.statement.length > 200
      ? research.statement.slice(0, 200) + "…"
      : research.statement;

  return (
    <section className="section-band py-20 sm:py-28" id="research">
      <div className="container">
        <SectionHeading
          description="Explore the full research workspace for detailed interests, projects, and future directions."
          eyebrow="Research"
          title="Adaptive rendering as a systems problem."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Truncated statement */}
          <div className="technical-panel rounded-md p-6" data-gsap-reveal>
            <p className="text-base leading-8 text-neutral-200">
              {truncatedStatement}
            </p>
            <button
              className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-primary transition hover:text-accent"
              data-sound
              onClick={() => setWorkspaceOpen(true)}
              type="button"
            >
              <Sparkles className="h-4 w-4" />
              <span className="animated-underline">
                Explore Research Workspace
              </span>
            </button>
          </div>

          {/* Research interests as animated cards */}
          <div className="grid grid-cols-2 gap-3" data-gsap-reveal>
            {research.interests.map((interest, index) => (
              <motion.div
                className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-neutral-200 transition hover:border-primary/30 hover:text-primary"
                initial={{ opacity: 0, y: 16 }}
                key={interest}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8" data-gsap-reveal>
          <Button
            data-sound
            onClick={() => setWorkspaceOpen(true)}
            variant="outline"
          >
            <Sparkles className="h-4 w-4" />
            Open Research Workspace
          </Button>
        </div>
      </div>

      {/* Research Workspace Modal */}
      <Modal
        open={workspaceOpen}
        onClose={() => setWorkspaceOpen(false)}
        title="Research Workspace"
      >
        <div>
          {/* Full research statement */}
          <h2 className="text-2xl font-semibold text-foreground">
            Research Statement
          </h2>
          <p className="mt-4 text-base leading-8 text-neutral-200">
            {research.statement}
          </p>

          {/* Research interests */}
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase text-primary">
              Research Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {research.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Research projects */}
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase text-primary">
              Research Projects
            </p>
            <div className="grid gap-4">
              {research.projects.map((project, index) => (
                <div
                  className="rounded-md border border-white/10 bg-white/[0.03] p-4"
                  key={project.id}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-md border border-primary/30 bg-primary/10 font-mono text-xs text-primary">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-foreground">
                      {project.title}
                    </span>
                    <Badge
                      variant={
                        project.phase === "Active" ? "accent" : "outline"
                      }
                    >
                      {project.phase}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.methods.map((method) => (
                      <Badge key={method} variant="accent">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future directions */}
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase text-primary">
              Future Directions
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {research.futureDirections.map((direction) => (
                <div
                  className="rounded-md border border-white/10 bg-white/[0.03] p-4"
                  key={direction}
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="mb-3 h-4 w-4 text-primary"
                  />
                  <p className="text-sm leading-7 text-neutral-200">
                    {direction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button asChild data-sound variant="outline">
              <a href="#contact">Discuss research fit</a>
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
