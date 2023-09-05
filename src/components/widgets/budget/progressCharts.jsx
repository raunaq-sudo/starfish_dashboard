import React, { Component } from 'react';
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
  Divider,
} from '@chakra-ui/react';
import downloadIcon from '../../../media/images/download-solid.svg';
import ReactApexChart from 'react-apexcharts';
import { FaUniversalAccess } from 'react-icons/fa';
class ProgressCharts extends Component {
  state = {
    series: [44, 55],

    options: {
      chart: {
        type: 'donut',
        toolbar: {
          tools: {
            download: '<Image src="' + downloadIcon + '" />',
          },
        },
      },

      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut: {
            labels: {
              show: true,
            },
          },
        },
      },
      grid: {
        padding: {
          bottom: -80,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };
  render() {
    return (
      <Card width={'100%'}>
        <CardHeader>
          <Flex gap={4} alignItems={'center'}>
            <Icon as={FaUniversalAccess} />
            <Text fontSize={'md'}>{this.props.header}</Text>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody justifyContent={'center'}>
          <ReactApexChart
            type="donut"
            options={this.state.options}
            series={this.state.series}
          />
        </CardBody>
      </Card>
    );
  }
}

export default ProgressCharts;
