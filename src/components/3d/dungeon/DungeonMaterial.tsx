import { ThreeElements } from '@react-three/fiber';
import { useDungeonTextures } from './useDungeonTextures';
import * as THREE from 'three';

export function DungeonMaterial(props: ThreeElements['meshStandardMaterial']) {
  const { colorMap, normalMap, roughnessMap, aoMap, displacementMap } = useDungeonTextures();

  return (
    <meshStandardMaterial
      map={colorMap}
      normalMap={normalMap}
      roughnessMap={roughnessMap}
      aoMap={aoMap}
      displacementMap={displacementMap}
      roughness={0.95}
      metalness={0.0}
      normalScale={new THREE.Vector2(0.8, 0.8)}
      displacementScale={0.05}
      {...props}
    />
  );
}
