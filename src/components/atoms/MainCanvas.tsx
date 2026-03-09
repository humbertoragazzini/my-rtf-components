import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';
import { CustomAmbientLight } from './CustomAmbientLight';
import { CustomDirectionalLight } from './CustomDirectionalLight';
import { CustomCamera } from './CustomCamera';

type MainCanvasProps = {
    children?: ReactNode;
};

export const MainCanvas = ({ children }: MainCanvasProps) => {
    return (
        <Canvas>
            <CustomCamera />
            <CustomAmbientLight />
            <CustomDirectionalLight />
            {children}
        </Canvas>
    );
};
