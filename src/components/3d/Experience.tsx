"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { SceneController } from "./SceneController";
import { DomOverlay } from "./DomOverlay";
import { ScrollController } from "./ScrollController";
import { SectionRegistry } from "@/lib/section-registry";
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
  const [pages, setPages] = useState(10.5);

  useEffect(() => {
    return SectionRegistry.subscribe(() => {
      if (SectionRegistry.totalHeight > 0) {
        setPages(SectionRegistry.totalHeight / window.innerHeight);
      }
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      
      {/* Dynamic pages based on actual DOM size */}
      <ScrollControls damping={0.2} pages={pages}>
        <ScrollController />
        <SceneController {...props} />
        <Scroll html>
          <DomOverlay {...props} />
        </Scroll>

      </ScrollControls>
    </Canvas>
  );
}
