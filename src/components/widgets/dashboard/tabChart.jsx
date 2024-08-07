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
    revenue: [
      {
        data: [0],
        series: [0],
        categories: [0],
      },
    ],
    expense: [
      {
        data: [],
        series: [],
        categories: [],
      },
    ],
    income: [
      {
        data: [0],
        series: [0],
        categories: [0],
      },
    ],
  };

  series_gen = (series_in, data_in) => {
    return [
      {
        series: series_in,
        data: data_in,
      },
    ];
  };

  componentDidMount = () => {};
  render() {
    return (
      <Card width={'100%'} p={1}>
        <CardHeader height={{ base: '70px', md: '70px', lg: '70px' }}>
          <Flex gap={2} height="100%">
            <Flex gap={2} alignItems={'center'} flex={1}>
              <Icon as={FaChartPie} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
            {/* <Flex gap={2}> */}
            <Flex flex={1} width={'100%'}>
              <LocationDropDown
                locationValue={this.props.locationValue}
                setLocation={this.props.setLocation}
              />
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker
                dateValue={this.props.dateValue}
                value={this.props.value}
              />
            </Flex>
            {/* </Flex> */}
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Tabs isLazy>
            <TabList>
              <Tab>Profit</Tab>
              <Tab>Expense</Tab>
              <Tab>Revenue</Tab>
            </TabList>
            <TabPanels>
              {this.props.income.data !== undefined ? (
                <TabPanel>
                  <ChartRender
                    type="bar"
                    data={this.props.income.data}
                    series={this.props.income.series}
                    categories={this.props.income.categories}
                  />
                </TabPanel>
              ) : (
                <>
                  <TabPanel>
                    <ChartRender
                      type="bar"
                      data={this.state.income.data}
                      series={this.state.income.series}
                      categories={this.state.income.categories}
                    />
                  </TabPanel>
                </>
              )}
              {this.props.expense.data !== undefined ? (
                <TabPanel>
                  <ChartRender
                    type="bar"
                    data={this.props.expense.data}
                    series={this.props.expense.series}
                    categories={this.props.expense.categories}
                  />
                </TabPanel>
              ) : (
                <>
                  <TabPanel>
                    <ChartRender
                      type="bar"
                      data={this.state.expense.data}
                      series={this.state.expense.series}
                      categories={this.state.expense.categories}
                    />
                  </TabPanel>
                </>
              )}
              {this.props.revenue.data !== undefined ? (
                <TabPanel>
                  <ChartRender
                    type="bar"
                    data={this.props.revenue.data}
                    series={this.props.revenue.series}
                    categories={this.props.revenue.categories}
                  />
                </TabPanel>
              ) : (
                <>
                  <TabPanel>
                    <ChartRender
                      type="bar"
                      data={this.state.revenue.data}
                      series={this.state.revenue.series}
                      categories={this.state.revenue.categories}
                    />
                  </TabPanel>
                </>
              )}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    );
  }
}

export default TabChart;
