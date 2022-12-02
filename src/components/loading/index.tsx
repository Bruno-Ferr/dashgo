import { Flex, Text } from '@chakra-ui/react'

import styles from './loading.module.css'

export function DashgoLoading() {
  return (
    <Flex align="center">
      <Text fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight" w="64" bgClip="text" bgGradient="linear(to-br,#FF0080 0%, #7928CA 100%)" >
        Dashgo
        {/* <div className={styles.loader} /> */}
      </Text>
      
    </Flex>
  )
}

