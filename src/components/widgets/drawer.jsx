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
          <TabChart income={props.income} expense={props.expense} revenue={props.revenue} dateValue={props.dateValue} value={props.value} />
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
        <Overview revenue={props.costRevenue} cost={props.cost} income={props.costIncome} handleDate={props.dateValue} value={props.value} />
      </Flex>
      <Flex justifyContent={'center'} flex={1}>
        <PLSummary pltable={props.pltableSum} columns={props.columnsSum} from_date={props.from_date} to_date={props.to_date} />
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
      >
        <Flex flex={1} width={'100%'} justifyContent={'center'}>
          <ProgressCharts header="Period Sales" />
        </Flex>
        <Flex flex={1} width={'100%'} justifyContent={'center'}>
          <ProgressCharts header="Period Costs" />
        </Flex>
      </Flex>
      <Flex justifyContent={'center'}>
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
        <BenchmarkOW overview={props.overview} handleDate={props.dateValue} value={props.value} />
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

    revenue: [],
    expense: [
      {
        data: [],
        series: [],
        categories: []
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
    pltableSum: []
  };

  handleDate = (value) => {
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
        //const budget = data['budget_bar']
        //
        //const budgetSeries = [{
        //  name: data['budget_bar']['series'][0],
        //  data: data['budget_bar']['data'][0]['total'][0],
        //},
        //{
        //  name: data['budget_bar']['series'][1],
        //  data: data['budget_bar']['data'][0]['target'][0],
        //}]
        //
        //const budgetCategories = data['budget_bar']['categories']
        //this.setState({ budget: budget, budgetSeries: budgetSeries, budgetCategories: budgetCategories })
        this.setState({ revenue: data['revenue'], expense: data['expense'], income: data['income'] })//, income: data['income'], cost: data['expense'] })
        const wlData = data['wlData']
        this.setState({ wlData: wlData })
        this.setState({ defaultDashValue: value })
      }).catch(err => console.error(err))
  }

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


  componentDidMount = () => {
    this.setState({ modeMobile: window.screen.width > 500 ? false : true });
    window.screen.width > 500 ? this.setState({ w: 300 }) : this.setState({ w: "100%" })
    var formData = new FormData()

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
        this.setState({ costRevenue: data['revenue'], cost: data['expense'], costIncome: data['income'] })//, income: data['income'], cost: data['expense'] })

        const wlData = data['wlData']
        this.setState({ wlData: wlData })
      }).catch(err => console.error(err))

    ////////////////Benchmark data ////////////////////

    fetch(apiEndpoint + '/api/benchmark_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },

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


    /////////PL Code
    // var formDataCost = new FormData();
    // formDataCost.append('screen', 1);
    // formDataCost.append('log', '');
    //
    // formDataCost.append('type', '')
    // fetch(apiEndpoint + '/api/pltable/', {
    //   method: 'POST',
    //   headers: { "Authorization": "Bearer " + localStorage['access'] },
    //   body: formDataCost
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     this.setState({ pltable: data['data'] })
    //
    //     this.setState({ columns: data['columns'] })
    //
    //   }).catch(err => console.error(err))


    ///// PL Summary 
    var formDataCostSum = new FormData();
    formDataCostSum.append('screen', 1);
    formDataCostSum.append('log', '');
    formDataCostSum.append('type', 'summary')
    fetch(apiEndpoint + '/api/pltable/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formDataCostSum
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ pltableSum: data['data'] })

        this.setState({ columnsSum: data['columns'] })

      }).catch(err => console.error(err))

  };

  render() {
    return (
      <Flex bgColor={'whitesmoke'} mt={7} width={'100%'} height={window.innerHeight}>
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
                  <LocationDropDown />
                </Flex>
                <Flex flex={1} fontSize={'sm'} width={'100%'}>
                  <CustomDateRangePicker dateValue={this.handleBudgetDate}
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
              dateValue={this.handleDate} value={this.state.defaultDashValue} />
          ) : this.props.view === 'Cost' ? (
            <Cost pltable={this.state.pltable}
              columns={this.state.columns}
              pltableSum={this.state.pltableSum}
              columnsSum={this.state.columnsSum}
              costRevenue={this.state.costRevenue}
              cost={this.state.cost}
              costIncome={this.state.costIncome}
              dateValue={this.handleCostsDate}
              value={this.state.defaultCostValue}
              from_date={this.state.costsFromDate}
              to_date={this.state.costsToDate}
            />
          ) : this.props.view === 'Benchmark' ? (
            <Benchmark table={this.state.benchmarkDataTable}
              overview={this.state.benchmarkOverview}
              dateValue={this.handleBenchmarkDate}
              value={this.state.defaultbenckmarkValue}
            />
          ) : this.props.view === 'Budget' ? (
            <Budget series={this.state.budgetSeries} categories={this.state.budgetCategories} />
          ) : this.props.view === 'Task' ? (
            <TaskPage />
          ) : this.props.view === 'Setting' ? (
            <SettingPage />
          ) : this.props.view === 'UploadData' ? (
            <UploadPage />
          ) : this.props.view === 'Profile' ? (
            <Profile />
          ) : (<></>)}

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
