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
        "label": "Total GROSS SALES",
        "value": "112233.371671519",
        "children": [
          {
            "label": "Purchased Food",
            "value": 28472.03
          },
          {
            "label": "Store Transfers",
            "value": 564.55
          },
        ]
      },
      {
        "label": "Total NET SALES",
        "value": "112233.371671519",
        "children": [{
          "label": "Paper Purchases",
          "value": 3794.46
        },]
      },
      {
        "label": "Total Purchased Food",
        "value": "29036.58",
      },
      {
        "label": "Total Paper Takeout Packaing",
        "value": "3794.46"
      },
      {
        "label": "Total COST OF GOODS SOLD",
        "value": "32831.04"
      },
      {
        "label": "Gross Profit",
        "value": "79402.331671519"
      },
      {
        "label": "Total VARIABLE LABOUR",
        "value": "32954.77",
        "children": [
          {
            "label": "Supervisors",
            "value": 32954.77
          },
        ]
      },
      {
        "label": "BENEFITS & PAYROLL BURDEN",
        "value": 135,
        "children": [{
          "label": "Payroll Processing Fees",
          "value": 135.28
        },]
      },
      {
        "label": "Total LABOUR",
        "value": "33090.05",

      },
      {
        "label": "Total DIRECT OPERATING EXPENSES",
        "value": "1533.42",
        "children": [
          {
            "label": "Floor Mats & Linen",
            "value": 762.05
          },
          {
            "label": "Bank Fees",
            "value": 407.42
          },
          {
            "label": "POS",
            "value": 144
          },
          {
            "label": "DIRECT OPERATING EXPENSES - Other",
            "value": 219.95
          },
        ]
      },
      {
        "label": "Total OFF PREMISE EXPENSES",
        "value": "11949.33"
      },
      {
        "label": "Total REPAIRS & MAINTENANCE",
        "value": "1111.2"
      },
      {
        "label": "Total  ADMINISTRATION",
        "value": "422.58"
      },
      {
        "label": "Total UTILITIES",
        "value": "851.64"
      },
      {
        "label": "Total PROPERTY",
        "value": "3991.58"
      },
      {
        "label": "TOTAL EXPENSES",
        "value": "52949.8"
      },
      {
        "label": "CORPORATE CONTRIBUTIONS",
        "value": "26452.531671519"
      },
      {
        "label": "Total OVERHEAD - NON PEOPLE COSTS - Other",
        "value": "18.33"
      },
      {
        "label": "Total Other Expense",
        "value": "18.33"
      },
      {
        "label": "Net Income",
        "value": "26434.201671519"
      }
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
        <CardBody overflowX={'scroll'} >
          <Table isTree
            bordered
            cellBordered
            rowKey="value"
            height={400}
            data={this.state.testTable}
            shouldUpdateScroll={false}
            style={{ fontSize: 'xs' }}
          >
            <Column flexGrow={1}>
              <HeaderCell>Heading</HeaderCell>
              <Cell dataKey="label" />
            </Column>
            <Column width={100} flexGrow={1}>
              <HeaderCell>Value 💰</HeaderCell>
              <Cell dataKey="value" />
            </Column>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default PLCard;
