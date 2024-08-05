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
  Textarea,
  Divider,
  CardFooter,
  color,
} from '@chakra-ui/react';
import React, { Component } from 'react';

import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaFileWord,
  FaPercentage,
  FaStickyNote,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import BenchmarkOWStat from './benchOverviewStat';

import CustomDateRangePicker from '../../utility/dateRangePicker';
import LocationDropDown from '../../utility/location';
import apiEndpoint from '../../config/data';

class BenchmarkOW extends Component {
  state = {};

  handleDate = (value) => {

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
          this.setState({ overview: data['overview'] })
        } else {
          alert('Session Expired!.')
          window.open('/')
        }
      }).catch(err => console.error(err))



  }


  componentDidMount = () => {
    fetch(apiEndpoint + '/api/benchmark_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          this.setState({ overview: data['overview'] })
        } else {
          window.open('/', "_self")
          alert('Session Expired!.')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Card width={'100%'}>
        <CardHeader height={{ base: '150px',sm:'100px', md: '70px', lg: '70px' }}>
          <Flex height="100%" direction={{ base: 'column',md:'row'}} gap={2}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <Icon as={FaPercentage} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
            <Flex gap={2} direction={{ base: 'column',sm:'row'}}>
            <Flex flex={1} width={'100%'}>
              <LocationDropDown locationValue={this.props.locationValue} setLocation={this.props.setLocation}/>
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker dateValue={this.props.handleDate} value={this.props.value} />
            </Flex>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Flex
            gap={4}
            justifyContent={'center'}
            width={'100%'}
            flexWrap={'wrap'}
          >
            <Flex flex={1}>
              <Flex width={'100%'}>
                <BenchmarkOWStat
                  header="Average Margins"
                  num={this.props.overview !== undefined ? this.props.overview.avg_cost + "%" : ""}
                  denom={this.props.overview !== undefined ? this.props.overview.avg_inc + "%" : ""}
                  numDesc="Cost"
                  denomDesc="Net Income"
                />
              </Flex>
            </Flex>
            <Flex flex={1}>
              <Flex width={'100%'}>
                <BenchmarkOWStat
                  header="Best in Class"
                  num={this.props.overview !== undefined ? this.props.overview.bic_cost + "%" : ""}
                  denom={this.props.overview !== undefined ? this.props.overview.bic_inc + "%" : ""}
                  numDesc="Cost"
                  denomDesc="Net Income"
                />
              </Flex>
            </Flex>
            <Flex flex={1}>
              <Flex width={'100%'}>
                <BenchmarkOWStat
                  header="Your Margins"
                  num={this.props.overview !== undefined ? this.props.overview.exp_rev + "%" : ""}
                  denom={this.props.overview !== undefined ? this.props.overview.inc_rev + "%" : ""}
                  numDesc="Cost"
                  denomDesc="Net Income"
                  footer=""
                  bgColor="#fae3a0"
                />
              </Flex>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default BenchmarkOW;
