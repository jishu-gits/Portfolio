"use client";

import { Html } from "@react-three/drei";
import { Badge } from "@/components/ui/badge";
import * as THREE from "three";
import type { SkillGroup } from "@/lib/content-schema";

export function SkillsScene({ skills }: { skills: SkillGroup[] }) {
  return (
    <group>
      {/* Node Graph Lines */}
      {skills?.map((category, i: number) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <group key={category.category}>
            {/* Line to center */}
            <mesh>
              <tubeGeometry args={[new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)), 20, 0.02, 8, false]} />
              <meshBasicMaterial color="#2dd4bf" transparent opacity={0.3} />
            </mesh>

            {/* Node Sphere */}
            <group position={[x, y, 0]}>
              <mesh>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={0.8} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Center Hub */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#84cc16" emissive="#84cc16" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
}
