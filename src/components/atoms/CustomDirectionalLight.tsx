import { useControls } from 'leva';
import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import * as THREE from 'three';

type DirectionalLightProps = {
    name?: string;
    intensity?: number;
    color?: string;
    position?: [number, number, number];
};

export const CustomDirectionalLight = ({ name = 'Directional Light', intensity = 1, color = '#ffffff', position = [10, 10, 5] }: DirectionalLightProps) => {

    const lightRef = useRef<THREE.DirectionalLight>(null!);

    const tweaks = useControls(name, {
        intensity: { value: intensity, min: 0, max: 5, step: 0.1 },
        color: color,
        position: position,
        showHelper: { value: true, label: 'Show Helper' }
    });

    useHelper(tweaks.showHelper && lightRef, DirectionalLightHelper, 1, tweaks.color);

    return (
        <directionalLight ref={lightRef} intensity={tweaks.intensity} color={tweaks.color} position={tweaks.position} />
    );
};
