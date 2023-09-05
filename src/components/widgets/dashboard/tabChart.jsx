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
  Icon,
  Divider,
} from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import {
  FaChartArea,
  FaChartPie,
  FaDownload,
  FaFileExport,
} from 'react-icons/fa';
import LocationDropDown from './locationDropDown';
import ReactApexChart from 'react-apexcharts';
import miniLogo from '../../../media/images/xslogo.png';
import downloadIcon from '../../../media/images/download-solid.svg';

class TabChart extends Component {
  state = {
    options: {
      chart: {
        toolbar: {
          tools: {
            download: '<Image src="' + downloadIcon + '" />',
          },
        },
        id: 'basic-bar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },

      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
    },

    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };
  render() {
    return (
      <Card width={'100%'} p={1}>
        <CardHeader>
          <Flex>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <Icon as={FaChartPie} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Tabs isLazy>
            <TabList>
              <Tab>Profit</Tab>
              <Tab>COGS</Tab>
              <Tab>Revenue</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="line"
                />
              </TabPanel>
              <TabPanel>
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="bar"
                />
              </TabPanel>
              <TabPanel>
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="area"
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    );
  }
}

export default TabChart;
