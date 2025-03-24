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
        data: [],
        series: [],
        categories: [],
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
        data: [],
        series: [],
        categories: [],
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
  dataCheck = (props, type) =>{   

    return props!==undefined && Array.isArray(props[type]?.data) && props[type].data.length > 0

      
  }

  componentDidMount = () => {

  };
  render() {
    return (
      <Card width={'100%'} p={1}>
        <CardHeader height={{ base: '150px',sm:'100px', md: '70px', lg: '70px' }}>    
          <Flex gap={2} height="100%" direction={{ base: 'column',sm:'row'}} justifyContent={{base:'space-between',sm:'space-around',md:'space-between'}}>
            <Flex gap={2} alignItems={'center'} >
              <Icon as={FaChartPie} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
            <Flex gap={2} direction={{ base: 'column',sm:'column',md:'row'}} justifyContent={'center'} alignItems={'center'} >
            <Flex flex={1} minWidth={{base:'280px',sm: '280px', md: '250px'}} maxWidth={{base:'280px',sm: '280px', md: '250px'}}>
              <LocationDropDown
                locationValue={this.props.locationValue}
                setLocation={this.props.setLocation}
              />
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'} justifyContent={{base:'center',sm:'space-between',md:'space-between'}}>
              <CustomDateRangePicker
                dateValue={this.props.dateValue}
                value={this.props.value}
              />
            </Flex>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Tabs isLazy={
            true
            }>
            <TabList>
              <Tab>Profit</Tab>
              <Tab>Expense</Tab>
              <Tab>Revenue</Tab>
            </TabList>
            <TabPanels>
              

                <TabPanel>
                  <ChartRender
                    type="bar"
                    data={this.props.income.data}
                    series={this.props.income.series}
                    categories={this.props.income.categories}
                    id="Profit"
                  />
                </TabPanel>
              
              
                <TabPanel>
                  <ChartRender
                    type="bar"
                    data={this.props.expense.data}
                    series={this.props.expense.series}
                    categories={this.props.expense.categories}
                    id="Expense"
                  />
                </TabPanel>
              
                <TabPanel>
                  <ChartRender
                    type="bar"
                    data={this.props.revenue.data}
                    series={this.props.revenue.series}
                    categories={this.props.revenue.categories}
                    id="Revenue"
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