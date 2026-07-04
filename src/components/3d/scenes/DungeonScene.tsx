"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import type { Project } from "@/lib/content-schema";
import { MazeGenerator } from "@/lib/dungeon/MazeGenerator";
import { DungeonBuilder } from "@/lib/dungeon/DungeonBuilder";
import { DungeonMaterial, EnvironmentGenerator, EnvironmentInstances } from "@/components/3d/dungeon";
import { CameraRig, DungeonRaycaster, useWallInteraction, HoverState } from "@/components/3d/dungeon/interaction";
import { DungeonRenderer } from "@/components/3d/rendering";
import { DungeonPresentation } from "@/components/3d/presentation";
import { useFrame } from "@react-three/fiber";

export function DungeonScene({ projects }: { projects: Project[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometryRef = useRef<THREE.BoxGeometry>(null);
  
  // Settings
  const gridSize = 21;
  const blockSize = 1;
  const seed = 12345;
  
  // Generate Maze, Walls & Environment only once
  const { walls, envData } = useMemo(() => {
    const generator = new MazeGenerator(gridSize, gridSize, seed);
    const grid = generator.generate();
    
    const builder = new DungeonBuilder(blockSize, seed);
    const walls = builder.buildWalls(grid);
    
    const envGen = new EnvironmentGenerator(blockSize, seed);
    const envData = envGen.generate(grid);
    
    return { walls, envData };
  }, [gridSize, blockSize, seed]);

  // Update InstancedMesh
  useEffect(() => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      walls.forEach((wall, i) => {
        dummy.position.copy(wall.position);
        dummy.scale.copy(wall.scale);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [walls]);

  // ----------------------------------------------------
  // Dynamic Cursor Light Component
  // ----------------------------------------------------
  function DynamicCursorLight() {
    const lightRef = useRef<THREE.PointLight>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(() => {
      if (!lightRef.current || !meshRef.current) return;
      if (HoverState.active) {
        // Smoothly move light towards mouse world position
        lightRef.current.position.lerp(HoverState.worldPosition, 0.2);
        meshRef.current.position.copy(lightRef.current.position);
        lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, 0.4, 0.1);
        meshRef.current.visible = true;
      } else {
        // Fade out when not hovering
        lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, 0, 0.1);
        if (lightRef.current.intensity < 0.01) meshRef.current.visible = false;
      }
    });
    return (
      <group>
        <pointLight ref={lightRef} color="#ffffff" distance={3} decay={2} castShadow={false} intensity={0} position={[0, 1, 0]} />
        <mesh ref={meshRef} visible={false}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={[2, 2, 2]} toneMapped={false} />
        </mesh>
      </group>
    );
  }

  // ----------------------------------------------------
  // Apply wall interaction hook
  // ----------------------------------------------------
  useWallInteraction(meshRef, walls);

  // Setup UV2 for AO map
  useEffect(() => {
    if (geometryRef.current && geometryRef.current.attributes.uv) {
      geometryRef.current.setAttribute(
        "uv2",
        new THREE.BufferAttribute(geometryRef.current.attributes.uv.array, 2)
      );
    }
  }, []);

  return (
    <DungeonRenderer>
      <DungeonPresentation>
        <CameraRig>
          <group>
            <DungeonRaycaster />
            <DynamicCursorLight />

            <instancedMesh ref={meshRef} args={[undefined, undefined, walls.length]} castShadow receiveShadow>
              <boxGeometry ref={geometryRef} args={[blockSize, blockSize, blockSize]} />
              <DungeonMaterial attach="material" />
            </instancedMesh>
            
            <EnvironmentInstances data={envData} />
          </group>
        </CameraRig>
      </DungeonPresentation>
    </DungeonRenderer>
  );
}
