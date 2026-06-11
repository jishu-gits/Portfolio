"use client";

import { Html } from "@react-three/drei";
import { Badge } from "@/components/ui/badge";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Research } from "@/lib/content-schema";

export function ResearchScene({ research }: { research: Research }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Complex Geometry Placeholder */}
      <mesh ref={meshRef} position={[-2, 0, -2]}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <meshStandardMaterial color="#2dd4bf" wireframe />
      </mesh>
    </group>
  );
}
