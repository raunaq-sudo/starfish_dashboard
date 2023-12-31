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
        <CardHeader>
          <Flex gap={2}>
            <Flex gap={2} alignItems={'center'} flex={1}>
              <Icon as={FaChartBar} />
              <Text fontSize={'md'}>Overview</Text>
            </Flex>
            <Flex flex={1}>
              <LocationDropDown locationValue={this.props.locationValue} setLocation={this.props.setLocation}/>
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker dateValue={this.props.handleDate} value={this.props.value} />
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
              {this.props.revenue ? <Statistics header={'Revenue'} value={'$ ' + this.props.revenue.value}
                categories={this.props.revenue.categories}
                series={this.props.revenue.series}
                data={this.props.revenue.data}
              /> : <></>}

            </Flex>
            <Flex flex={1}>
              {this.props.cost ? <Statistics
                header={'Cost'}
                value={'$ ' + this.props.cost.value}
                bgColor={'#fae3a0'}
                categories={this.props.cost.categories}
                series={this.props.cost.series}
                data={this.props.cost.data}

              /> : <></>}

            </Flex>
            <Flex flex={1}>
              {this.props.income ? <Statistics header={'Net Income'} value={'$ ' + this.props.income.value}
                categories={this.props.income.categories}
                series={this.props.income.series}
                data={this.props.income.data}
              /> : <></>}

            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default Overview;
