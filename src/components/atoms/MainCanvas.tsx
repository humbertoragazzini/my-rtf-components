import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';

type MainCanvasProps = {
  children?: ReactNode;
};

export const MainCanvas = ({ children }: MainCanvasProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {children}
    </Canvas>
  );
};
