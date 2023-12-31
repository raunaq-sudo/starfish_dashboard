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
  Table,
  Thead,
  Tr,
  Th,
  Icon,
  Tbody,
  Td,
  TableContainer,
  Avatar,
  Divider,
  CardFooter,
  color,
  Wrap,
  WrapItem,
  AccordionProvider,
  Accordion,
  AccordionItem,
  AccordionButton,
  Badge,
  AccordionPanel,
  Button,
  TableCaption,
  Textarea,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import TabChart from './dashboard/tabChart';
import TaskList from './dashboard/taskList';
import TabularCard from './dashboard/tabularCard';
import Overview from './costs/overviewCard';
import {
  FaArrowDown,
  FaArrowUp,
  FaCog,
  Faexpense,
  FaDollarSign,
  FaFileWord,
  FaPercentage,
  FaPlus,
  FaStickyNote,
  FaTasks,
  FaThumbsDown,
  FaThumbsUp,
  FaTrash,
  FaUser,
} from 'react-icons/fa';
import PLCard from './costs/plStatement';
import ReactApexChart from 'react-apexcharts';
import ProgressCharts from './budget/progressCharts';
import ColumnCharts from './budget/columnCharts';
import BenchmarkOW from './benchmark/benchmarkOverview';
import BenchmarkTable from './benchmark/benchmarkTable';
import TaskManager from './tasks/taskAdder';

import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from 'chakra-react-select';
import SettingPage from './settings/settingsPage';

import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LocationDropDown from '../utility/location';

import "../widgets/drawer.css"
import UploadPage from './uploadData/uploadData';
import Profile from './profile/profileData';
import CustomDateRangePicker from '../utility/dateRangePicker';
import { useState } from 'react';
import PLSummary from './costs/plSummary';
import apiEndpoint from '../config/data';

const Dashboard = (props) => {
  return (
    <>
      <Flex gap={4} flexWrap={'wrap'}>
        <Flex flex={3}>
          <TabChart income={props.income} expense={props.expense} revenue={props.revenue} 
          dateValue={props.dateValue} value={props.value} locationValue = {props.locationValue}
          setLocation ={props.setLocation}/>
        </Flex>
        <Flex flex={2} flexWrap={true}>
          <TaskList />
        </Flex>
      </Flex>
      <Flex gap={4} justifyContent={'center'} flexWrap={'wrap'}>
        <Flex flex={1}>
          <TabularCard
            header="Wins"
            bgColor={'lightgreen'}
            icon={FaArrowDown}
            headerIcon={FaThumbsUp}
            data={props.wins}
          />
        </Flex>
        <Flex flex={1}>
          <TabularCard
            header="Losses"
            bgColor={'#f79d97'}
            icon={FaArrowUp}
            headerIcon={FaThumbsDown}
            data={props.losses}
          />
        </Flex>
      </Flex>
    </>
  );
};

const Cost = (props) => {
  return (
    <>
      <Flex flex={1}>
        <Overview revenue={props.costRevenue} cost={props.cost} income={props.costIncome} 
        handleDate={props.dateValue} value={props.value} 
        locationValue = {props.locationValue}
          setLocation ={props.setLocation}/>
      </Flex>
      <Flex justifyContent={'center'} flex={1}>
        <PLSummary pltable={props.pltableSum}
          columns={props.columnsSum}
          from_date={props.from_date}
          to_date={props.to_date}
          tableData={props.tableData} 
          locationValue = {props.locationValue}/>
      </Flex>


    </>
  );
};

const Budget = (props) => {
  return (
    <>
      <Flex
        gap={4}
        flexDirection={window.screen.width > 500 ? 'row' : 'column'}
        width={'100%'}
        flex={1}
      >
        <Flex flex={1} width={'100%'} justifyContent={'center'}>
          <ProgressCharts header="Period Sales" achieved ={props.achievedRevenue} target = {props.targetRevenue}/>
        </Flex>
        <Flex flex={1} width={'100%'} justifyContent={'center'} >
          <ProgressCharts header="Period Costs" achieved = {props.achievedExpense} target={props.targetExpense}/>
        </Flex>
      </Flex>
      <Flex justifyContent={'center'} flex={1}>
        <ColumnCharts series={props.series} categories={props.categories} />
      </Flex>
    </>
  );
};

