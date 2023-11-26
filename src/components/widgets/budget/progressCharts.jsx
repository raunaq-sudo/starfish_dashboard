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
import { DateRangePicker } from 'rsuite';
import LocationDropDown from '../../utility/location';
import { addMonths, endOfMonth, startOfMonth, subDays } from 'date-fns';
import CustomDateRangePicker from '../../utility/dateRangePicker';
class ProgressCharts extends Component {
  predefinedBottomRanges = [


    {
      label: 'Last 30 days',
      value: [subDays(new Date(), 29), new Date()]
    },

    {
      label: 'Last month',
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
    },

    {
      label: 'All time',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()]
    }
  ];

  state = {
    series: [this.props.achieved, this.props.target],

    options: {
      
      chart: {
        type: 'donut',
        toolbar: {
          tools: {
            download: '<Image src="' + downloadIcon + '" />',
          },
        },
      },
      labels: ['Achieved', 'Pending'],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          expandOnClick: true,
          donut: {
            labels: {
              show: true,
              value:{
                formatter: function (val) {
                  return '$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              },
              }
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
              width: '100%',
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
          <Flex gap={2}>
            <Flex gap={4} alignItems={'center'} flex={1}>
              <Icon as={FaUniversalAccess} />
              <Text fontSize={'md'}>{this.props.header}</Text>
            </Flex>

          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody justifyContent={'center'}>
          <ReactApexChart
            type="donut"
            options={this.state.options}
            series={[this.props.achieved, this.props.target]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default ProgressCharts;
