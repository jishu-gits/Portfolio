import { FileText, ImageIcon, Video } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
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
  return (
    <section className="section-band py-20 sm:py-28" id="experience">
      <div className="container">
        <SectionHeading
          description="Each entry is sourced from JSON, including optional evidence links for images, videos, or documents."
          eyebrow="Experience"
          title="Applied work across XR systems, graphics research, and procedural tools."
        />

        <div className="mt-12 grid gap-5">
          {experience.map((entry) => (
            <article
              className="technical-panel rounded-md p-6"
              data-gsap-reveal
              key={`${entry.role}-${entry.organization}`}
            >
              <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
                <div>
                  <Badge variant="accent">{entry.duration}</Badge>
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">
                    {entry.role}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {entry.organization}
                  </p>
                </div>

                <div>
                  <ul className="grid gap-3">
                    {entry.achievements.map((achievement) => (
                      <li className="flex gap-3 text-sm leading-7 text-neutral-200" key={achievement}>
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary shadow-signal-sm" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {hasItems(entry.mediaEvidence) ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {entry.mediaEvidence.map((media) => {
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
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
