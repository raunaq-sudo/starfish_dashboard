import React, { Component } from 'react';
import Statistics from './statistics';
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Divider,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FaChartBar } from 'react-icons/fa';
import LocationDropDown from '../../utility/location';
import { DateRangePicker } from 'rsuite';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import {connect} from 'react-redux'

class Overview extends Component {
  state = {
    revenue: {},
    income: {},
    cost: {}
  };


  componentDidMount = () => {
  };

  render() {
    return (
      <Card width={'100%'}>
        <CardHeader height={{ base: '150px', sm: '100px', md: '70px', lg: '70px' }}>
        <Flex gap={2} height="100%" direction={{ base: 'column',sm:'row'}} justifyContent={{base:'space-between',sm:'space-around',md:'space-between'}}>
            <Flex gap={2} alignItems={'center'}>
              <Icon as={FaChartBar} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
            <Flex gap={2} direction={{ base: 'column',sm:'column',md:'row'}} justifyContent={'center'} alignItems={'center'} >
            <Flex flex={1} minWidth={{base:'280px',sm: '280px', md: '250px'}} maxWidth={{base:'280px',sm: '280px', md: '250px'}}>
                <LocationDropDown locationValue={this.props.locationValue} setLocation={this.props.setLocation}/>
              </Flex>
              <Flex flex={1} fontSize={'sm'} width={'100%'} justifyContent={{base:'center',sm:'space-between',md:'space-between'}}>
                <CustomDateRangePicker dateValue={this.props.handleDate} value={this.props.value} />
              </Flex>
            </Flex>
          </Flex>

        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Flex
            gap={1}
            justifyContent={'center'}
            flexDirection={window.screen.width > 800 ? 'row' : 'column'}
          >
            <Flex flex={1}>
              {this.props.revenue ? <Statistics header={'Revenue'} value={this.props.chartCurrency + ' ' + this.props.revenue.value}
                categories={this.props.revenue.categories}
                series={this.props.revenue.series}
                data={this.props.revenue.data}
                id="Revenue"
              /> : <></>}

            </Flex>
            <Flex flex={1}>
              {this.props.cost ? <Statistics
                header={'Cost'}
                value={this.props.chartCurrency + ' ' + this.props.cost.value}
                bgColor={'#fae3a0'}
                categories={this.props.cost.categories}
                series={this.props.cost.series}
                data={this.props.cost.data}
                id="Cost"
              /> : <></>}

            </Flex>
            <Flex flex={1}>
              {this.props.income ? <Statistics header={'Net Income'} value={this.props.chartCurrency + ' ' + this.props.income.value}
                categories={this.props.income.categories}
                series={this.props.income.series}
                data={this.props.income.data}
                id="Net-Income"
              /> : <></>}

            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartCurrency: state.locationSelectFormat.currency
  }
}

export default connect(mapStateToProps)(Overview);
