import { Text } from "@react-three/drei";
import { useContext } from "react";
import { DivContext } from "./Div";

export default function CustomText() {

    const { width } = useContext(DivContext)

    return (
        <Text maxWidth={width} fontSize={1} color="white">
            Hello World
        </Text>
    )
}