import React from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { HoverState } from './DungeonHoverState';

export function DungeonRaycaster() {
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    HoverState.active = true;
    HoverState.worldPosition.copy(e.point);
  };

  const handlePointerOut = () => {
    HoverState.active = false;
  };

  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, 0, 0]} 
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      visible={false}
    >
      {/* A large invisible plane covering the dungeon floor to capture mouse raycasts performantly */}
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial />
    </mesh>
  );
}
