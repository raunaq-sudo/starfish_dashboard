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
import { Dropdown } from 'rsuite';
  

class ComparatorTable extends Component {
    state = { 
      locationMultiValue:undefined,
      data:undefined,
      type:'cost_amt',
      name_type:'$ - Cost'
     } 

    handleDate = (value) =>{
      //this.setState({data:undefined})
      var fromDate = value!==undefined? (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear()):""
      var toDate = value!==undefined?(((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear()):""    
      this.setState({fromDate:fromDate, toDate:toDate, value:value}, () => {
        this.fetchData()
      })
    }
   
    fetchData = async () =>{
      this.setState({loading:true})
      var body = new FormData()
      body.append('rows', this.state.locationMultiValue)
      body.append('fromDate', this.state.fromDate)
      body.append('toDate', this.state.toDate)
      body.append('type', this.state.type)

      await fetch(apiEndpoint + '/api/ddl_value_generator_multiselect/', {
        method: 'POST',
        headers: { "Authorization": "Bearer " + localStorage['access'] },
        body:body
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.code === undefined) {
            this.setState({data:data, loading:false})
          } else {
            window.open('/', "_self")
            alert('Session Expired!.')
          }
        }).catch(err => {
          console.log(err)
        })}
  
      
    


  componentDidMount = () => {
    this.fetchData()
    }

    render() { 
        return (<>
            <Card width = {"100%"} height={window.innerHeight * 0.9} maxWidth={window.innerWidth*0.8}>
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaStickyNote}></Icon>
              <Text fontSize={'md'}>Cost Comparator</Text>
            </Flex>
            
            <Flex width={'100%'} gap={2} flex={3}>
            <Flex flex={1} justify={'end'}>
                {/*<Select size={'sm'} onClick={(value)=>{
                  console.log(value)
                }}>
                    <option value={'cost'}>$ - Cost</option>
                    <option value={'cost_per'}>% of cost</option>
                    <option value={'sales_per'}>% of sales</option>
                    <option>% of budget</option>
              </Select>*/}

          <Dropdown title={this.state.name_type} size='sm'> 
            <Dropdown.Item onClick={()=>{
                    this.setState({type:'cost_amt', name_type:'$ - Cost'}, ()=>{
                      this.fetchData()
                    })
                }}>$ - Cost</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    this.setState({type:'cost_per', name_type:'% of cost'}, ()=>{
                      this.fetchData()
                    })

                }}>% of cost</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    this.setState({type:'sales_per',  name_type:'% of sales'}, ()=>{
                      this.fetchData()
                    })
                }}>% of sales</Dropdown.Item>
                
            </Dropdown>

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
              <CustomDateRangePicker dateValue={this.handleDate} value={this.state.value} />
            </Flex>

          </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody width={'100%'} maxWidth={1320} overflowX={'scroll'}>{this.state.data!==undefined?
          <Table fontSize={'sm'} variant={'striped'} opacity={this.state.loading===true?0.2:1} >
            <Thead>
              <Tr>{this.state.type==='cost_amt'?<Th>Classification</Th>:<></>}
                
                <Th>Category</Th>
                {this.state.locationMultiValue!==undefined?this.state.locationMultiValue.map((value)=>(<Th>{value}</Th>)):<></>}
              
              </Tr>
            </Thead>
            <Tbody>
              {this.state.data!==undefined ? (this.state.data.map((dat) => (
                <Tr>
                  {this.state.type==='cost_amt'?<Td>{dat.classification}</Td>:<></>}
                  <Td>{/*<Button variant="ghost"  justifyContent={'left'}  width={'100%'} as={Link} size={'xs'}>} onClick={()=>{this.props.clickThru('Cost', dat.expense_head)}}>*/}
                      <Text isTruncated >{dat.desc}</Text>{/*</Button></Tr>*/}</Td>

                      {this.state.locationMultiValue!==undefined?this.state.locationMultiValue.map((value)=>(<Td>{dat[value]}</Td>)):<></>}
                </Tr>
              ))) : (<></>)}



            </Tbody>
          </Table>
          :<></>}
        </CardBody>
      </Card >
        
        
        </>);
    }
  }
 
export default ComparatorTable;