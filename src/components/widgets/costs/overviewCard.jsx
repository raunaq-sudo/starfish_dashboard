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
  state = {};

  componentDidMount = () => {
    this.setState({ modeMobile: window.screen.width > 500 ? false : true });
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
              <LocationDropDown />
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker />
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
              <Statistics header={'Revenue'} value={'$ 233,555.00'} />
            </Flex>
            <Flex flex={1}>
              <Statistics
                header={'Cost'}
                value={'$ 100,555.00'}
                bgColor={'#fae3a0'}
              />
            </Flex>
            <Flex flex={1}>
              <Statistics header={'Net Income'} value={'$ 10,500.00'} />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default Overview;
