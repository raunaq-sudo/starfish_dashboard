import React, { Component } from 'react';
import { addMonths, endOfMonth, startOfMonth, subDays, startOfWeek, endOfWeek, addWeeks, startOfQuarter, addQuarters, endOfQuarter, startOfYear, addYears, endOfYear } from 'date-fns';
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
import { Table, Dropdown, IconButton } from 'rsuite';
import { DownloadTableExcel, downloadExcel } from 'react-export-table-to-excel'
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import { toPng } from 'html-to-image';

class DateAnalysis extends Component {
    state = { 
      locationMultiValue:undefined,
      data:[{No_Data:''}],
      range_type:'cost_analysis_group_by_condition_byday', name_type_range:'Last 10 Days',
      name_type: '$ - Overview', type:'cost_amt', interval:'1 day',
      value:[subDays(new Date(), 9), new Date()]
     } 
    constructor(props){
      super(props)
      this.ref = React.createRef()
    }

    handleDate = (value) =>{
      //this.setState({data:undefined})
      var fromDate = value!==undefined? (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear()):""
      var toDate = value!==undefined?(((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear()):""    

      
      this.setState({fromDate:fromDate, toDate:toDate, value:value}, () => {
        console.log("From date:" + fromDate)
        console.log("to date:" + toDate)
        this.fetchData()
      })
    }
   
    fetchData = async () =>{
      if(this.state.locationMultiValue!==undefined){
        this.setState({loading:true, data:[{loading:''}]})
      var body = new FormData()
      body.append('rows', this.state.locationMultiValue)
      body.append('fromDate', this.state.fromDate)
      body.append('toDate', this.state.toDate)
      body.append('date_key', this.state.range_type)
      body.append('type', this.state.type)
      body.append('interval', this.state.interval)
 
      await fetch(apiEndpoint + '/api/ddl_value_generator_multiselect_date/', {
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
        })
      }
      }
  
      handleDownloadExcel = () => {
        
        downloadExcel({
          fileName: "Date Analysis",
          sheet: "summary",
          tablePayload: {
            header: Object.keys(this.state.data[0]),
            body: this.state.data
          },
        });
      }
  
  stateDataCheck = () =>{
    if (this.state.data===undefined || this.state.data===null){
   
      return false
    } else {
   
      if (Array.isArray(this.state.data)){
        if (this.state.data.length===0){
       
          return false
        } else{
       
          return true
        }
      } else{
     
        return false
      }
      
    }
  }
      
    


  componentDidMount = () => {


    }
    handleCaptureClick = async () => {
      toPng(document.getElementById('locationTable'), { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
    };
    render() { 
      const { Column, HeaderCell, Cell } = Table;
        return (<>
        
            <Card width = {"100%"} height={window.innerHeight * 0.9} maxWidth={window.innerWidth*0.8}>
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaStickyNote}></Icon>
              <Text fontSize={'md'}>Comparison Overtime</Text>
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

         

            </Flex>
            <Dropdown title={this.state.name_type} size='sm'> 
            <Dropdown.Item onClick={()=>{
                    this.setState({type:'cost_amt', name_type:'$ - Overview'}, ()=>{
                      this.handleDate(this.state.value)

                    })
                }}>$ - Overview</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    this.setState({type:'cost_per', name_type:'% of cost'}, ()=>{
                      this.handleDate(this.state.value)

                    })

                }}>% of cost</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    this.setState({type:'sales_per',  name_type:'% of sales'}, ()=>{
                      this.handleDate(this.state.value)

                    })
                }}>% of sales</Dropdown.Item>
                
            </Dropdown>
            <Flex flex={3}>
              <MultiLocationDropDown 
                locationValue={this.props.locationValue} 
                setLocation={this.props.setLocation}
                onChange = {(value) => {

                  if(value.length!==0){
                    this.setState({locationMultiValue:value}, ()=>{
                      this.handleDate(this.state.value)

                    })
                  }else{
                    this.setState({
                      data:[{No_Data:''}],
                      })
                    }
                    
                  }}
                  />
            </Flex>
 
            <Dropdown title={this.state.name_type_range} size='sm'> 
          <Dropdown.Item onClick={()=>{
                    this.setState({range_type:'cost_analysis_group_by_condition_byyear', 
                    name_type_range:'Last 4 Years', interval:'1 year',
                    value:[startOfYear(addYears(new Date(), -3)), new Date()]}, ()=>{
                      this.handleDate(this.state.value)
                      
                    })
                }}>Last 4 Years</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                    this.setState({range_type:'cost_analysis_group_by_condition_byquarter', 
                    name_type_range:'Last 4 Quarter', interval:'3 months',
                    value:[startOfQuarter(addQuarters(new Date(), -3)),new Date()]}, ()=>{
                      this.handleDate(this.state.value)
                      
                    })
                }}>Last 4 Quarter</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    this.setState({range_type:'cost_analysis_group_by_condition_bymonth', 
                    name_type_range:'Last 12 Month', interval:'1 month',
                    value:[startOfMonth(addMonths(new Date(), -11)), new Date()]}, ()=>{
                      this.handleDate(this.state.value)
                      
                    })

                }}>Last 12 Month</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    this.setState({range_type:'cost_analysis_group_by_condition_byweek', 
                    name_type_range:'Last 10 Week', interval:'1 week',
                  value:[startOfWeek(addWeeks(new Date(), -9)), new Date()]}, ()=>{
                      this.handleDate(this.state.value)
                    })
                }}>Last 10 Week</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    this.setState({range_type:'cost_analysis_group_by_condition_byday',  
                    name_type_range:'Last 10 Days', interval:'1 day',
                    value:[subDays(new Date(), 9), new Date()]}, ()=>{
                      this.handleDate(this.state.value)
                    })
                }}>Last 10 Days</Dropdown.Item>
                
            </Dropdown>

            <Flex flex={1} fontSize={'sm'} width={'100%'} justify={'center'}>
              <IconButton as={Button} icon={<FaDownload />} onClick={this.handleDownloadExcel} size='xs'/>

            </Flex>
          </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody width={'100%'} id='locationTable'>
        {this.stateDataCheck()?
          <Table
            ref = {this.ref}
            height={window.innerHeight * 0.7}
            data={this.state.data}
            virtualized
            bordered
            cellBordered
            loading={this.state.loading}
            
          >
            {this.state.type==='cost_amt'? <Column fixed={true} flexGrow={1} minWidth={200}>
                <HeaderCell>Classification</HeaderCell>
                <Cell dataKey={'classification'}></Cell>
              </Column>:<></>}
           
              <Column fixed={true} flexGrow={1} minWidth={200}>
                <HeaderCell>Description</HeaderCell>
                <Cell dataKey={'desc'}></Cell>
              </Column>
            
            {
              this.state.data!==undefined?Array(this.state.data[0]).map((keys)=>( 
                Object.keys(keys).map((item)=>{
   
                 if(item==='classification'){
                    return <></>
                 } else {
                  if (item==='desc'){
                    return <></>
                  }else{

                    return(<>
                      <Column flexGrow={1} minWidth={200}>
                      <HeaderCell>{item}</HeaderCell>
                      <Cell dataKey={item}>{
                        this.state.type!=="cost_amt"?rowData=>rowData[item]===null?"0 %":rowData[item] + " %" : rowData=>rowData[item]
                      }</Cell>
                    </Column>
                    </>
                    )
               
                      
                  }
                  
                                    
                
                 }
                 
                  
                }
                )) 
               
                )
              :<></>
            }
          </Table>
:<>       <Table
            ref = {this.ref}
            height={window.innerHeight * 0.7}
            data={{"key":[]}}
            virtualized
            bordered
            cellBordered
            loading={this.state.loading}
            
          >
            <Column>
          <HeaderCell></HeaderCell>
              <Cell dataKey='key'></Cell>
            </Column>
          </Table>


</>}


          {/*{this.state.data!==undefined?<Table fontSize={'sm'} variant={'striped'} opacity={this.state.loading===true?0.2:1} >
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
                  <Td>{/*<Button variant="ghost"  justifyContent={'left'}  width={'100%'} as={Link} size={'xs'}>} onClick={()=>{this.props.clickThru('Cost', dat.expense_head)}}>*/
                      /*<Text isTruncated >{dat.desc}</Text></Button></Tr></Td>

                      {this.state.locationMultiValue!==undefined?this.state.locationMultiValue.map((value)=>(<Td>{dat[value]}</Td>)):<></>}
                </Tr>
              ))) : (<></>)}



            </Tbody>
          </Table>
              :<></>}*/}
        </CardBody>
      </Card >
        
        
        </>);
    }
  }
 
export default DateAnalysis;