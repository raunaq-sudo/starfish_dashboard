import { Card, CardBody, CardHeader, Divider, Flex, Icon, Select, Button, Text,Table, Thead, Tbody, Tr, Th, Td, Box, Progress } from '@chakra-ui/react';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import TabChart from './dashboard/tabChart';
import TaskList from './dashboard/taskList';
import TabularCard from './dashboard/tabularCard';
import Overview from './costs/overviewCard';
import {
  FaArrowDown,
  FaArrowUp,
  FaThumbsDown,
  FaThumbsUp,
  FaUniversalAccess,
} from 'react-icons/fa';
import ProgressCharts from './budget/progressCharts';
import ColumnCharts from './budget/columnCharts';
import BenchmarkOW from './benchmark/benchmarkOverview';
import BenchmarkTable from './benchmark/benchmarkTable';
import TaskManager from './tasks/taskAdder';
import ReactApexChart from "react-apexcharts";
import SettingPage from './settings/settingsPage';

import 'rsuite/dist/rsuite.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import LocationDropDown from '../utility/location';
import HotglueConfig from '@hotglue/widget';
import '../widgets/drawer.css';
import UploadPage from './uploadData/uploadData';
import Profile from './profile/profileData';
import CustomDateRangePicker from '../utility/dateRangePicker';
import PLSummary from './costs/plSummary';
import apiEndpoint from '../config/data';
import ComparatorTable from './comparator/main';
import DateAnalysis from './comparator/dateAnalysis';

import { connect } from 'react-redux';

import {
  setPeriodFrom,
  setPeriodSelect,
  setPeriodTo,
} from '../../redux/slices/dateSlice';
import { setDataLoading } from '../../redux/slices/dataFetchSlice';
import AuthorisationSettings from './settings/settingsAuthorisation';
import SettingBudget from './settings/settingBudget';
import PLSummarySetting from './settings/plSumSetting';
import IntegrationSettingHook from './settings/settingsIntegrationsHook';
import DefineRoleSettings from './settings/defineRoleSetting';
import DefinePrivSettings from './settings/definePrivSetting';
import DefineExclusionSettings from './settings/defineExclusionSettings';
import DefineExclusionSettingsNew from './settings/defineExclusionSettingsNew';
import AIMonthSummary from './aiSummary/aiMonthSummary';
import AISummaryOneDemand from './aiSummary/aiSummary_ondemand';
import CorporateSummary from './corporate/corporateSummary';
import SettingBudgetDrillDown from './settings/settingBudgetDrillDown';
import { Input, Toggle } from 'rsuite';
import BudgetDashboard from './budgetDDDashboard/budgetDashboard';
import LocationBaseAISummary from './settings/locationBaseAISummary';

const Dashboard = (props) => {
  const [winsSortState, setWinsSortState] = React.useState(null);
  const [lossesSortState, setLossesSortState] = React.useState(null);
  const [showOnlyTenWins, setShowOnlyTenWins] = React.useState(true);
  const [showOnlyTenLosses, setShowOnlyTenLosses] = React.useState(true);

  const handleSortChange = (stateSetter, column) => {
    stateSetter((prevState) => ({
      column,
      direction: prevState?.column === column && prevState.direction === 'asc' ? 'desc' : 'asc',
    }));
  };
  console.log("Dashboard",props)

  return (
    <>
      <Flex
        gap={4}
        flexWrap={'wrap'}
        maxH={'100%'}
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        <Flex flex={{ base: 1, lg: 3 }}>
          <TabChart
            income={props.income }
            expense={props.expense }
            revenue={props.revenue }
            dateValue={props.dateValue}
            value={props.value}
            locationValue={props.locationValue}
            setLocation={props.setLocation}
          />
        </Flex>
        <Flex flex={{ lg: 1, xl: 2 }}>
          <TaskList />
        </Flex>
      </Flex>
      <Flex
        gap={4}
        justifyContent={'center'}
        flexWrap={'wrap'}
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Flex flex={1} width={{ base: '100%', lg: 'auto' }}>
          <TabularCard
            header="Wins"
            bgColor={'lightgreen'}
            icon={FaArrowDown}
            headerIcon={FaThumbsUp}
            data={props.wins || []}
            clickThru={props.clickThru}
            sortState={winsSortState}
            onSortChange={(column) => handleSortChange(setWinsSortState, column)}
            showOnlyTen={showOnlyTenWins}
            toggleShowOnlyTen={() => setShowOnlyTenWins((prev) => !prev)}
          />
        </Flex>
        <Flex flex={1} width={{ base: '100%', lg: 'auto' }}>
          <TabularCard
            header="Losses"
            bgColor={'#f79d97'}
            icon={FaArrowUp}
            headerIcon={FaThumbsDown}
            data={props.losses || []}
            clickThru={props.clickThru}
            sortState={lossesSortState}
            onSortChange={(column) => handleSortChange(setLossesSortState, column)}
            showOnlyTen={showOnlyTenLosses}
            toggleShowOnlyTen={() => setShowOnlyTenLosses((prev) => !prev)}
          />
        </Flex>
      </Flex>
    </>
  );
};


