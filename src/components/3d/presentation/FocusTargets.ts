import * as THREE from 'three';
import { FocusTarget } from './PresentationState';

export interface CameraTransform {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

// These values are tuned for a 21x21 maze centered at (0, 0)
// blockSize = 1, so limits are approx -10 to +10 on X and Z.
export const FocusTargets: Record<FocusTarget, CameraTransform> = {
  Overview: {
    position: new THREE.Vector3(0, 15, 12),
    target: new THREE.Vector3(0, 0, -2)
  },
  Generation: {
    position: new THREE.Vector3(0, 8, 8),
    target: new THREE.Vector3(0, 0, 0)
  },
  Torches: {
    // Zoom in on a typical corridor wall
    position: new THREE.Vector3(2, 2, 4),
    target: new THREE.Vector3(2, 1, 0)
  },
  Pillars: {
    // Look at an intersection
    position: new THREE.Vector3(-4, 3, -2),
    target: new THREE.Vector3(-4, 1.5, -5)
  },
  DeadEnds: {
    position: new THREE.Vector3(6, 4, 6),
    target: new THREE.Vector3(6, 0, 2)
  },
  Exit: {
    position: new THREE.Vector3(0, 15, 15),
    target: new THREE.Vector3(0, 0, 0)
  }
};
