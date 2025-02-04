import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  //Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Image,
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
  Spinner,
  Switch,
  Tag,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { Component, useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaCross, FaFileUpload, FaPlus, FaUnlink, } from 'react-icons/fa';
import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack,Button, Uploader, DateRangePicker, Table, Checkbox, CheckboxGroup } from 'rsuite';
import apiEndpoint from '../../config/data';

const { Column, HeaderCell, Cell } = Table;

class DefinePrivSettings extends Component {
    
  constructor(props) {
    super(props);
  this.state = { 
      screens:[],
      modalPrivName : undefined
     } 

     this.handleChange = this.handleChange.bind(this)
    
    }
   
    
    fetchPrivData = () =>{
      this.setState({priv_data:[]})
      fetch(apiEndpoint + '/api/get_priv_data/null/', {
        headers: { "Authorization": "Bearer " + localStorage['access'] }
        }).then(response => response.json())
            .then(data => {
                //console.log(data)
                if (data.code === undefined) {
                    this.setState({ priv_data: data }, ()=>{
                    console.log(this.state.priv_data)
                    })
                } else {
                    window.open("/login", "_self")
                    alert('Session Expired!.')
                }


            }).catch(err => console.log(err))
            console.log('2')

          this.setState({connectModal:false, modalPrivName:undefined})

    }
    fetchPrivModalData = (value, role_name) =>{
      //console.log(this.state.priv_data.integrations)
      this.setState({tableButtonLoading:true, modalPrivName:role_name, rowPrivId:value})
      fetch(apiEndpoint + '/api/get_priv_data/' + value + '/', {
        headers: { "Authorization": "Bearer " + localStorage['access'] }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === undefined) {
                    this.setState({ priv_data: data, connectModal:!this.state.connectModal, 
                      assignedIntegrations:data.assigned_integrations}, ()=>{
                     // console.log(this.state.assignedIntegrations)
                      
                    })
                } else {
                    window.open("/login", "_self")
                    alert('Session Expired!.')
                }


            }).catch(err => console.log(err))
            this.setState({tableButtonLoading:false})
    }
    handleChange(value) {

      if(value!==undefined){
        this.setState({value:value})

      }
      console.log(value, 'handleChange');

    }

    openLocationModal = (integration_id) =>{
      this.setState({locationModal:true, rowIntId:integration_id})
      

    }

    sendData = (type) =>{
      var alertResponse = this.sanityChecks(type)
      
     
      if (alertResponse===''){
        this.setState({priv_data:[], sendButtonLoading:true})
        var formData = new FormData()
        Object.keys(this.state).map((val)=>{
            if(val.startsWith('P_') || val.startsWith('I_')){
               formData.append(val, this.state[val])
             }
           }
   
         )
      
         
   
        if (type==='edit'){
          formData.append('privName', document.getElementById('privName').value)
        }
        
      
    

        this.state.rowPrivId!==undefined ? formData.append('privId', this.state.rowPrivId):  formData.append('privId', '')
  
        formData.append('type', type)
        
        fetch(apiEndpoint + '/api/set_priv_data/', {
          headers: { "Authorization": "Bearer " + localStorage['access'] },
          method:'POST',
          body: formData
          }).then(response => response.json())
              .then(data => {
                  //console.log(data)
                  if (data.code === undefined) {
                      //this.setState({ priv_data: data }, ()=>{
                    //   console.log(this.state.priv_data)
                      }
                  else {
                      window.open("/login", "_self")
                      alert('Session Expired!.')
                  }
    
    
              }).catch(err => console.log(err))
              
          setTimeout(()=>{
              this.fetchPrivData()
            }, 500)
          this.setState({assignedIntegrations:undefined,priv_data:[], modalPrivName:undefined, value:[], rowIntId:undefined, rowPrivId:undefined, sendButtonLoading:false})


      }else{
        alert(alertResponse)
      }

     
    }

    sanityChecks = (type) =>{
      console.log('Sanity Checks')
      //console.log(document.getElementById('privName').value==='')
      var flag = false
      var alertResponse = ''
      if (type==='edit'){
        flag = document.getElementById('privName').value==='' || document.getElementById('privName').value===null ? true : false
        if (flag){
          alertResponse = 'Privilege name cannot be blank.'
        }
        else{
          this.state.priv_data.priv_data.map((item)=>{
            console.log(this.state.modalPrivName)
              if ((this.state.modalPrivName===undefined) && document.getElementById('privName').value.toLowerCase()===item.description.toLowerCase()){
                alertResponse='Privilege Name already exists.'
                
              }    
            
            })
        }}
        
      
     // if (type==='delete'){
     //   flag = true
     // }

      return alertResponse
    }




    componentDidMount = () =>{

      this.fetchPrivData()
    }


    render() {
      return (
        <Card minH="700px" p={5} borderRadius="lg" shadow="xl">
          {/*  Updated Header (Matches AuthorisationSettings) */}
          <CardHeader bg="gray.100" p={4} borderRadius="md">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold" color="orange">Define Privileges</Text>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={() => this.setState({ connectModal: !this.state.connectModal, value:[], assignedIntegrations:undefined })}
              >
                <Icon as={FaPlus} mr={2} /> Add Privilege
              </Button>
            </Flex>
          </CardHeader>
  
          {/*  Table Section */}
          <CardBody>
            <Flex direction="column">
              {this.state.loading ? (
                <Flex justify="center" align="center" height="400px">
                  <Spinner size="xl" />
                </Flex>
              ) : (
                <Table
                  height={500}
                  data={this.state.priv_data?.priv_data || []}
                  bordered
                  cellBordered
                  loading={this.state?.priv_data?.priv_data===undefined}
                >
                  <Column flexGrow={1} minWidth={200}>
                    <HeaderCell>Privilege Name</HeaderCell>
                    <Cell dataKey="description" />
                  </Column>
  
                  <Column flexGrow={1} minWidth={200}>
                    <HeaderCell>Created On</HeaderCell>
                    <Cell dataKey="created_date" />
                  </Column>
  
                  <Column width={200} minWidth={150} flexGrow={1} align="center">
                    <HeaderCell>Actions</HeaderCell>
                    <Cell>
                      {rowData => (
                        <Flex gap={3} justifyContent="center">
                          <Button
                            size="xs"
                            colorScheme="blue"
                            onClick={() => this.fetchPrivModalData(rowData?.priviledge_id, rowData.description, 'edit')} 
                            loading={this.state.tableButtonLoading}
                          >
                            Edit
                          </Button>
                          <Button
                            size="xs"
                            colorScheme="red"
                            onClick={() => {
                              this.setState({ rowPrivId: rowData.priviledge_id }, () => this.sendData('delete'));
                            }}
                            loading={this.state.tableButtonLoading}
                          >
                            Delete
                          </Button>
                        </Flex>
                      )}
                    </Cell>
                  </Column>
                </Table>
              )}
            </Flex>
          </CardBody>
  
           {/*INtegration Modal*/}
          <Modal closeOnOverlayClick={false} isOpen={this.state.connectModal} onClose={() => this.setState({ connectModal:!this.state.connectModal, modalPrivName:undefined, assignedIntegrations:undefined, value:[]})} size={{sm:'md',md:'2xl',lg:'3xl'}} >
            <ModalOverlay />
            <ModalContent borderRadius="md">
              <ModalHeader color="orange">Define Privilege {this.state.rowId!==undefined?this.state.rowId:''}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Privilege Name</FormLabel>
                    <Input type="text" id="privName" defaultValue={this.state.modalPrivName!==undefined?this.state.modalPrivName:''} />
                  </FormControl>
                  {/* Integration Table*/ }
                <Flex  p={1}>
                  {this.state.priv_data!==undefined?
                  <Table data={this.state.priv_data.integrations} bordered width={'100%'} loading={this.state.sendButtonLoading}>
                    <Column  align="left" flexGrow={1}>
                      <HeaderCell>Integration Name</HeaderCell>
                      <Cell dataKey='app_name'/>
                    </Column>
                    <Column  align="center" flexGrow={1}>
                      <HeaderCell>Assign Integration</HeaderCell>
                      <Cell>
                      {rowData=>
                        //console.log(rowData)
                        <Flex justify="center" align="center" height="100%">
                          <Checkbox id = {rowData.id} defaultChecked={this.state.assignedIntegrations!==undefined ? this.state.assignedIntegrations.includes(rowData.id): false}
                          onChange={(value, checked)=>{
                        
                            var key = ''
                            key = 'I_' + rowData.id
                            var obj = {}
                            obj[key] = checked
                            this.setState(obj)
                            console.log(this.state[key])
                          }
                        }
                          />
                        </Flex>
                      }
                      </Cell>
                      
                    </Column>
                    <Column  align="center" flexGrow={1}>
                      <HeaderCell>Assign Locations</HeaderCell>
                      <Cell>
                      {rowData=>
                      <Flex justify="center" align="center" height="100%">
                        <IconButton style={{marginBottom:1}} icon={<FaArrowAltCircleRight />}
                          disabled={
                          document.getElementById(rowData.id)!==undefined && document.getElementById(rowData.id)!==null && this.state.priv_data[rowData.id]!==undefined?!document.getElementById(rowData.id).checked || this.state.priv_data[rowData.id].length===0:true
                        }
                        onClick={()=>{
                        this.setState({rowIntId:rowData.id, locationModal:true}, ()=>{
                          //console.log(this.state.priv_data)
                          //console.log(this.state.priv_data[this.state.rowIntId])
                          
                        })
                      }}></IconButton>
                      </Flex>}
                      </Cell>
                      
                    </Column>
                    
                    
                  </Table>      
                  :<></>}
                            
                </Flex>
                </VStack>
              </ModalBody>
              <ModalFooter gap={3}>
                <Button colorScheme="blue" isLoading={this.state.sendButtonLoading} onClick={() => {
                  this.sendData('edit')

                }}>Save</Button>
                <Button onClick={()=>{
                  this.setState({connectModal:!this.state.connectModal, modalPrivName:undefined, value:[], rowIntId:undefined, rowPrivId:undefined})
                }}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
  
          {/*Location Modal */}
          <Modal closeOnOverlayClick={false} isOpen={this.state.locationModal} size={'4xl'}
          onClose={()=>{this.setState({locationModal:!this.state.locationModal})}}>
            <ModalOverlay />
            <ModalContent borderRadius="md">
              <ModalHeader>Assign Location</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Location Table*/ }
                <Flex gap={2} justify={'space-between'}>
                  {this.state.priv_data!==undefined?
                  <Table data={this.state.rowIntId!==undefined && this.state.priv_data[this.state.rowIntId]} bordered width={'100%'}>
                  <Column flexGrow={1} align="left">
                    <HeaderCell>Location Name</HeaderCell>
                    <Cell dataKey='description'>
                      </Cell>                  
                    </Column>
                  
                  <Column flexGrow={1} align="center">
                    <HeaderCell>...</HeaderCell>
                    <Cell>{rowData=>
                    //console.log(this.state.modalPrivName)
                    <Flex justify="center" align="center" height="100%">
                      <Checkbox defaultChecked={this.state.modalPrivName===undefined||this.state.modalPrivName===null?
                                            this.state['P_' + rowData.location_id + '_' + this.state.rowIntId]!==undefined?this.state['P_' + rowData.location_id + '_' + this.state.rowIntId]:false:rowData['assigned']} 
                      id={rowData.location_id} 
                      onChange={(value, checked)=>{
                        var key = ''
                        key = this.state.rowPrivId!==undefined? 'P_' + rowData.location_id + '_' + this.state.rowIntId + '_' + this.state.rowPrivId: 'P_' + rowData.location_id + '_' + this.state.rowIntId
                        var obj = {}
                        obj[key] = checked
                        this.setState(obj)
                      }}>
                        
                      </Checkbox>
                      </Flex>
                    }</Cell>
                  </Column>
                    
                    
                  </Table>   :<></>}
                                
                </Flex>
              </ModalBody>
              <ModalFooter>
              <Flex width={'100%'} gap={2} justifyContent={'center'}>

                <Button appearance='primary' color='orange' onClick={() => {
                  this.setState({locationModal:!this.state.locationModal, rowIntId:undefined})
                }} loading={this.state.saveBtnLoading} block>
                  Assign Location
                </Button>
                <Button onClick={()=>{
                  this.setState({locationModal:!this.state.locationModal, rowIntId:undefined})
                  }} flex={1} block style={{marginTop:0}}>Cancel</Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
      );
    }
}
 
export default DefinePrivSettings;