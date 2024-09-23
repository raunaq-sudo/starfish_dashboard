import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import { connect } from 'react-redux';

class ChartRenderNew extends Component {
    constructor(props) {
        super(props);

        const dataPoints = this.props.data || [];
        const nonZeroDataPoints = dataPoints.filter(value => value !== 0);

        const averageValue = nonZeroDataPoints.length > 0 
            ? (nonZeroDataPoints.reduce((a, b) => a + b, 0) / nonZeroDataPoints.length).toFixed(2)
            : 0;

        const averageSeries = Array(dataPoints.length).fill(parseFloat(averageValue));

        const series = [
            {
                name: this.props.series || "Actual",
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
                        show: true,
                        tools: {
                          download: '<Image src="' + downloadIcon + '" />',
                          zoom: true,
                          zoomin: true,
                          zoomout: true,
                          pan: true,
                          reset: true,
                        },
                        offsetX: 0, // Move icons horizontally
                        offsetY: -50, // Adjust vertical spacing between icons and chart
                        style: {
                          padding: '2rem', // Add padding around the toolbar icons
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
                    labels: {
                        rotate: 340,
                        style: {
                            fontSize: '12px',
                            fontWeight: 'bold',
                            colors: ['#304758'],
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            maxWidth: '300px',  // Control the max width to trigger ellipsis
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer',  // To indicate it's hoverable
                        },
                        formatter: function (value) {
                            const maxLength = 25; // Set your desired max length
                            return value?.length > maxLength 
                                ? value.substring(0, maxLength) + '...' 
                                : value;
                        },
                    },
                    tooltip: {
                        enabled: true,
                        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                            const fullLabel = this.props.categories[dataPointIndex];  // Use full category labels
                            return `
                                <div style="
                                    background: white; 
                                    border: 1px solid #ccc; 
                                    border-radius: 4px; 
                                    padding: 8px; 
                                    position: absolute; 
                                    white-space: nowrap; 
                                    z-index: 10; 
                                    width:100%;
                                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                                " onClick=()=>(console.log(fullLabel,"full label clicked"))>
                                    ${fullLabel}  // Display full label
                                </div>`;
                        },
                    },
                    tickPlacement: 'on',
                },
                plotOptions: {
                    bar: {
                        horizontal: false,  // Set to true for horizontal bars if needed
                    }
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
            fullCategories: this.props.categories || [],  // Store full category labels
        };
    }

    propFormatter = (val) => {
        const formattedValue = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        return this.props.side === 'cost_amt' 
            ? this.props.currency + ' ' + formattedValue  // Currency first if side is 'cost_amt'
            : formattedValue + ' ' + '%'; // Currency last otherwise
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