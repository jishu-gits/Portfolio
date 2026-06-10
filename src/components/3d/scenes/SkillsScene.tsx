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
              <Html position={[0.6, 0.6, 0]} className="pointer-events-none whitespace-nowrap">
                <div className="bg-black/90 border border-primary/50 p-3 rounded-lg shadow-[0_0_15px_rgba(45,212,191,0.4)] pointer-events-auto backdrop-blur-md">
                  <span className="text-primary font-bold tracking-wider uppercase text-sm block mb-1">{category.category}</span>
                  <div className="text-xs text-neutral-400 font-mono">
                    LVL <span className="text-white">{category.items?.length * 10}</span>
                  </div>
                </div>
              </Html>
            </group>
          </group>
        );
      })}

      {/* Center Hub */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#84cc16" emissive="#84cc16" emissiveIntensity={0.5} wireframe />
      </mesh>

      <Html position={[0, -6, 0]} transform center className="w-[500px] pointer-events-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-widest uppercase drop-shadow-lg">Skill Progression</h2>
          <p className="text-neutral-400 font-mono text-sm leading-relaxed">
            RPG-style node graph. Explore categories to reveal specific proficiencies, related projects, and certifications.
          </p>
        </div>
      </Html>
    </group>
  );
}
