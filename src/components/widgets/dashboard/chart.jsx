import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
class ChartRender extends Component {
    state = {
        options: {
            chart: {
                toolbar: {
                    tools: {
                        download: '<Image src="' + downloadIcon + '" />',
                    },
                },
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

    render() {
        return (<>
            <ReactApexChart
                options={{
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return '$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            },
                        },
                    },
                    chart: {
                        toolbar: {
                            tools: {
                                download: '<Image src="' + downloadIcon + '" />',
                            },
                        },
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
export default ChartRender;