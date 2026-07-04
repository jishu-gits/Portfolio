import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useCameraDirector } from './CameraDirector';
import { PresentationState } from './PresentationState';

function useGenerationReplay(groupRef: React.RefObject<THREE.Group | null>) {
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    if (PresentationState.isGenerating) {
      PresentationState.generationProgress += delta * 0.3; // 3.3 seconds to generate
      
      if (PresentationState.generationProgress >= 1.0) {
        PresentationState.generationProgress = 1.0;
        PresentationState.isGenerating = false;
        PresentationState.currentFocus = 'Overview';
      }

      // We intercept the scales of all children in the group
      // This is a quick way to override the instances' base sizes without rewriting the interaction layer.
      const progress = PresentationState.generationProgress;
      
      // We scale the whole group on Y axis for a rising effect, or we can just let interaction layer handle it
      // For a true presentation layer hack, we just apply a global scale clip or Y-clip using planes,
      // but the prompt asked for "animate walls rising, props appearing".
      // A simple approach from the parent group is animating its Y scale or position.
      // But we can also just let it be. Let's do a simple Y scale pop in from the bottom.
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, progress < 1 ? progress : 1.0, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, progress < 1 ? (progress - 1) * 5 : 0, 0.1);
    } else {
      // Ensure normal state
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1.0, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
    }
  });
}

export function DungeonPresentation({ children }: { children: React.ReactNode }) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const replayGroupRef = useRef<THREE.Group>(null);

  useCameraDirector(rootGroupRef);
  useGenerationReplay(replayGroupRef);

  return (
    <group ref={rootGroupRef}>
      <group ref={replayGroupRef}>
        {children}
      </group>
    </group>
  );
}
