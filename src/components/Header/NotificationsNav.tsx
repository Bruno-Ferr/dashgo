import { Icon, HStack} from "@chakra-ui/react"
import { RiNotificationLine, RiLogoutBoxLine, RiLogoutCircleLine } from "react-icons/ri"
import { signOut } from '../../contexts/AuthContext';

export function NotificationsNav() {

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
      <button>
        <Icon as={RiNotificationLine} fontSize="20" />
      </button>
      <button onClick={signOut}>
        <Icon as={RiLogoutBoxLine} fontSize="20" />
      </button>
    </HStack>
  );
  
}