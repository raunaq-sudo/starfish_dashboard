import React, { Component } from 'react';
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

  Thead,
  Tr,
  Th,
  Icon,
  Tbody,
  Td,
  TableContainer,
  Divider,
} from '@chakra-ui/react';
import {
  FaArrowDown,
  FaArrowUp,
  FaCashRegister,
  FaDollarSign,
  FaDownload,
  FaList,
  FaPercentage,
} from 'react-icons/fa';

import "rsuite/dist/rsuite.css"
import { Table } from 'rsuite';



class PLCard extends Component {

  state = {
    isTree: true,
    pl: [
      {
        category: 'Total Sales',
        glCode: 123,
        amount: 251,
        amountPer: 25,
        changeDollar: 1000,
        changePer: 20,
      },
      {
        category: 'Total COGS',
        glCode: 123,
        amount: 251,
        amountPer: 25,
        changeDollar: 1000,
        changePer: 20,
      },
      {
        category: 'Gross Profit',
        glCode: 123,
        amount: 251,
        amountPer: 25,
        changeDollar: -1000,
        changePer: -45,
      },
      {
        category: 'Total Expenses',
        glCode: 123,
        amount: 251,
        amountPer: 25,
        changeDollar: 1000,
        changePer: 20,
      },

      {
        category: 'Corporate Contributions',
        glCode: 123,
        amount: 251,
        amountPer: 25,
        changeDollar: 1000,
        changePer: 20,
      },
    ],
    pltable: [],
    test: [





      {
        "label": "Uber Eats Fee",
        "value": 11949.33
      },
      {
        "label": "Preventative Maintenance",
        "value": 1111.2
      },
      {
        "label": "Office Supplies",
        "value": 199.98
      },
      {
        "label": "Credit Card Commissions & Fees",
        "value": 222.6
      },
      {
        "label": "Utilities - Hydro",
        "value": 594.44
      },
      {
        "label": "Waste Removal (Independent)",
        "value": 257.2
      },
      {
        "label": "Rent Basic",
        "value": 3300
      },
      {
        "label": "Business Insurance",
        "value": 691.58
      },
      {
        "label": "Travel Expense - Hotel",
        "value": 18.33
      }
    ],
    testTable: [
      {
        "id": "1",
        "label": "Total GROSS SALES",
        "value": 112233.371671519,
        "children": [
          {
            "id": "1-1",
            "label": "Purchased Food",
            "value": 28472.,
          },
          {
            "id": "1-2",
            "label": "Store Transfers",
            "value": 564.,
          },
        ]
      },

      {
        "id": "2",
        "label": "Total Purchased Food",
        "value": 29036.58,
      },
      {
        "id": "3",
        "label": "Total Paper Takeout Packaing",
        "value": 3794.4,
      },
      {
        "id": "4",
        "label": "Total COST OF GOODS SOLD",
        "value": 32831.0,
      },
      {
        "id": "5",
        "label": "Gross Profit",
        "value": 79402.33167151,
      },
      {
        "id": "6",
        "label": "Total VARIABLE LABOUR",
        "value": 32954.77,
        "children": [
          {
            "id": "6-1",
            "label": "Supervisors",
            "value": 32954.,
          },
        ]
      },
      {
        "id": "7",
        "label": "BENEFITS & PAYROLL BURDEN",
        "value": 13,
        "children": [{
          "id": "7-1",
          "label": "Payroll Processing Fees",
          "value": 135.,
        },]
      },

    ]
  };

  componentDidMount = () => {
    const pltable = [];
    this.state.pl.forEach(item => {
      pltable.push(
        <Tr>
          <Td>{item.category}</Td>
          <Td>{item.glCode}</Td>
          <Td>{item.amount}</Td>
          <Td
            textColor={item.amountPer > 0 ? 'green' : 'red'}
            fontWeight={'medium'}
          >
            {item.amountPer}
          </Td>
          <Td
            textColor={item.changeDollar > 0 ? 'green' : 'red'}
            fontWeight={'medium'}
          >
            {item.changeDollar}
          </Td>
          <Td
            textColor={parseInt(item.changePer) > 0 ? 'green' : 'red'}
            fontWeight={'medium'}
          >
            {item.changePer}
          </Td>
        </Tr>
      );
    });

    this.setState({ pltable: pltable });

  };

  // Sort data functions
  getData = () => {

    if (this.state.sortColumn && this.state.sortType) {
      this.setState({
        testTable: this.state.testTable.sort((a, b) => {
          let x = a[this.state.sortColumn];
          let y = b[this.state.sortColumn];
          if (typeof x === 'string') {
            x = x.charCodeAt();

          }
          if (typeof y === 'string') {
            y = y.charCodeAt();
          }
          if (this.state.sortType === 'asc') {

            return x - y;
          } else {
            return y - x;
          }
        })
      })
    }

  };

  handleSortColumn = (sortColumn, sortType) => {
    this.setState({ loading: true, isTree: false })
    setTimeout(() => {
      this.setState({ loading: false, sortColumn: sortColumn, sortType: sortType, isTree: true }, () => {
        this.getData();
      });

    }, 500);

    console.log(this.state.testTable)
  };


  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <Card width={'100%'}>
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaList} />
              <Text fontSize={'md'}>P&L</Text>
            </Flex>
            <Flex flex={1} justifyContent={'flex-end'}>
              <Icon as={FaDownload} />
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody overflowX={'scroll'} fontSize={'sm'} >
          <Table
            isTree={this.state.isTree}
            bordered
            cellBordered
            rowKey="id"
            height={400}
            data={this.state.testTable}
            shouldUpdateScroll={true}
            sortColumn={this.state.sortColumn}
            sortType={this.state.sortType}
            onSortColumn={this.handleSortColumn}
            loading={this.state.loading}
          >
            <Column flexGrow={1} >
              <HeaderCell>Heading</HeaderCell>
              <Cell dataKey="label" >

              </Cell>
            </Column>
            <Column width={100} flexGrow={1} sortable>
              <HeaderCell>Period 1</HeaderCell>
              <Cell dataKey="value" />
            </Column>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default PLCard;
