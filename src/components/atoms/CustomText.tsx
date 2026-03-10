import { Text } from "@react-three/drei";
import { useContext } from "react";
import { DivContext } from "./Div";
import { useControls } from "leva";
import * as THREE from 'three';

export default function CustomText() {
    const context = useContext(DivContext)

    if (!context) {
        throw new Error('CustomText must be used inside <Div>')
    }

    const { value } = context

    const tweaks = useControls('Text', {
        text: 'Hello World',
        fontSize: { value: 1, min: 0.1, max: 5, step: 0.1 },
        color: '#ffffff',
        position: [0, 0, 0],
        translateX: { value: 0, min: -50, max: 50, step: 0.1 },
        translateY: { value: 0, min: -50, max: 50, step: 0.1 },
        translateZ: { value: 0, min: -50, max: 50, step: 0.1 },
        rotationX: { value: 0, min: 0, max: 360, step: 1 },
        rotationY: { value: 0, min: 0, max: 360, step: 1 },
        rotationZ: { value: 0, min: 0, max: 360, step: 1 },
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
        <Text
            maxWidth={value.width}
            fontSize={tweaks.fontSize}
            color={tweaks.color}
            position={finalPosition}
            rotation={finalRotation}
        >
            {tweaks.text} {value.width}
        </Text>
    )
}