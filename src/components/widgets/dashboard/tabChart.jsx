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
import LocationDropDown from '../../utility/location';
import ReactApexChart from 'react-apexcharts';
import miniLogo from '../../../media/images/xslogo.png';
import downloadIcon from '../../../media/images/download-solid.svg';
import { DateRangePicker } from 'rsuite';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import ChartRender from './chart';
import apiEndpoint from '../../config/data';

class TabChart extends Component {
  state = {
    revenue: [],
    expense: [
      {
        data: [],
        series: [],
        categories: []
      }
    ],
    income: [
      {
        data: [0],
        series: [0],
        categories: [0]
      }
    ],

  };

  series_gen = (series_in, data_in) => {
    return [
      {
        series: series_in,
        data: data_in
      }
    ]
  }



  componentDidMount = () => {

  }
  render() {

    return (
      <Card width={'100%'} p={1}>
        <CardHeader>
          <Flex gap={2}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <Icon as={FaChartPie} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
            <Flex flex={1} width={'100%'}>
              <LocationDropDown />
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker dateValue={this.props.dateValue} value={this.props.value} />
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Tabs isLazy><TabList>
            <Tab>Profit</Tab>
            <Tab>Expense</Tab>
            <Tab>Revenue</Tab>
          </TabList>
            <TabPanels>
              {this.props.revenue.data !== undefined ? (
                <TabPanel>
                  <ChartRender type='bar' data={this.props.income.data}
                    series={this.props.income.series} categories={this.props.income.categories} />

                </TabPanel>) : (<></>)}{
                this.props.expense.data !== undefined ? (
                  <TabPanel>
                    <ChartRender type='bar' data={this.props.expense.data}
                      series={this.props.expense.series} categories={this.props.expense.categories} />

                  </TabPanel>) : (<></>)}{
                this.props.income.data !== undefined ? (
                  <TabPanel>
                    <ChartRender type='bar' data={this.props.revenue.data}
                      series={this.props.revenue.series} categories={this.props.revenue.categories} />
                  </TabPanel>) : (<></>)}
            </TabPanels>

          </Tabs>
        </CardBody>
      </Card>
    );


  }
}

export default TabChart;
