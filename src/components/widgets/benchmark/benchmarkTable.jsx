import {
  Box,
  Card,
  CardBody,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  CardHeader,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Icon,
  Tbody,
  Td,
  TableContainer,
  Avatar,
  Textarea,
  Divider,
  CardFooter,
  color,
} from '@chakra-ui/react';
import React, { Component } from 'react';

import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaDownload,
  FaFileWord,
  FaPercentage,
  FaStickyNote,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

class BenchmarkTable extends Component {
  state = {};
  render() {
    return (
      <Card width={'100%'}>
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaStickyNote}></Icon>
              <Text fontSize={'md'}>Benchmark</Text>
            </Flex>
            <Flex flex={1} justifyContent={'flex-end'}>
              <Icon as={FaDownload} />
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody overflowX={'scroll'}>
          <Table fontSize={'sm'} variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Gl</Th>
                <Th>Average Business</Th>
                <Th>Best in Class</Th>
                <Th>Your Business</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Labour</Td>
                <Td>L001</Td>
                <Td>30%</Td>
                <Td>25%</Td>
                <Td>33.38% (8.38%)</Td>
              </Tr>
              <Tr>
                <Td>Direct Operating Expenses</Td>
                <Td>OP002</Td>
                <Td>2%</Td>
                <Td>1.5%</Td>
                <Td>1.4% (0.01%)</Td>
              </Tr>
              <Tr>
                <Td>Advertising</Td>
                <Td></Td>
                <Td>3%</Td>
                <Td>2.5%</Td>
                <Td>1.2% </Td>
              </Tr>
              <Tr>
                <Td>Repair and Maintenance</Td>
                <Td></Td>
                <Td>2%</Td>
                <Td>1.5%</Td>
                <Td>1.32%</Td>
              </Tr>
              <Tr>
                <Td>Administration</Td>
                <Td></Td>
                <Td>1%</Td>
                <Td>0.8%</Td>
                <Td>0.75%</Td>
              </Tr>
              <Tr>
                <Td>Utilities</Td>
                <Td></Td>
                <Td>2%</Td>
                <Td>1.5%</Td>
                <Td>0.17%</Td>
              </Tr>
              <Tr>
                <Td>Property</Td>
                <Td></Td>
                <Td>3%</Td>
                <Td>2.5%</Td>
                <Td>3.33%</Td>
              </Tr>
              <Tr bgColor={'#fae3a0'}>
                <Td>Totals</Td>
                <Td></Td>
                <Td>88%</Td>
                <Td>75%</Td>
                <Td>79.81%</Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default BenchmarkTable;
