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
import { IconButton, Table } from 'rsuite';
import { downloadExcel } from 'react-export-table-to-excel';

class BenchmarkTable extends Component {
  state = {};

  getData = (value) => {
 
    if (this.state.sortColumn && this.state.sortType) {
   //   if (this.state.sortColumn!=='expense_head'){
        return value.sort((a, b) => {
          let x = a[this.state.sortColumn];
          let y = b[this.state.sortColumn];

          if (this.state.sortColumn!=='expense_head'){
            if (typeof x === 'string') {
              if (isNaN(parseFloat(x))){
                x = x.charCodeAt();
                
              }

            }
            if (typeof y === 'string') {
              if(isNaN(parseFloat(y))){
                y = y.charCodeAt();

              }
            }
            
          }else{
        
           if (typeof x === 'string' ) {
             x = x.charCodeAt();
             

         }
        if (typeof y === 'string' ) {
              y = y.charCodeAt();
        }
          }
          if (this.state.sortType === 'asc') {
            return x - y;
        } else {
            return y - x;
        }
          
      });
    //  }
        
    } 
    

    return value;
};

handleSortColumn = (sortColumn, sortType) => {
  this.setState({loading:true})
  var counter = 700
  if (sortColumn==='expense_head'){
    this.callTable()
    counter = 1000

  }
  setTimeout(() => {
      
      this.setState({loading:false,sortColumn:sortColumn,sortType:sortType}, ()=>{
        console.log(this.state.sortColumn)
      });
      
  }, counter);

};

callTable = () =>{
  this.props.callTable()
}

 // Function to handle Excel download
 handleDownloadExcel = () => {
  const headers = ['Category', 'Average Business', 'Best in Class', 'Your Business'];
  const body = this.props.table.map((row) => [
    row.expense_head,
    row.avg_in_class + '%',
    row.best_in_class + '%',
    row.metric + '%',
  ]);

  downloadExcel({
    fileName: 'Benchmark', // Filename for the Excel file
    sheet: 'Benchmark', // Excel sheet name
    tablePayload: {
      header: headers,
      body: body,
    },
  });
};

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
    const { Column, HeaderCell, Cell } = Table;
    return (
      
      <Card width={'100%'}>
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaStickyNote}></Icon>
              <Text fontSize={'md'}>Benchmark</Text>
            </Flex>
            <Flex flex={1} justifyContent={'flex-end'}>
               {/* Add Download Button */}
               <IconButton as={Button} icon={<FaDownload />} onClick={this.handleDownloadExcel} />
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody overflowX={'scroll'}>
          <Table
          height={window.innerHeight * 0.7}
          data={this.getData(this.props.table)}
          virtualized
          bordered
          cellBordered
          sortColumn={this.state.sortColumn}
          sortType={this.state.sortType}
          onSortColumn={this.handleSortColumn}
          loading={this.state.loading}
          >
            <Column sortable fixed flexGrow={1} minWidth={200}>
              <HeaderCell>Category</HeaderCell>
              <Cell dataKey='expense_head'>
                {
                  rowData => (
                    <Button variant="ghost" justifyContent={'left'}  width={'100%'} as={Link} size={'xs'} onClick={()=>{this.props.clickThru('cost', rowData.expense_head)}}>
                      <Text isTruncated >{rowData.expense_head}</Text></Button>
                  )
                }
              </Cell>
            </Column>
            <Column  sortable flexGrow={1} minWidth={150}>
              <HeaderCell>Average Business</HeaderCell>
              <Cell dataKey='avg_in_class'>{rowData=>(
                <Text>{rowData.avg_in_class==='-'?0 + "%":rowData.avg_in_class + "%"}</Text>
              )}</Cell>
            </Column>
            <Column  sortable flexGrow={1} minWidth={150}>
              <HeaderCell>Best in Class</HeaderCell>
              <Cell dataKey='best_in_class'>{rowData=>(
                <Text>{rowData.best_in_class==='-'?0+"%":rowData.best_in_class + "%"}</Text>
              )}</Cell>
            </Column>
            <Column  sortable flexGrow={1} minWidth={150}>
              <HeaderCell>Your Business</HeaderCell>
              <Cell dataKey='metric'>{rowData=>(
                <Text>{rowData.metric==="-"?0+"%":rowData.metric + "%"}</Text>
              )}</Cell>
            </Column>

          </Table>
         {/*<Table fontSize={'sm'} variant={'striped'}>
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
          </Table> */} 
        </CardBody>
      </Card >
    );
  }
}

export default BenchmarkTable;
