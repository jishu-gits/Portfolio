import React from 'react';
import { SoftShadows } from '@react-three/drei';

export function LightingController() {
  return (
    <group>
      {/* PCF Soft Shadows for better quality and less acne */}
      <SoftShadows size={10} samples={16} focus={0.5} />

      {/* Dim ambient light to barely fill complete blackness */}
      <ambientLight intensity={0.02} color="#050a12" />

      {/* Directional moonlight casting shadows */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={0.25} 
        color="#aaccff" 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0005}
      />
    </group>
  );
}
