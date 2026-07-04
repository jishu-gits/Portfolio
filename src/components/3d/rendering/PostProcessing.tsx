import React from 'react';
import { EffectComposer, SSAO, Bloom, BrightnessContrast, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer disableNormalPass={false} multisampling={0}>
      {/* 
        SSAO for contact shadows in corners.
        We disable normal pass on EffectComposer to let SSAO handle its own normals if needed,
        or we can let it use depth. This configuration is lightweight.
      */}
      <SSAO 
        blendFunction={BlendFunction.MULTIPLY} 
        samples={16} 
        radius={0.2} 
        intensity={15} 
        luminanceInfluence={0.5} 
        color="black"
      />
      
      {/* 
        Bloom targeted at emissive materials (torches).
        High luminance threshold ensures stone walls do not bloom.
      */}
      <Bloom 
        intensity={1.0} 
        luminanceThreshold={0.8} 
        luminanceSmoothing={0.1} 
        mipmapBlur 
      />

      {/* Cinematic Color Grading */}
      <BrightnessContrast brightness={-0.05} contrast={0.15} />
      
      {/* Dark Vignette to focus attention on the center */}
      <Vignette eskil={false} offset={0.1} darkness={1.1} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
