import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import downloadIcon from '../../../media/images/download-solid.svg';
class ChartRenderCol extends Component {
    state = {
        series: this.props.series,


        options: {
            chart: {
                type: 'bar',
                stacked: false,
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
                categories: this.props.categories
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
    }

    render() {
        return (<>
            {this.state.series ? <ReactApexChart
                options={{
                    chart: {
                        type: 'bar',
                        stacked: false,
                        stackType: "100%",
                        fillcolor: '#fcaa32',
                        height: 100,

                        toolbar: {
                            tools: {
                                download: '<Image src="' + downloadIcon + '" />',
                            },
                        },
                        events: {
                            click: (event, chartContext, config) => {
                                console.log(config)
                            }
                        }
                    },

                    plotOptions: {
                        bar: {
                            horizontal: true,
                            columnWidth: 50,
                            endingShape: 'rounded',
                            barHeight: '80%'
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
                        categories: this.props.categories,
                        labels: {
                            formatter: function (val) {
                                return '$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            },
                        }

                    },
                    yaxis: {
                        title: {
                            text: '$',
                        },
                        
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return '$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            },
                        },
                    },
                }}
                series={this.props.series}
                type="bar"
                height={'100%'}
                width={'100%'}

            /> : <></>}

        </>
        )
    }






}
export default ChartRenderCol;