const Benchmark = (props) => {
  console.log('Benchmark')
  console.log(props.overview)
  return (
    <>
      <Flex>
        <BenchmarkOW overview={props.overview} handleDate={props.dateValue} value={props.value} 
        locationValue = {props.locationValue}
        setLocation ={props.setLocation}/>
      </Flex>

      <Flex>
        <BenchmarkTable table={props.table} />
      </Flex>

    </>
  );
};

const TaskPage = () => {
  return (
    <>
      <TaskManager />
    </>
  );
};

class WidgetDrawer extends Component {
  state = {
    wlData: {
      wins: [],
      losses: []
    },
    plTableExcel: [],
    revenue: [
      {
        data: [],
        series: [],
        categories: []
      }
    ],
    expense: [
      {
        data: [0],
        series: [0],
        categories: [0]
      }
    ],
    income: [
      {
        data: [0],
        series: [0],
        categories: [0]
      }
    ],
    costRevenue: { value: 0 },
    costIncome: { value: 0 },
    cost: { value: 0 },
    pltable: [],
    pltableSum: [],
    dashboardLocation:""
    
  };

//  handleDate = (value) => {
//    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
//    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())
//
//    var formData = new FormData()
//    formData.append('fromDate', fromDate)
//    formData.append('toDate', toDate)
//    fetch(apiEndpoint + '/api/overview_data/', {
//      method: 'POST',
//      headers: { "Authorization": "Bearer " + localStorage['access'] },
//      body: formData
//    }).then(response => response.json())
//      .then(data => {
//        console.log(data)
//        //const budget = data['budget_bar']
//        //
//        //const budgetSeries = [{
//        //  name: data['budget_bar']['series'][0],
//        //  data: data['budget_bar']['data'][0]['total'][0],
//        //},
//        //{
//        //  name: data['budget_bar']['series'][1],
//        //  data: data['budget_bar']['data'][0]['target'][0],
//        //}]
//        //
//        //const budgetCategories = data['budget_bar']['categories']
//        //this.setState({ budget: budget, budgetSeries: budgetSeries, budgetCategories: budgetCategories })
//        this.setState({ revenue: data['revenue'], expense: data['expense'], income: data['income'] })//, income: data['income'], cost: data['expense'] })
//        const wlData = data['wlData']
//        this.setState({ wlData: wlData })
//        this.setState({ defaultDashValue: value })
//      }).catch(err => console.error(err))
//  }

  handleBudgetDate = (value) => {
    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())

