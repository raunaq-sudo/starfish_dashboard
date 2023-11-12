import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaSearchDollar } from 'react-icons/fa';

import { DateRangePicker } from 'rsuite';
import LocationDropDown from '../../utility/location';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import ChartRenderCol from './chartRenderColumns';

class ColumnCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <Card width={'100%'} height={this.props.categories ? this.props.categories.length * 30 : 200}>
        <CardHeader>
          <Flex gap={2}>
            <Flex gap={4} alignItems={'center'} flex={1}>
              <Icon as={FaSearchDollar} />
              <Text fontSize={'md'}>Spending to Budget</Text>
            </Flex>

          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody justifyContent={'center'} width={'100%'} height={'100%'}>
          {this.props.categories ? <ChartRenderCol series={this.props.series} categories={this.props.categories} /> : <></>}
        </CardBody>
      </Card>
    );
  }
}

export default ColumnCharts;
