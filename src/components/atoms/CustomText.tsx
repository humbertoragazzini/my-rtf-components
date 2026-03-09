import { Text } from "@react-three/drei";
import { useContext } from "react";
import { DivContext } from "./Div";

export default function CustomText() {

<<<<<<< HEAD
const context = useContext(DivContext)
=======
    const context = useContext(DivContext)
>>>>>>> c7aff57ca03d53f155ebe14fe05a0a0d65138ff8

    if (!context) {
        throw new Error('CustomText must be used inside <Div>')
    }

    const { width } = context

    return (
        <Text maxWidth={width} fontSize={1} color="white">
            Hello World {width}
        </Text>
    )
}