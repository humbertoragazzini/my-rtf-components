import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';
import { useControls } from 'leva';

type MainCanvasProps = {
    children?: ReactNode;
};

export const MainCanvas = ({ children }: MainCanvasProps) => {
    const { ambientIntensity, dirIntensity } = useControls('Canvas Lights', {
        ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
        dirIntensity: { value: 1, min: 0, max: 5, step: 0.1 }
    });

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
        >
            <ambientLight intensity={ambientIntensity} />
            <directionalLight position={[10, 10, 5]} intensity={dirIntensity} />
            {children}
        </Canvas>
    );
};
