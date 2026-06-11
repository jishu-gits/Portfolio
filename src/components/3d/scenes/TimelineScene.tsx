"use client";

import { Html } from "@react-three/drei";
import { Badge } from "@/components/ui/badge";
import type { TimelineItem, Experience } from "@/lib/content-schema";

export function TimelineScene({ timeline, experience }: { timeline: TimelineItem[]; experience: Experience[] }) {
  return (
    <group>
      {/* 3D Path Placeholder */}
      <mesh position={[0, -2, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 40]} />
        <meshStandardMaterial color="#111" transparent opacity={0.8} />
      </mesh>

      {/* Milestones */}
      {timeline?.slice(0, 3).map((item, i: number) => {
        const z = -i * 5;
        return (
          <group key={item.title} position={[(i % 2 === 0 ? 3 : -3), 0, z]}>
            <mesh>
              <boxGeometry args={[1, 2, 1]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
