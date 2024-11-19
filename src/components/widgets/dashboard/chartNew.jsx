import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import { connect } from 'react-redux';

class ChartRenderNew extends Component {
    constructor(props) {
        super(props);

        const actualDataPoints = this.props.actualData || [];  
        const dataPoints = this.props.data || [];  

        
        const averageValue = actualDataPoints.filter(value => value !== 0).length > 0
        ? Math.round(actualDataPoints.reduce((a, b) => a + b, 0) / actualDataPoints.filter(value => value !== 0).length)
        : 0;
        // Separate actual data and forecast data
        const forecastDataPoints = Array(actualDataPoints.length).fill(null).concat(dataPoints.slice(actualDataPoints.length));
        
        const series = [
            {
                name: this.props.series || "Actual",
                data: actualDataPoints,
            },
            // Only show forecast data after actual data ends
            ...(forecastDataPoints.length > 0 ? [{
                name: 'Forecast',
                data: forecastDataPoints,  // Forecast data
                type: 'line',
                color: '#FF6347',
            }] : [])
        ];
        // Conditionally add the average line to the series if the chart type is 'line' and there's data
        if (this.props.type === 'line' && actualDataPoints.length > 0 && averageValue) {
            const averageLineData = [averageValue];
            series.push({
                name: 'Average',
                data: averageLineData,  // Add the flat average line with only start and end points
                type: 'line',  // Ensures this is a line series
                stroke: {
                    curve: 'smooth',  // Smooth line for average
                    dashArray: 4,  // Dashed line for average series
                },
                color: '#00FF00',  // Green color for the average line
                markers: {
                    size: 0  // No markers for the average line
                }
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
                        offsetX: 0,
                        offsetY: -50,
                        style: {
                            padding: '2rem',
                        },
                    },
                    id: 'trends',
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
                // colors: [
                //     ({ dataPointIndex }) => {
                //         // Apply color based on whether the data point is part of actual or forecast
                //         console.log(dataPointIndex,actualDataPoints.length,"jshsjd");
                        
                //         return dataPointIndex < actualDataPoints.length ? '#269ffc' : '#FF6347';
                //     }
                // ],
                annotations: {
                    // Show the annotation for the average if the chart type is 'line'
                    yaxis: this.props.type === 'line' ? [{
                        y: parseFloat(averageValue),  // Position the annotation at the average value
                        borderColor: '#00FF00',  // Match the average line color
                        label: {
                            borderColor: '#DAF7A6',
                            style: {
                                color: '#fff',
                                background: '#455969',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            },
                            text: `Average: ${averageValue}`  // Display the average value
                        }
                    }] : [],  // No annotations for non-line charts
                },
                xaxis: {
                    categories: [...this.props.categories, ...Array(forecastDataPoints.length).fill('Forecast')],
                    labels: {
                        rotate: 340,  // Rotate labels to avoid overlap, try values like -45 or -90 for better results
                        style: {
                            fontSize: '10px',  // Reduce font size slightly if needed
                            fontWeight: 'bold',
                            colors: ['#304758'],
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer',
                        },
                        hideOverlappingLabels: true,  // Hide labels that overlap
                        maxLabels: 10,  // Display a maximum number of labels on the x-axis
                        formatter: function (value) {
                            const maxLength = 20;
                            return value?.length > maxLength 
                                ? value?.substring(0, maxLength) + '...' 
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
                                ">
                                    ${fullLabel}  // Display full label
                                </div>`;
                        },
                    },
                    tickPlacement: 'on',
                },                
                yaxis: {
                    labels: {
                        formatter: (val) => Math.round(val),
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: 'top',
                             // top, center, bottom
                        },
                    }
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    width: 2,
                    dashArray: this.props.type === 'line' ? [0, 4] : [0],  // Dashed for average, solid for actual
                },
                legend: {
                    position: 'bottom',  // Set the position of the legend to bottom
                    horizontalAlign: 'center',  // Align legend to the center
                    markers: {
                        width: 12,
                        height: 12,
                        radius: 12,  // Rounded legend marker
                    },
                    fontSize: '14px',  // Set font size for legend
                    labels: {
                        colors: ['#304758'],
                    },
                    itemMargin: {
                        horizontal: 10,  // Spacing between legend items
                        vertical: 5,
                    },
                },
            },
            series: series,
            fullCategories: this.props.categories || [],
        };
    }

    propFormatter = (val) => {
        const formattedValue = Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        return this.props.side === 'cost_amt' 
            ? this.props.currency + ' ' + formattedValue
            : formattedValue + ' ' + '%';
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
                                return value !== null ? Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''; // Show nothing if null
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
