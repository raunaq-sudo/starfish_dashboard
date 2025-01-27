import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Text, Flex } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import {connect} from 'react-redux'
import Skeleton from 'react-loading-skeleton';
class Statistics extends Component {
  state = {
    currency: this.props.chartCurrency
  };

  componentDidMount = () =>{
    if(this.props.chartCurrency === undefined){
      this.setState({currency:this.props.locationData[0].currency})
    }
  }
  propsFormatter = (val)=>{
    if(this.state.currency===undefined){
      return  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }else{
      return this.state.currency + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }
  }
  render() {
    return (
      <Card bgColor={this.props.bgColor} width={'100%'}>
        <CardHeader>
          <Text fontSize={'md'}>{this.props.header}</Text>
        </CardHeader>
        <CardBody>
          <Text>{this.props.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
          {this.props.series!==undefined && this.props.series.length>0 ? <ReactApexChart
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
                }
              },
              dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                  fontSize: '8px',
                  colors: ["#304758"]
                },
                formatter: function(value){
                  const regex = /\B(?=(\d{3})+(?!\d))/g
                  return value.toString().replace(regex, ',')
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
            : <>
                <Flex gap={10} justifyContent={'center'} alignItems={'end'}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                    key={index}
                    height={`${Math.random() * 150 + 150}px`}
                    width="80px"
                    />
                ))}
                </Flex>
                </>}         
            </CardBody>
      </Card>
    );
  }
}

const mapStateToProps  =(state) =>{
  return{
    chartCurrency: state.locationSelectFormat.currency,
    locationData:state.locationSelectFormat.locationData
  }
}

export default connect(mapStateToProps)(Statistics);
