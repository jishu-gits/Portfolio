"use client";

import { Html } from "@react-three/drei";
import { ParticleField } from "@/components/visuals/particle-field";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/content-schema";

export function HeroScene({ profile, stats }: { profile: Profile; stats: { projects: number; internships: number; certifications: number; researchInterests: number; } }) {
  return (
    <group>
      <ParticleField />
    </group>
  );
}
