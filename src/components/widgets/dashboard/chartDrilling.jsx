import React, { Component, createRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS
import downloadIcon from '../../../media/images/download-solid.svg';
import { connect } from 'react-redux';

class DrillableChart extends Component {
  constructor(props) {
    super(props);
    this.containerRef = createRef(); // Ref for the container
    this.state = {
      barCount: 0, // Dynamically calculated bar count
      options: {
        // Inside DrillableChart constructor (in state.options.chart)
      chart: {
        toolbar: {
          tools: {
            download: `<Image src="${downloadIcon}" title="Download ${this.props.id}" />`,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true, // Include the reset button
          },
          offsetX: 0,
          offsetY: 0,
          style: {
            padding: '2rem',
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
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const category = this.props.categories[config.dataPointIndex];
            if (this.props.onBarClick) {
              this.props.onBarClick(category);
            }
          },
          toolbar: {
            reset: () => {
              // Call the reset callback when the toolbar's reset button is clicked
              if (this.props.onReset) {
                this.props.onReset();
              }
            },
          },
        },
      },

        xaxis: {
          categories: this.props.categories?.length ? this.props.categories : [],
          tickPlacement: 'on',
          labels: {
            rotate: -30,
            rotateAlways: true,
            style: {
              fontSize: '10px',
              fontWeight: 'bold',
              colors: ['#304758'],
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              maxWidth: '300px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            },
            hideOverlappingLabels: true,
            maxLabels: 10,
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
              const fullLabel = this.props.categories[dataPointIndex];
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
                  ${fullLabel}
                </div>`;
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => Math.round(val),
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          width: 2,
          dashArray: 0,
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
          formatter: (value) => {
            if (typeof value === 'number') {
              return Math.round(value).toLocaleString();
            }
            return Math.round(value);
          },
        },
        tooltip: {
          y: {
            formatter: Math.round(this.propFormatter),
          },
        },
      },
      series: this.props.series || [],
    };
  }

  componentDidMount() {
    this.calculateBars(); // Initial calculation
    window.addEventListener('resize', this.calculateBars);
}

componentWillUnmount() {
    window.removeEventListener('resize', this.calculateBars);
}

  componentDidUpdate(prevProps) {
    if (
      prevProps.data !== this.props.data ||
      prevProps.categories !== this.props.categories ||
      prevProps.series !== this.props.series
    ) {
      this.setState({
        options: {
          ...this.state.options,
          xaxis: { categories: this.props.categories || [] , tickPlacement: 'on', },
        },
        series: this.props.series || [],
      });
    }
  }

  calculateBars = () => {
    if (this.containerRef?.current) {
        const containerWidth = this.containerRef.current.offsetWidth; // Get container width
        const barWidth = 80; // Fixed width of each bar
        const gap = 16; // Gap between bars
        const totalBarSpace = barWidth + gap; // Total space per bar
        const count = Math.floor(containerWidth / totalBarSpace); // Calculate bar count
        this.setState({ barCount: count });
    }
};

  propFormatter = (val) => {
    if (typeof val !== 'number') return `${this.props.chartCurrency} 0`;
    return `${this.props.chartCurrency} ${val.toLocaleString()}`;
  };

  render() {
    const { options, series, barCount } = this.state;

    // Show Skeleton if data is not available
    if (series && (!series.length || !series[0]?.data?.length)) {
      if(this.props.dataLoaded && (series[0]?.data?.length === 0 || series[1]?.data?.length === 0)){
        return (
          <div style={{minHeight:'350px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            No data available for this chart.
          </div>
        )
      }
      return (
        <div
          ref={this.containerRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: '350px',
            padding: '10px',
            gap: '16px',
            overflow: 'hidden',
          }}
        >
          {Array.from({ length: barCount }).map((_, index) => (
            <Skeleton
              key={index}
              height={`${Math.random() * 150 + 150}px`}
              width="80px"
            />
          ))}
        </div>
      );
    }

    return (
      <ReactApexChart
        key={JSON.stringify(this.props.data)}
        options={options}
        series={series}
        type={this.props.type || 'bar'}
        height={350}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartCurrency: state.locationSelectFormat.currency,
  };
};

export default connect(mapStateToProps)(DrillableChart);
