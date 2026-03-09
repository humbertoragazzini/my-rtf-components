import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';
import { CustomAmbientLight } from './CustomAmbientLight';
import { CustomDirectionalLight } from './CustomDirectionalLight';

type MainCanvasProps = {
    children?: ReactNode;
};

export const MainCanvas = ({ children }: MainCanvasProps) => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
        >
            <CustomAmbientLight />
            <CustomDirectionalLight />
            {children}
        </Canvas>
    );
};
