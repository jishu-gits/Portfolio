"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/content-schema";

export function ContactSection({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="section-band py-20 sm:py-28" id="contact">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          description="For XR product teams, research labs, game technology groups, and collaborators working on real-time interactive systems."
          eyebrow="Contact"
          title="Let us build the next spatial system."
        />

        <div className="technical-panel rounded-md p-6" data-gsap-reveal>
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">{profile.availability}</Badge>
            <Badge variant="secondary">
              <MapPin aria-hidden="true" className="mr-1 h-3 w-3" />
              {profile.location}
            </Badge>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Button asChild data-sound size="lg">
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" className="h-4 w-4" />
                Email
              </a>
            </Button>
            <Button
              data-sound
              onClick={copyEmail}
              size="lg"
              type="button"
              variant="outline"
            >
              {copied ? (
                <Check aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Copy aria-hidden="true" className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy email"}
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {profile.socials.map((social) => (
              <a
                className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm transition hover:border-primary/40 hover:text-primary"
                data-sound
                href={social.url}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLink aria-hidden="true" className="mb-4 h-4 w-4" />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
