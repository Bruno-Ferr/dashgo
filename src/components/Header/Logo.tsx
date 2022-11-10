import { Text } from "@chakra-ui/react"

export function Logo() {
  return (
    <Text fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight" w="64">
      Dash
      <Text as="span" bgClip="text" bgGradient="linear(to-br,#FF0080 0%, #7928CA 130%)">go</Text>
      <Text as="span" color="#c7109f">.</Text>
    </Text>
  );
}