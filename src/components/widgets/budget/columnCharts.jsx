import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaSearchDollar } from 'react-icons/fa';
import downloadIcon from '../../../media/images/download-solid.svg';
import { DateRangePicker } from 'rsuite';
import LocationDropDown from '../../utility/location';
import CustomDateRangePicker from '../../utility/dateRangePicker';

class ColumnCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Total ',
          data: [44, 55, 57, 56, 61, 58],
        },
        {
          name: 'Target ',
          data: [10, 7, 15, 6, 7, 58],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          stackType: "100%",
          fillcolor: '#fcaa32',
          height: 100,
          toolbar: {
            tools: {
              download: '<Image src="' + downloadIcon + '" />',
            },
          },
        },

        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: 20,
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        //colors: '#fcaa32',
        xaxis: {
          categories: [
            'Cost of Goods Sold',
            'Labour',
            'Direct OpEx',
            'Advertising',
            'Repairs',
            'Administration',
          ],
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands';
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <Card width={'100%'} height={400}>
        <CardHeader>
          <Flex gap={2}>
            <Flex gap={4} alignItems={'center'} flex={1}>
              <Icon as={FaSearchDollar} />
              <Text fontSize={'md'}>Spending to Budget</Text>
            </Flex>
            <Flex flex={1} width={'100%'}>
              <LocationDropDown />
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker />
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody justifyContent={'center'} width={'100%'}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={'100%'}
            width={'100%'}
          />
        </CardBody>
      </Card>
    );
  }
}

export default ColumnCharts;
