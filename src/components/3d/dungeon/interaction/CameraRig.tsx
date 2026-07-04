import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export function CameraRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Scroll entry animation
    // The scene is placed deep in the z-axis. When scroll.offset brings it into view, 
    // we want to ease its rotation from flat (Math.PI/2) to isometric (Math.PI/6).
    // The dungeon is at SCENE_Z.projects (-48) in SceneController.
    // For simplicity, we just constantly interpolate the rotation towards Math.PI/6,
    // assuming it might start differently, but standard easing is fine.
    // We'll keep it simple: just maintain Math.PI/6 with parallax overlay.

    const baseRotationX = Math.PI / 6;

    // 2. Parallax based on pointer
    const pointerX = state.pointer.x; // -1 to 1
    const pointerY = state.pointer.y; // -1 to 1

    // Target position offsets (max 0.3 - 0.5 units)
    const targetX = pointerX * 0.4;
    const targetY = pointerY * 0.4;

    // Target rotation offsets (very subtle)
    const targetRotX = baseRotationX - pointerY * 0.05;
    const targetRotY = pointerX * 0.05;

    // 3. Idle motion (Perlin/simplex simulation using sine waves)
    const time = state.clock.elapsedTime;
    const idleX = Math.sin(time * 0.5) * 0.1;
    const idleY = Math.cos(time * 0.3) * 0.1;

    // Apply damping
    const dampSpeed = 3.0; // Adjust for smoother/faster response
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX + idleX, dampSpeed, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY + idleY, dampSpeed, delta);
    
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, dampSpeed, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, dampSpeed, delta);
  });

  return <group ref={groupRef}>{children}</group>;
}
