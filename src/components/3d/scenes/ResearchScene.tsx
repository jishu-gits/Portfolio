"use client";

import { Html } from "@react-three/drei";
import { Badge } from "@/components/ui/badge";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Research } from "@/lib/content-schema";

export function ResearchScene({ research }: { research: Research }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Complex Geometry Placeholder */}
      <mesh ref={meshRef} position={[-2, 0, -2]}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <meshStandardMaterial color="#2dd4bf" wireframe />
      </mesh>

      {/* Telemetry Dashboard */}
      <Html position={[2, 0, 0]} transform center className="w-[480px] pointer-events-none">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl pointer-events-auto shadow-[0_0_50px_rgba(45,212,191,0.1)]">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Adaptive Runtime</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-red-500 font-mono font-bold">REC</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/50 border border-white/5 rounded-lg p-3">
              <p className="text-[10px] text-neutral-400 font-mono uppercase mb-1">Target FPS</p>
              <p className="text-2xl text-primary font-mono font-bold">120.0</p>
            </div>
            <div className="bg-black/50 border border-white/5 rounded-lg p-3">
              <p className="text-[10px] text-neutral-400 font-mono uppercase mb-1">VRAM Usage</p>
              <p className="text-2xl text-accent font-mono font-bold">4.2 GB</p>
            </div>
          </div>

          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed line-clamp-3">
            {research?.statement || "Exploring adaptive level-of-detail and dynamic shader complexity for VR rendering."}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {research?.interests?.slice(0, 3).map((interest: string) => (
              <Badge key={interest} variant="outline" className="text-xs border-primary/30 text-primary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
