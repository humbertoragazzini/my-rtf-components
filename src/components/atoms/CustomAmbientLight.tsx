import { useControls } from 'leva';

type AmbientLightProps = {
    name?: string;
    intensity?: number;
    color?: string;
};

export const CustomAmbientLight = ({ name = 'Ambient Light', intensity = 0.5, color = '#ffffff' }: AmbientLightProps) => {

    const tweaks = useControls(name, {
        intensity: { value: intensity, min: 0, max: 2, step: 0.1 },
        color: color
    });

    return (
        <ambientLight intensity={tweaks.intensity} color={tweaks.color} />
    );
};
