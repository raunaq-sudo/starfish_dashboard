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
    Avatar,
    Textarea,
    Divider,
    CardFooter,
    color,
    Button,
    Link,
    Select,
  } from '@chakra-ui/react';

  
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
import LocationDropDown from '../../utility/location';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import MultiLocationDropDown from '../../utility/multiLocation';
  

class ComparatorTable extends Component {
    state = { 
      locationMultiValue:undefined
     } 

   
    fetchData = async () =>{
      var body = new FormData()
      body.append('rows', this.state.locationMultiValue)
      await fetch(apiEndpoint + '/api/ddl_value_generator_multiselect/', {
        method: 'POST',
        headers: { "Authorization": "Bearer " + localStorage['access'] },
        body:body
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.code === undefined) {
            alert(data)
          } else {
            window.open('/', "_self")
            alert('Session Expired!.')
          }
        }).catch(err => {
          console.log(err)
        })}
  
      
    


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
      })}

    render() { 
        return (<>
            <Card width={'100%'} height={'100%'}>
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaStickyNote}></Icon>
              <Text fontSize={'md'}>Cost Comparator</Text>
            </Flex>
            
            <Flex width={'100%'} gap={2} flex={3}>
            <Flex flex={1}>
                <Select size={'sm'}>
                    <option>Cost</option>
                    <option>Benchmark</option>
                    <option>Budget</option>
                </Select>
            </Flex>
            <Flex flex={3}>
              <MultiLocationDropDown 
                locationValue={this.props.locationValue} 
                setLocation={this.props.setLocation}
                onChange = {(value) => {
                  console.log(value)
                  this.setState({locationMultiValue:value}, ()=>{
                    this.fetchData()
                  })
                }}
                />
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker dateValue={this.props.handleDate} value={this.props.value} />
            </Flex>

          </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody>
          <Table fontSize={'sm'} variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Category</Th>

                <Th>Location A</Th>
                <Th>Location B</Th>
                <Th>Location C</Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.props.table ? (this.props.table.map((dat) => (
                <Tr>
                  <Td><Button variant="ghost"  justifyContent={'left'}  width={'100%'} as={Link} size={'xs'} onClick={()=>{this.props.clickThru('Cost', dat.expense_head)}}>
                      <Text isTruncated >{dat.expense_head}</Text></Button></Td>

                  <Td>{dat.metric -10 + "%"}</Td>
                  <Td>{dat.metric + 20 + "%"}</Td>
                  <Td>{dat.metric + "%"}</Td>
                </Tr>
              ))) : (<></>)}



            </Tbody>
          </Table>
        </CardBody>
      </Card >
        
        
        </>);
    }
  }
 
export default ComparatorTable;