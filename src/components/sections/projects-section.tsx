"use client";

import { useState } from "react";
import {
  Award,
  ExternalLink,
  FileText,
  Github,
  ImageIcon,
  Play,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Project } from "@/lib/content-schema";
import { hasItems, isPresent } from "@/lib/utils";

function ProjectMedia({ project }: { project: Project }) {
  const hasAnyMedia =
    hasItems(project.images) ||
    hasItems(project.videos) ||
    hasItems(project.certificates) ||
    hasItems(project.documents);

  if (!hasAnyMedia) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {hasItems(project.images) ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {project.images.map((image) => (
            <Image
              alt={image.alt}
              className="aspect-video w-full rounded-md border border-white/10 object-cover"
              height={360}
              key={image.src}
              loading="lazy"
              src={image.src}
              unoptimized
              width={640}
            />
          ))}
        </div>
      ) : null}

      {hasItems(project.videos) ? (
        <div className="flex flex-wrap gap-3">
          {project.videos.map((video) => (
            <a
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              data-sound
              href={video.url}
              key={video.url}
              rel="noreferrer"
              target="_blank"
            >
              <Play aria-hidden="true" className="h-4 w-4" />
              {video.label}
            </a>
          ))}
        </div>
      ) : null}

      {hasItems(project.certificates) ? (
        <div className="flex flex-wrap gap-3">
          {project.certificates.map((certificate) => (
            <a
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              data-sound
              href={certificate.url}
              key={certificate.url}
              rel="noreferrer"
              target="_blank"
            >
              <Award aria-hidden="true" className="h-4 w-4" />
              {certificate.label}
            </a>
          ))}
        </div>
      ) : null}

      {hasItems(project.documents) ? (
        <div className="flex flex-wrap gap-3">
          {project.documents.map((document) => (
            <a
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              data-sound
              href={document.url}
              key={document.url}
              rel="noreferrer"
              target="_blank"
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              {document.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function truncateToFirstSentence(text: string, maxLength = 100): string {
  const firstSentence = text.split(/\.\s/)[0];
  if (firstSentence.length <= maxLength) {
    return firstSentence + ".";
  }
  return firstSentence.slice(0, maxLength) + "…";
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="section-band py-20 sm:py-28" id="projects">
      <div className="container">
        <SectionHeading
          description="Click any project to explore full details, media, and links."
          eyebrow="Projects"
          title="Selected systems and prototypes."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              className="technical-panel card-hover-lift group cursor-pointer rounded-md p-6"
              data-gsap-reveal
              key={project.title}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {truncateToFirstSentence(project.description)}
                  </p>
                </div>
                <ImageIcon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((technology) => (
                  <Badge key={technology} variant="secondary">
                    {technology}
                  </Badge>
                ))}
                {project.technologies.length > 4 ? (
                  <Badge variant="outline">
                    +{project.technologies.length - 4}
                  </Badge>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {isPresent(project.github) ? (
                  <Button asChild data-sound size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Github aria-hidden="true" className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                ) : null}
                {isPresent(project.demo) ? (
                  <Button asChild data-sound size="sm" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.demo}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Demo
                      <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
              </div>

              <div className="mt-4 flex items-center gap-2 font-mono text-xs text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="animated-underline">View Details</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Modal
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject ? (
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              {selectedProject.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-neutral-200">
              {selectedProject.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProject.technologies.map((technology) => (
                <Badge key={technology} variant="secondary">
                  {technology}
                </Badge>
              ))}
            </div>

            <ProjectMedia project={selectedProject} />

            <div className="mt-6 flex flex-wrap gap-3">
              {isPresent(selectedProject.github) ? (
                <Button asChild data-sound size="sm" variant="outline">
                  <a
                    href={selectedProject.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Github aria-hidden="true" className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              ) : null}
              {isPresent(selectedProject.demo) ? (
                <Button asChild data-sound size="sm">
                  <a
                    href={selectedProject.demo}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Demo
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
