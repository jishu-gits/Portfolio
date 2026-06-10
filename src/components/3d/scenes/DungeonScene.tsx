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
        <meshStandardMaterial color="#84cc16" roughness={0.2} metalness={0.8} />
      </instancedMesh>

      <Html position={[10, 5, 0]} transform center className="w-[400px] pointer-events-none">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="accent">Procedural Generation</Badge>
            {animating && <span className="text-xs text-primary animate-pulse flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Generating...</span>}
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">{project?.title || "Procedural Dungeon"}</h2>
          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed">
            {project?.description || "Simulating dungeon connectivity paths and room generation in real-time."}
          </p>

          {/* Conditional Media Render */}
          {project?.videos && project.videos.length > 0 && (
            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
              {project.videos[0].url.endsWith('.mp4') ? (
                <video src={project.videos[0].url} autoPlay loop muted playsInline className="w-full h-auto" />
              ) : (
                <img src={project.videos[0].url} alt={project.videos[0].label} className="w-full h-auto" />
              )}
            </div>
          )}
          {project?.images && project.images.length > 0 && (!project.videos || project.videos.length === 0) && (
            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
              <img src={project.images[0].src} alt={project.images[0].alt} className="w-full h-auto" />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project?.technologies?.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-white/5 border-white/10">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
