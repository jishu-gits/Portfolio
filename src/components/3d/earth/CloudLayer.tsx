"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CloudLayerProps {
  radius: number;
  cloudsMap: THREE.Texture;
}

export function CloudLayer({ radius, cloudsMap }: CloudLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate clouds slightly faster or independently of the earth
      meshRef.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={cloudsMap}
        transparent={true}
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
