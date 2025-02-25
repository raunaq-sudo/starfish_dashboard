import React, { Component } from 'react';
import {
  addMonths,
  endOfMonth,
  startOfMonth,
  subDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfQuarter,
  addQuarters,
  endOfQuarter,
  startOfYear,
  addYears,
  endOfYear,
} from 'date-fns';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  CardHeader,
  Text,
  Thead,
  Tr,
  Th,
  Icon,
  Tbody,
  Td,
  TableContainer,
  Avatar,
  Textarea,
  Divider,
  CardFooter,
  color,
  Button,
  Link,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaDownload,
  FaFileWord,
  FaPercentage,
  FaStickyNote,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import apiEndpoint from '../../config/data';
import LocationDropDown from '../../utility/location';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import MultiLocationDropDown from '../../utility/multiLocation';
import { Table, Dropdown, IconButton } from 'rsuite';
import { DownloadTableExcel, downloadExcel } from 'react-export-table-to-excel';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import { toPng } from 'html-to-image';
import {
  setPeriodFrom,
  setPeriodSelect,
  setPeriodTo,
} from '../../../redux/slices/dateSlice';
import { connect } from 'react-redux';
import { setDataLoading } from '../../../redux/slices/dataFetchSlice';
import ChartRenderNew from '../dashboard/chartNew';
import ChartRender from '../dashboard/chartNew';


class DateAnalysis extends Component {
  state = {
    locationMultiValue: [],
    data: [],
    range_type: 'cost_analysis_group_by_condition_byday',
    name_type_range: 'Last 10 Days',
    name_type: 'Overview',
    type: 'cost_amt',
    interval: '1 day',
    value: [subDays(new Date(), 9), new Date()],
    defaultSwitcher: false,
    chart_data:[],
    chart_categories:[],
    chart_currencies:null,
    actualData:[]
  };
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  handleDate = value => {
    //this.setState({data:undefined})

    var fromDate =
      value !== undefined
        ? (value[0].getMonth() > 8
            ? value[0].getMonth() + 1
            : '0' + (value[0].getMonth() + 1)) +
          '-' +
          (value[0].getDate() > 9
            ? value[0].getDate()
            : '0' + value[0].getDate()) +
          '-' +
          value[0].getFullYear()
        : '';
    var toDate =
      value !== undefined
        ? (value[1].getMonth() > 8
            ? value[1].getMonth() + 1
            : '0' + (value[1].getMonth() + 1)) +
          '-' +
          (value[1].getDate() > 9
            ? value[1].getDate()
            : '0' + value[1].getDate()) +
          '-' +
          value[1].getFullYear()
        : '';

    this.setState({ fromDate: fromDate, toDate: toDate, value: value }, () => {
      console.log('From date:' + fromDate);
      console.log('to date:' + toDate);
      this.fetchData();
    });
  };

