"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Research } from "@/lib/content-schema";

export function ResearchSection({ research }: { research: Research }) {
  const [selectedId, setSelectedId] = useState(research.projects[0]?.id ?? "");
  const selectedProject = useMemo(
    () =>
      research.projects.find((project) => project.id === selectedId) ??
      research.projects[0],
    [research.projects, selectedId]
  );

  return (
    <section className="section-band py-20 sm:py-28" id="research">
      <div className="container">
        <SectionHeading
          description="An interactive roadmap for research interests, active prototypes, and future directions."
          eyebrow="Research"
          title="Adaptive rendering as a systems problem."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="technical-panel rounded-md p-6" data-gsap-reveal>
            <p className="text-base leading-8 text-neutral-200">
              {research.statement}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {research.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="technical-panel rounded-md p-6" data-gsap-reveal>
            <div className="relative">
              <div className="absolute left-4 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-primary/25 sm:block" />
              <div className="grid gap-4">
                {research.projects.map((project, index) => {
                  const active = selectedProject?.id === project.id;

                  return (
                    <button
                      className="group grid gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-primary/45 sm:grid-cols-[2rem_1fr]"
                      data-sound
                      key={project.id}
                      onClick={() => setSelectedId(project.id)}
                      type="button"
                    >
                      <span
                        className={[
                          "relative z-10 grid h-8 w-8 place-items-center rounded-md border font-mono text-xs",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-white/15 bg-background text-muted-foreground group-hover:text-primary"
                        ].join(" ")}
                      >
                        {index + 1}
                      </span>
                      <span>
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {project.title}
                          </span>
                          <Badge variant={active ? "accent" : "outline"}>
                            {project.phase}
                          </Badge>
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                          {project.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedProject ? (
              <div className="mt-6 rounded-md border border-primary/20 bg-primary/5 p-4">
                <p className="font-mono text-xs uppercase text-primary">
                  Selected methods
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.methods.map((method) => (
                    <Badge key={method} variant="accent">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          data-gsap-reveal
        >
          {research.futureDirections.map((direction) => (
            <div
              className="rounded-md border border-white/10 bg-white/[0.03] p-5"
              key={direction}
            >
              <ArrowRight aria-hidden="true" className="mb-4 h-4 w-4 text-primary" />
              <p className="text-sm leading-7 text-neutral-200">{direction}</p>
            </div>
          ))}
        </div>

        <div className="mt-8" data-gsap-reveal>
          <Button asChild data-sound variant="outline">
            <a href="#contact">Discuss research fit</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
