import React, { Component, createRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import downloadIcon from '../../../media/images/download-solid.svg';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { Flex } from '@chakra-ui/react';

class ChartRender extends Component {
    containerRef = createRef(); // Ref for the container element
    state = {
        barCount: 5, // Default number of bars
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
                    fontSize: '12px',
                    colors: ["#304758"],
                },
                formatter: function (value) {
                    const regex = /\B(?=(\d{3})+(?!\d))/g;
                    return value.toString().replace(regex, ',');
                },
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
                name: this.props.series ? this.props.series : "",
                data: Array.isArray(this.props.data) ? this.props.data : [0], // Updated condition for data
            },
        ],
    };

    propFormatter = (val) => {
        return this.props.chartCurrency + ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    calculateBars = () => {
        if (this.containerRef?.current) {
            const containerWidth = this.containerRef.current.offsetWidth; // Get container width
            const barWidth = 50; // Fixed width of each bar
            const gap = 16; // Gap between bars
            const totalBarSpace = barWidth + gap; // Total space per bar
            const count = Math.floor(containerWidth / totalBarSpace); // Calculate bar count
            this.setState({ barCount: count });
        }
    };

    componentDidMount() {
        this.calculateBars(); // Calculate bars on initial mount
        window.addEventListener('resize', this.calculateBars); // Recalculate bars on window resize
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateBars); // Cleanup event listener
    }

    render() {
        if (!this.props.series || this.props.series.length === 0) {
            return (
                <div ref={this.containerRef}>
                    <Flex gap={4} justifyContent={'center'} alignItems={'end'}>
                        {Array.from({ length: this.state.barCount }).map((_, index) => (
                            <Skeleton
                                key={index}
                                height={`${Math.random() * 150 + 150}px`}
                                width="50px"
                            />
                        ))}
                    </Flex>
                </div>
            );
        } else {
            return (
                <div>
                    <ReactApexChart
                        options={{
                            ...this.state.options,
                            xaxis: {
                                categories: Array.isArray(this.props.categories)
                                    ? this.props.categories
                                    : [], // Updated condition for categories
                            },
                            tooltip: {
                                y: {
                                    formatter: this.propFormatter,
                                },
                            },
                        }}
                        series={
                            Array.isArray(this.props.data)
                                ? [{ name: this.props.series ? this.props.series : "", data: this.props.data }]
                                : [{ name: "", data: [0] }] // Updated condition for series
                        }
                        type={this.props.type}
                    />
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        chartCurrency: state.locationSelectFormat.currency,
    };
};

export default connect(mapStateToProps)(ChartRender);
