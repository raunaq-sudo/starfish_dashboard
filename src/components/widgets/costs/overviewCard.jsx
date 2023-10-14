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

  handleDate = (value) => {
    console.log(value)
    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())

    var formData = new FormData()
    formData.append('fromDate', fromDate)
    formData.append('toDate', toDate)
    fetch('http://107.23.24.53:8000/api/overview_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ revenue: data['revenue'], cost: data['expense'], income: data['income'] })//, income: data['income'], cost: data['expense'] })
      }).catch(err => console.error(err))



  }

  componentDidMount = () => {

    fetch('http://107.23.24.53:8000/api/overview_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          this.setState({ revenue: data['revenue'], cost: data['expense'], income: data['income'] }, () => {
            console.log(this.state.revenue)
          })//, income: data['income'], cost: data['expense'] })

        } else {
          window.open("/", "_self")
          alert('Session Expired!.')
        }


      }).catch(err => console.error(err))





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
              <CustomDateRangePicker dateValue={this.handleDate} />
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
              {this.state.revenue.categories ? <Statistics header={'Revenue'} value={'$ ' + this.state.revenue.value}
                categories={this.state.revenue.categories}
                series={this.state.revenue.series}
                data={this.state.revenue.data}
              /> : <></>}

            </Flex>
            <Flex flex={1}>
              {this.state.cost.categories ? <Statistics
                header={'Cost'}
                value={'$ ' + this.state.cost.value}
                bgColor={'#fae3a0'}
                categories={this.state.cost.categories}
                series={this.state.cost.series}
                data={this.state.cost.data}

              /> : <></>}

            </Flex>
            <Flex flex={1}>
              {this.state.income.categories ? <Statistics header={'Net Income'} value={'$ ' + this.state.income.value}
                categories={this.state.income.categories}
                series={this.state.income.series}
                data={this.state.income.data}
              /> : <></>}

            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default Overview;
