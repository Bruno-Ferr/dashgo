import { Icon, HStack, Badge, Center, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, background, Text} from "@chakra-ui/react"
import { fail } from "assert";
import { RiNotificationLine, RiLogoutBoxLine, RiLogoutCircleLine } from "react-icons/ri"
import { AuthContext, signOut } from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from "react";

export function NotificationsNav() {
  const { user, socket } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])

  function handleSignOut() {
    signOut()
    socket?.disconnect()
  }

  useEffect(() => {
    socket?.on("getNotification", data => {
      setNotifications((prev) => [...prev, data])
    })
  }, [socket])

  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Popover autoFocus={false}>
        <PopoverTrigger>
          <button style={{ position: 'relative' }} >
            <Icon as={RiNotificationLine} fontSize="22" />
            {
              notifications.length > 0 && (
                <Badge 
                  position={'absolute'} d={'flex'} alignItems="center" justifyContent={'center'} 
                  borderRadius={20} width={3.5} height={3.5} top="-1" right="-1" 
                  background='pink.400' color='blackAlpha.800' fontSize={11}
                >{notifications.length > 9 ? '9+' : notifications.length}</Badge>
              )
            }
          </button>
        </PopoverTrigger>
        <PopoverContent border='none' background='purple.900'  borderRadius={10} borderWidth={1} borderX={10}> 
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader textAlign={'center'} border="none" color={"white"}>Notifications</PopoverHeader>
          <PopoverBody>
            {
              notifications.map(notification => {
                return (
                  <Text key={notification.userDeleted} p={2} borderBottom="1px" borderColor={'gray.500'}>{notification.message}</Text>
                )
              })
            }
          </PopoverBody>
        </PopoverContent>
      </Popover>
      
      <button onClick={handleSignOut}>
        <Icon as={RiLogoutBoxLine} fontSize="22" />
      </button>
    </HStack>
  );
  
}