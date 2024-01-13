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
  Button,
  Link,
} from '@chakra-ui/react';
import React, { Component } from 'react';

import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaDownload,
  FaFileWord,
  FaPercentage,
  FaStickyNote,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import apiEndpoint from '../../config/data';

class BenchmarkTable extends Component {
  state = {};



  componentDidMount = () => {
    fetch(apiEndpoint + '/api/benchmark_data/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.code === undefined) {
          this.setState({ data: data['table'] })
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
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaStickyNote}></Icon>
              <Text fontSize={'md'}>Benchmark</Text>
            </Flex>
            <Flex flex={1} justifyContent={'flex-end'}>
              {/*<Icon as={FaDownload} />*/}
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody overflowX={'scroll'}>
          <Table fontSize={'sm'} variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Category</Th>

                <Th>Average Business</Th>
                <Th>Best in Class</Th>
                <Th>Your Business</Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.props.table ? (this.props.table.map((dat) => (
                <Tr>
                  <Td><Button variant="ghost"  justifyContent={'left'}  width={'100%'} as={Link} size={'xs'} onClick={()=>{this.props.clickThru('Cost', dat.expense_head)}}>
                      <Text isTruncated >{dat.expense_head}</Text></Button></Td>

                  <Td>{dat.avg_in_class}</Td>
                  <Td>{dat.best_in_class}</Td>
                  <Td>{dat.metric + "%"}</Td>
                </Tr>
              ))) : (<></>)}



            </Tbody>
          </Table>
        </CardBody>
      </Card >
    );
  }
}

export default BenchmarkTable;
