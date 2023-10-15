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

class TabChart extends Component {
  state = {
    revenue: [],
    cogs: [
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


  handleDate = (value) => {
    console.log(value)
    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())

    var formData = new FormData()
    formData.append('fromDate', fromDate)
    formData.append('toDate', toDate)
    fetch('/api/overview_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          this.setState({ revenue: data['revenue'], cogs: data['cogs'], income: data['income'] })//, income: data['income'], cost: data['expense'] })
        } else {
          alert('Session Expired!.')
          window.open('/')
        }
      }).catch(err => console.error(err))



  }

  componentDidMount = () => {
    fetch('/api/overview_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          this.setState({ revenue: data['revenue'], cogs: data['cogs'], income: data['income'] })//, income: data['income'], cost: data['expense'] })
        } else {
          window.open('/', "_self")
          alert('Session Expired!.')
        }
      }).catch(err => {
        console.log(err)
      })
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
              <CustomDateRangePicker dateValue={this.handleDate} />
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Tabs isLazy><TabList>
            <Tab>Profit</Tab>
            <Tab>COGS</Tab>
            <Tab>Revenue</Tab>
          </TabList>
            <TabPanels>
              {this.state.revenue.data ? (
                <TabPanel>
                  <ChartRender type='bar' data={this.state.income.data}
                    series={this.state.income.series} categories={this.state.income.categories} />

                </TabPanel>) : (<></>)}{
                this.state.cogs ? (
                  <TabPanel>
                    <ChartRender type='bar' data={this.state.cogs.data}
                      series={this.state.cogs.series} categories={this.state.cogs.categories} />

                  </TabPanel>) : (<></>)}{
                this.state.income ? (
                  <TabPanel>
                    <ChartRender type='bar' data={this.state.revenue.data}
                      series={this.state.revenue.series} categories={this.state.revenue.categories} />
                  </TabPanel>) : (<></>)}
            </TabPanels>

          </Tabs>
        </CardBody>
      </Card>
    );


  }
}

export default TabChart;
