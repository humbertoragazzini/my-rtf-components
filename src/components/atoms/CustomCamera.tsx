import { useControls } from 'leva';
import { PerspectiveCamera, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { CameraHelper } from 'three';
import * as THREE from 'three';

type CustomCameraProps = {
    name?: string;
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
};

export const CustomCamera = ({
    name = 'Camera',
    position = [0, 0, 5],
    fov = 75,
    near = 0.1,
    far = 1000
}: CustomCameraProps) => {

    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

    const tweaks = useControls(name, {
        position: position,
        fov: { value: fov, min: 10, max: 150, step: 1 },
        near: { value: near, min: 0.01, max: 10, step: 0.1 },
        far: { value: far, min: 10, max: 2000, step: 10 },
        showHelper: { value: false, label: 'Show Helper' }
    });

    useHelper(tweaks.showHelper && cameraRef, CameraHelper);

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={tweaks.position}
            fov={tweaks.fov}
            near={tweaks.near}
            far={tweaks.far}
        />
    );
};
