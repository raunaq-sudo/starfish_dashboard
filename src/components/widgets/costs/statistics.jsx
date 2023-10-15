import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
class Statistics extends Component {
  state = {

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
            options={{
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
              plotOptions: {
                bar: {

                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                }
              },
              dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                  fontSize: '8px',
                  colors: ["#304758"]
                }
              },
              xaxis: {
                categories: this.props.categories,
              },

              stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                colors: undefined,
                width: 2,
                dashArray: 0,
              },
            }}
            series={[
              {
                name: this.props.series,
                data: this.props.data,
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default Statistics;
