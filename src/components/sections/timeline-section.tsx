import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import type { TimelineItem } from "@/lib/content-schema";

export function TimelineSection({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <section className="section-band py-20 sm:py-28" id="timeline">
      <div className="container">
        <SectionHeading
          description="A compact career and research progression, editable from one JSON file."
          eyebrow="Timeline"
          title="Milestones in XR, graphics, and procedural systems."
        />

        <div className="relative mt-12">
          <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-primary/25 md:block" />
          <div className="grid gap-5">
            {timeline.map((item) => (
              <article
                className="technical-panel rounded-md p-6 md:ml-12"
                data-gsap-reveal
                key={`${item.year}-${item.title}`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Badge variant="accent">{item.year}</Badge>
                    <h3 className="mt-4 text-2xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
