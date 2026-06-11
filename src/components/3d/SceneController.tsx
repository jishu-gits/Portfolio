"use client";

import { useScroll, PerspectiveCamera } from "@react-three/drei";
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

export const SCENE_Z = {
  hero: 0,
  about: -12,
  skills: -24,
  experience: -36,
  projects: -48,
  research: -72,
  certifications: -84,
  timeline: -96,
  contact: -108,
};

export function SceneController(props: SceneControllerProps) {
  const scroll = useScroll();
  const cameraGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!cameraGroup.current) return;
    
    // Total travel distance down the Z axis
    const maxZ = Math.abs(SCENE_Z.contact);
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
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      </group>

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#2dd4bf" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#84cc16" />

      {/* Scenes spaced along the Z axis */}
      <group position={[0, 0, SCENE_Z.hero]}>
        <HeroScene profile={props.profile} stats={props.stats} />
      </group>

      <group position={[0, 0, SCENE_Z.skills]}>
        <SkillsScene skills={props.skills} />
      </group>

      {/* Projects span a larger Z-depth area (-48 to -60) */}
      <group position={[0, 0, SCENE_Z.projects]}>
        <DungeonScene projects={props.projects} />
      </group>
      <group position={[0, 0, SCENE_Z.projects - 12]}>
        <VerterraScene projects={props.projects} />
      </group>

      <group position={[0, 0, SCENE_Z.research]}>
        <ResearchScene research={props.research} />
      </group>

      <group position={[0, 0, SCENE_Z.timeline]}>
        <TimelineScene timeline={props.timeline} experience={props.experience} />
      </group>
    </>
  );
}