const Cost = props => {
  return (
    <>
      <Flex flex={1}>
        <Overview
          revenue={props.costRevenue}
          cost={props.cost}
          income={props.costIncome}
          handleDate={props.dateValue}
          value={props.value}
          locationValue={props.locationValue}
          setLocation={props.setLocation}
        />
      </Flex>
      <Flex justifyContent={'center'} flex={1}>
        <PLSummary
          pltable={props.pltableSum}
          columns={props.columnsSum}
          from_date={props.from_date}
          to_date={props.to_date}
          tableData={props.tableData}
          locationValue={props.locationValue}
          highlightDesc={props.highlightDesc}
        />
      </Flex>
    </>
  );
};

const Budget = (props) => {
  return (
    <>
      <Card width={'100%'}>
        <CardHeader height={{ base: '150px', sm: '100px', md: '70px', lg: '70px' }}>
        <Flex gap={2} height="100%" direction={{ base: 'column',sm:'row'}} justifyContent={{base:'space-between',sm:'space-around',md:'space-between'}}>
            <Flex gap={2} alignItems={'center'}>
              <Icon as={FaUniversalAccess} />
              <Text fontSize={'md'}>Period</Text>
            </Flex>
             <Flex gap={2} direction={{ base: 'column',sm:'column',md:'row'}} justifyContent={'center'} alignItems={'center'} >
              <Flex flex={1} minWidth={{base:'280px',sm: '280px', md: '250px'}} maxWidth={{base:'280px',sm: '280px', md: '250px'}}>
                <LocationDropDown
                  locationValue={props.location}
                  setLocation={props.handleLocationChange} 
                />
              </Flex>
              <Flex flex={1} fontSize={'sm'} width={'100%'} justifyContent={{base:'center',sm:'space-between',md:'space-between'}}>
                <CustomDateRangePicker
                  value={props.dateValue} 
                  dateValue={props.handleDateChange} 
                />
              </Flex>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Flex
            gap={4}
            flexDirection={window.screen.width > 768 ? 'row' : 'column'}
            width={'100%'}
            flex={1}
          >
            <Flex flex={1} width={'100%'} height={{ sm: '80%', md: 'auto' }} justifyContent={'center'}>
              <ProgressCharts
                header="Sales"
                achieved={props.achievedRevenue}
                target={props.targetRevenue}
              />
            </Flex>
            <Flex flex={1} width={'100%'} height={{ sm: '80%', md: 'auto' }} justifyContent={'center'}>
              <ProgressCharts
                header="Costs"
                achieved={props.achievedExpense}
                target={props.targetExpense}
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <Flex justifyContent={'center'} flex={1} minHeight={'400px'}>
        <ColumnCharts
          series={props.series}
          categories={props.categories}
          clickThru={props.clickThru}
        />
      </Flex>
    </>
  );
};


