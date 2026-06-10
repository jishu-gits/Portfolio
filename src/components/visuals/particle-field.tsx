"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ResearchParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 850;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 2.2 + Math.random() * 4.8;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.2;

      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = height;
      values[i * 3 + 2] = Math.sin(angle) * radius;
    }

    return values;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsed * 0.045 + pointer.x * 0.08;
    pointsRef.current.rotation.x = pointer.y * 0.045;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#2dd4bf"
        depthWrite={false}
        opacity={0.72}
        size={0.028}
        sizeAttenuation
      />
    </points>
  );
}

function SignalRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.z = elapsed * 0.04;
    groupRef.current.rotation.x = -0.45 + pointer.y * 0.08;
    groupRef.current.rotation.y = pointer.x * 0.12;
  });

  return (
    <group ref={groupRef}>
      {[1.35, 1.9, 2.55].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.45]}>
          <torusGeometry args={[radius, 0.006, 8, 128]} />
          <meshBasicMaterial color={index === 1 ? "#84cc16" : "#2dd4bf"} transparent opacity={0.42} />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.15, 5.6], fov: 58 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ResearchParticles />
        <SignalRings />
      </Canvas>
    </div>
  );
}
