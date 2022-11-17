import { Flex, Text, Box, Avatar, SkeletonCircle } from "@chakra-ui/react"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useContext(AuthContext)

  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text fontSize="small" >{user?.email}</Text>
        </Box>
      )}

      <Avatar size="md" name={user?.name} src={user?.image} />
    </Flex>
  );
}