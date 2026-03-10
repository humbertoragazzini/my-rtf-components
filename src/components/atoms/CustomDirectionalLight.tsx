import { useControls } from 'leva';
import { useLayoutEffect, useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import * as THREE from 'three';

type DirectionalLightProps = {
  name?: string;
  intensity?: number;
  color?: string;
  position?: [number, number, number];
  lookAt?: [number, number, number];
};

export const CustomDirectionalLight = ({
  name = 'Directional Light',
  intensity = 1,
  color = '#ffffff',
  position = [10, 10, 5],
  lookAt = [0, 0, 0]
}: DirectionalLightProps) => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);

  const tweaks = useControls(name, {
    intensity: { value: intensity, min: 0, max: 5, step: 0.1 },
    color: color,
    position: position,
    lookAt: lookAt,
    showHelper: { value: true, label: 'Show Helper' },
    showTarget: { value: false, label: 'Show Target Mesh' }
  });

  useHelper(tweaks.showHelper ? lightRef : undefined, DirectionalLightHelper, 1, tweaks.color);

  useLayoutEffect(() => {
    if (!lightRef.current || !targetRef.current) return;

    lightRef.current.target = targetRef.current;
    targetRef.current.updateMatrixWorld();
    lightRef.current.updateMatrixWorld();
  }, [tweaks.lookAt]);

  return (
    <>
      <mesh
        ref={targetRef as React.RefObject<THREE.Mesh>}
        position={tweaks.lookAt}
        visible={tweaks.showTarget}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="yellow" wireframe />
      </mesh>

      <directionalLight
        ref={lightRef}
        intensity={tweaks.intensity}
        color={tweaks.color}
        position={tweaks.position}
      />
    </>
  );
};