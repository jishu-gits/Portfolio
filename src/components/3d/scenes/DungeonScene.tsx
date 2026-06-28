"use client";

import { Html } from "@react-three/drei";
import { Badge } from "@/components/ui/badge";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import type { Project } from "@/lib/content-schema";

export function DungeonScene({ projects }: { projects: Project[] }) {
  const project = projects.find((p) => p.title.toLowerCase().includes("dungeon")) || projects[0];
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Grid settings
  const gridSize = 20;
  const blockSize = 1;
  const totalBlocks = gridSize * gridSize;
  
  // State for procedural generation
  const [grid, setGrid] = useState<boolean[]>(new Array(totalBlocks).fill(false));
  const [animating, setAnimating] = useState(true);

  // Procedural Generation Algorithm (Random Walk)
  useEffect(() => {
    let currentX = Math.floor(gridSize / 2);
    let currentY = Math.floor(gridSize / 2);
    let step = 0;
    const maxSteps = 150;
    const newGrid = new Array(totalBlocks).fill(false);

    const interval = setInterval(() => {
      if (step >= maxSteps) {
        clearInterval(interval);
        setAnimating(false);
        return;
      }

      newGrid[currentY * gridSize + currentX] = true;
      setGrid([...newGrid]);

      // Random Walk
      const dir = Math.floor(Math.random() * 4);
      if (dir === 0 && currentY > 1) currentY -= 1;
      else if (dir === 1 && currentY < gridSize - 2) currentY += 1;
      else if (dir === 2 && currentX > 1) currentX -= 1;
      else if (dir === 3 && currentX < gridSize - 2) currentX += 1;

      step++;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Update InstancedMesh
  useFrame((state, delta) => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      let index = 0;
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (grid[y * gridSize + x]) {
            dummy.position.set(
              (x - gridSize / 2) * blockSize,
              0,
              (y - gridSize / 2) * blockSize
            );
            // Add some pulse effect to the blocks
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(index, dummy.matrix);
            index++;
          }
        }
      }
      meshRef.current.count = index;
      meshRef.current.instanceMatrix.needsUpdate = true;
      
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x = Math.PI / 6; // Isometric view
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, totalBlocks]}>
        <boxGeometry args={[blockSize * 0.9, blockSize * 0.9, blockSize * 0.9]} />
        <meshStandardMaterial color="#71a5a5" roughness={0.2} metalness={0.8} />
      </instancedMesh>
    </group>
  );
}
