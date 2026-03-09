import type { ThreeElements } from '@react-three/fiber';
import { createContext, useMemo } from 'react';
import { useControls } from 'leva';

type DivProps = ThreeElements['mesh'] & {
    name?: string;
    width?: number;
    height?: number;
    color?: string;
    transparent?: boolean;
    opacity?: number;
};

export const DivContext = createContext<any>(null)

export const Div = ({
    name = 'Div',
    width = 1,
    height = 1,
    color = '#ffffff',
    transparent = false,
    opacity = 1,
    children,
    ...props
}: DivProps) => {

    const tweaks = useControls(name, {
        width: { value: width, min: 0.1, max: 10, step: 0.1 },
        height: { value: height, min: 0.1, max: 10, step: 0.1 },
        color: color,
        opacity: { value: opacity, min: 0, max: 1, step: 0.1 },
        transparent: transparent
    });

    const value = useMemo(() => ({ width: tweaks.width }), [tweaks.width])

    return (
        <DivContext.Provider value={{ value }}>
            <mesh name={name} {...props}>
                <planeGeometry args={[tweaks.width, tweaks.height]} />
                <meshStandardMaterial
                    color={tweaks.color}
                    transparent={tweaks.transparent}
                    opacity={tweaks.opacity}
                />
                {children}
            </mesh>
        </DivContext.Provider>
    );
};
