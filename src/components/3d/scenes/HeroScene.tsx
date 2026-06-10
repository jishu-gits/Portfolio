"use client";

import { Html } from "@react-three/drei";
import { ParticleField } from "@/components/visuals/particle-field";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/content-schema";

export function HeroScene({ profile, stats }: { profile: Profile; stats: { projects: number; internships: number; certifications: number; researchInterests: number; } }) {
  return (
    <group>
      <ParticleField />
      
      {/* Floating 3D text/UI */}
      <Html position={[0, 0, 0]} transform center className="w-screen max-w-4xl px-4 pointer-events-none">
        <div className="flex flex-col items-center text-center">
          <Badge variant="accent" className="mb-6 pointer-events-auto">
            {profile.availability}
          </Badge>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl drop-shadow-2xl">
            {profile.name}
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-3 pointer-events-auto">
            {["Computer Science Engineer", "Unity Developer", "XR Developer", "Procedural Generation", "Graphics Systems"].map((role) => (
              <Badge key={role} variant="secondary" className="bg-black/50 backdrop-blur-md border-white/20 text-sm">
                {role}
              </Badge>
            ))}
          </div>
          <p className="mt-8 text-xl font-mono text-primary max-w-2xl mx-auto drop-shadow-md">
            Building systems, graphics applications, XR experiences, and rendering technology.
          </p>
        </div>
      </Html>
    </group>
  );
}
