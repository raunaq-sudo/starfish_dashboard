import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import { connect } from 'react-redux';

class ChartRenderNew extends Component {
    constructor(props) {
        super(props);

        const dataPoints = this.props.data || [];
        const averageValue = dataPoints.length > 0 
            ? (dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length).toFixed(2)
            : 0;

        const averageSeries = Array(dataPoints.length).fill(parseFloat(averageValue));

        const series = [
            {
                name: this.props.series || "",
                data: dataPoints,
            },
        ];

        if (this.props.type === 'line') {
            series.push({
                name: 'Average',
                data: averageSeries,
                stroke: {
                    dashArray: 5, 
                },
            });
        }

        this.state = {
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
                    categories: this.props.categories || [],
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
            series: series,
        };
    }

    propFormatter = (val) => {
        return this.props.chartCurrency + ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    render() {
        return (
            <>
                <ReactApexChart
                    options={{
                        ...this.state.options,
                        tooltip: {
                            y: {
                                formatter: this.propFormatter,
                            },
                        },
                        dataLabels: {
                            enabled: true,
                            offsetY: -20,
                            style: {
                                fontSize: '12px',
                                colors: ["#304758"]
                            },
                            formatter: function (value) {
                                const regex = /\B(?=(\d{3})+(?!\d))/g;
                                return value.toString().replace(regex, ',');
                            }
                        },
                    }}
                    series={this.state.series}
                    type={this.props.type}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chartCurrency: state.locationSelectFormat.currency
    };
}

export default connect(mapStateToProps)(ChartRenderNew);