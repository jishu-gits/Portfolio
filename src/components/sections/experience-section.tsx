"use client";

import { useState } from "react";
import { FileText, ImageIcon, Video } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import type { Experience } from "@/lib/content-schema";
import { hasItems } from "@/lib/utils";

const mediaIcons = {
  image: ImageIcon,
  video: Video,
  document: FileText
};

export function ExperienceSection({
  experience
}: {
  experience: Experience[];
}) {
  const [selectedEntry, setSelectedEntry] = useState<Experience | null>(null);

  return (
    <section className="section-band py-20 sm:py-28" id="experience">
      <div className="container">
        <SectionHeading
          description="Click any role to explore full responsibilities, achievements, and evidence."
          eyebrow="Experience"
          title="Applied work across XR systems, graphics research, and procedural tools."
        />

        <div className="mt-12 grid gap-5">
          {experience.map((entry) => (
            <article
              className="technical-panel card-hover-lift cursor-pointer rounded-md p-6"
              data-gsap-reveal
              key={`${entry.role}-${entry.organization}`}
              onClick={() => setSelectedEntry(entry)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedEntry(entry);
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-[0.35fr_1fr] sm:items-center">
                <div>
                  <Badge variant="accent">{entry.duration}</Badge>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">
                    {entry.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.organization}
                  </p>
                </div>
                <div>
                  <p className="text-sm leading-7 text-neutral-300">
                    {entry.achievements[0]}
                  </p>
                  {entry.achievements.length > 1 ? (
                    <p className="mt-2 font-mono text-xs text-primary">
                      +{entry.achievements.length - 1} more achievements →
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal */}
      <Modal
        open={selectedEntry !== null}
        onClose={() => setSelectedEntry(null)}
        title={selectedEntry?.role}
      >
        {selectedEntry ? (
          <div>
            <Badge variant="accent">{selectedEntry.duration}</Badge>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">
              {selectedEntry.role}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {selectedEntry.organization}
            </p>

            <div className="mt-6">
              <p className="mb-3 font-mono text-xs uppercase text-primary">
                Achievements
              </p>
              <ul className="grid gap-3">
                {selectedEntry.achievements.map((achievement) => (
                  <li
                    className="flex gap-3 text-sm leading-7 text-neutral-200"
                    key={achievement}
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary shadow-signal-sm" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {hasItems(selectedEntry.mediaEvidence) ? (
              <div className="mt-6">
                <p className="mb-3 font-mono text-xs uppercase text-primary">
                  Evidence
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedEntry.mediaEvidence.map((media) => {
                    const Icon = mediaIcons[media.type];

                    return (
                      <a
                        className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                        data-sound
                        href={media.url}
                        key={media.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4" />
                        {media.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
