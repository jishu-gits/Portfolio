import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { PresentationState } from './PresentationState';
import { FocusTargets } from './FocusTargets';

export function useCameraDirector(groupRef: React.RefObject<THREE.Group>) {
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // We achieve camera direction by manipulating the root group of the dungeon.
    // This perfectly isolates the storytelling from the global ScrollController camera logic,
    // ensuring seamless transitions to other portfolio projects.
    
    // 1. Determine active target based on scroll if not hovered
    // The Dungeon section is around scroll offset 0.5 to 0.7.
    // If not actively interacting with the UI, we auto-play the scroll storytelling.
    if (!PresentationState.isGenerating && PresentationState.currentFocus === 'Overview') {
      const scrollY = scroll.offset;
      if (scrollY > 0.52 && scrollY < 0.55) {
        PresentationState.currentFocus = 'Overview';
      } else if (scrollY >= 0.55 && scrollY < 0.58) {
        PresentationState.currentFocus = 'Generation';
      } else if (scrollY >= 0.58 && scrollY < 0.62) {
        PresentationState.currentFocus = 'Torches';
      } else if (scrollY >= 0.62 && scrollY < 0.66) {
        PresentationState.currentFocus = 'Pillars';
      } else if (scrollY >= 0.66 && scrollY < 0.70) {
        PresentationState.currentFocus = 'DeadEnds';
      }
    }

    const targetTransform = FocusTargets[PresentationState.currentFocus];
    
    // To simulate the camera moving to `targetTransform.position` and looking at `targetTransform.target`,
    // while the actual camera stays static relative to the group, we move and rotate the group inversely.
    // However, since we are inside `CameraRig` which also has base rotation (Math.PI/6),
    // we can just apply local offsets to bring the target into view.
    
    // Simplest approach without complex matrix inversion:
    // Move the group so that the target's center is near the origin.
    const targetGroupPos = new THREE.Vector3(
      -targetTransform.target.x,
      -targetTransform.target.y,
      -targetTransform.target.z
    );

    // Subtle rotation based on camera position vector to simulate perspective shift
    const dir = new THREE.Vector3().subVectors(targetTransform.target, targetTransform.position).normalize();
    const targetGroupRotX = Math.PI / 6 + dir.y * 0.2;
    const targetGroupRotY = -dir.x * 0.2;

    const dampSpeed = 2.5;
    
    // Interpolate group position and rotation
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetGroupPos.x, dampSpeed, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetGroupPos.y, dampSpeed, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetGroupPos.z, dampSpeed, delta);

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetGroupRotX, dampSpeed, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetGroupRotY, dampSpeed, delta);
  });
}
