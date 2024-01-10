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
import "../costs/pltable.css"


class PLCard extends Component {

  state = {


    isTree: true,

    pltable: [],
    pltableMini: [],
    columnsMini: [],







  };

  componentDidMount = () => {


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
            defaultExpandAllRows
            rowHeight={(rowData) => {
              return 20;
            }}
            rowKey=
            "index_ui"
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
            {this.props.columns ? this.props.columns.map((value) => {
              return (
                <Column flexGrow={1} resizable className='custom-row'>
                  <HeaderCell className='custom-row'>{value.value}</HeaderCell>
                  <Cell dataKey={value.key}  >
                      
                  </Cell>
                </Column>)
            }) : <></>}
            {/*<Column width={100} flexGrow={1} sortable>
              <HeaderCell>Period 1</HeaderCell>
              <Cell dataKey="value" />
    </Column>*/}
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default PLCard;
