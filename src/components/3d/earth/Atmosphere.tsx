"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AtmosphereShader } from './EarthMaterial';

interface AtmosphereProps {
  radius: number;
}

export function Atmosphere({ radius }: AtmosphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // We want the atmosphere to always face the camera properly or just be a sphere with a custom shader
  // The shader relies on view vectors, so it works as a static sphere.

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={AtmosphereShader.vertexShader}
        fragmentShader={AtmosphereShader.fragmentShader}
        uniforms={{
          color: { value: new THREE.Color(0x3b82f6) }, // Blueish glow
          coefficient: { value: 0.9 },
          power: { value: 4.0 }
        }}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
