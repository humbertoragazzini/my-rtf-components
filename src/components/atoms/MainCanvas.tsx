import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';
import { CustomAmbientLight } from './CustomAmbientLight';
import { CustomDirectionalLight } from './CustomDirectionalLight';
import { CustomCamera } from './CustomCamera';
import { CustomSpotLight } from './CustomSpotLight';
import { Controls } from './Controls';

type MainCanvasProps = {
    children?: ReactNode;
};

export const MainCanvas = ({ children }: MainCanvasProps) => {
    return (
        <Canvas>
            <Controls />
            <CustomCamera />
            <CustomAmbientLight />
            <CustomDirectionalLight />
            <CustomSpotLight />
            {children}
        </Canvas>
    );
};
