"use client";

import { Html } from "@react-three/drei";
import { Badge } from "@/components/ui/badge";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Project } from "@/lib/content-schema";

export function VerterraScene({ projects }: { projects: Project[] }) {
  const project = projects.find((p) => p.title.toLowerCase().includes("verterra")) || projects[1] || projects[0];
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={globeRef} position={[0, 0, -2]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#3b82f6" wireframe opacity={0.3} transparent />
      </mesh>

      <Html position={[-3, 0, 0]} transform center className="w-[350px] pointer-events-none">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto">
          <Badge variant="accent" className="mb-4">Interactive Simulation</Badge>
          <h2 className="text-2xl font-semibold text-white mb-2">{project?.title || "Verterra"}</h2>
          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed">
            {project?.description || "A dynamic globe visualizing environmental data and ecosystem transitions."}
          </p>
          <div className="flex flex-wrap gap-2">
            {project?.technologies?.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-white/5 border-white/10">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
