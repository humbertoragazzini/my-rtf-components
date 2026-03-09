import type { ThreeElements } from '@react-three/fiber';

type DivProps = ThreeElements['mesh'] & {
    width?: number;
    height?: number;
    color?: string;
    transparent?: boolean;
    opacity?: number;
};

export const Div = ({
    width = 1,
    height = 1,
    color = '#ffffff',
    transparent = false,
    opacity = 1,
    children,
    ...props
}: DivProps) => {
    return (
        <mesh {...props}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial
                color={color}
                transparent={transparent}
                opacity={opacity}
            />
            {children}
        </mesh>
    );
};
