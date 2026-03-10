import { useControls } from 'leva';
import { useLayoutEffect, useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { SpotLightHelper } from 'three';
import * as THREE from 'three';

type SpotLightProps = {
    name?: string;
    intensity?: number;
    color?: string;
    position?: [number, number, number];
    lookAt?: [number, number, number];
    angle?: number;
    penumbra?: number;
    distance?: number;
};

type TargetMeshProps = {
    targetRef: React.RefObject<THREE.Object3D>;
    position: [number, number, number];
    visible: boolean;
};

function TargetMesh({ targetRef, position, visible }: TargetMeshProps) {
    return (
        <mesh ref={targetRef as React.RefObject<THREE.Mesh>} position={position} visible={visible}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="green" wireframe />
        </mesh>
    );
}

type SpotLightNodeProps = {
    lightRef: React.RefObject<THREE.SpotLight>;
    targetRef: React.RefObject<THREE.Object3D>;
    intensity: number;
    color: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    angle: number;
    penumbra: number;
    distance: number;
    showHelper: boolean;
};

function SpotLightNode({
    lightRef,
    targetRef,
    intensity,
    color,
    position,
    rotation,
    angle,
    penumbra,
    distance,
    showHelper
}: SpotLightNodeProps) {
    useHelper(showHelper ? lightRef : undefined, SpotLightHelper, color);

    useLayoutEffect(() => {
        if (!lightRef.current || !targetRef.current) return;

        lightRef.current.target = targetRef.current;
        lightRef.current.target.updateMatrixWorld();
    }, [lightRef, targetRef]);

    return (
        <spotLight
            ref={lightRef}
            intensity={intensity}
            color={color}
            position={position}
            rotation={rotation}
            angle={angle}
            penumbra={penumbra}
            distance={distance}
        />
    );
}

export const CustomSpotLight = ({
    name = 'Spot Light',
    intensity = 5,
    color = '#ffffff',
    position = [5, 5, 5],
    lookAt = [0, 0, 0],
    angle = 0.3,
    penumbra = 0.5,
    distance = 50
}: SpotLightProps) => {
    const lightRef = useRef<THREE.SpotLight>(null!);
    const targetRef = useRef<THREE.Object3D>(null!);

    const tweaks = useControls(name, {
        intensity: { value: intensity, min: 0, max: 20, step: 0.1 },
        color: color,
        position: position,
        translateX: { value: 0, min: -50, max: 50, step: 0.1 },
        translateY: { value: 0, min: -50, max: 50, step: 0.1 },
        translateZ: { value: 0, min: -50, max: 50, step: 0.1 },
        rotationX: { value: 0, min: 0, max: 360, step: 1 },
        rotationY: { value: 0, min: 0, max: 360, step: 1 },
        rotationZ: { value: 0, min: 0, max: 360, step: 1 },
        lookAt: lookAt,
        angle: { value: angle, min: 0, max: Math.PI / 2, step: 0.01 },
        penumbra: { value: penumbra, min: 0, max: 1, step: 0.01 },
        distance: { value: distance, min: 0, max: 100, step: 1 },
        showHelper: { value: true, label: 'Show Helper' },
        showTarget: { value: false, label: 'Show Target Mesh' }
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
            <TargetMesh
                targetRef={targetRef}
                position={tweaks.lookAt}
                visible={tweaks.showTarget}
            />

            <SpotLightNode
                lightRef={lightRef}
                targetRef={targetRef}
                intensity={tweaks.intensity}
                color={tweaks.color}
                position={finalPosition}
                rotation={finalRotation}
                angle={tweaks.angle}
                penumbra={tweaks.penumbra}
                distance={tweaks.distance}
                showHelper={tweaks.showHelper}
            />
        </>
    );
};