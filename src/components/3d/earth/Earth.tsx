"use client";

import { useRef } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useEarthTextures } from './useEarthTextures';
import { CloudLayer } from './CloudLayer';
import { Atmosphere } from './Atmosphere';

interface EarthProps {
  radius?: number;
  rotationSpeed?: number;
  interactive?: boolean;
}

export function Earth({ radius = 2, rotationSpeed = 0.02, interactive = true }: EarthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useEarthTextures();
  
  // Interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const momentum = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isDragging.current) {
      // Idle rotation
      groupRef.current.rotation.y += delta * rotationSpeed;
      
      // Apply momentum (damping)
      groupRef.current.rotation.y += momentum.current.x;
      groupRef.current.rotation.x += momentum.current.y;
      
      momentum.current.x *= 0.95;
      momentum.current.y *= 0.95;
    }
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent> & { target: HTMLElement }) => {
    if (!interactive) return;
    e.stopPropagation();
    if (e.target && e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    momentum.current = { x: 0, y: 0 };
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent> & { target: HTMLElement }) => {
    if (isDragging.current && e.target && e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    isDragging.current = false;
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent> & { target: HTMLElement }) => {
    if (!interactive || !isDragging.current || !groupRef.current) return;
    e.stopPropagation();
    
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;
    
    const rotationFactor = 0.005;
    groupRef.current.rotation.y += deltaX * rotationFactor;
    groupRef.current.rotation.x += deltaY * rotationFactor;
    
    momentum.current = {
      x: deltaX * rotationFactor * 0.1,
      y: deltaY * rotationFactor * 0.1
    };

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <group 
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
      onPointerMove={onPointerMove}
      // Apply an initial tilt to make it look like Earth's axis
      rotation={[0.1, 0, 0]}
    >
      <mesh>
        <sphereGeometry args={[radius, 128, 128]} />
        <meshStandardMaterial
          map={textures.dayMap}
          normalMap={textures.normalMap}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          roughnessMap={textures.specularMap}
          emissiveMap={textures.nightMap}
          emissive={new THREE.Color(0xffffff)}
          emissiveIntensity={1.0} // Will only show where light doesn't hit
          roughness={1.0}
          metalness={0.1}
          onBeforeCompile={(shader) => {
            // Replace standard roughness handling to invert the specular map
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <roughnessmap_fragment>',
              /* glsl */`
              float roughnessFactor = roughness;
              #ifdef USE_ROUGHNESSMAP
                vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
                // The specular map is white for oceans, black for land.
                // We want oceans to be smooth (low roughness), land to be rough (high roughness).
                // Therefore, roughness = 1.0 - specular
                roughnessFactor *= (1.0 - texelRoughness.r);
              #endif
              `
            );
          }}
        />
      </mesh>
      
      <CloudLayer radius={radius * 1.01} cloudsMap={textures.cloudsMap} />
      <Atmosphere radius={radius * 1.04} />
    </group>
  );
}
