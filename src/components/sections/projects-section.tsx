"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content-schema";
import { isPresent } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const scroll = useScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;
    const scrollElement = scroll.el;

    if (!section || !viewport || !rail || !scrollElement) {
      return;
    }

    const viewportHeight = scrollElement.clientHeight;
    const trackWidth = rail.scrollWidth;
    const viewportWidth = viewport.clientWidth;
    const maxTranslate = Math.max(trackWidth - viewportWidth, 0);

    const targetHeight = viewportHeight + maxTranslate;
    if (section.style.minHeight !== `${targetHeight}px`) {
      section.style.minHeight = `${targetHeight}px`;
    }

    const sectionScrollLength = Math.max(section.offsetHeight - viewportHeight, 1);
    const sectionScroll = clamp(
      scrollElement.getBoundingClientRect().top -
        section.getBoundingClientRect().top,
      0,
      sectionScrollLength
    );
    const progress = sectionScroll / sectionScrollLength;

    // ScrollControls translates the HTML layer itself. Counter that vertical
    // movement here so the rail remains pinned while this section is active.
    viewport.style.transform = `translate3d(0, ${sectionScroll}px, 0)`;
    rail.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
  });

  return (
    <section
      className="relative w-screen pointer-events-none"
      data-section
      id="projects"
      ref={sectionRef}
      style={{ minHeight: `${Math.max(projects.length, 1) * 100}dvh` }}
    >
      <div
        className="absolute inset-x-0 top-0 flex h-[100dvh] w-screen flex-col overflow-hidden px-6 pt-20 will-change-transform sm:px-12 sm:pt-24 md:px-24 md:pt-32"
        ref={viewportRef}
      >
        <h2 className="mb-8 w-fit shrink-0 rounded-2xl border border-white/10 bg-black/60 px-6 py-3 text-3xl font-bold tracking-widest text-white uppercase drop-shadow-lg backdrop-blur-xl shadow-2xl pointer-events-auto sm:mb-12 sm:px-8 sm:py-4 sm:text-4xl">
          Projects
        </h2>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div
            className="flex h-full w-max items-center gap-6 px-1 pr-6 sm:pr-12 md:pr-24 will-change-transform"
            ref={railRef}
          >
            {projects.map((project) => (
              <article
                className="technical-panel glassmorphism w-[min(400px,calc(100vw-4rem))] max-h-full shrink-0 overflow-y-auto rounded-xl border border-white/10 bg-black/60 p-6 pointer-events-auto sm:w-[400px]"
                key={project.title}
              >
                <h3 className="mb-2 text-2xl font-semibold text-white drop-shadow-md">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-neutral-300 font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {project.description}
                </p>

                {project.videos && project.videos.length > 0 && (
                  <div className="mb-4 overflow-hidden rounded-lg border border-white/10">
                    {project.videos[0].url.endsWith(".mp4") ? (
                      <video
                        autoPlay
                        className="h-auto w-full"
                        loop
                        muted
                        playsInline
                        src={project.videos[0].url}
                      />
                    ) : (
                      <img
                        alt={project.videos[0].label}
                        className="h-auto w-full"
                        src={project.videos[0].url}
                      />
                    )}
                  </div>
                )}
                {project.images &&
                  project.images.length > 0 &&
                  (!project.videos || project.videos.length === 0) && (
                    <div className="mb-4 overflow-hidden rounded-lg border border-white/10">
                      <img
                        alt={project.images[0].alt}
                        className="h-auto w-full"
                        src={project.images[0].src}
                      />
                    </div>
                  )}

                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <Badge
                      className="border-white/10 bg-white/5 text-xs"
                      key={tech}
                      variant="secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {isPresent(project.github) ? (
                    <Button
                      asChild
                      className="border-white/20 hover:bg-white/10"
                      data-sound
                      size="sm"
                      variant="outline"
                    >
                      <a href={project.github} rel="noreferrer" target="_blank">
                        <Github aria-hidden="true" className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  ) : null}
                  {isPresent(project.demo) ? (
                    <Button
                      asChild
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      data-sound
                      size="sm"
                    >
                      <a href={project.demo} rel="noreferrer" target="_blank">
                        Demo
                        <ExternalLink
                          aria-hidden="true"
                          className="ml-2 h-4 w-4"
                        />
                      </a>
                    </Button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
