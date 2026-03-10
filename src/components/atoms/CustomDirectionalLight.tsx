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
        translateX: { value: 0, min: -50, max: 50, step: 0.1 },
        translateY: { value: 0, min: -50, max: 50, step: 0.1 },
        translateZ: { value: 0, min: -50, max: 50, step: 0.1 },
        rotationX: { value: 0, min: 0, max: 360, step: 1 },
        rotationY: { value: 0, min: 0, max: 360, step: 1 },
        rotationZ: { value: 0, min: 0, max: 360, step: 1 },
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
                position={finalPosition}
                rotation={finalRotation}
            />
        </>
    );
};