const Benchmark = props => {
  console.log('Benchmark');
  console.log(props.overview);
  return (
    <>
      <Flex>
        <BenchmarkOW
          overview={props.overview}
          handleDate={props.dateValue}
          value={props.value}
          locationValue={props.locationValue}
          setLocation={props.setLocation}
        />
      </Flex>

      <Flex>
        <BenchmarkTable
          table={props.table}
          clickThru={props.clickThru}
          callTable={props.callTable}
        />
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
    analysisLocation: [undefined],
    wlData: {
      wins: [],
      losses: [],
    },
    plTableExcel: [],
    revenue: [
      {
        data: [],
        series: [],
        categories: [],
      },
    ],
    expense: [
      {
        data: [0],
        series: [0],
        categories: [0],
      },
    ],
    income: [
      {
        data: [0],
        series: [0],
        categories: [0],
      },
    ],
    costRevenue: { value: 0 },
    costIncome: { value: 0 },
    cost: { value: 0 },
    pltable: [],
    pltableSum: [],
    dashboardLocation:"",
    defaultbenckmarkValue:this.props.defaultDateValue, 
    dashboardDate:this.props.defaultDateValue, 
    costDate:this.props.defaultDateValue, 
    defaultCostValue:this.props.defaultDateValue, 
    budgetDate:this.props.defaultDateValue, 
    benchmarkDate:this.props.defaultDateValue,
    corporateDate:this.props.defaultDateValue,
    selectedCountry: null, // To store selected country
    corporateData: {}, // Corporate data state
  };

  calenderPropsDateConverter = (value) =>{
    const val = []
    if (value!==undefined){value.map((item)=>{
      val.push(new Date(new Date(item).toString()))
    })}
    console.log(value)
    console.log(val)
    return val
  }  
  
  handleBudgetDate = value => {
    var fromDate =
      (value[0].getMonth() > 8
        ? value[0].getMonth() + 1
        : '0' + (value[0].getMonth() + 1)) +
      '-' +
      (value[0].getDate() > 9 ? value[0].getDate() : '0' + value[0].getDate()) +
      '-' +
      value[0].getFullYear();
    var toDate =
      (value[1].getMonth() > 8
        ? value[1].getMonth() + 1
        : '0' + (value[1].getMonth() + 1)) +
      '-' +
      (value[1].getDate() > 9 ? value[1].getDate() : '0' + value[1].getDate()) +
      '-' +
      value[1].getFullYear();

    var formData = new FormData();
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    fetch(apiEndpoint + '/api/overview_data/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const budget = data['budget_bar'];

        const budgetSeries = [
          {
            name: data['budget_bar']['series'][0],
            data: data['budget_bar']['data'][0]['total'][0],
          },
          {
            name: data['budget_bar']['series'][1],
            data: data['budget_bar']['data'][0]['target'][0],
          },
        ];

        const budgetCategories = data['budget_bar']['categories'];
        this.setState({
          budget: budget,
          budgetSeries: budgetSeries,
          budgetCategories: budgetCategories,
        });
        this.setState({
          revenue: data['revenue'],
          expense: data['expense'],
          income: data['income'],
        }); //, income: data['income'], cost: data['expense'] })
        const wlData = data['wlData'];
        this.setState({ wlData: wlData });
        this.setState({ defaultDashValue: value });
      })
      .catch(err => console.error(err));
  };

  // Handler for updating location
  handleLocationChange = (value) => {
    this.setState(
      {
        dashboardLocation: value,
        costLocation: value,
        benchmarkLocation: value,
        budgetLocation: value,
      },
      () => {
        this.handleAll();
      }
    );
  };
  // Handler for updating date range
  handleDateChange = () => {
    this.setState(
      {
        defaultbenckmarkValue: this.props.defaultDateValue,
        dashboardDate: this.props.defaultDateValue,
        costDate: this.props.defaultDateValue,
        defaultCostValue: this.props.defaultDateValue,
        budgetDate: this.props.defaultDateValue,
        benchmarkDate: this.props.defaultDateValue,
      },
      () => {
        this.handleAll();
      }
    );
  };

  handleBenchmarkDate = value => {
    var fromDate =
      (value[0].getMonth() > 8
        ? value[0].getMonth() + 1
        : '0' + (value[0].getMonth() + 1)) +
      '-' +
      (value[0].getDate() > 9 ? value[0].getDate() : '0' + value[0].getDate()) +
      '-' +
      value[0].getFullYear();
    var toDate =
      (value[1].getMonth() > 8
        ? value[1].getMonth() + 1
        : '0' + (value[1].getMonth() + 1)) +
      '-' +
      (value[1].getDate() > 9 ? value[1].getDate() : '0' + value[1].getDate()) +
      '-' +
      value[1].getFullYear();

    var formData = new FormData();
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    fetch(apiEndpoint + '/api/benchmark_data/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.code === undefined) {
          this.setState({
            benchmarkDataTable: data['table'],
            benchmarkOverview: data['overview'],
            defaultbenckmarkValue: value,
          });
        } else {
          alert('Session Expired!.');
          window.open('/');
        }
      })
      .catch(err => console.error(err));
  };

  handleCostsDate = value => {
    var fromDate =
      (value[0].getMonth() > 8
        ? value[0].getMonth() + 1
        : '0' + (value[0].getMonth() + 1)) +
      '-' +
      (value[0].getDate() > 9 ? value[0].getDate() : '0' + value[0].getDate()) +
      '-' +
      value[0].getFullYear();
    var toDate =
      (value[1].getMonth() > 8
        ? value[1].getMonth() + 1
        : '0' + (value[1].getMonth() + 1)) +
      '-' +
      (value[1].getDate() > 9 ? value[1].getDate() : '0' + value[1].getDate()) +
      '-' +
      value[1].getFullYear();
    this.setState({ costsFromDate: fromDate, costsToDate: toDate });
    var formDataCostSum = new FormData();
    formDataCostSum.append('screen', 1);
    formDataCostSum.append('log', '');
    formDataCostSum.append('type', 'summary');
    formDataCostSum.append('fromDate', fromDate);
    formDataCostSum.append('toDate', toDate);
    fetch(apiEndpoint + '/api/pltable/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formDataCostSum,
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ pltableSum: data['data'] });
        console.log('pltable' + data);
        this.setState({ columnsSum: data['columns'] });
        this.setState({ plTableExcel: data['table'] });
      })
      .catch(err => console.error(err));

    //////////////////////////////////////

    var formData = new FormData();
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    fetch(apiEndpoint + '/api/overview_data/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          costRevenue: data['revenue'],
          cost: data['expense'],
          costIncome: data['income'],
        }); //, income: data['income'], cost: data['expense'] })        const wlData = data['wlData'
        this.setState({ defaultCostValue: value });
      })
      .catch(err => console.error(err));
  };

  handleOverview = async screen => {
    var flag = false;
    if (screen === 'all') {
      flag = false;
    } else {
      this.setState(
        {
          revenue: [
            {
              data: [],
              series: [],
              categories: [],
            },
          ],
          expense: [
            {
              data: [],
              series: [],
              categories: [],
            },
          ],
          income: [
            {
              data: [],
              series: [],
              categories: [],
            },
          ],
          costRevenue: { value: 0 },
          costIncome: { value: 0 },
          cost: { value: 0 }, 
        },)
      var value = this.props.defaultDateValue!==undefined?this.calenderPropsDateConverter(this.props.defaultDateValue):undefined;
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

      var location = this.state[screen + 'Location'];
      location = location === undefined ? '' : location;
      console.log(location);
      flag = true;
    }

    var formData = new FormData();
    // if (flag) {
    // }

    if (this.props.periodSelect  && this.props.periodSwitcher) {
      formData.append('periodFrom', this.props.periodFrom);
      formData.append('periodTo', this.props.periodTo);
      console.log('periodFrom', this.props.periodSelect);
      console.log('periodTo', this.props.periodSwitcher);
    } else {
      formData.append('fromDate', fromDate);
      formData.append('toDate', toDate);
      console.log('fromDate ' +  fromDate);
      console.log('toDate ' +  toDate);

    }

    formData.append('location', location);


    await fetch(apiEndpoint + '/api/overview_data/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ overviewData: response }, () => {
          this.saveOverviewData(this.state.overviewData, screen);
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ overviewData: [0] });
      });
  };

  saveOverviewData = async (data, screen) => {
    if (data !== undefined) {
      if (screen === 'dashboard' || screen === 'all') {
        this.setState(
          {
            revenue: data['revenue'],
            expense: data['expense'],
            income: data['income'],
          },
          () => {
            console.log(this.state.expense);
          }
        );
        const wlData = data['wlData'];
        this.setState({ wlData: wlData });
      }

      //// cost overview
      if (screen === 'cost' || screen === 'all') {
        this.setState({
          costRevenue: data['revenue'],
          cost: data['expense'],
          costIncome: data['income'],
        }); //, income: data['income'], cost: data['expense'] })
      }
    }
  };

  handleBenchmark = async () => {
    var value = this.props.defaultDateValue!==undefined?this.calenderPropsDateConverter(this.props.defaultDateValue):undefined;
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
    var location = this.state.benchmarkLocation;
    location = location === undefined ? '' : location;

    var formData = new FormData();
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    formData.append('location', location);

    if (this.props.periodSelect  && this.props.periodSwitcher) {
      formData.append('periodFrom', this.props.periodFrom);
      formData.append('periodTo', this.props.periodTo);
    }

    await fetch(apiEndpoint + '/api/benchmark_data/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.code === undefined) {
          this.setState({
            benchmarkDataTable: data['table'],
            benchmarkOverview: data['overview'],
          });
        } else {
          window.open('/', '_self');
          alert('Session Expired!.');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleBudget = async () => {
    var value = this.props.defaultDateValue!==undefined?this.calenderPropsDateConverter(this.props.defaultDateValue):undefined
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

    var location = this.state.budgetLocation;
    location = location === undefined ? '' : location;
    console.log('Budget ' + location);
    var formData = new FormData();
    
    if (this.props.periodSelect  && this.props.periodSwitcher) {
      formData.append('periodFrom', this.props.periodFrom);
      formData.append('periodTo', this.props.periodTo);
    }else{
      formData.append('fromDate', fromDate);
      formData.append('toDate', toDate);

    }
    formData.append('location', location);


    await fetch(apiEndpoint + '/api/budget_data/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === undefined) {
          const budget = data;
          const budgetSeries = [
            {
              name: data['series'][0],
              data: data['data'][0]['total'][0],
            },
            {
              name: data['series'][1],
              data: data['data'][0]['target'][0],
            },
          ];

          const budgetCategories = data['categories'];
          const achievedExpense =
            data['achieved_expense']['actual_expense'][0] === null
              ? 0
              : Number(data['achieved_expense']['actual_expense'][0]);
          const achievedRevenue =
            data['achieved_revenue']['actual_revenue'][0] === null
              ? 0
              : Number(data['achieved_revenue']['actual_revenue'][0]);
          this.setState({
            budget: budget,
            budgetSeries: budgetSeries,
            budgetCategories: budgetCategories,
            budgetTargetExpense:
              Math.round(
                (Number(data['target_expense']['budget_expense'][0]) -
                  achievedExpense) *
                  100
              ) / 100,
            budgetTargetRevenue:
              Math.round(
                (Number(data['target_revenue']['budget_revenue'][0]) -
                  achievedRevenue) *
                  100
              ) / 100,
            budgetAchievedExpense: achievedExpense,
            budgetAchievedRevenue: achievedRevenue,
          });

          //this.setState({ benchmarkDataTable: data['table'], benchmarkOverview: data['overview'] })
        } else {
          window.open('/', '_self');
          alert('Session Expired!.');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCorporate = async (countryId) => {
    const { selectedCountry } = this.state;

    var value = this.props.defaultDateValue !== undefined 
      ? this.calenderPropsDateConverter(this.props.defaultDateValue) 
      : undefined;
  
    var fromDate =
      value !== undefined
        ? (value[0].getMonth() > 8 ? value[0].getMonth() + 1 : '0' + (value[0].getMonth() + 1)) +
          '-' +
          (value[0].getDate() > 9 ? value[0].getDate() : '0' + value[0].getDate()) +
          '-' +
          value[0].getFullYear()
        : '';
    var toDate =
      value !== undefined
        ? (value[1].getMonth() > 8 ? value[1].getMonth() + 1 : '0' + (value[1].getMonth() + 1)) +
          '-' +
          (value[1].getDate() > 9 ? value[1].getDate() : '0' + value[1].getDate()) +
          '-' +
          value[1].getFullYear()
        : '';
    var formData = new FormData();
  
    if (this.props.periodSelect && this.props.periodSwitcher) {
      formData.append('periodFrom', this.props.periodFrom);
      formData.append('periodTo', this.props.periodTo);
    } else {
      formData.append('fromDate', fromDate);
      formData.append('toDate', toDate);
    }
    formData.append('country_id', countryId || selectedCountry || "GB");
  
    await fetch(apiEndpoint + '/api/corporate_summary/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === undefined) {
          const corporateData = data;
          this.setState({
            corporateData: corporateData,
          });
        } else {
          window.open('/', '_self');
          alert('Session Expired!.');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  handleCountryChange = (event) => {
    this.setState({ selectedCountry: event.target.value });
  };

  handleViewButton = (countryId) =>{
    this.setState({ selectedCountry:countryId });
    this.handleCorporate(countryId);
  }
  
  handleProfitLoss = async () => {
    var value = this.props.defaultDateValue!==undefined?this.calenderPropsDateConverter(this.props.defaultDateValue):undefined;
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

    this.setState({ costsToDate: toDate, costsFromDate: fromDate });

    var location = this.state.costLocation;
    location = location === undefined ? '' : location;

    var formDataCostSum = new FormData();
    formDataCostSum.append('screen', 1);
    formDataCostSum.append('log', '');
    formDataCostSum.append('type', 'summary');
    formDataCostSum.append('location', location);
    formDataCostSum.append('fromDate', fromDate);
    formDataCostSum.append('toDate', toDate);
    if (this.props.periodSelect  && this.props.periodSwitcher) {
      formDataCostSum.append('periodFrom', this.props.periodFrom);
      formDataCostSum.append('periodTo', this.props.periodTo);
    }

    fetch(apiEndpoint + '/api/pltable/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formDataCostSum,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ pltableSum: data['data'] });
        this.setState({ plTableExcel: data['table'] });
        this.setState({ columnsSum: data['columns'] });
      })
      .catch(err => console.error(err));
  };

  handleAll =  async () => {
    this.props.setDataLoading(true);
    await this.handleBudget();
    await this.handleBenchmark();
    await this.handleProfitLoss();
    await this.handleOverview('dashboard');
    await this.handleOverview('cost');
    this.props.setDataLoading(false)
  };

  componentDidMount = async () => {
    this.props.setDataLoading(true);
    this.setState({ modeMobile: window.screen.width > 500 ? false : true });
    window.screen.width > 500
      ? this.setState({ w: 300 })
      : this.setState({ w: '100%' });
    // if (this.props.periodSelect  && this.props.periodSwitcher) {
      setTimeout(async () => {
        await this.handleOverview('all');
        ////////////////Benchmark data ////////////////////
        await this.handleBenchmark();
        //////////// Budget page ////////////////
        await this.handleBudget();
        ///// PL Summary
        await this.handleProfitLoss();
        this.props.setDataLoading(false);
        ///// Corporate Summary
        // await this.handleCorporate();
      }, 3000);
  };

  componentDidUpdate(prevProps) {
    // If the view changes to corporateOverview, call handleCorporate
    if (this.props.view === 'corporateOverview' && prevProps.view !== 'corporateOverview') {
      this.handleCorporate();
    }
  }
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
            <Flex>
              {window.screen.width > 500 ? (
                <Flex justifyContents={'center'} flex={1}></Flex>
              ) : (
                <></>
              )}
              </Flex>
          {/*end of filter bar*/}
          {this.props.view === 'dashboard' ? (
            <Dashboard
              wins={this.state.wlData['wins']}
              losses={this.state.wlData['losses']}
              income={this.state.income}
              expense={this.state.expense}
              revenue={this.state.revenue}
              clickThru={this.props.clickThru}
              setLocation={value => {
                this.setState(
                  {
                    dashboardLocation: value,
                    costLocation: value,
                    benchmarkLocation: value,
                    budgetLocation: value,
                  },
                  () => {
                    this.handleAll();
                  }
                );
              }}
              dateValue={value => {
                this.setState(
                  {
                    defaultbenckmarkValue: this.props.defaultDateValue,
                    dashboardDate: this.props.defaultDateValue,
                    costDate: this.props.defaultDateValue,
                    defaultCostValue: this.props.defaultDateValue,
                    budgetDate: this.props.defaultDateValue,
                    benchmarkDate: this.props.defaultDateValue,
                  },
                  () => {
                    this.handleAll();
                  }
                );
              }}
              value={this.state.dashboardDate}
              locationValue={this.state.dashboardLocation}
            />
          ) : this.props.view === 'cost' ? (
            <Cost
              pltable={this.state.pltable}
              columns={this.state.columns}
              pltableSum={this.state.pltableSum}
              columnsSum={this.state.columnsSum}
              costRevenue={this.state.costRevenue}
              highlightDesc={this.props.highlightDesc}
              cost={this.state.cost}
              costIncome={this.state.costIncome}
              dateValue={value => {
                this.setState(
                  {
                    defaultbenckmarkValue: this.props.defaultDateValue,
                    dashboardDate: this.props.defaultDateValue,
                    costDate: this.props.defaultDateValue,
                    defaultCostValue: this.props.defaultDateValue,
                    budgetDate: this.props.defaultDateValue,
                    benchmarkDate: this.props.defaultDateValue,
                  },
                  () => {
                    this.handleAll();
                  }
                );
              }}
              value={this.state.defaultCostValue}
              from_date={this.state.costsFromDate}
              to_date={this.state.costsToDate}
              tableData={this.state.plTableExcel}
              setLocation={value => {
                console.log('Date Props ' + this.props.defaultDateValue)
                this.setState(
                  {
                    dashboardLocation: value,
                    costLocation: value,
                    benchmarkLocation: value,
                    budgetLocation: value,
                  },
                  () => {
                    this.handleAll();
                  }
                );
              }}
              locationValue={this.state.costLocation}
            />
          ) : this.props.view === 'benchmark' ? (
            <Benchmark
              table={this.state.benchmarkDataTable}
              overview={this.state.benchmarkOverview}
              clickThru={this.props.clickThru}
              dateValue={value => {
                this.setState(
                  {
                    defaultbenckmarkValue: this.props.defaultDateValue,
                    dashboardDate: this.props.defaultDateValue,
                    costDate: this.props.defaultDateValue,
                    defaultCostValue: this.props.defaultDateValue,
                    budgetDate: this.props.defaultDateValue,
                    benchmarkDate: this.props.defaultDateValue,
                  },
                  () => {
                    this.handleAll();
                  }
                );
              }}
              value={this.state.defaultbenckmarkValue}
              setLocation={value => {
                this.setState(
                  {
                    dashboardLocation: value,
                    costLocation: value,
                    benchmarkLocation: value,
                    budgetLocation: value,
                  },
                  () => {
                    this.handleAll();
                  }
                );
              }}
              locationValue={this.state.benchmarkLocation}
              callTable={() => {
                this.handleBenchmark();
              }}
            />
          ) : this.props.view === 'budget' ? (  
              <Budget
                series={this.state.budgetSeries}
                categories={this.state.budgetCategories}
                targetRevenue={this.state.budgetTargetRevenue}
                targetExpense={this.state.budgetTargetExpense}
                achievedRevenue={this.state.budgetAchievedRevenue}
                achievedExpense={this.state.budgetAchievedExpense}
                clickThru={this.props.clickThru}
                handleLocationChange={this.handleLocationChange}
                handleDateChange={this.handleDateChange}
                location={this.state.budgetLocation}
                dateValue={this.state.dashboardDate} 
              />
          ) : 
          this.props.view === 'budgetDashboard' ? (  
            <BudgetDashboard
              series={this.state.budgetSeries}
              categories={this.state.budgetCategories}
              targetRevenue={this.state.budgetTargetRevenue}
              targetExpense={this.state.budgetTargetExpense}
              achievedRevenue={this.state.budgetAchievedRevenue}
              achievedExpense={this.state.budgetAchievedExpense}
              clickThru={this.props.clickThru}
              handleLocationChange={this.handleLocationChange}
              handleDateChange={this.handleDateChange}
              location={this.state.budgetLocation}
              dateValue={this.state.dashboardDate} 
            />
        ) : this.props.view === 'task' ? (
            <TaskPage />
          ) : this.props.view === 'setting' ? (
            <SettingPage />
          ) : this.props.view === 'UploadData' ? (
            <UploadPage />
          ) : this.props.view === 'Profile' ? (
            <Profile />
          ) : this.props.view === 'excelDat' ? (
            <UploadPage />
          ) : this.props.view === 'locationAnalysis' ? (
            <ComparatorTable
              setLocation={value => {
                this.setState({
                  analysisLocation: value,
                });
              }}
              locationValue={this.state.analysisLocation}
            />
          ) : this.props.view === 'dateAnalysis' ? (
            <DateAnalysis
              setLocation={value => {
                this.setState({
                  analysisLocation: value,
                });
              }}
              locationValue={this.state.analysisLocation}
            />
          ) : this.props.view === 'manageUsers' ? (
            <AuthorisationSettings 
             title= {this.props.visibleScreen}
            />
          ) : this.props.view === 'integrationSettings' ? (
            <HotglueConfig
              config={{
                apiKey: 'ADzuNsm18h2ESxN1t8qSZ7Ks2eIqr2Gm4zTAdsGa',
                envId: 'prod.hotglue.usestarfish.com', //changed to prod from dev
              }}
            >
              <IntegrationSettingHook />
            </HotglueConfig>
          ) : this.props.view === 'budgetUpdate' ? (
            <SettingBudget />
          ) : this.props.view === 'budgetUpdateDD' ? (
            <SettingBudgetDrillDown />
          ): this.props.view === 'accountAlias' ? (
            <PLSummarySetting 
             title = {this.props?.title}
            />
          ) : this.props.view === 'roleSetting' ? (
            <DefineRoleSettings />
          ) : this.props.view === 'privilegeSettings' ? (
            <DefinePrivSettings 
            title={this.props?.visibleScreen}
            />
          ) : this.props.view === 'exclusionSettings' ? (
            <DefineExclusionSettings />
          ) : this.props.view === 'exclusionSettingsNew' ? (
            <DefineExclusionSettingsNew />
          ) : this.props.view === 'aiSummary' ? (
            <AIMonthSummary />
          ) : this.props.view === 'aiSummaryOD' ? (
            <AISummaryOneDemand />
          ) :  this.props.view === 'corporateOverview' ? (
            <CorporateSummary
            drillingData={this.state.corporateData}
            selectedCountry={this.state.selectedCountry}
            apiEndpoint={apiEndpoint} // Pass API endpoint as a prop
            dateValue={(value) => {
              this.setState(
                {
                  corporateDate: this.props.defaultDateValue,
                },
                () => {
                  this.handleCorporate(); // Call to refresh data on date change
                }
              );
            }}
            value={this.state?.corporateDate}
            handleViewButton= {this.handleViewButton}
          />
          ) :  this.props.view === 'locationAiMapping' ? (
            <LocationBaseAISummary  />
          ): (
            <></>
          )}

          
        </Flex>
      </Flex>
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
      periodSwitcher: state.dateFormat.periodSwitcher,
      defaultDateValue: state.dateFormat.defaultDateValue

  }
}

const mapDispatchToProps = {
  setPeriodFrom,
  setPeriodTo,
  setPeriodSelect,
  setDataLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetDrawer);

