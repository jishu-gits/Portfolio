import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/content-schema";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section className="section-band py-20 sm:py-28" id="about">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          description="A compact profile for teams and labs evaluating XR engineering, graphics systems work, and research fit."
          eyebrow="About"
          title="Engineering spatial systems with research-grade care."
        />

        <div className="grid gap-5" data-gsap-reveal>
          <div className="technical-panel rounded-md p-6">
            <p className="text-lg leading-8 text-neutral-200">{profile.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Education", "VIT Bhopal (B.Tech CSE)"],
              ["Duration", "Aug 2022 – May 2026"],
              ["CGPA", "7.86"]
            ].map(([label, value]) => (
              <div
                className="rounded-md border border-white/10 bg-white/[0.03] p-5"
                key={label}
              >
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  {label}
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
