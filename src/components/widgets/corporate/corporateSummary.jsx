import { Card, CardBody, CardHeader, Flex, Divider, Icon } from '@chakra-ui/react';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import React, { Component } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { FaChartPie } from 'react-icons/fa';
import DrillableChart from '../dashboard/chartDrilling';
import { IoMdArrowRoundBack } from "react-icons/io";

class CorporateSummary extends Component {
    state = {
        drillDownLevel: 0, // 0: Level 1, 1: Level 2, 2: Level 3
        selectedMonth: null,
        selectedApp: null,
        level1Data: [],
        level2Data: [],
        level3Data: [],
        dataLoaded: false, // Tracks if data is loaded
      };
    
      initializeData() {
        if (this.props.drillingData) {
          const level1Data = this.prepareLevel1Data();
          this.setState({
            drillDownLevel: 0,
            level1Data,
            level2Data: [],
            level3Data: [],
            selectedMonth: null,
            selectedApp: null,
            dataLoaded:true, // Mark data as loaded
          });
        }
      }
    
      componentDidMount() {
        this.initializeData();
      }
    
      componentDidUpdate(prevProps) {
        if (prevProps.drillingData !== this.props.drillingData) {
          this.setState({ dataLoaded: false}, () => {
            this.initializeData(); // Re-initialize data when props change
          });
        }
      }

prepareLevel1Data = () => {
    const data = this.props.drillingData.level1_data;
    // this.props.drillingData.length !== 0 ? false : true
    
    
    // Group data by month (ui_label)
    const groupedData = data?.reduce(
      (acc, curr) => {
        if (curr.classification === "Expense") {
          acc.Expense[curr.ui_label] =
            (acc.Expense[curr.ui_label] || 0) + curr.subt_nat_amount;
        } else if (curr.classification === "Revenue") {
          acc.Revenue[curr.ui_label] =
            (acc.Revenue[curr.ui_label] || 0) + curr.subt_nat_amount;
        }
        return acc;
      },
      { Expense: {}, Revenue: {} }
    );
  
    // Create an array for chart plotting
    const months = groupedData && [...new Set([...Object.keys(groupedData?.Expense), ...Object.keys(groupedData?.Revenue)])];
    if(months && months?.length){
      this.setState({
        dataLoaded:true,
      })
    }
    return months?.map((month) => ({
      label: month, // X-axis: ui_label (Month)
      expense: groupedData.Expense[month] || 0,
      revenue: groupedData.Revenue[month] || 0, // Y-axis: Aggregated values
    }));
  };
  
  prepareLevel2Data = (selectedMonth) => {
    const data = this.props.drillingData.level2_data;
  
    // Group data by app_name for the selected month
    const groupedData = data?.reduce(
      (acc, curr) => {
        if (curr.ui_label === selectedMonth) {
          if (curr.classification === "Expense") {
            acc.Expense[curr.app_name] =
              (acc.Expense[curr.app_name] || 0) + curr.subt_nat_amount;
          } else if (curr.classification === "Revenue") {
            acc.Revenue[curr.app_name] =
              (acc.Revenue[curr.app_name] || 0) + curr.subt_nat_amount;
          }
        }
        return acc;
      },
      { Expense: {}, Revenue: {} }
    );
  
    // Create an array for chart plotting
    const apps = groupedData && [...new Set([...Object.keys(groupedData?.Expense), ...Object.keys(groupedData?.Revenue)])];
    if(apps && apps?.length){
      this.setState({
        dataLoaded:true,
      })
    }
    return apps?.map((app) => ({
      label: app, // X-axis: app_name
      expense: groupedData.Expense[app] || 0,
      revenue: groupedData.Revenue[app] || 0, // Y-axis: Aggregated values
    }));
  };
  
  prepareLevel3Data = (selectedMonth, selectedApp) => {
    const data = this.props.drillingData.level3_data;
  
    // Group data by tx_location for the selected app and month
    const groupedData = data?.reduce(
      (acc, curr) => {
        if (curr.ui_label === selectedMonth && curr.app_name === selectedApp) {
          if (curr.classification === "Expense") {
            acc.Expense[curr.tx_location] =
              (acc.Expense[curr.tx_location] || 0) + curr.subt_nat_amount;
          } else if (curr.classification === "Revenue") {
            acc.Revenue[curr.tx_location] =
              (acc.Revenue[curr.tx_location] || 0) + curr.subt_nat_amount;
          }
        }
        return acc;
      },
      { Expense: {}, Revenue: {} }
    );
  
    // Create an array for chart plotting
    const locations = groupedData && [...new Set([...Object.keys(groupedData?.Expense), ...Object.keys(groupedData?.Revenue)])];
    if(locations && locations?.length){
      this.setState({
        dataLoaded:true,
      })
    }
    return locations?.map((location) => ({
      label: location, // X-axis: tx_location
      expense: groupedData.Expense[location] || 0,
      revenue: groupedData.Revenue[location] || 0, // Y-axis: Aggregated values
    }));
  };
  
  

