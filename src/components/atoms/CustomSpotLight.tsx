import { useControls } from 'leva';
import { useRef } from 'react';
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
        lookAt: lookAt,
        angle: { value: angle, min: 0, max: Math.PI / 2, step: 0.01 },
        penumbra: { value: penumbra, min: 0, max: 1, step: 0.01 },
        distance: { value: distance, min: 0, max: 100, step: 1 },
        showHelper: { value: true, label: 'Show Helper' },
        showTarget: { value: false, label: 'Show Target Mesh' }
    });

    // console.log(tweaks.showHelper)
    // console.log(lightRef)

    useHelper(tweaks.showHelper && lightRef.current, SpotLightHelper, tweaks.color);

    return (
        <>
            <spotLight
                ref={lightRef}
                intensity={tweaks.intensity}
                color={tweaks.color}
                position={tweaks.position}
                angle={tweaks.angle}
                penumbra={tweaks.penumbra}
                distance={tweaks.distance}
                target={targetRef.current}
            />
            {/* Invisible Target Object that the spotlight points to */}
            <mesh ref={targetRef as any} position={tweaks.lookAt} visible={tweaks.showTarget}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="green" wireframe />
            </mesh>
        </>
    );
};
