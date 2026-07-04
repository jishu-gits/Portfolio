import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function FogController() {
  const fogRef = useRef<THREE.FogExp2>(null);

  useFrame(({ clock }) => {
    if (fogRef.current) {
      // Subtle atmospheric breathing effect
      // Base density 0.04, varies slightly over time
      const time = clock.elapsedTime;
      const densityVariation = Math.sin(time * 0.2) * 0.005;
      fogRef.current.density = 0.035 + densityVariation;
    }
  });

  return (
    <fogExp2 ref={fogRef} attach="fog" color="#0a0f18" density={0.035} />
  );
}
