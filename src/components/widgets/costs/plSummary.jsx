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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Heading,
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
import { Button, Table } from 'rsuite';
import "../costs/pltable.css"
import ModalHeader from 'rsuite/esm/Modal/ModalHeader';


class PLSummary extends Component {

  state = {
    transactions: {
      columns: [],
      data: []

    },

    isTree: true,
    MisOpen: false,
    pltable: [],
    pltableMini: [],
    columnsMini: [],

  };

  fetchTransactions = (accountKey) => {
    this.setState({ transactions: [] })
    var formDat = new FormData();
    formDat.append('accountKey', accountKey)
    formDat.append('fromDate', this.props.from_date)
    formDat.append('toDate', this.props.to_date)

    fetch('/api/get_transactions/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formDat
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ transactions: data })

      }).catch(err => console.error(err))
    this.setState({ MisOpen: true })

  }
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

  };



  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <Card width={'100%'}><Modal
        isOpen={this.state.MisOpen}
        onClose={() => {
          this.setState({ MisOpen: false })
        }}
        size={'4xl'}

      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} m={3}>View Transactions</Heading></ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Table
              className='custom-table'
              rowHeight={(rowData) => {
                return 20
              }}
              rowKey="index_ui"
              height={400}
              data={this.state.transactions !== undefined ? this.state.transactions['data'] : []}
              shouldUpdateScroll={false}
              loading={this.state.transactions.data ? false : true}
              hover
              wordWrap={'break-all'}
              virtualized
              autoHeight
              bordered
              cellBordered

            >
              {this.state.transactions.columns !== undefined ? this.state.transactions['columns'].map((item) => (
                <Column resizable>
                  <HeaderCell>{item.value}</HeaderCell>
                  <Cell dataKey={item.key}>
                    {rowData => <Text fontSize={'xxs'} align={'center'}>{rowData[item.key]}</Text>}
                  </Cell>
                </Column>


              )) : <></>}

            </Table>


          </ModalBody>

          <ModalFooter>

            <Button
              onClick={() => {
                this.setState({ MisOpen: !this.state.MisOpen })

              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
            defaultExpandAllRows
            rowHeight={(rowData) => {
              return 20;
            }}
            rowKey="index_ui"
            height={400}
            data={this.props.pltable}
            shouldUpdateScroll={false}
            //sortColumn={this.state.sortColumn}
            sortType={this.state.sortType}
            onSortColumn={this.handleSortColumn}
            loading={this.props.pltable.length > 0 ? false : true}
            className='custom-table'
            hover
            wordWrap={'break-word'}

          >
            <Column width={100} flexGrow={1} sortable>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="desc_x">
                {rowData => (rowData.account_key === "-" ? rowData.desc_x :
                  <Button appearance="link" size={'xs'} onClick={() => this.fetchTransactions(rowData.account_key)} pl={0} p={1}>
                    <Text fontSize={'10px'} pb={3} align={'flex-start'}>{rowData.desc_x}</Text>
                  </Button>
                )}
              </Cell>
            </Column>

            <Column width={100} flexGrow={1} sortable>
              <HeaderCell align={'center'}>Change</HeaderCell>
              <Cell dataKey="change">
                {rowData => <Text align={'center'} color={((rowData.per_change < 0) & (rowData.Classification_x === 'Revenue')) || ((rowData.per_change > 0) & (rowData.Classification_x === 'Expense')) ? 'red' : 'green'}>{rowData.change}</Text>}
              </Cell>
            </Column>
            <Column width={100} flexGrow={1} sortable>
              <HeaderCell align={'center'} >Percent Change</HeaderCell>
              <Cell dataKey="per_change" >
                {rowData => <Text align={'center'} color={((rowData.per_change < 0) & (rowData.Classification_x === 'Revenue')) || ((rowData.per_change > 0) & (rowData.Classification_x === 'Expense')) ? 'red' : 'green'}>{rowData.per_change}</Text>}
              </Cell>
            </Column>
            <Column width={100} flexGrow={1} sortable>
              <HeaderCell align={'center'} >Current</HeaderCell>
              <Cell dataKey="subt_nat_amount_x"></Cell>
            </Column>
            <Column width={100} flexGrow={1} sortable>
              <HeaderCell align={'center'} >Previous year</HeaderCell>
              <Cell dataKey="subt_nat_amount_y" />
            </Column>


          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default PLSummary;