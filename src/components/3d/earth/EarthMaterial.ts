import * as THREE from 'three';

export const AtmosphereShader = {
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 color;
    uniform float coefficient;
    uniform float power;
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      // Fresnel effect computation
      float intensity = pow(coefficient - dot(vNormal, vec3(0, 0, 1.0)), power);
      // Fade out edge slightly to avoid hard cutoff
      // Also we need additive blending, so opacity scales with intensity
      gl_FragColor = vec4(color, intensity);
    }
  `
};

export const applyEarthMaterialPatches = (material: THREE.Material) => {
  material.onBeforeCompile = (shader) => {
    // We can inject a patch here to treat the specular map (black land, white ocean)
    // as an inverted roughness map (white land, black ocean), giving oceans a shiny PBR look.
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <roughnessmap_fragment>',
      /* glsl */`
      float roughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
        // Invert specular map: white in texture -> 0.0 roughness (shiny), black -> 1.0 (rough)
        roughnessFactor *= (1.0 - texelRoughness.g);
      #endif
      `
    );
  };
};
