import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useEffect } from 'react';

export function useEarthTextures() {
  const [dayMap, nightMap, cloudsMap, normalMap, specularMap] = useLoader(
    THREE.TextureLoader,
    [
      '/textures/earth/8k_earth_daymap.jpg',
      '/textures/earth/8k_earth_nightmap.jpg',
      '/textures/earth/8k_earth_clouds.jpg',
      '/textures/earth/8k_earth_normal_map.jpg',
      '/textures/earth/8k_earth_specular_map.jpg'
    ]
  );

  const textures = useMemo(() => {
    // Configure Color Spaces
    dayMap.colorSpace = THREE.SRGBColorSpace;
    nightMap.colorSpace = THREE.SRGBColorSpace;
    cloudsMap.colorSpace = THREE.LinearSRGBColorSpace; // often used as alpha/blend
    normalMap.colorSpace = THREE.LinearSRGBColorSpace;
    specularMap.colorSpace = THREE.LinearSRGBColorSpace; // Data map

    // Configure Anisotropy and Filtering (Disable Mipmaps to save ~33% VRAM on 8K textures)
    const allMaps = [dayMap, nightMap, cloudsMap, normalMap, specularMap];
    allMaps.forEach(map => {
      map.anisotropy = 16;
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.ClampToEdgeWrapping;
      map.generateMipmaps = false; // Saves massive VRAM for 8K textures
      map.minFilter = THREE.LinearFilter;
      map.magFilter = THREE.LinearFilter;
    });

    return {
      dayMap,
      nightMap,
      cloudsMap,
      normalMap,
      specularMap
    };
  }, [dayMap, nightMap, cloudsMap, normalMap, specularMap]);

  // Cleanup on unmount if this is ever disposed, 
  // though texture loader caches them automatically.
  
  return textures;
}
