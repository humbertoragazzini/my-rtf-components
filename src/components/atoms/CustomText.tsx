import { Text } from "@react-three/drei";
import { useContext } from "react";
import { DivContext } from "./Div";

export default function CustomText() {

      const context = useContext(DivContext)

  if (!context) {
    throw new Error('CustomText must be used inside <Div>')
  }

  const { width } = context

    return (
        <Text maxWidth={width} fontSize={1} color="white">
            Hello World
        </Text>
    )
}