    var formData = new FormData()
    formData.append('fromDate', fromDate)
    formData.append('toDate', toDate)
    fetch(apiEndpoint + '/api/overview_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        const budget = data['budget_bar']

        const budgetSeries = [{
          name: data['budget_bar']['series'][0],
          data: data['budget_bar']['data'][0]['total'][0],
        },
        {
          name: data['budget_bar']['series'][1],
          data: data['budget_bar']['data'][0]['target'][0],
        }]

        const budgetCategories = data['budget_bar']['categories']
        this.setState({ budget: budget, budgetSeries: budgetSeries, budgetCategories: budgetCategories })
        this.setState({ revenue: data['revenue'], expense: data['expense'], income: data['income'] })//, income: data['income'], cost: data['expense'] })
        const wlData = data['wlData']
        this.setState({ wlData: wlData })
        this.setState({ defaultDashValue: value })
      }).catch(err => console.error(err))
  }

  handleBenchmarkDate = (value) => {
    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())

    var formData = new FormData()
    formData.append('fromDate', fromDate)
    formData.append('toDate', toDate)
    fetch(apiEndpoint + '/api/benchmark_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          this.setState({ benchmarkDataTable: data['table'], benchmarkOverview: data['overview'], defaultbenckmarkValue: value })
        } else {
          alert('Session Expired!.')
          window.open('/')
        }
      }).catch(err => console.error(err))

  }

  handleCostsDate = (value) => {
    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())
    this.setState({ costsFromDate: fromDate, costsToDate: toDate })
    var formDataCostSum = new FormData();
    formDataCostSum.append('screen', 1);
    formDataCostSum.append('log', '');
    formDataCostSum.append('type', 'summary')
    formDataCostSum.append('fromDate', fromDate)
    formDataCostSum.append('toDate', toDate)
    fetch(apiEndpoint + '/api/pltable/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formDataCostSum
    }).then(response => response.json())
      .then(data => {

        this.setState({ pltableSum: data['data'] })
        console.log('pltable' + data)
        this.setState({ columnsSum: data['columns'] })
        this.setState({ plTableExcel: data['table'] })
      }).catch(err => console.error(err))



    //////////////////////////////////////

    var formData = new FormData()
    formData.append('fromDate', fromDate)
    formData.append('toDate', toDate)
    fetch(apiEndpoint + '/api/overview_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ costRevenue: data['revenue'], cost: data['expense'], costIncome: data['income'] })//, income: data['income'], cost: data['expense'] })        const wlData = data['wlData'
        this.setState({ defaultCostValue: value })
      }).catch(err => console.error(err))



  }

  handleOverview= async (screen)=>{
    var flag = false
    if (screen === 'all'){
      
      flag = false
    }else{
      var value = this.state[screen + 'Date']
      var fromDate = value!==undefined? (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear()):""
      var toDate = value!==undefined?(((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear()):""    

      var location = this.state[screen + 'Location']
      location = location===undefined?"":location
      console.log(location)
      flag = true
    }

    var formData = new FormData()
    if (flag) { 
      
      formData.append('fromDate', fromDate)
      formData.append('toDate', toDate)
      formData.append('location', location)
    }

    await fetch(apiEndpoint + '/api/overview_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({overviewData:response}, () =>{
          this.saveOverviewData(this.state.overviewData, screen)

        })
      }).catch(err => {console.error(err)
        this.setState({overviewData:[0]})})
        
      
      
       //const data = this.state.initial_load
     



  }

  saveOverviewData = async (data, screen) =>{

    if (data !==undefined){

      //if (screen==='budget' || screen==='all'){
      //  const budget = data['budget_bar']
      //  const budgetSeries = [{
      //    name: data['budget_bar']['series'][0],
      //    data: data['budget_bar']['data'][0]['total'][0],
      //  },
      //  {
      //    name: data['budget_bar']['series'][1],
      //    data: data['budget_bar']['data'][0]['target'][0],
      //  }]
      //  const budgetCategories = data['budget_bar']['categories']
      //  this.setState({ budget: budget, budgetSeries: budgetSeries, budgetCategories: budgetCategories })
      //}
//
      /// dashboard
      if (screen==='dashboard' || screen==='all'){
        this.setState({ revenue: data['revenue'], expense: data['expense'], income: data['income'] }, ()=>{
          console.log(this.state.expense)
        })
        const wlData = data['wlData']
        this.setState({ wlData: wlData })
      }

      //// cost overview
      if (screen==='cost' || screen==='all'){
        this.setState({ costRevenue: data['revenue'], cost: data['expense'], costIncome: data['income'] })//, income: data['income'], cost: data['expense'] })
      }
    }
      
  }

  handleBenchmark = async() =>{

    var value = this.state.benchmarkDate
    var fromDate = value!==undefined? (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear()):""
    var toDate = value!==undefined?(((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear()):""    

    var location = this.state.benchmarkLocation
    location = location===undefined?"":location

    var formData = new FormData()
    formData.append('fromDate', fromDate)
    formData.append('toDate', toDate)
    formData.append('location', location)
    
    
    await fetch(apiEndpoint + '/api/benchmark_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body:formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          this.setState({ benchmarkDataTable: data['table'], benchmarkOverview: data['overview'] })
        } else {
          window.open('/', "_self")
          alert('Session Expired!.')
        }
      }).catch(err => {
        console.log(err)
      })

  }


  handleBudget = async () =>{
    var value = this.state.budgetDate
    var fromDate = value!==undefined? (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear()):""
    var toDate = value!==undefined?(((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear()):""    

    var location = this.state.budgetLocation
    location = location===undefined?"":location
    console.log("Budget " + location)
    var formData = new FormData()
    formData.append('fromDate', fromDate)
    formData.append('toDate', toDate)
    formData.append('location', location)
    
    
    await fetch(apiEndpoint + '/api/budget_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body:formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          const budget = data
          const budgetSeries = [{
            name: data['series'][0],
            data: data['data'][0]['total'][0],
          },
          {
            name: data['series'][1],
            data: data['data'][0]['target'][0],
          }]

          const budgetCategories = data['categories']
          const achievedExpense = data['achieved_expense']['actual_expense'][0]===null?0:Number(data['achieved_expense']['actual_expense'][0])
          const achievedRevenue = data['achieved_revenue']['actual_revenue'][0]===null?0:Number(data['achieved_revenue']['actual_revenue'][0])
          this.setState({ budget: budget, budgetSeries: budgetSeries, budgetCategories: budgetCategories, 
          budgetTargetExpense: Math.round((Number(data['target_expense']['budget_expense'][0]) - achievedExpense)*100)/100,
          budgetTargetRevenue: Math.round((Number(data['target_revenue']['budget_revenue'][0]) - achievedRevenue)*100)/100,
          budgetAchievedExpense: achievedExpense,
          budgetAchievedRevenue: achievedRevenue,
         })

          //this.setState({ benchmarkDataTable: data['table'], benchmarkOverview: data['overview'] })
        } else {
          window.open('/', "_self")
          alert('Session Expired!.')
        }
      }).catch(err => {
        console.log(err)
      })
  }


  handleProfitLoss = async ()=>{
    
    var value = this.state.costDate
    var fromDate = value!==undefined? (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear()):""
    var toDate = value!==undefined?(((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear()):""    
    
    this.setState({costsToDate:toDate, costsFromDate:fromDate})

    var location = this.state.costLocation
    location = location===undefined?"":location
    
    
    var formDataCostSum = new FormData();
    formDataCostSum.append('screen', 1);
    formDataCostSum.append('log', '');
    formDataCostSum.append('type', 'summary')
    formDataCostSum.append('location', location)
    formDataCostSum.append('fromDate', fromDate)
    formDataCostSum.append('toDate', toDate)
    
    fetch(apiEndpoint + '/api/pltable/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formDataCostSum
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ pltableSum: data['data'] })
        this.setState({ plTableExcel: data['table'] })
        this.setState({ columnsSum: data['columns'] })

      }).catch(err => console.error(err))
  }

  componentDidMount = async () => {
    this.setState({ modeMobile: window.screen.width > 500 ? false : true });
    window.screen.width > 500 ? this.setState({ w: 300 }) : this.setState({ w: "100%" })
    
    await this.handleOverview('all')
    
    
    ////////////////Benchmark data ////////////////////

    await this.handleBenchmark()
    
    //////////// Budget page ////////////////
    await this.handleBudget()


    ///// PL Summary 
    await this.handleProfitLoss()

  };

  render() {
    return (
      <Flex bgColor={'whitesmoke'} mt={7} width={'100%'} height={'100%'}>
        <Flex
          direction={'column'}
          p={window.screen.width > 500 ? 5 : 1}
          gap={4}
          width={'100%'}
        >
          {/* filter Flex bar */}
          {this.props.view === 'Budget' ? (
            <><Flex>
              <Spacer flex={1} /><Flex
                flex={1}
                justifyContent={'flex-end'}
                gap={4}
                p={2}
                bgColor={'white'}
                shadow={'md'}
                borderRadius={'md'}
                width={'100%'}


              >
                <Flex flex={1} width={'100%'}>
                  <LocationDropDown locationValue={this.state.budgetLocation} setLocation={(value)=>{
                    this.setState({budgetLocation:value},()=>{
                      this.handleBudget()
                    })
                  }}/>
                </Flex>
                <Flex flex={1} fontSize={'sm'} width={'100%'}>
                  <CustomDateRangePicker dateValue={(value)=>{
                    this.setState({budgetDate:value}, ()=>{
                    this.handleBudget()
                })
              }} 
                value={this.state.dashboardDate}
                  />
                </Flex>
              </Flex></Flex></>
          ) : (
            <Flex>
              {window.screen.width > 500 ? <Flex justifyContents={'center'} flex={1}></Flex> : <></>}

              {/*<Flex
                flex={5}
                justifyContent={'end'}
                gap={4}
                p={2}
                bgColor={'white'}
                shadow={'md'}
                borderRadius={'md'}
                width={'100%'}
                pr={4}

              >
                <Flex flex={4}>
                  <LocationDropDown />
                </Flex>
                <Flex flex={1} fontSize={'sm'} width={'100%'}>
                  <DateRangePicker
                    appearance="default"
                    placeholder="Date Range"
                    placement={'auto'}
                    menuAutoWidth={window.screen.width > 500 ? false : true}
                    style={{ width: this.state.w }}
                    block
                    size="lg"
                    showOneCalendar
                    format='MM-dd-yyyy'

                  />
                </Flex>
          </Flex>*/}
            </Flex>
          )}
          {/*end of filter bar*/}
          {this.props.view === 'Dashboard' ? (
            <Dashboard wins={this.state.wlData['wins']} losses={this.state.wlData['losses']}
              income={this.state.income} expense={this.state.expense} revenue={this.state.revenue} 
              setLocation={(value)=>{
                this.setState({dashboardLocation:value}, ()=>{
                  this.handleOverview('dashboard')
                  
                })
              }}
              dateValue={(value)=>{
                this.setState({dashboardDate:value}, ()=>{
                  this.handleOverview('dashboard')
                })
              }} 
              value={this.state.dashboardDate}
              locationValue = {this.state.dashboardLocation}/>
          ) : this.props.view === 'Cost' ? (
            <Cost pltable={this.state.pltable}
              columns={this.state.columns}
              pltableSum={this.state.pltableSum}
              columnsSum={this.state.columnsSum}
              costRevenue={this.state.costRevenue}
              cost={this.state.cost}
              costIncome={this.state.costIncome}
              dateValue={(value)=>{
                this.setState({costDate:value}, ()=>{
                  this.handleOverview('cost')
                  this.handleProfitLoss()
                })
              }} 
              value={this.state.defaultCostValue}
              from_date={this.state.costsFromDate}
              to_date={this.state.costsToDate}
              tableData={this.state.plTableExcel}
              setLocation={(value)=>{this.setState({costLocation:value}, ()=>{
                this.handleOverview('cost') 
                this.handleProfitLoss()
              })}}
              locationValue = {this.state.costLocation}
            />
          ) : this.props.view === 'Benchmark' ? (
            <Benchmark table={this.state.benchmarkDataTable}
              overview={this.state.benchmarkOverview}
              dateValue={(value)=>{
                this.setState({benchmarkDate:value}, ()=>{
                  this.handleBenchmark()
                })
              }} 
              value={this.state.defaultbenckmarkValue}
              setLocation={(value)=>{this.setState({benchmarkLocation:value}, ()=>{
                this.handleBenchmark() 
              })}}
              locationValue = {this.state.benchmarkLocation}
            />
          ) : this.props.view === 'Budget' ? (
            <Budget series={this.state.budgetSeries} categories={this.state.budgetCategories}
            targetRevenue ={this.state.budgetTargetRevenue} targetExpense ={this.state.budgetTargetExpense}
            achievedRevenue = {this.state.budgetAchievedRevenue} achievedExpense = {this.state.budgetAchievedExpense}/>
          ) : this.props.view === 'Task' ? (
            <TaskPage />
          ) : this.props.view === 'Setting' ? (
            <SettingPage />
          ) : this.props.view === 'UploadData' ? (
            <UploadPage />
          ) : this.props.view === 'Profile' ? (
            <Profile />
          ) : this.props.view === 'ExcelDat' ? (
            <UploadPage />):(<></>)}

          {/*<Flex>
            <Card>
              <CardHeader>
                <Text fontSize={'sm'}>Task Assignment</Text>
              </CardHeader>
              <CardBody wordBreak={'break-word'}>
                <TableContainer>
                  <Table columnGap={0} width={'100%'} height={'auto'}>
                    <Thead>
                      <Tr>
                        <Th>Assigned User</Th>
                        <Th>Tasks</Th>
                        <Th>Category</Th>
                        <Th>Comments</Th>
                        <Th>Potential Impact</Th>
                        <Th>Impact</Th>
                        <Th>Due Date</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody flexWrap={'true'} fontSize={'xs'}>
                      <Tr>
                        <Td>
                          <Flex
                            justifyContent={'space-between'}
                            gap={4}
                            alignItems={'center'}
                          >
                            <Avatar />
                            <Text fontSize={'xs'}>John Gupta</Text>
                          </Flex>
                        </Td>

                        <Td maxWidth={300}>
                          <Text noOfLines={5} wordBreak={'break-word'}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Quos perspiciatis quam placeat eligendi
                            numquam consectetur veritatis quaerat ex laudantium,
                            tenetur, at temporibus ad necessitatibus! Magnam
                            corporis illum optio quibusdam! Culpa.
                          </Text>
                        </Td>

                        <Td>Content</Td>
                        <Td maxWidth={300}>
                          <Text noOfLines={5}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Nobis, itaque esse delectus natus atque,
                            inventore reiciendis voluptate veniam, aperiam odit
                            facilis ipsam? Tenetur nam quas sit architecto!
                            Sunt, aut quis.
                          </Text>
                        </Td>
                        <Td>High</Td>
                        <Td>Impact</Td>
                        <Td>29.02.2023</Td>
                        <Td></Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </Flex>*/}
        </Flex>
      </Flex>
    );
  }
}

export default WidgetDrawer;
