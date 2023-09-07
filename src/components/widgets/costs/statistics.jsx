import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
class Statistics extends Component {
  state = {
    options: {
      chart: {
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
        toolbar: {
          tools: {
            download: '<Image src="' + downloadIcon + '" />',

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
      <Card bgColor={this.props.bgColor} width={'100%'}>
        <CardHeader>
          <Text fontSize={'md'}>{this.props.header}</Text>
        </CardHeader>
        <CardBody>
          <Text>{this.props.value}</Text>
          <ReactApexChart
            type="bar"
            options={this.state.options}
            series={this.state.series}
          />
        </CardBody>
      </Card>
    );
  }
}

export default Statistics;
