import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import type { SkillGroup } from "@/lib/content-schema";

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <section className="section-band py-20 sm:py-28" id="skills">
      <div className="container">
        <SectionHeading
          description="Grouped as editable JSON categories with level, focus, and summary fields for each capability cluster."
          eyebrow="Skills"
          title="A practical stack for immersive graphics systems."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skills.map((group) => (
            <div
              className="technical-panel rounded-md p-6"
              data-gsap-reveal
              key={group.category}
            >
              <div className="mb-6">
                <Badge variant="accent">{group.category}</Badge>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {group.summary}
                </p>
              </div>
              <div className="space-y-5">
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
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
