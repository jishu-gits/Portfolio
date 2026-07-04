import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { HoverState } from './DungeonHoverState';

export function useWallInteraction(
  meshRef: React.RefObject<THREE.InstancedMesh>,
  originalTransforms: { position: THREE.Vector3; scale: THREE.Vector3 }[]
) {
  useFrame(() => {
    if (!meshRef.current || originalTransforms.length === 0) return;

    const dummy = new THREE.Object3D();
    const hoverPos = HoverState.worldPosition;
    const isActive = HoverState.active;
    
    let needsUpdate = false;

    originalTransforms.forEach((transform, i) => {
      // Calculate distance on the XZ plane (ignoring height)
      const dx = transform.position.x - hoverPos.x;
      const dz = transform.position.z - hoverPos.z;
      const distanceSq = dx * dx + dz * dz;

      // Hover radius ~ 2.5 units squared = 6.25
      const isHovered = isActive && distanceSq < 6.25;

      // Calculate target scale and position
      let targetScaleY = transform.scale.y;
      let targetPosY = transform.position.y;

      if (isHovered) {
        // Subtle upward motion and scale increase based on proximity
        const influence = 1.0 - Math.sqrt(distanceSq) / 2.5;
        const bump = influence * 0.1; // max 0.1 units
        
        targetScaleY = transform.scale.y + bump * 2;
        targetPosY = transform.position.y + bump;
      }

      // We need to fetch current matrix to lerp smoothly
      meshRef.current!.getMatrixAt(i, dummy.matrix);
      dummy.position.setFromMatrixPosition(dummy.matrix);
      dummy.scale.setFromMatrixScale(dummy.matrix);

      // Smooth interpolation using lerp
      const newPosY = THREE.MathUtils.lerp(dummy.position.y, targetPosY, 0.1);
      const newScaleY = THREE.MathUtils.lerp(dummy.scale.y, targetScaleY, 0.1);

      // Only update if there's a meaningful difference to avoid unnecessary matrix calculations
      if (Math.abs(newPosY - dummy.position.y) > 0.001 || Math.abs(newScaleY - dummy.scale.y) > 0.001) {
        dummy.position.set(transform.position.x, newPosY, transform.position.z);
        dummy.scale.set(transform.scale.x, newScaleY, transform.scale.z);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });
}

export function useTorchInteraction(
  flameRefs: React.MutableRefObject<(THREE.Mesh | null)[]>,
  lightRefs: React.MutableRefObject<(THREE.PointLight | null)[]>,
  originalPositions: THREE.Vector3[]
) {
  useFrame(({ clock }) => {
    const hoverPos = HoverState.worldPosition;
    const isActive = HoverState.active;
    
    originalPositions.forEach((pos, i) => {
      const flame = flameRefs.current[i];
      const light = lightRefs.current[i];
      if (!flame || !light) return;

      const dx = pos.x - hoverPos.x;
      const dz = pos.z - hoverPos.z;
      const distanceSq = dx * dx + dz * dz;

      // Base flicker logic
      const t = clock.elapsedTime * 10 + pos.x * 100;
      
      let targetIntensity = 1.0 + Math.sin(t) * 0.1 + Math.sin(t * 0.5) * 0.1;
      let targetScale = 1.0 + Math.sin(clock.elapsedTime * 15 + pos.z * 100) * 0.1;

      // Hover interaction
      if (isActive && distanceSq < 6.25) {
        const influence = 1.0 - Math.sqrt(distanceSq) / 2.5;
        // Increase intensity and flicker speed when hovered
        targetIntensity += influence * 1.5; 
        targetScale += influence * 0.3;
      }

      light.intensity = THREE.MathUtils.lerp(light.intensity, targetIntensity * 1.5, 0.1);
      
      const currentScale = flame.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.2);
      flame.scale.setScalar(newScale);
    });
  });
}

