import { Box, Flex, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, theme, Tr } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
}) // Lazy loading

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-03-18T00:00:00.000z',
      '2021-03-19T00:00:00.000z',
      '2021-03-20T00:00:00.000z',
      '2021-03-21T00:00:00.000z',
      '2021-03-22T00:00:00.000z',
      '2021-03-23T00:00:00.000z',
      '2021-03-24T00:00:00.000z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3  
    }
  }
};

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 51, 18, 109] }
];

export default function dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" columns={2} align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Sales of the week</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box
            p="8"
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Monthly profit</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box
            p="8"
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <TableContainer boxSize='lg' overflowY='auto' >
              <Table variant='unstyled'>
                <TableCaption placement="top" color="gray.100">SOLD ITEMS LIST</TableCaption>
                <Thead borderBlockEnd='1px solid' color="gray.300">
                  <Tr color="gray.500">
                    <Th>Name</Th>
                    <Th>Quantidade</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Brinco</Td>
                    <Td>5</Td>
                    <Td isNumeric>R$25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>Pulseira</Td>
                    <Td>132</Td>
                    <Td isNumeric>R$30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>Colar</Td>
                    <Td>255</Td>
                    <Td isNumeric>R$914</Td>
                  </Tr>
                  <Tr>
                    <Td>Anel</Td>
                    <Td>255</Td>
                    <Td isNumeric>R$914</Td>
                  </Tr>
                  <Tr>
                    <Td>Berloque</Td>
                    <Td>255</Td>
                    <Td isNumeric>R$914</Td>
                  </Tr>
                  <Tr>
                    <Td>Bolsa</Td>
                    <Td>255</Td>
                    <Td isNumeric>R$914</Td>
                  </Tr>
                  <Tr>
                    <Td>Aliança</Td>
                    <Td>255</Td>
                    <Td isNumeric>R$914</Td>
                  </Tr>
                </Tbody>
                <Tfoot color="gray.500">
                  <Tr>
                    <Th>*</Th>
                    <Th>Total</Th>
                    <Th isNumeric>R$19570</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </SimpleGrid>
        
      </Flex>
    </Flex>
    
  );
}