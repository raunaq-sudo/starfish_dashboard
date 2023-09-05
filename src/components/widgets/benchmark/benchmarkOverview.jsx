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
  FaFileWord,
  FaPercentage,
  FaStickyNote,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import BenchmarkOWStat from './benchOverviewStat';
import LocationDropDown from '../dashboard/locationDropDown';

class BenchmarkOW extends Component {
  state = {};
  render() {
    return (
      <Card width={'100%'}>
        <CardHeader>
          <Flex width={'100%'}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <Icon as={FaPercentage} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Flex
            gap={4}
            justifyContent={'center'}
            width={'100%'}
            flexWrap={'wrap'}
          >
            <Flex flex={1}>
              <Flex width={'100%'}>
                <BenchmarkOWStat
                  header="Average Margins"
                  num="88%"
                  denom="12%"
                  numDesc="Cost"
                  denomDesc="Net Income"
                />
              </Flex>
            </Flex>
            <Flex flex={1}>
              <Flex width={'100%'}>
                <BenchmarkOWStat
                  header="Best in Class"
                  num="75%"
                  denom="25%"
                  numDesc="Cost"
                  denomDesc="Net Income"
                />
              </Flex>
            </Flex>
            <Flex flex={1}>
              <Flex width={'100%'}>
                <BenchmarkOWStat
                  header="Your Margins"
                  num="79.81%"
                  denom="20.19%"
                  numDesc="Cost"
                  denomDesc="Net Income"
                  footer="22% over historical"
                  bgColor="#fae3a0"
                />
              </Flex>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default BenchmarkOW;
