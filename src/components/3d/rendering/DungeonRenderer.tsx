import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

import { LightingController } from './LightingController';
import { FogController } from './FogController';
import { EnvironmentController } from './EnvironmentController';
import { PostProcessing } from './PostProcessing';

export function DungeonRenderer({ children }: { children: React.ReactNode }) {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // We can use scroll.offset to orchestrate entrance/exit animations
    // The scene is placed at z = -48. It is primarily visible when scroll is around 0.5 - 0.7.
    // However, since CameraRig handles local parallax and scroll easing isn't strictly defined by scroll offset yet,
    // we just use a soft fade-in if needed, or simply render the controllers.
    // For now, we rely on the PostProcessing and Lighting for the cinematic feel.
  });

  return (
    <group ref={groupRef}>
      <LightingController />
      <FogController />
      <EnvironmentController />
      <PostProcessing />
      
      {/* The Dungeon Scene Geometry */}
      {children}
    </group>
  );
}
