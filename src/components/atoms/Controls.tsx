import { useControls } from 'leva';
import {
    OrbitControls,
    TrackballControls,
    PresentationControls,
    FlyControls,
    MapControls,
    CameraControls
} from '@react-three/drei';

type ControlsProps = {
    name?: string;
    defaultType?: 'Orbit' | 'Trackball' | 'Presentation' | 'Fly' | 'Map' | 'Camera' | 'None';
};

export const Controls = ({ name = 'Controls', defaultType = 'Orbit' }: ControlsProps) => {

    const { type } = useControls(name, {
        type: {
            value: defaultType,
            options: ['Orbit', 'Trackball', 'Presentation', 'Fly', 'Map', 'Camera', 'None']
        }
    });

    switch (type) {
        case 'Orbit':
            return <OrbitControls makeDefault />;
        case 'Trackball':
            return <TrackballControls makeDefault />;
        case 'Presentation':
            return <PresentationControls />;
        case 'Fly':
            return <FlyControls makeDefault rollSpeed={0.5} movementSpeed={10} />;
        case 'Map':
            return <MapControls makeDefault />;
        case 'Camera':
            return <CameraControls makeDefault />;
        case 'None':
        default:
            return null;
    }
};
