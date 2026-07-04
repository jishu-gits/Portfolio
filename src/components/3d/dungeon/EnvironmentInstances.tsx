import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { EnvironmentData, PropInstance } from './EnvironmentTypes';
import { DungeonMaterial } from './DungeonMaterial';
import { useTorchInteraction } from './interaction/DungeonInteraction';

function applyInstances(meshRef: React.RefObject<THREE.InstancedMesh>, instances: PropInstance[]) {
  if (meshRef.current) {
    const dummy = new THREE.Object3D();
    instances.forEach((inst, i) => {
      dummy.position.copy(inst.position);
      dummy.rotation.copy(inst.rotation);
      dummy.scale.copy(inst.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }
}

// ----------------------------------------------------
// Large Pillars (Stone)
// ----------------------------------------------------
export function LargePillars({ instances }: { instances: PropInstance[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometryRef = useRef<THREE.BoxGeometry>(null);

  React.useEffect(() => {
    applyInstances(meshRef, instances);
  }, [instances]);

  React.useEffect(() => {
    if (geometryRef.current && geometryRef.current.attributes.uv) {
      geometryRef.current.setAttribute("uv2", new THREE.BufferAttribute(geometryRef.current.attributes.uv.array, 2));
    }
  }, []);

  if (instances.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow>
      <boxGeometry ref={geometryRef} args={[1, 1, 1]} />
      <DungeonMaterial attach="material" />
    </instancedMesh>
  );
}

// ----------------------------------------------------
// Rubble & Debris (Stone)
// ----------------------------------------------------
export function StoneDebris({ instances }: { instances: PropInstance[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometryRef = useRef<THREE.BoxGeometry>(null);

  React.useEffect(() => {
    applyInstances(meshRef, instances);
  }, [instances]);

  React.useEffect(() => {
    if (geometryRef.current && geometryRef.current.attributes.uv) {
      geometryRef.current.setAttribute("uv2", new THREE.BufferAttribute(geometryRef.current.attributes.uv.array, 2));
    }
  }, []);

  if (instances.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow>
      <boxGeometry ref={geometryRef} args={[1, 1, 1]} />
      <DungeonMaterial attach="material" />
    </instancedMesh>
  );
}

// ----------------------------------------------------
// Crates (Wood - basic material)
// ----------------------------------------------------
export function Crates({ instances }: { instances: PropInstance[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  React.useEffect(() => {
    applyInstances(meshRef, instances);
  }, [instances]);

  if (instances.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#5c4033" roughness={0.9} />
    </instancedMesh>
  );
}

// ----------------------------------------------------
// Barrels (Wood - basic material)
// ----------------------------------------------------
export function Barrels({ instances }: { instances: PropInstance[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  React.useEffect(() => {
    applyInstances(meshRef, instances);
  }, [instances]);

  if (instances.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow>
      <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
      <meshStandardMaterial color="#4a3525" roughness={0.8} />
    </instancedMesh>
  );
}

// ----------------------------------------------------
// Torches
// ----------------------------------------------------
export function Torches({ instances }: { instances: PropInstance[] }) {
  const holderRef = useRef<THREE.InstancedMesh>(null);
  const bracketRef = useRef<THREE.InstancedMesh>(null);
  
  const flameRefs = useRef<(THREE.Mesh | null)[]>([]);
  const lightRefs = useRef<(THREE.PointLight | null)[]>([]);
  
  const originalPositions = useMemo(() => instances.map(inst => inst.position.clone()), [instances]);

  useTorchInteraction(flameRefs, lightRefs, originalPositions);

  useEffect(() => {
    if (holderRef.current) {
      const dummy = new THREE.Object3D();
      instances.forEach((inst, i) => {
        dummy.position.copy(inst.position);
        dummy.rotation.copy(inst.rotation);
        dummy.rotateX(Math.PI / 8); 
        dummy.scale.set(0.05, 0.3, 0.05);
        dummy.updateMatrix();
        holderRef.current!.setMatrixAt(i, dummy.matrix);
      });
      holderRef.current.instanceMatrix.needsUpdate = true;
    }
    
    if (bracketRef.current) {
      const dummy = new THREE.Object3D();
      instances.forEach((inst, i) => {
        dummy.position.copy(inst.position);
        dummy.position.y -= 0.1;
        dummy.rotation.copy(inst.rotation);
        dummy.scale.set(0.1, 0.05, 0.1);
        dummy.updateMatrix();
        bracketRef.current!.setMatrixAt(i, dummy.matrix);
      });
      bracketRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [instances]);

  if (instances.length === 0) return null;

  return (
    <group>
      <instancedMesh ref={holderRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 0.8, 1, 8]} />
        <meshStandardMaterial color="#3e2723" roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={bracketRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
      </instancedMesh>
      
      {instances.map((inst, i) => (
        <TorchLight 
          key={i} 
          index={i}
          position={inst.position} 
          rotation={inst.rotation} 
          flameRefs={flameRefs}
          lightRefs={lightRefs}
        />
      ))}
    </group>
  );
}

function TorchLight({ 
  index,
  position, 
  rotation, 
  flameRefs, 
  lightRefs 
}: { 
  index: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  flameRefs: React.MutableRefObject<(THREE.Mesh | null)[]>;
  lightRefs: React.MutableRefObject<(THREE.PointLight | null)[]>;
}) {
  const flamePos = useMemo(() => {
    const dummy = new THREE.Object3D();
    dummy.position.copy(position);
    dummy.rotation.copy(rotation);
    dummy.rotateX(Math.PI / 8);
    dummy.translateY(0.15);
    return dummy.position;
  }, [position, rotation]);

  return (
    <group position={flamePos}>
      <mesh ref={(el) => { flameRefs.current[index] = el; }}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={[1, 0.6, 0].map(c => c * 2) as any} toneMapped={false} />
      </mesh>
      <pointLight ref={(el) => { lightRefs.current[index] = el; }} color="#ff8800" distance={4} decay={2} castShadow={false} />
    </group>
  );
}

// ----------------------------------------------------
// Main Environment Component
// ----------------------------------------------------
export function EnvironmentInstances({ data }: { data: EnvironmentData }) {
  return (
    <group>
      <Torches instances={data.torches} />
      <LargePillars instances={data.largePillars} />
      {/* Combine rubble and debris since they share the same material and visual style (just different sizes) */}
      <StoneDebris instances={[...data.rubble, ...data.debris]} />
      <Crates instances={data.crates} />
      <Barrels instances={data.barrels} />
    </group>
  );
}
