import { Flex, Text, Box, Avatar } from "@chakra-ui/react"


interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {


  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Bruno Ferreira</Text>
          <Text fontSize="small" >fbruno233@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Bruno Ferreira" src="https://github.com/Bruno-ferr.png" />
    </Flex>
  );
}