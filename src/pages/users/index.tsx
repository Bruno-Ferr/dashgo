import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Spinner, Link, TableContainer } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { CgTrash } from "react-icons/cg";
import { Header } from "../../components/Header";
import { DashgoLoading } from "../../components/loading";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";

import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { useMutation } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { boolean } from "yup";

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)
  const { user, socket, onlineUsers } = useContext(AuthContext)
  // const [onlineUsers, setOnlineUsers] = useState([])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['http://localhost:3333/users/all', userId], async () => {
      const res = await api.get(`http://localhost:3333/users/all`)
 
      return res.data;
    }, {
      staleTime: 1000 * 60 * 10   // 10 min
    })
  }

  const { mutate: deleteUser } = useMutation(async (email: string) => {
    await api.delete(`http://localhost:3333/user/${email}`)
    queryClient.invalidateQueries("getUsers")

    socket?.emit("sendDeleteNotification", {
      senderName: user.name,
      type: "delete",
      userDeleted: email
    })
  })

  // useEffect(() => {
  //   socket?.on('visitors', users => {
  //     console.log(users)
  //     setOnlineUsers(users)
  //   })

  //   // socket?.on("disconnect", () => {
  //   //   console.log('disconectando')
  //   //   setOnlineUsers(onlineUsers.filter(online => online !== user?.email))
  //   // })
  // }, [socket])

  return (
    <Box>
      <Header />

      <Flex overflowX="auto" w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fw="normal">
              Users

              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                bgGradient="linear(to-br,#FF0080 0%, #7928CA 130%)"
                leftIcon={<Icon
                  as={RiAddLine}
                  fontSize="16"
                />}
              >
                Create new user
              </Button>
            </NextLink>
          </Flex>
          
          { isLoading ? (
            <Flex justify="center">
              <DashgoLoading />
              {/*<Spinner color="pink.400"/> */}
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Failed on get users</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>User</Th>
                    <Th>Registration date</Th>
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => {

                    return (
                      <Tr key={user?.email}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user?.email)}>
                              <Text fontWeight="bold">{user?.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">{user?.email}</Text>
                            {
                              (onlineUsers.length != 0 && onlineUsers.find(online => online === user?.email)) &&
                              <Text fontSize="sm" color="green.300">Online</Text>
                            }
                          </Box>
                        </Td>
                        <Td>criado em</Td>
                        <Td>
                          <TableContainer>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              bgGradient="#linear(to-br, #7F00FF 0%, #E100FF 130%)"
                              colorScheme="purple"
                              cursor='pointer'
                              leftIcon={<Icon
                                as={RiPencilLine}
                                fontSize="16"
                              />}
                            >
                              Edit
                            </Button>
                            <Button
                              ml={4}
                              as="a"
                              size="sm"
                              fontSize="sm"
                              bgGradient="#ff0040"
                              colorScheme="red"
                              cursor='pointer'
                              onClick={() => deleteUser(user.email)}
                            >
                              <Icon as={CgTrash} fontSize="16"/>
                            </Button>
                          </TableContainer>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination 
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}