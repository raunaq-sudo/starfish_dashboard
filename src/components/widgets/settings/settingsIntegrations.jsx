import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  //Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  Tag,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaFileUpload, FaPlus, } from 'react-icons/fa';
import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack,Button, Uploader, DateRangePicker } from 'rsuite';
import inuit from '../../config/inuitConfig';
import apiEndpoint from '../../config/data';
import { isThisSecond } from 'date-fns';
import CustomDateRangePicker from '../../utility/dateRangePicker';



class IntegrationSetting extends Component {
  state = {
    connectModal: false,
    captureLocation: false,
    quickbooksType:false,
    syncButtonLoading:false,
    saveBtnLoading:false,
    locationAttr:false,
    integration_type:'online',
    uploadBtnLoading:false,
    excelUploadData:[],
    apps: [
      {
      app_name: 'Quickbook',
      company_id: '123456789',
      integration_type: 'Online',
      last_sync: '2023-12-23',
      daily_sync: 'On',
      connected:true
    }
  ],

  };

  handleAuth = async (id) => {
    this.setState({syncButtonLoading:true})
    var data = new FormData()
    data.append('client_id', this.state.client_id)
    data.append('secret_key', this.state.secret_key)
    data.append('inuit_company_id', this.state.inuit_company_id)
    data.append('type', inuit['type'])
    data.append('integration_id', id)

    localStorage.setItem('integration_id', id)

    await fetch(apiEndpoint + '/api/inuit_auth/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'POST',
      body: data,

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.redirect(data)

      }).catch(err => {
        console.error(err)
        alert('Error occured.')
      })
      this.setState({syncButtonLoading:false})
  }

  redirect = (url) => {
    this.setState({ modalButtonLoading: false, modalOpen: false })
    window.open(url)
  }

  fetchIntegrations = async () =>{
    this.setState({apps:[]})
    await fetch(apiEndpoint + '/api/auth_update/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'GET',

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({apps:data['integration']})

      }).catch(err => {
        console.error(err)
        alert('Error occured.')
      })
  }



  sendData = async () =>{
    this.setState({saveBtnLoading:true})
    var data = new FormData()
    data.append('app_name',document.getElementById('appName').value)
    data.append('integration_type',this.state.integration_type)
    data.append('capture_location',this.state.captureLocation?'true':'false')
    data.append('location_attr',this.state.locationAttr?'true':'false')
    console.log(data)
    await fetch(apiEndpoint + '/api/add_integration/',{
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method:'POST',
      body:data
    }).then(response=>response.json())
    .then(data=>{
      this.setState({apps:data['integration']})
    }).catch((err)=>alert("Error Occured!."))
    this.setState({saveBtnLoading:false, connectModal:!this.state.connectModal})
  }


  handleUpload = async (id) =>{
    
  }


  setFormDataDate = (value) =>{
    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())
    this.setState({excelUploadData: {from_date:fromDate, to_date: toDate, integration_id:this.state.int_id}})
  }
  
  
  
  componentDidMount = () =>{
    this.fetchIntegrations()
  }

  objToJson = (key, value) => {
    var res = {}
    res[key] = value
    console.log(res)
    return res
}



  render() {
    return (
      <>
        <Flex direction={'column'} gap={4}>
          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              size={'sm'}
              onClick={() => {
                this.setState({ connectModal: !this.state.connectModal });
              }}
            >
              <Icon as={FaPlus} />
              <Text>Add Integration</Text>
            </Button>
          </Flex>
          <Accordion allowToggle >
            {this.state.apps? this.state.apps.map((item) => (
            <AccordionItem>
              <h3>
              <AccordionButton onClick={()=>{this.setState({int_id:item.id})}}>
                <Box flex={1} textAlign={'left'} fontSize={'sm'}>
                  <Heading size={'sm'}>{item.app_name}</Heading>

                </Box>
                <Flex
                  flex={1}
                  justifyContent={'flex-end'}
                  gap={4}
                  alignItems={'center'}
                >

                  <Tag
                    colorScheme={item.inuit_company_id!==undefined && item.inuit_company_id!==null? 'green' : 'red'}
                    justifyContent={'center'}
                  >
                    {item.inuit_company_id!==undefined && item.inuit_company_id!==null? 'Connected' : 'Disconnected'}
                  </Tag>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              </h3>
              <AccordionPanel flexDirection={'column'} gap={3}>
                <Flex flex={1} gap={2}>
                  <Flex flex={1}>
                    <Heading size={'xs'} p={1}>Intuit Company ID:</Heading>
                    <Text p={1} size={'xs'}>{item.inuit_company_id}</Text>
                  </Flex>
                  <Flex flex={1} justifyContent={'start'}>
                    <Heading size={'xs'} p={1}>Integration Type:</Heading>
                    <Text pt={1} pb={1} size={'xs'}>{item.integration_type}</Text>
                  </Flex>
                </Flex>
                <Flex flex={1} gap={2}>
                  <Flex flex={1}>
                    <Heading size={'xs'} p={1}>Date of last sync:</Heading>
                    <Text p={1} size={'xs'}>{item.date_updated}</Text>
                  </Flex>
                  <Flex flex={1} justifyContent={'start'}>
                    <Heading size={'xs'} p={1}>Daily sync status:</Heading>
                    <Text pt={1} pb={1} size={'xs'}>{item.daily_sync}</Text>
                  </Flex>
                </Flex>
                {item.integration_type==='online'?<Flex flex={1} justifyContent={'center'}>
                  <IconButton as={Button} icon={<IoMdRefresh />} flex={1} onClick={() => { this.handleAuth(item.id) }} loading={this.state.syncButtonLoading}>
                    <Text p={2}>Sync with quickbooks</Text></IconButton>
                </Flex>:<Flex direction={'column'} gap={2}>
                <Flex gap={2}>
                  <Heading size={'xs'} width={'40%'} flex={1}>Date Range for data in excel upload:</Heading>
                  <Flex flex={1}>
                  <CustomDateRangePicker dateValue = {this.setFormDataDate}/>

                  </Flex>
                </Flex>
                <Flex width={'100%'} justifyContent={'center'}>
                    <Uploader
                        listType="picture-text"
                        action={apiEndpoint + "/api/xls_fileupload_user/"}
                        draggable
                        autoUpload
                        headers={{ "Authorization": "Bearer " + localStorage['access'] }}
                        method='POST'
                        data={this.state.excelUploadData}
                        multiple={false}
                        accept='.xls,.csv,.xlsx'
                        disabledFileItem
                        disabled={this.state.excelUploadData.length===0?true:this.state['fl' + item.id]}
                        onChange={(filelist)=>{
                          if(filelist.length===1){
                            this.setState(this.objToJson('fl' + item.id, true))
                          }
                        }}
                        
                        >
                        <div style={{width:500, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Click or Drag files to this area to upload. Files will get uploaded automatically</span>
                        </div>

                      </Uploader>
              </Flex>
                
                </Flex>}
                
              </AccordionPanel>
            </AccordionItem>)) : <>
              
            
            </>
            }
          </Accordion>
        </Flex>

        {/*Modal*/}
        <Modal
          closeOnOverlayClick={false}
          isOpen={this.state.connectModal}
          onClose={()=>{this.setState({connectModal:!this.state.connectModal})}}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Integrations</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={'column'} gap={2}>
                <Flex gap={2} justify={'space-between'}>
                  <Flex justifyContent={'start'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xs'}>App Name</Text>
                      </FormLabel>
                      <Input type="text" id='appName' />
                    </FormControl>
                  </Flex>


                </Flex>
                <Flex>

                  <RadioGroup defaultValue='online' id='appType' >
                    <Stack spacing={5} direction='column' onChange={(e)=>{this.setState({integration_type:e.target.value})}}>

                      <Radio colorScheme='green' value='online' id='online' >
                        Quickbooks Online
                      </Radio>
                      <Radio colorScheme='green' value='offline' pl={3} id='desktop'>
                        Quickbooks Desktop
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
                <Flex direction={'row'}>
                  <Flex alignItems={'center'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xxs'}>Capture Location</Text>
                      </FormLabel>
                      <Switch onChange={()=>{this.setState({captureLocation:!this.state.captureLocation})}} />
                    </FormControl>
                  </Flex>
                  <Flex alignItems={'center'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xxs'}>Location Attribute</Text>
                      </FormLabel>
                      <Switch onChange={()=>{this.setState({locationAttr:!this.state.locationAttr})}}/>
                    </FormControl>
                  </Flex>
                </Flex>
              </Flex>

            </ModalBody>

            <ModalFooter>
              <Flex width={'100%'} gap={2} justifyContent={'center'}>

                <Button appearance='primary' onClick={() => {
                  this.sendData()

                }} loading={this.state.saveBtnLoading} block>
                  Save
                </Button>
                <Button onClick={()=>{this.setState({connectModal:!this.state.connectModal})}} flex={1} block>Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>


      
      </>
    );
  }
}

export default IntegrationSetting;
