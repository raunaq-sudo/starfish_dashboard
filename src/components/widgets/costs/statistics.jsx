import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import {connect} from 'react-redux'
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
          {this.props.series ? <ReactApexChart
            type="bar"
            options={{
              tooltip: {
                y: {
                    formatter: this.propsFormatter,
                },
            },
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
            : <></>}         </CardBody>
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
