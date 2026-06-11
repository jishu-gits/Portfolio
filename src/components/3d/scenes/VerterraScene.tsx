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
    </group>
  );
}
