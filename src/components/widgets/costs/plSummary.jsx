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
  Button
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
import { IconButton, Table } from 'rsuite';
import "../costs/pltable.css"
import ModalHeader from 'rsuite/esm/Modal/ModalHeader';
import apiEndpoint from '../../config/data';
import { createRef } from 'react';
import { DownloadTableExcel, downloadExcel } from 'react-export-table-to-excel'
import { Link } from 'react-router-dom';
import {connect} from "react-redux"


class PLSummary extends Component {

  state = {
    transactions: undefined,
    isTree: true,
    MisOpen: false,
    pltable: [],
    pltableMini: [],
    columnsMini: [],

  };

  fetchTransactions = (accountKey) => {
    this.setState({ transactionsLoader: true, transactions: undefined })
    var formDat = new FormData();
    console.log(this.props.from_date)
    formDat.append('accountKey', accountKey)
    formDat.append('fromDate', this.props.from_date)
    formDat.append('toDate', this.props.to_date)
    formDat.append('location', this.props.locationValue)

    fetch(apiEndpoint + '/api/get_transactions/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formDat
    }).then(response => response.json())
      .then(data => {
        this.setState({ transactions: data, transactionsLoader:false })

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

  trim(str) {
    if(!str) return str;
    return str.replace(/^\s+/g, '');
  }

  handleDownloadExcel = () => {

    downloadExcel({
      fileName: "PL Summary",
      sheet: "summary",
      tablePayload: {
        header: ['Description', 'Current year (' + this.props.columnCurrency + ')', 'Previous year (' + this.props.columnCurrency + ')','Change (' + this.props.columnCurrency + ')', 'Percent Change (%)'],
        body: this.props.tableData
      },
    });
  }

  tableRef = createRef()
  componentDidMount = () => {
    this.setState({ tableData: this.props.tableData, })
  }

  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <Card width={'100%'}>
        <Modal
        isOpen={this.state.MisOpen}
        onClose={() => {
          this.setState({ MisOpen: false })
        }}
        size={'5xl'}

      >
        <ModalOverlay />
        <ModalContent position={'fixed'}>
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
              height={window.innerHeight * 0.7}
              data={this.state.transactions !== undefined ? this.state.transactions['data'] : []}
              loading={this.state.transactionsLoader}
              hover
              wordWrap={'break-all'}
              virtualized
              bordered
              cellBordered
            >
              {this.state.transactions !== undefined ? this.state.transactions.columns.map((item) => (
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

              <IconButton as={Button} icon={<FaDownload />} onClick={this.handleDownloadExcel} />

            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody overflowX={'scroll'} fontSize={'sm'} >
          <Table
            isTree={this.state.isTree}
            defaultExpandAllRows
            rowHeight={(rowData) => {
              if (rowData!==undefined){
              if(rowData.account_key === "-" || rowData.account_key === null || rowData.account_key==="" ){ 
              return 25
              }else{
                return 25
              }
            }
            }}
            rowKey="index_ui"
            height={400}
            data={this.props.pltable}
            shouldUpdateScroll={false}
            //sortColumn={this.state.sortColumn}
            sortType={this.state.sortType}
            onSortColumn={this.handleSortColumn}
            loading={this.props.pltable !== undefined ? false : true}
            className='custom-table'
            hover
            wordWrap={'break-word'}
            verticalAlign={"middle"}

          >
            <Column width={100} flexGrow={1} resizable>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="desc" >
                {rowData => (rowData.account_key === "-" || rowData.account_key === null || rowData.account_key==="" ? 
                  <strong style={{fontSize:'12px'}}>
                  {
                  this.trim(rowData.desc)
                  }
                </strong>
                
                :

                  <Button justifyContent={'left'} alignItems={'flex-start'} variant = {rowData.desc!==this.props.highlightDesc?'ghost':'solid'} 

                  as={rowData.desc!==this.props.highlightDesc?Link:Button} onClick={() => this.fetchTransactions(rowData.account_key)} 
                   colorScheme={rowData.desc===this.props.highlightDesc?'yellow':'blue'} 
                   //width={'100%'} 
                   //position={rowData.desc===this.props.highlightDesc?"fixed":'inherit'}
                   borderRadius={0}
                   fontSize={'12px'}
                    >

                      {rowData.desc}
                  </Button>

          )}
              </Cell>
            </Column>
            <Column width={100} flexGrow={1} >
              <HeaderCell align={'center'} >Current year ({this.props.columnCurrency})</HeaderCell>
              <Cell dataKey="subt_nat_amount_x">
                {rowData => <Text align={'center'}>{rowData.subt_nat_amount_x!==null?rowData.subt_nat_amount_x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}</Text>}
              </Cell>
            </Column>
            <Column width={100} flexGrow={1} >
              <HeaderCell align={'center'} >Previous year ({this.props.columnCurrency})</HeaderCell>
              <Cell dataKey="subt_nat_amount_y">
                {rowData => <Text align={'center'}>{rowData.subt_nat_amount_y!==null?rowData.subt_nat_amount_y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}</Text>}

              </Cell>
            </Column>
            <Column width={100} flexGrow={1} >
              <HeaderCell align={'center'}>Change ({this.props.columnCurrency})</HeaderCell>
              <Cell dataKey="change">
                {rowData => <Text align={'center'} color={((rowData.per_change < 0) & (rowData.classification === 'Revenue')) || ((rowData.per_change > 0) & (rowData.classification === 'Expense')) ? 'red' : 'green'}>{rowData.change!==null?rowData.change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}</Text>}
              </Cell>
            </Column>
            <Column width={100} flexGrow={1} >
              <HeaderCell align={'center'} >Percent Change (%)</HeaderCell>
              <Cell dataKey="per_change" >
                {rowData => <Text align={'center'} color={((rowData.per_change < 0) & (rowData.classification === 'Revenue')) || ((rowData.per_change > 0) & (rowData.classification === 'Expense')) ? 'red' : 'green'}>{rowData.per_change}</Text>}
              </Cell>
            </Column>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    columnCurrency : state.locationSelectFormat.currency
  }
}

export default connect(mapStateToProps)(PLSummary);
