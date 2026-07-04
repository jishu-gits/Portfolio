import * as THREE from 'three';

export interface PropInstance {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

export interface EnvironmentData {
  torches: PropInstance[];
  largePillars: PropInstance[];
  rubble: PropInstance[];
  crates: PropInstance[];
  barrels: PropInstance[];
  debris: PropInstance[];
}
