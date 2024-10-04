import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import downloadIcon from '../../../media/images/download-solid.svg';
import {connect} from 'react-redux'


class ChartRenderCol extends Component {
    state = {
        series: this.props.series,


        options: {
            chart: {
                type: 'bar',
                id: this.props.id,
                stacked: false,
                stackType: "100%",
                fillcolor: '#fcaa32',
                height: 100,
                toolbar: {
                    tools: {
                        download: `<Image src="${downloadIcon}" title="Download ${this.props.id}" />`,
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

    componentDidMount = ()=>{
        console.log(this.props)
    }
    propFormatter = (val) =>{
        return this.props.chartCurrency+ ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                        id: this.props.id,
                        toolbar: {
                            tools: {
                                download: `<Image src="${downloadIcon}" title="Download ${this.props.id}" />`,
                            },
                        },
                        events: {
                            dataPointSelection: (event, chartContext, config) => {
                                //console.log(name)
                                 this.props.clickThru('cost', config.w.config.xaxis.categories[config.dataPointIndex])
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
                            formatter: this.propFormatter
                        }

                    },
                    yaxis: {
                        title: {
                            text: this.props.chartCurrency,
                        },
                        
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        y: {
                            formatter: this.propFormatter
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

const mapStateToProps = (state) =>{

    return{
        chartCurrency : state.locationSelectFormat.currency
    }   
}


export default connect(mapStateToProps)(ChartRenderCol);