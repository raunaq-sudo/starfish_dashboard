import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import {connect} from 'react-redux'
class ChartRender extends Component {
    state = {
        options: {
            chart: {
                toolbar: {
                    tools: {
                        download: `<Image src="${downloadIcon}" title="Download ${this.props.id}" />`,
                    },
                },
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
        },
        series: [
            {
                name: this.props.series,
                data: this.props.data,
            },
        ],

    }

    propFormatter = (val) =>{
        return this.props.chartCurrency+ ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }

    render() {
        return (<>
            <ReactApexChart
                options={{
                    tooltip: {
                        y: {
                            formatter: this.propFormatter,
                        },
                    },
                    chart: {
                        toolbar: {
                            tools: {
                                download: `<Image src="${downloadIcon}" title="Download ${this.props.id}" />`,
                            },
                        },
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
                    },
                    plotOptions: {
                        bar: {

                            dataLabels: {
                                position: 'top',
                                 // top, center, bottom
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ["#304758"]
                        },
                        formatter: function(value){
                            const regex = /\B(?=(\d{3})+(?!\d))/g
                            return value.toString().replace(regex, ',')
                        }
                    },
                    xaxis: {
                        categories: this.props.categories ? this.props.categories : "",
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
                        name: this.props.series ? this.props.series : "",
                        data: this.props.data ? this.props.data : [],
                    },
                ]}
                type={this.props.type}
            />
        </>
        )
    }

}

const mapStateToProps = (state) =>{
    return {
      chartCurrency:state.locationSelectFormat.currency
    }
  }
  


export default connect(mapStateToProps)(ChartRender);