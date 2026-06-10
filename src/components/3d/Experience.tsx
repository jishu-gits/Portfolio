"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { SceneController } from "./SceneController";
import type { Profile, Project, Research, SkillGroup, TimelineItem, Experience as ExperienceType } from "@/lib/content-schema";

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
};

export default function Experience(props: ExperienceProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      
      {/* 10 pages of scrolling space for the whole narrative */}
      <ScrollControls damping={0.2} pages={12}>
        <SceneController {...props} />
      </ScrollControls>
    </Canvas>
  );
}
