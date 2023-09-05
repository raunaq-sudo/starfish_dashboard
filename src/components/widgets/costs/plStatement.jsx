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
  Table,
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
        <CardBody overflowX={'scroll'}>
          <Table fontSize={'sm'} variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>GL Code</Th>
                <Th>Amount</Th>
                <Th>
                  % <Icon as={FaArrowUp} />/<Icon as={FaArrowDown} />
                </Th>
                <Th>
                  Change (<Icon as={FaDollarSign} />)
                </Th>
                <Th>
                  Change (<Icon as={FaPercentage} />)
                </Th>
              </Tr>
            </Thead>
            <Tbody>{this.state.pltable}</Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default PLCard;