  handleDrillDownToLevel2 = (month) => {
    const level2Data = this.prepareLevel2Data(month);
    this.setState({ drillDownLevel: 1, selectedMonth: month, level2Data });
  };

  handleDrillDownToLevel3 = (app) => {
    const { selectedMonth } = this.state;
    const level3Data = this.prepareLevel3Data(selectedMonth, app);
    this.setState({ drillDownLevel: 2, selectedApp: app, level3Data });
  };

  handleReset = () => {
    this.initializeData();
  };

  render() {
    const {
      drillDownLevel,
      level1Data,
      level2Data,
      level3Data,
      selectedMonth,
      selectedApp,
      dataLoaded
    } = this.state;

    return (
      <Card width="100%" p={1} minHeight={"25rem"}>
        <CardHeader height={{ base: '100px', sm: '80px', md: '70px', lg: '70px' }}>
          <Flex
            gap={2}
            height="100%"
            direction={{ base: 'column', sm: 'row' }}
            justifyContent={{ base: 'space-between', sm: 'space-around', md: 'space-between' }}
          >
            <Flex gap={2} alignItems={'center'}>
              <Icon as={FaChartPie} />
              <Text fontSize={'md'}>Corporate Overview</Text>
            </Flex>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Flex
                fontSize={'sm'}
                width={'100%'}
                justifyContent={{ base: 'center', sm: 'space-between', md: 'space-between' }}
              >
                <CustomDateRangePicker
                  dateValue={this.props.dateValue}
                  value={this.props.value}
                />
              </Flex>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
        <Box>
            {drillDownLevel === 0 && (
              <DrillableChart
                type="bar"
                series={[
                  { name: "Expense", data: level1Data?.map((item) => item.expense) },
                  { name: "Revenue", data: level1Data?.map((item) => item.revenue) },
                ]}
                categories={level1Data?.map((item) => item.label)}
                dataLoaded={dataLoaded}
                onBarClick={this.handleDrillDownToLevel2}
              />
            )}
            {drillDownLevel === 1 && (
              <>
                <DrillableChart
                  type="bar"
                  series={[
                    { name: "Expense", data: level2Data?.map((item) => item.expense) },
                    { name: "Revenue", data: level2Data?.map((item) => item.revenue) },
                  ]}
                  categories={level2Data?.map((item) => item.label)}
                  dataLoaded={dataLoaded}
                  onBarClick={this.handleDrillDownToLevel3}
                />
                <Flex justifyContent={'space-between'} alignItems={{ base: 'flex-start', sm: 'center'}} direction={{ base: 'column', sm: 'row' }}>
                  <Button onClick={this.handleReset}>
                  <IoMdArrowRoundBack />  1 Level Up</Button>
                  <Text>Viewing details for month: <strong>{selectedMonth}</strong></Text>
                </Flex>
              </>
            )}
            {drillDownLevel === 2 && (
              <>
                <DrillableChart
                  type="bar"
                  series={[
                    { name: "Expense", data: level3Data?.map((item) => item.expense) },
                    { name: "Revenue", data: level3Data?.map((item) => item.revenue) },
                  ]}
                  categories={level3Data?.map((item) => item.label)}
                  dataLoaded={dataLoaded}
                />
                <Flex justifyContent={'space-between'} alignItems={'center'} direction={{ base: 'column', sm: 'row' }}>
                  <Button onClick={() => this.setState({ drillDownLevel: 1 })}>
                  <IoMdArrowRoundBack /> 1 Level Up
                  </Button>
                  <Text>
                  Information displayed is for : <strong>{selectedMonth}</strong>, application: <strong>{selectedApp}</strong> 
                  </Text>
                </Flex>
              </>
            )}
          </Box>
        </CardBody>
      </Card>
    );
  }
  
}

export default CorporateSummary;

