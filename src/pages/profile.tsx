import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext)


  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        
        
      </Flex>
    </Flex>
  )
}