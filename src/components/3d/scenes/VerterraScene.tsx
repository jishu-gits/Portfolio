"use client";

import { Html } from "@react-three/drei";
import { Suspense } from "react";
import { Earth } from "../earth/Earth";
import type { Project } from "@/lib/content-schema";

export function VerterraScene({ projects }: { projects: Project[] }) {
  const project = projects.find((p) => p.title.toLowerCase().includes("verterra")) || projects[1] || projects[0];

  return (
    <group position={[0, 0, -2]}>
      {/* Sun Light */}
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={2.5} 
        color="#ffffff" 
      />
      {/* Subtle Ambient Light for dark side visibility if needed, though pure black is more realistic in space. We'll add a tiny bit of ambient to match the prompt's request for "very subtle". */}
      <ambientLight intensity={0.02} color="#404050" />
      
      <Suspense fallback={null}>
        <Earth 
          radius={2} 
          rotationSpeed={0.02} 
          interactive={true} 
        />
      </Suspense>
    </group>
  );
}
