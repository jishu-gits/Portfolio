import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function useDungeonTextures() {
  const textures = useTexture([
    '/textures/dungeon/wall_color.jpg',
    '/textures/dungeon/wall_normal.jpg',
    '/textures/dungeon/wall_roughness.jpg',
    '/textures/dungeon/wall_ao.jpg',
    '/textures/dungeon/wall_displacement.jpg'
  ]);

  const [colorMap, normalMap, roughnessMap, aoMap, displacementMap] = textures;

  // Configure textures
  colorMap.colorSpace = THREE.SRGBColorSpace;

  textures.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.needsUpdate = true;
  });

  return {
    colorMap,
    normalMap,
    roughnessMap,
    aoMap,
    displacementMap
  };
}
