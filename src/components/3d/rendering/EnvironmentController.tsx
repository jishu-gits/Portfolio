import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

function DustParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 200;

  // Generate random positions and phases for animation
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30, // x spread
          Math.random() * 5 + 0.5,     // y height
          (Math.random() - 0.5) * 30  // z spread
        ),
        phase: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.2
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.elapsedTime;
    const dummy = new THREE.Object3D();

    particles.forEach((particle, i) => {
      const { position, phase, speed } = particle;
      
      // Drift slowly
      const dx = Math.sin(time * speed + phase) * 0.5;
      const dy = Math.cos(time * speed * 0.8 + phase) * 0.2;
      const dz = Math.sin(time * speed * 1.2 + phase) * 0.5;

      dummy.position.set(position.x + dx, position.y + dy, position.z + dz);
      
      // Scale pulsing for fade in/out effect
      const scale = 0.5 + Math.sin(time * speed * 2 + phase) * 0.5; // 0 to 1
      dummy.scale.setScalar(0.02 * scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export function EnvironmentController() {
  return (
    <group>
      {/* Soften pitch-black shadows slightly with a dark preset */}
      <Environment preset="night" environmentIntensity={0.05} />
      
      {/* Lightweight Instanced Dust Particles */}
      <DustParticles />
    </group>
  );
}
