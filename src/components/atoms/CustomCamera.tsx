import { useControls } from 'leva';
import { PerspectiveCamera, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { CameraHelper } from 'three';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

type CustomCameraProps = {
    name?: string;
    position?: [number, number, number];
    lookAt?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
};

export const CustomCamera = ({
    name = 'Camera',
    position = [0, 0, 5],
    lookAt = [0, 0, 0],
    fov = 75,
    near = 0.1,
    far = 1000
}: CustomCameraProps) => {

    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
    const targetRef = useRef<THREE.Mesh>(null!);

    const tweaks = useControls(name, {
        position: position,
        translateX: { value: 0, min: -50, max: 50, step: 0.1 },
        translateY: { value: 0, min: -50, max: 50, step: 0.1 },
        translateZ: { value: 0, min: -50, max: 50, step: 0.1 },
        rotationX: { value: 0, min: 0, max: 360, step: 1 },
        rotationY: { value: 0, min: 0, max: 360, step: 1 },
        rotationZ: { value: 0, min: 0, max: 360, step: 1 },
        lookAt: lookAt,
        fov: { value: fov, min: 10, max: 150, step: 1 },
        near: { value: near, min: 0.01, max: 10, step: 0.1 },
        far: { value: far, min: 10, max: 2000, step: 10 },
        showHelper: { value: false, label: 'Show Helper' },
        showTarget: { value: false, label: 'Show Target Mesh' }
    });

    useHelper(tweaks.showHelper && cameraRef, CameraHelper);

    useFrame(() => {
        if (cameraRef.current && targetRef.current) {
            cameraRef.current.lookAt(targetRef.current.position);
        }
    });

    const finalPosition = [
        tweaks.position[0] + tweaks.translateX,
        tweaks.position[1] + tweaks.translateY,
        tweaks.position[2] + tweaks.translateZ
    ] as [number, number, number];

    const finalRotation = [
        THREE.MathUtils.degToRad(tweaks.rotationX),
        THREE.MathUtils.degToRad(tweaks.rotationY),
        THREE.MathUtils.degToRad(tweaks.rotationZ)
    ] as [number, number, number];

    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={finalPosition}
                rotation={finalRotation}
                fov={tweaks.fov}
                near={tweaks.near}
                far={tweaks.far}
            />
            {/* Target Mesh */}
            <mesh ref={targetRef} position={tweaks.lookAt} visible={tweaks.showTarget}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="red" wireframe />
            </mesh>
        </>
    );
};
