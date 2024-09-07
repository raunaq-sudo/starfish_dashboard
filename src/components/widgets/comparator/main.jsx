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
    Avatar,
    Textarea,
    Divider,
    CardFooter,
    color,
    Button,
    Link,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
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
import {connect} from "react-redux";
import ChartRender from '../dashboard/chart';

class ComparatorTable extends Component {
    state = { 
      locationMultiValue:this.props.locationValue[0]!==undefined?this.props.locationValue[0]:'',
      data:[{No_Data:''}],
      type:'cost_amt', name_type:'Overview',
      locationData:[undefined],
      chart_data:[],
      chart_categories:[]
     } 
    constructor(props){
      super(props)
      this.ref = React.createRef()
    }

    handleDate = () =>{
      //this.setState({data:undefined})
      const value = this.props.defaultDateValue!==undefined?this.calenderPropsDateConverter(this.props.defaultDateValue):undefined
      var fromDate = value!==undefined? (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear()):""
      var toDate = value!==undefined?(((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear()):""    
      this.setState({fromDate:fromDate, toDate:toDate, value:value}, () => {
        this.fetchData()
      })
    }
   
    fetchData = async () =>{

      if(this.state.locationMultiValue.length!==0 || this.state.fromDate!==undefined){
        this.setState({loading:true, data:[{loading:''}]})
        var body = new FormData()
        body.append('rows', this.state.locationMultiValue)
        body.append('fromDate', this.state.fromDate)
        body.append('toDate', this.state.toDate)
        body.append('type', this.state.type)
        console.log("Location")
        console.log(this.props.periodSelect)
        if (this.props.periodSelect===true){
          body.append('periodFrom', this.props.periodFrom)
          body.append('periodTo', this.props.periodTo)
        } else {
          body.append('periodFrom', '')
          body.append('periodTo', '')
        }
        
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
        })
      }
      }
  
      handleDownloadExcel = () => {
        
        downloadExcel({
          fileName: "Location Analysis",
          sheet: "summary",
          tablePayload: {
            header: Object.keys(this.state.data[0]),
            body: this.state.data
          },
        });
      }
  
  stateDataCheck = () =>{
    if (this.state.data===undefined || this.state.data===null){
      console.log(false)
      return false
    } else {
      console.log(true)
      if (Array.isArray(this.state.data)){
        if (this.state.data.length===0){
          console.log(false)
          return false
        } else{
          console.log(true)
          return true
        }
      } else{
        console.log(false)
        return false
      }
      
    }
  }
      
  calenderPropsDateConverter = (value) =>{
    const val = []
    if (value!==undefined){value.map((item)=>{
      val.push(new Date(new Date(item).toString()))
    })}
    console.log(value)
    console.log(val)
    return val
  }  