  fetchData = async () => {
    //this.props.setDataLoading(true)
    if (this.state.locationMultiValue.length !== 0) {
      this.setState({ loading: true, data: [{ loading: '' }] });
      var body = new FormData();
      body.append('rows', this.state.locationMultiValue);
      body.append('fromDate', this.state.fromDate);
      body.append('toDate', this.state.toDate);
      body.append('date_key', this.state.range_type);
      body.append('type', this.state.type);
      body.append('interval', this.state.interval);

      await fetch(apiEndpoint + '/api/ddl_value_generator_multiselect_date/', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + localStorage['access'] },
        body: body,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.code === undefined) {
            this.setState({ data: data, loading: false });
          } else {
            window.open('/', '_self');
            alert('Session Expired!.');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    //this.props.setDataLoading(false)
  };

  handleDownloadExcel = () => {
    downloadExcel({
      fileName: 'Comparison Overtime',
      sheet: 'summary',
      tablePayload: {
        header: Object.keys(this.state.data[0]),
        body: this.state.data,
      },
    });
  };

  stateDataCheck = () => {
    if (this.state.data === undefined || this.state.data === null) {
      return false;
    } else {
      if (Array.isArray(this.state.data)) {
        if (this.state.data.length === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  };

  validatePeriodLength = (value) =>{
    var periodLength = 0
    var flag = true
    if(this.props.companySwitcherActive){
      value.forEach((element)=>{
        // console.log(element)
        if (element!==undefined){
        // console.log(element)

          var tempLocation = this.props.locationData.filter((location)=>{
            return location.label===element
          })
          console.log(tempLocation)
          if (periodLength===0){
            periodLength = tempLocation[0]?.period_length
          }else{
            if(flag){
              flag = periodLength===tempLocation[0]?.period_length

            }
          }
        }
        
      })
    }

    return flag
  }

  componentDidMount = () => {
    if (this.checkLocation(this.props.locationValue)) {
      this.setState({ locationMultiValue: this.props.locationValue }, () =>
        this.handleDate(this.state.value)
      );
    } else {
      this.handleDate(this.state.value);
    }

    const screenList = ['financialAnalysis', 'locationAnalysis']
    if(screenList.includes(this.props.screen)){
      if(this.props.locationData!==undefined || this.props.locationData !==null){
        this.props.locationData.forEach((element)=>{
          console.log(element)
          if(element.ddl_value.split("|")[3].split("=")[1]==='true'){
            this.setState({defaultSwitcher:true})
            return false
          }
        }  
      )
    }
      
    }
  };
  handleCaptureClick = async () => {
    toPng(document.getElementById('locationTable'), { cacheBust: false })
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  };
  checkLocation = value => {
    if (value[0] === undefined) {
      return false;
    } else {
      return true;
    }
  };

    // Forecast function with variability based on past fluctuations
    movingAverageForecast = (data, periods = 5) => {
      if (!data || data.length === 0) return [];
  
      const forecastedData = [];
  
      // Calculate the average of all data points
      const sum = data.reduce((a, b) => a + b, 0);
      const baseAvg = sum / data.length;
  
      // Calculate standard deviation based on all data points
      const deviationSum = data.reduce((sum, value) => sum + Math.pow(value - baseAvg, 2), 0);
      const stdDev = Math.sqrt(deviationSum / data.length);
  
      // Generate forecasted data with variability
      for (let i = 0; i < periods; i++) {
          // Apply random variation within the range of past standard deviation
          const randomFluctuation = (Math.random() * 2 - 1) * stdDev;
          // Allow negative values by removing Math.max
          forecastedData.push(baseAvg + randomFluctuation);
      }
  
      return forecastedData;
  };
  

  // Simple Moving Average (SMA)
  simpleMovingAverageForecast = (data, periods = 5) => {
    const forecastedData = [];
    for (let i = 0; i < periods; i++) {
      const start = Math.max(data.length - periods + i, 0);
      const slice = data.slice(start, data.length + i);
      const avg = slice.reduce((sum, val) => sum + val, 0) / slice.length;
      forecastedData.push(avg);
    }
    return forecastedData;
  };

  // Weighted Moving Average (WMA)
  weightedMovingAverageForecast = (data, periods = 5) => {
    const forecastedData = [];
    const weights = Array.from({ length: periods }, (_, index) => index + 1); // Increasing weights
    const weightSum = weights.reduce((a, b) => a + b, 0);

    for (let i = 0; i < periods; i++) {
      const start = Math.max(data.length - periods + i, 0);
      const slice = data.slice(start, data.length + i);
      const weightedSum = slice.reduce((sum, val, idx) => sum + val * weights[idx], 0);
      forecastedData.push(weightedSum / weightSum);
    }
    return forecastedData;
  };

  // Linear Regression (LR)
  linearRegressionForecast = (data, periods = 5) => {
    const forecastedData = [];
    const n = data.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = data.reduce((sum, y) => sum + y, 0);
    const sumXY = data.reduce((sum, y, x) => sum + x * y, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    for (let i = 0; i < periods; i++) {
      const forecast = slope * (n + i) + intercept;
      forecastedData.push(Math.max(forecast, 0));
    }
    return forecastedData;
  };

  handleRowClick = (rowData) => {
    console.log(rowData, 'rowData');
    
    const updatedChartData = [];
    const updatedChartCategories = [];
    let firstCurrency = null;
  
    Object.keys(rowData).forEach(key => {
      if (key !== 'classification' && key !== 'desc') {
        // Extract the currency symbol (e.g., £, $, €)
        let currency = rowData[key]?.match(/[^0-9.,\s-]+/);
        currency = currency ? currency[0] : null;
  
        // If the first non-null currency hasn't been found, assign it
        if (currency && !firstCurrency) {
          firstCurrency = currency;
        }
  
        // Extract the numeric value and handle invalid numbers
        let numericValue = parseFloat(rowData[key]?.replace(/[^0-9.-]+/g, ""));
        if (isNaN(numericValue)) {
          numericValue = 0;
        }
        updatedChartData.push(numericValue);
        updatedChartCategories.push(key);
      }
    });
  
    // **Process periods if present in updatedChartCategories**
    const periodRegex = /\b\d{4} - P\d+\b/; // Matches format "2024 - P1", "2023 - P12", etc.
    const periodCategories = updatedChartCategories.filter(cat => periodRegex.test(cat));
  
    let highestYear = null;
    let maxDistinctPeriod = null;
  
    if (periodCategories.length > 0) {
      // Step 1: Split into years and periods
      const years = [];
      const periods = [];
      periodCategories.forEach(item => {
        const [year, period] = item.split(' - ');
        years.push(Number(year.trim()));
        periods.push(Number(period.replace('P', '').trim()));
      });
  
      // Step 2: Find the highest year and max distinct period
      highestYear = Math.max(...years);
      maxDistinctPeriod = Math.max(...periods);
  
      console.log('Highest Year:', highestYear);
      console.log('Max Distinct Period:', maxDistinctPeriod);
    }
  
    // Add forecasted data with variability
    const forecastedData = this.movingAverageForecast(updatedChartData, 5); // Forecast for 5 future periods
    const lastCategory = updatedChartCategories.slice(-1)[0];
  
    // Function to generate the next months based on the last category
    const generateNextMonths = (startMonth, count) => {
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const [month, year] = startMonth.split(" ");
      const startMonthIndex = monthNames.indexOf(month);
      const startYear = parseInt(year, 10);
  
      const nextMonths = [];
      for (let i = 1; i <= count; i++) {
        const newMonthIndex = (startMonthIndex + i) % 12;
        const newYear = startYear + Math.floor((startMonthIndex + i) / 12);
        nextMonths.push(`${monthNames[newMonthIndex]} ${newYear}`);
      }
      return nextMonths;
    };
    
    // Function to generate forecasted periods
    const generateForecastedPeriods = (startCategory, count) => {
      const forecastedPeriods = [];
      const [startYear, startPeriod] = startCategory.split(' - P').map(Number);
  
      let currentYear = startYear;
      let currentPeriod = startPeriod;
  
      for (let i = 0; i < count; i++) {
        currentPeriod += 1;
  
        // If the period exceeds the max distinct period, increment the year and reset the period
        if (currentPeriod > maxDistinctPeriod) {
          currentYear += 1;
          currentPeriod = 1;
        }
  
        forecastedPeriods.push(`${currentYear} - P${currentPeriod}`);
      }
  
      return forecastedPeriods;
    };
  
    console.log(updatedChartCategories, "lastCategory");
    // Generate forecasted categories
    const forecastedCategories = (() => {
      // Check if lastCategory is a period
      if (periodRegex.test(lastCategory)) {
        return generateForecastedPeriods(lastCategory, forecastedData.length);
      } else if (isNaN(Number(lastCategory)) && /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b \d{4}/.test(lastCategory)) {
        return generateNextMonths(lastCategory, forecastedData.length); // Generate next months
      } else if (!isNaN(Number(lastCategory))) {
        // If lastCategory is numeric, increment it
        return Array.from({ length: forecastedData.length }, (_, i) => `${Number(lastCategory) + i + 1}`);
      } else {
        // Handle other UoM (non-numeric, non-month categories)
        return Array.from({ length: forecastedData.length }, (_, i) => `${lastCategory} + ${i + 1}`);
      }
    })();
  
    console.log(updatedChartData, "updatedChartData");
    console.log(this.state.actualData, "actualDataactualData");
    console.log(this.state.chart_data, "chart_datachart_data");
    console.log(forecastedCategories, "forecastedCategories");
  
    // Update the state to include forecasted data
    this.setState({
      actualData: updatedChartData, // Store only actual data points
      chart_data: [...updatedChartData, ...forecastedData],
      chart_categories: [...updatedChartCategories, ...forecastedCategories],
      chart_currencies: firstCurrency ? firstCurrency : null,
    });
  };
  
  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <>
        <Card width={'100%'} height={'88vh'}>
          <CardHeader>
              <Flex justifyContent={'space-between'} alignItems={'center'} gap={2} flexDirection={{base:'column',sm:'column',md:'row'}}>
                <Flex gap={2} alignItems={'center'} width={{md:'auto',sm:'100%',base:'100%'}}>
                  <Icon as={FaStickyNote}></Icon>
                  <Text fontSize={'md'}>Comparison Overtime</Text>
                </Flex>

                <Flex>
                  <Flex gap={1}  flex={3} flexDirection={{base:'column',sm:'column',md:'column',lg:'column',xl:'row'}} minWidth={{sm: '150px', md: '250px'}} alignItems={'center'} justifyContent={'center'}>
                    <Flex gap={1} justifyContent={'space-around'} >
                      <Dropdown title={this.state.name_type} size="sm">
                          <Dropdown.Item
                            onClick={() => {
                              this.setState(
                                { type: 'cost_amt', name_type: 'Overview' },
                                () => {
                                  this.handleDate(this.state.value);
                                }
                              );
                            }}
                          >
                            Overview
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              this.setState(
                                { type: 'cost_per', name_type: '% of cost' },
                                () => {
                                  this.handleDate(this.state.value);
                                }
                              );
                            }}
                          >
                            % of cost
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              this.setState(
                                { type: 'sales_per', name_type: '% of sales' },
                                () => {
                                  this.handleDate(this.state.value);
                                }
                              );
                            }}
                          >
                            % of sales
                          </Dropdown.Item>
                      </Dropdown>
                      <Dropdown title={this.state.name_type_range} size="sm" style={{marginRight:20}}>
                        <Dropdown.Item
                          onClick={() => {
                            this.setState(
                              {
                                range_type: 'cost_analysis_group_by_condition_byyear',
                                name_type_range: 'Last 4 Years',
                                interval: '1 year',
                                value: [
                                  startOfYear(addYears(new Date(), -3)),
                                  new Date(),
                                ],
                              },
                              () => {
                                this.handleDate(this.state.value);
                              }
                            );
                          }}
                        >
                          Last 4 Years
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            this.setState(
                              {
                                range_type:
                                  'cost_analysis_group_by_condition_byquarter',
                                name_type_range: 'Last 6 Quarters',
                                interval: '3 months',
                                value: [
                                  startOfQuarter(addQuarters(new Date(), -5)),
                                  new Date(),
                                ],
                              },
                              () => {
                                this.handleDate(this.state.value);
                              }
                            );
                          }}
                        >
                          Last 6 Quarters
                        </Dropdown.Item>
                        {(this.props.periodSwitcher || this.state.defaultSwitcher) && this.props.companySwitcherActive ? (
                          <Dropdown.Item
                            onClick={() => {
                              this.setState(
                                {
                                  range_type:
                                    'cost_analysis_group_by_condition_byperiod',
                                  name_type_range: 'Last 15 Periods',
                                  interval: '1 month',
                                  value: [
                                    startOfMonth(addMonths(new Date(), -14)),
                                    new Date(),
                                  ],
                                },
                                () => {
                                  this.handleDate(this.state.value);
                                }
                              );
                            }}
                          >
                            Last 15 Periods
                          </Dropdown.Item>
                        ) : (
                          <></>
                        )}

                              <Dropdown.Item
                                onClick={() => {
                                  this.setState(
                                    {
                                      range_type:
                                        'cost_analysis_group_by_condition_bymonth',
                                      name_type_range: 'Last 15 Months',
                                      interval: '1 month',
                                      value: [
                                        startOfMonth(addMonths(new Date(), -14)),
                                        new Date(),
                                      ],
                                    },
                                    () => {
                                      this.handleDate(this.state.value);
                                    }
                                  );
                                }}
                              >
                                Last 15 Months
                              </Dropdown.Item>

                              <Dropdown.Item
                                onClick={() => {
                                  this.setState(
                                    {
                                      range_type: 'cost_analysis_group_by_condition_byweek',
                                      name_type_range: 'Last 10 Weeks',
                                      interval: '1 week',
                                      value: [
                                        startOfWeek(addWeeks(new Date(), -9)),
                                        new Date(),
                                      ],
                                    },
                                    () => {
                                      this.handleDate(this.state.value);
                                    }
                                  );
                                }}
                              >
                                Last 10 Weeks
                              </Dropdown.Item>

                              <Dropdown.Item
                                onClick={() => {
                                  this.setState(
                                    {
                                      range_type: 'cost_analysis_group_by_condition_byday',
                                      name_type_range: 'Last 10 Days',
                                      interval: '1 day',
                                      value: [subDays(new Date(), 9), new Date()],
                                    },
                                    () => {
                                      this.handleDate(this.state.value);
                                    }
                                  );
                                }}
                              >
                                Last 10 Days
                              </Dropdown.Item>
                      </Dropdown>
                    </Flex>      
                    <Flex  minWidth={{base:'250px',sm: '300px', md: '350px',lg:'350px'}} justifyContent={'space-around'} maxWidth={{base:'250px',sm:'300px',md:'350px'}}>
                      {console.log(this.state.locationMultiValue,"this.state.locationMultiValuethis.state.locationMultiValue")}
                              <MultiLocationDropDown
                                locationValue={this.state.locationMultiValue}
                                //setLocation={this.props.setLocation}
                                onChange={value => {
                                  console.log(value,"valuefffff")
                                  if (value.length !== 0) {
                                    if(this.validatePeriodLength(value)){
                                      this.setState({ locationMultiValue: value }, () => {
                                        // this.props.setLocation(value);
                                        this.handleDate(this.state.value);
                                      });
                                    }else{
                                      alert('Please compare locations with similar Period Calendars Only.')
                                    }
                                    
                                  } else {
                                    this.setState({
                                      data: [],
                                      locationMultiValue:[]
                                    });
                                  }
                                }}
                                onClean={(val) => {
                                  this.setState({locationMultiValue:[], data:[]})

                                }}
                              />
                    </Flex>
                     
                    </Flex>

                    
                </Flex>

                <Flex
                          fontSize={'sm'}
                          justify={'center'}
                          justifyContent={'flex-end'}
                          alignItems={'center'}
                    >
                          <IconButton
                            as={Button}
                            icon={<FaDownload />}
                            onClick={this.handleDownloadExcel}
                            size="xs"
                            isDisabled={!this.state.data || !this.state.data[0]}
                          />
                </Flex>
            </Flex>
          </CardHeader>
          <Divider mt={0} /> 
          <CardBody width={'100%'} id="locationTable" p={1}>
            {this.stateDataCheck() ? (
              <Table
                ref={this.ref}
                height={window.innerHeight * 0.7}
                data={this.state.data}
                virtualized
                bordered
                cellBordered
                loading={this.state.loading}
                onRowClick={(rowData) => {
                  this.handleRowClick(rowData);
                  this.setState({connectModal:true,rowData})
                }}
                style={{cursor:'pointer'}}
              >
                {this.state.type === 'cost_amt' ? (
                  <Column fixed flexGrow={1} minWidth={100} resizable >
                    <HeaderCell>Classification</HeaderCell>
                    <Cell dataKey={'classification'}></Cell>
                  </Column>
                ) : (
                  <></>
                )}

                <Column flexGrow={1} minWidth={200} resizable fixed>

                  <HeaderCell>Description</HeaderCell>
                  <Cell dataKey={'desc'}></Cell>
                </Column>

                {this.state.data !== undefined ? (
                  Array(this.state.data[0]).map(keys =>
                    Object.keys(keys).map(item => {
                      if (item === 'classification') {
                        return <></>;
                      } else {
                        if (item === 'desc') {
                          return <></>;
                        } else {
                          return (
                            <>
                              <Column flexGrow={1} minWidth={200}>
                                <HeaderCell>{item}</HeaderCell>
                                <Cell dataKey={item}>
                                  {this.state.type !== 'cost_amt'
                                    ? rowData =>
                                        rowData[item] === null
                                          ? '0 %'
                                          : rowData[item] + ' %'
                                    : rowData => rowData[item]}
                                </Cell>
                              </Column>
                            </>
                          );
                        }
                      }
                    })
                  )
                ) : (
                  <></>
                )}
              </Table>
            ) : (
              <>
                
              </>
            )}

            {/*{this.state.data!==undefined?<Table fontSize={'sm'} variant={'striped'} opacity={this.state.loading===true?0.2:1} >
            <Thead>
              <Tr>{this.state.type==='cost_amt'?<Th>Classification</Th>:<></>}
                
                <Th>Category</Th>
                {this.state.locationMultiValue!==undefined?this.state.locationMultiValue.map((value)=>(<Th>{value}</Th>)):<></>}
              
              </Tr>
            </Thead>
            <Tbody>
              {this.state.data!==undefined ? (this.state.data.map((dat) => (
                <Tr>
                  {this.state.type==='cost_amt'?<Td>{dat.classification}</Td>:<></>}
                  <Td>{/*<Button variant="ghost"  justifyContent={'left'}  width={'100%'} as={Link} size={'xs'}>} onClick={()=>{this.props.clickThru('Cost', dat.expense_head)}}>*/
            /*<Text isTruncated >{dat.desc}</Text></Button></Tr></Td>

                      {this.state.locationMultiValue!==undefined?this.state.locationMultiValue.map((value)=>(<Td>{dat[value]}</Td>)):<></>}
                </Tr>
              ))) : (<></>)}



            </Tbody>
          </Table>
              :<></>}*/}
        </CardBody>
          <Modal
            closeOnOverlayClick={false}
            isOpen={this.state.connectModal}
            onClose={()=>{
            this.setState({
              connectModal:!this.state.connectModal, 
            })}}
            size={'6xl'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Trends</ModalHeader>
              <ModalCloseButton />
              <ModalBody px={8} py={6} gap={4}>
              <Tabs isLazy>    
              <TabList>
              <Tab>Bar Charts</Tab>
              <Tab>Line Charts</Tab>
              </TabList>   
                <TabPanels>
                  <TabPanel>
                    <ChartRenderNew
                      type="bar"
                      data={this.state.chart_data}
                      actualData={this.state.actualData}
                      series={this.state.classification}
                      categories={this.state.chart_categories}
                      currency={this.state.chart_currencies}
                      side = {this.state.type}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ChartRenderNew
                      type="line"
                      data={this.state.chart_data}
                      actualData={this.state.actualData}
                      series={this.state.classification}
                      categories={this.state.chart_categories}
                      currency={this.state.chart_currencies}
                      side = {this.state.type}
                    />   
                  </TabPanel>
                </TabPanels>
                </Tabs> 
                </ModalBody>
            </ModalContent>
          </Modal>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state); 
  return {
    dateFormat: state.dateFormat.value,
    periodFrom: state.dateFormat.periodFrom,
    periodTo: state.dateFormat.periodTo,
    periodSelect: state.dateFormat.periodSelect,
    dataLoading: state.dataFetch.dataLoading,
    periodSwitcher: state.dateFormat.periodSwitcher,
    locationData: state.locationSelectFormat.locationData,
    companySwitcherActive: state.dateFormat.companySwitcherActive,

  };
};

const mapDispatchToProps = {
  setPeriodFrom,
  setPeriodTo,
  setPeriodSelect,
  setDataLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(DateAnalysis);
