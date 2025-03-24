import React, { Component, createRef } from 'react';
import { Card, CardHeader, CardBody, Text, Flex } from '@chakra-ui/react';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

class Statistics extends Component {
  containerRef = createRef(); // Ref for the card body
  state = {
    barCount: 5, // Default number of bars for skeleton
    barWidth: 30, // Default width of a single bar
    gap: 14, // Default gap between bars
    currency: this.props.chartCurrency,
  };

  componentDidMount() {
    if (this.props.chartCurrency === undefined) {
      this.setState({ currency: this.props.locationData[0]?.currency });
    }
    this.calculateBars(); // Calculate initial bar count
    window.addEventListener('resize', this.calculateBars); // Add resize event listener
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateBars); // Cleanup resize listener
  }

  componentDidUpdate(prevProps) {
    // Check if relevant props have changed
    if (
      prevProps.categories !== this.props.categories ||
      prevProps.data !== this.props.data ||
      prevProps.series !== this.props.series
    ) {
      this.calculateBars(); // Recalculate bar count when props change
    }
  }

  calculateBars = () => {
    if (this.containerRef?.current) {
      const containerWidth = this.containerRef.current.offsetWidth; // Get container width
      const totalBarSpace = this.state.barWidth + this.state.gap; // Total space per bar
      const count = Math.floor(containerWidth / totalBarSpace); // Calculate number of bars that fit
      // const adjustedBarWidth = containerWidth / (count + (count - 1) * 0.2); // Adjust bar width to fit
      this.setState({ barCount: count});
    }
  };

  propsFormatter = (val) => {
    const { currency } = this.state;
    return currency
      ? `${currency} ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  dataCheck = (props) =>{
    return props.series!==undefined && props.series.length > 0
  }
  render() {
    return (
      <Card bgColor={this.props.bgColor} width="100%">
        <CardHeader>
          <Text fontSize="md">{this.props.header}</Text>
        </CardHeader>
        <CardBody padding="4">
          <Text>{this.props.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
          {this.dataCheck(this.props) ? (
            <ReactApexChart
              type="bar"
              options={{
                tooltip: {
                  y: {
                    formatter: this.propsFormatter,
                  },
                },
                chart: {
                  id: this.props.id,
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
                      download: `<Image src="${downloadIcon}" title="Download ${this.props.id}" />`,
                    },
                  },
                },
                plotOptions: {
                  bar: {
                    dataLabels: {
                      position: 'top', // top, center, bottom
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                  offsetY: -20,
                  style: {
                    fontSize: '8px',
                    colors: ['#304758'],
                  },
                  formatter: (value) => {
                    const regex = /\B(?=(\d{3})+(?!\d))/g;
                    return value.toString().replace(regex, ',');
                  },
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
                },
              ]}
            />
          ) : (
            <Flex
              gap={`${this.state.gap}px`}
              justifyContent="center"
              alignItems="flex-end" // Align bars to the bottom
              height="200px" // Set a fixed height for the skeleton container
              ref={this.containerRef}
            >
              {Array.from({ length: this.state.barCount }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={`${Math.random() * 100 + 150}px`}
                  width={`${this.state.barWidth}px`}
                />
              ))}
            </Flex>
          )}
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartCurrency: state.locationSelectFormat.currency,
    locationData: state.locationSelectFormat.locationData,
  };
};

export default connect(mapStateToProps)(Statistics);
