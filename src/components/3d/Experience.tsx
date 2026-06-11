"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { SceneController } from "./SceneController";
import { DomOverlay } from "./DomOverlay";
import type { Profile, Project, Research, SkillGroup, TimelineItem, Experience as ExperienceType, Certification } from "@/lib/content-schema";

type ExperienceProps = {
  profile: Profile;
  stats: {
    projects: number;
    internships: number;
    certifications: number;
    researchInterests: number;
  };
  projects: Project[];
  research: Research;
  skills: SkillGroup[];
  timeline: TimelineItem[];
  experience: ExperienceType[];
  certifications: Certification[];
};

export default function Experience(props: ExperienceProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      
      {/* 10.5 pages of scrolling space for the 9 core DOM sections + Projects expansion */}
      <ScrollControls damping={0.2} pages={10.5}>
        <SceneController {...props} />
        <Scroll html>
          <DomOverlay {...props} />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
