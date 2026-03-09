import { useControls } from 'leva';

type DirectionalLightProps = {
    name?: string;
    intensity?: number;
    color?: string;
    position?: [number, number, number];
};

export const CustomDirectionalLight = ({ name = 'Directional Light', intensity = 1, color = '#ffffff', position = [10, 10, 5] }: DirectionalLightProps) => {

    const tweaks = useControls(name, {
        intensity: { value: intensity, min: 0, max: 5, step: 0.1 },
        color: color,
        position: position
    });

    return (
        <directionalLight intensity={tweaks.intensity} color={tweaks.color} position={tweaks.position} />
    );
};
