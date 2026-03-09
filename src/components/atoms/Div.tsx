import type { ThreeElements } from '@react-three/fiber';
import { createContext, useMemo } from 'react';

type DivProps = ThreeElements['mesh'] & {
    width?: number;
    height?: number;
    color?: string;
    transparent?: boolean;
    opacity?: number;
};

export const DivContext = createContext(null)

export const Div = ({
    width = 1,
    height = 1,
    color = '#ffffff',
    transparent = false,
    opacity = 1,
    children,
    ...props
}: DivProps) => {


    const value = useMemo(() => ({ width }), [width])

    return (
        <DivContext.Provider value={{ value }}>
            <mesh {...props}>
                <planeGeometry args={[width, height]} />
                <meshStandardMaterial
                    color={color}
                    transparent={transparent}
                    opacity={opacity}
                />
                {children}
            </mesh>
        </DivContext.Provider>
    );
};
