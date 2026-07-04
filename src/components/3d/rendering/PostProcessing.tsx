import React from 'react';
import { EffectComposer, SSAO, Bloom, BrightnessContrast, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const B = BrightnessContrast as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const V = Vignette as any;

export function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <SSAO 
        blendFunction={BlendFunction.MULTIPLY} 
        samples={16} 
        radius={0.2} 
        intensity={15} 
        luminanceInfluence={0.5} 
        color={new THREE.Color(0x000000)}
      />
      <Bloom 
        intensity={1.0} 
        luminanceThreshold={0.8} 
        luminanceSmoothing={0.1} 
        mipmapBlur 
      />
      <B brightness={-0.05} contrast={0.15} />
      <V eskil={false} offset={0.1} darkness={1.1} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