  checkLocation = (value) =>{
    if (value[0]===undefined){
      return false
    } else {
      return true
    }
  }
  componentDidMount = () => {
    // if(this.checkLocation(this.props.locationValue)){
      this.setState({locationMultiValue:this.props.locationValue},()=>this.handleDate())
    // }else{
      // this.handleDate()
    // }

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


  validatePeriodLength = (value) =>{
    var periodLength = 0
    var flag = true
    if(this.props.companySwitcherActive){
      value.forEach((element)=>{
        var tempLocation = this.props.locationData.filter((location)=>{
          return location.label===element
        })
        console.log(tempLocation)
        if (periodLength===0){
          periodLength = tempLocation[0].period_length
        }else{
          if(flag){
            flag = periodLength===tempLocation[0].period_length
            console.log(flag + '@@')
            console.log(periodLength)
            console.log(tempLocation.periodLength)
          }
        }
      })
    }
    
    return flag
  }

  handleRowClick = (rowData) => {
    const updatedChartData = [];
    const updatedChartCategories = [];

    Object.keys(rowData).forEach(key => {
      if (key !== 'classification' && key !== 'desc') {
        let numericValue = parseFloat(rowData[key]?.replace(/[^0-9.-]+/g, ""));
        if (isNaN(numericValue)) {
          numericValue = 0;
        }
        updatedChartData.push(numericValue);
        updatedChartCategories.push(key);
      }
    });
    this.setState({ 
      chart_data: updatedChartData,
      chart_categories: updatedChartCategories
    });
  };

  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <>
        <Card
          width={'100%'}
          height={window.innerHeight * 0.9}
        >
          <CardHeader>

            <Flex justifyContent={'space-between'} flex={6} alignItems={'center'} gap={2} flexDirection={{base:'column',sm:'column',md:'row'}}>
                <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
                  <Icon as={FaStickyNote}></Icon>
                  <Text fontSize={'md'}>Location Analysis</Text>
                </Flex>

                <Flex width={'100%'} gap={2} flex={3} justifyContent={'space-between'} alignItems={'center'}>
                  <Flex gap={2}  flex={4} flexDirection={{base:'column',sm:'column',md:'column',lg:'column',xl:'row'}} minWidth={{sm: '150px', md: '250px'}} alignItems={'center'}>
                    <Flex gap={2} justifyContent={'space-around'} flexDirection={{base:'column',sm:'row'}} alignItems={'center'}>
                        <Dropdown title={this.state.name_type} size='sm' > 
                            <Dropdown.Item onClick={()=>{
                                this.setState({type:'cost_amt', name_type:'Overview'}, ()=>{
                                  this.fetchData()
                                })
                            }}>Overview</Dropdown.Item>
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
                <Dropdown.Item onClick={()=>{
                    this.setState({type:'budget_per',  name_type:'% of budget'}, ()=>{
                      this.fetchData()
                    })
                }}>% of budget</Dropdown.Item>
                
            </Dropdown>

            </Flex>
            <Flex flex={3} mt={1}>
              <MultiLocationDropDown 
                locationValue={this.props.locationValue}
                onChange = {(value) => {
                  if(this.validatePeriodLength(value)){
                    this.setState({ locationMultiValue: value }, () => {
                      this.props.setLocation(value);
                      this.handleDate(this.state.value);
                    });
                  }else{
                    alert('Please compare locations with similar Period Calendars Only.')
                  }
                  }}
                  onClean = {
                    (val)=>{
                      this.props.setLocation(val)
                      this.handleDate()
                    }
                  }
                  data = {
                    (data)=>{
                        this.setState({locationData:data})
                    }
                  }
                  />
            </Flex>
            <Flex flex={1} fontSize={'sm'} width={'100%'}>
              <CustomDateRangePicker dateValue={(val)=>{
                this.handleDate()
              } 
                } value={this.state.value} 
                defaultSwitcher={true}/>
            </Flex>
            <Flex  
                  flex={1}
                  fontSize={'sm'}
                  width={'100%'}
                  justify={'center'}
                  justifyContent={{sm:'flex-start',md:'flex-end'}}
                  marginEnd={'10%'}
                  alignItems={'center'}
                >
                      <IconButton as={Button} icon={<FaDownload />} onClick={this.handleDownloadExcel} size='xs'/>
            </Flex>
           </Flex>
           </Flex>
           </Flex>
          </CardHeader>
        <Divider mt={0} />
        <CardBody width={'100%'} id='locationTable' p={1}>
        {this.stateDataCheck()?
          <Table
            ref = {this.ref}
            height={window.innerHeight * 0.7}
            data={this.state.data}
            virtualized
            bordered
            cellBordered
            loading={this.state.loading}
            onRowClick={(rowData) => {
              this.handleRowClick(rowData);
              this.setState({connectModal:true,rowData})
            }}
          >
            
            {
              this.state.data!==undefined?Array(this.state.data[0]).map((keys)=>( 
                Object.keys(keys).map((item)=>(
              <Column flexGrow={1} minWidth={200}>
                <HeaderCell>{item==='classification'?'Classification':item==='desc'?'Description':item==='undefined'?'':item}</HeaderCell>
                <Cell dataKey={item}></Cell>
              </Column>
                )) 
               
                ))
              :<></>
            }
          </Table>
:<></>}


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
        <Modal
            closeOnOverlayClick={false}
            isOpen={this.state.connectModal}
            onClose={()=>{
            this.setState({
              connectModal:!this.state.connectModal, 
            })}}
            size={'3xl'}
            // styleConfig={{overflow:'scroll'}}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{this.state.rowData?.classification} Charts</ModalHeader>
              <ModalCloseButton />
              <ModalBody px={8} py={6} gap={4}>
              <Tabs isLazy>   
                <TabList>
                  <Tab>Pie-chart</Tab>
                  <Tab>Line-chart</Tab>
                </TabList>  
                <TabPanels>
                  <TabPanel>
                    <ChartRender
                      type="bar"
                      data={this.state.chart_data}
                      series={this.state.classification}
                      categories={this.state.chart_categories}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ChartRender
                      type="line"
                      data={this.state.chart_data}
                      series={this.state.classification}
                      categories={this.state.chart_categories}
                    />   
                  </TabPanel>
                </TabPanels>
                </Tabs> 
                </ModalBody>
            </ModalContent>
          </Modal>
      </Card >
        
        
        </>);
    }
  }
  const mapStateToProps = (state) =>{
    console.log(state)
    return {
        dateFormat: state.dateFormat.value,
        periodFrom: state.dateFormat.periodFrom,
        periodTo: state.dateFormat.periodTo,
        periodSelect: state.dateFormat.periodSelect,
        dataLoading: state.dataFetch.dataLoading,
        periodSwitcher: state.dateFormat.periodSwitcher,
        defaultDateValue: state.dateFormat.defaultDateValue,
        location: state.locationSelectFormat.location,
        locationData: state.locationSelectFormat.locationData,
        companySwitcherActive: state.dateFormat.companySwitcherActive,

    }
  }

  //const mapDispatchToProps = { setPeriodFrom, setPeriodTo, setPeriodSelect, setDataLoading }; 

export default connect(mapStateToProps,{})(ComparatorTable);