"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ExternalLink, Github, Mail } from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import type { PointerEvent, RefObject } from "react";
import { AnimatedSvgBackground } from "@/components/visuals/animated-svg-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCounter } from "@/hooks/use-counter";
import { useTypewriter } from "@/hooks/use-typewriter";
import type { Profile } from "@/lib/content-schema";
import { isPresent } from "@/lib/utils";

const ParticleField = dynamic(
  () =>
    import("@/components/visuals/particle-field").then(
      (module) => module.ParticleField
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-research-grid bg-[length:72px_72px] opacity-35" />
    )
  }
);

type HeroStats = {
  projects: number;
  internships: number;
  certifications: number;
  researchInterests: number;
};

function StatCounter({
  label,
  value,
  delay
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const [ref, count] = useCounter(value, 1200);

  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <p
        className="text-3xl font-bold text-primary"
        ref={ref as RefObject<HTMLParagraphElement>}
      >
        {count}+
      </p>
      <p className="mt-1 font-mono text-xs uppercase text-muted-foreground">
        {label}
      </p>
    </motion.div>
  );
}

export function HeroSection({
  profile,
  stats
}: {
  profile: Profile;
  stats: HeroStats;
}) {
  const typed = useTypewriter(profile.introPhrases);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 22 });
  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-7, 7]);

  // Parallax for background layers
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.2, 0.95]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  }

  const roles = [
    "Computer Science Engineer",
    "Unity Developer",
    "XR Developer",
    "Graphics Systems Researcher"
  ];

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden pt-24"
      id="hero"
      onPointerMove={handlePointerMove}
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatedSvgBackground />
        <ParticleField />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2),rgba(5,5,5,0.92))]"
        style={{ opacity: overlayOpacity }}
      />

      <div className="container relative z-10 grid flex-1 gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div className="max-w-4xl" data-gsap-reveal>
          <Badge className="mb-6" variant="accent">
            {profile.availability}
          </Badge>

          {/* Clean name + roles */}
          <h1 className="text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {roles.map((role) => (
              <Badge key={role} variant="secondary">
                {role}
              </Badge>
            ))}
          </div>

          {/* Typewriter intro */}
          <div className="mt-6 min-h-8 font-mono text-base text-primary sm:text-lg">
            <span>{typed}</span>
            <span className="ml-1 inline-block h-5 w-2 translate-y-1 bg-primary" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild data-sound size="lg">
              <a href="#projects">
                View Projects
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild data-sound size="lg" variant="outline">
              <a href="#contact">
                <Mail aria-hidden="true" className="h-4 w-4" />
                Contact Me
              </a>
            </Button>
            {isPresent(profile.resumeUrl) ? (
              <Button asChild data-sound size="lg" variant="secondary">
                <a href={profile.resumeUrl} rel="noreferrer" target="_blank">
                  Download Resume
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {profile.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <motion.div
          className="technical-panel signal-line hidden rounded-md p-5 lg:block"
          data-gsap-reveal
          style={{ rotateX, rotateY, transformPerspective: 900 }}
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-xs uppercase text-muted-foreground">
              Runtime Profile
            </p>
            <span className="h-2 w-2 rounded-full bg-primary shadow-signal-sm" />
          </div>
          <div className="space-y-5">
            {[
              ["Unity / XR Development", "90%"],
              ["Java / Spring Boot", "88%"],
              ["Procedural Generation", "88%"],
              ["Graphics Research", "85%"]
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between font-mono text-xs text-neutral-300">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: value }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {profile.socials.slice(0, 2).map((social) => (
              <a
                className="rounded-md border border-white/10 bg-white/5 p-3 text-sm transition hover:border-primary/40 hover:text-primary"
                data-sound
                href={social.url}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <Github aria-hidden="true" className="mb-3 h-4 w-4" />
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll-triggered stat counters */}
      <div className="container relative z-10 pb-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCounter delay={0} label="Projects" value={stats.projects} />
          <StatCounter delay={0.1} label="Internships" value={stats.internships} />
          <StatCounter delay={0.2} label="Certifications" value={stats.certifications} />
          <StatCounter delay={0.3} label="Research Interests" value={stats.researchInterests} />
        </div>
      </div>
    </section>
  );
}
