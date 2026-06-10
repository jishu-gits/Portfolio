"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { HeroScene } from "./scenes/HeroScene";
import { DungeonScene } from "./scenes/DungeonScene";
import { ResearchScene } from "./scenes/ResearchScene";
import { VerterraScene } from "./scenes/VerterraScene";
import { SkillsScene } from "./scenes/SkillsScene";
import { TimelineScene } from "./scenes/TimelineScene";

import type { Profile, Project, Research, SkillGroup, TimelineItem, Experience, Certification } from "@/lib/content-schema";

type SceneControllerProps = {
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
  experience: Experience[];
  certifications: Certification[];
};

export function SceneController(props: SceneControllerProps) {
  const scroll = useScroll();
  const cameraGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!cameraGroup.current) return;
    
    // Total travel distance down the Z axis
    const maxZ = 60;
    const targetZ = -scroll.offset * maxZ;
    
    // Smooth camera movement
    cameraGroup.current.position.z = THREE.MathUtils.lerp(
      cameraGroup.current.position.z,
      targetZ,
      0.1
    );
  });

  return (
    <>
      <group ref={cameraGroup}>
        {/* We use a group to hold the camera so we can move the group and still allow the camera to shake or look around if needed later */}
      </group>

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#2dd4bf" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#84cc16" />

      {/* Scenes spaced along the Z axis */}
      <group position={[0, 0, 0]}>
        <HeroScene profile={props.profile} stats={props.stats} />
      </group>

      <group position={[0, 0, -12]}>
        <DungeonScene projects={props.projects} />
      </group>

      <group position={[0, 0, -24]}>
        <ResearchScene research={props.research} />
      </group>

      <group position={[0, 0, -36]}>
        <VerterraScene projects={props.projects} />
      </group>

      <group position={[0, 0, -48]}>
        <SkillsScene skills={props.skills} />
      </group>

      <group position={[0, 0, -60]}>
        <TimelineScene timeline={props.timeline} experience={props.experience} />
      </group>
    </>
  );
}
