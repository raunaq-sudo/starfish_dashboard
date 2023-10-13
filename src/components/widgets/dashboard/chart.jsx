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
                }}
                series={[
                    {
                        name: this.props.series,
                        data: this.props.data,
                    },
                ]}
                type={this.props.type}
            />
        </>
        )
    }

}
export default ChartRender;