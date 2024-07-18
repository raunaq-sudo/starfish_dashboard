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
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { Component, useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaCross, FaFileUpload, FaPlus, FaUnlink, } from 'react-icons/fa';
import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack,Button, Uploader, DateRangePicker, Table, Checkbox, CheckboxGroup } from 'rsuite';
import apiEndpoint from '../../config/data';
import { fetchData } from '../../utility/authFetch';



class DefineExclusionSettings
 extends Component {
    
  constructor(props) {
    super(props);
  this.state = { 
      screens:[],
      modalExclusionName : undefined
     } 

     this.handleChange = this.handleChange.bind(this)
    
    }
   
    
    fetchExclusionData = () =>{
      this.setState({exclusion_data:[]})
      this.setState({exclusion_data: fetchData('/api/get_exclusion_data/null/', 'GET', undefined)})
    }
    fetchPrivModalData = (value, role_name) =>{
      //console.log(this.state.exclusion_data.integrations)
      const body = new FormData()
      const data = fetchData('/api/get_exclusion_data/'  + value + '/', 'POST', body)
      if (data!==undefined){
        // assign states
      }

    }
    handleChange(value) {

      if(value!==undefined){
        this.setState({value:value})

      }
      console.log(value, 'handleChange');

    }

    openplParentHead = (integration_id) =>{
      this.setState({plParentHead:true, rowIntId:integration_id})
      

    }

    sendData = (type) =>{
      var alertResponse = this.sanityChecks(type)
      
     
      if (alertResponse===''){
        this.setState({exclusion_data:[], sendButtonLoading:true})
        var formData = new FormData()
        Object.keys(this.state).map((val)=>{
            if(val.startsWith('P_') || val.startsWith('I_')){
               formData.append(val, this.state[val])
             }
           }
   
         )
      
         
   
        if (type==='edit'){
          formData.append('exclusionName', document.getElementById('exclusionName').value)
        }
        
      
    

        this.state.rowExclId!==undefined ? formData.append('privId', this.state.rowExclId):  formData.append('privId', '')
  
        formData.append('type', type)
        
        const data = fetchData('/api/set_exclusion_data/', 'POST', formData)
          setTimeout(()=>{
              this.fetchPrivData()
            }, 500)

      }else{
        alert(alertResponse)
      }

     
    }

    sanityChecks = (type) =>{
      console.log('Sanity Checks')
      //console.log(document.getElementById('exclusionName').value==='')
      var flag = false
      var alertResponse = ''
      if (type==='edit'){
        flag = document.getElementById('exclusionName').value==='' || document.getElementById('exclusionName').value===null ? true : false
        if (flag){
          alertResponse = 'Exclusion name cannot be blank.'
        }
        else{
          this.state.exclusion_data.exclusion_data.map((item)=>{
            console.log(this.state.modalExclusionName)
              if ((this.state.modalExclusionName===undefined) && document.getElementById('exclusionName').value.toLowerCase()===item.description.toLowerCase()){
                alertResponse='Exclusion Name already exists.'
                
              }    
            
            })
        }}
        
      
     // if (type==='delete'){
     //   flag = true
     // }

      return alertResponse
    }




    componentDidMount = () =>{

      this.fetchExclusionData()
    }


    render() { 
      const { Column, HeaderCell, Cell } = Table;
        return (<>
        <Card minH={"700"}>
         <CardHeader>
         <Flex direction={'column'} gap={4}>
          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              size={'sm'}
              onClick={() => {
                this.setState({ connectModal: !this.state.connectModal, value:[], assignedIntegrations:undefined });
              }}
            >
              <Icon as={FaPlus} />
              <Text>Add Exclusion</Text>
            </Button>
          </Flex>
          
        </Flex>
        </CardHeader>
        {/*INtegration Modal*/}
        <Modal
          closeOnOverlayClick={false}
          isOpen={this.state.connectModal}
          onClose={()=>{this.setState({connectModal:!this.state.connectModal, modalExclusionName:undefined, assignedIntegrations:undefined, value:[]})}}
          size={'3xl'}
          height={400}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Define Exclusion {this.state.rowId!==undefined?this.state.rowId:''}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
              <Flex direction={'column'} gap={2}>
                {/* Exclusion name*/ }
                <Flex gap={2} justify={'space-between'}>
                  <Flex justifyContent={'start'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xs'}>Exclusion Name</Text>
                      </FormLabel>
                      <Input type="text" id='exclusionName' defaultValue={this.state.modalExclusionName!==undefined?this.state.modalExclusionName:''} />
                    </FormControl>
                  </Flex>
                </Flex>
                                
                 {/* Integration Table*/ }
                <Flex  p={1}>
                  {this.state.exclusion_data!==undefined? 
                  <Table data={this.state.exclusion_data.integrations} bordered width={'100%'} loading={this.state.sendButtonLoading}>
                    <Column  align="left" flexGrow={1}>
                      <HeaderCell>Integration Name</HeaderCell>
                      <Cell dataKey='app_name'/>
                    </Column>
                    <Column  align="center" flexGrow={1}>
                      <HeaderCell>Assign Integration</HeaderCell>
                      <Cell>
                      {rowData=>
                        //console.log(rowData)
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
                      }
                      </Cell>
                      
                    </Column>
                    <Column  align="center" flexGrow={1}>
                      <HeaderCell>Assign PL Heads</HeaderCell>
                      <Cell>
                      {rowData=>
                        <IconButton style={{marginBottom:1}} icon={<FaArrowAltCircleRight />} 
                          disabled={
                          document.getElementById(rowData.id)!==undefined && document.getElementById(rowData.id)!==null && this.state.exclusion_data[rowData.id]!==undefined?!document.getElementById(rowData.id).checked || this.state.exclusion_data[rowData.id].length===0:true
                        }
                        onClick={()=>{
                        this.setState({rowIntId:rowData.id, plParentHead:true}, ()=>{
                          //console.log(this.state.exclusion_data)
                          //console.log(this.state.exclusion_data[this.state.rowIntId])
                          
                        })
                      }}></IconButton>}
                      </Cell>
                      
                    </Column>
                    
                    
                  </Table>      
                  :<></>}
                            
                </Flex>

 
              </Flex>

            </ModalBody>

            <ModalFooter>
              <Flex width={'100%'} gap={2} justifyContent={'center'}>

                <Button appearance='primary' loading={this.state.sendButtonLoading} onClick={() => {
                  this.sendData('edit')

                }}  block>
                  Save
                </Button>
                <Button onClick={()=>{
                  this.setState({connectModal:!this.state.connectModal, modalExclusionName:undefined, value:[], rowIntId:undefined, rowExclId:undefined})
                }} flex={1} block>Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>

       {/**PL Head Modal */}
       <Modal
          closeOnOverlayClick={false}
          isOpen={this.state.plParentHead}
          size={'4xl'}
          onClose={()=>{this.setState({plParentHead:!this.state.plParentHead})}}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Assign PL Head</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
              
                                
           {/* PL Head Table*/ }
                <Flex gap={2} justify={'space-between'}>
                  {this.state.exclusion_data!==undefined?
                  <Table data={this.state.rowIntId!==undefined && this.state.exclusion_data[this.state.rowIntId]} bordered width={'100%'}>
                  <Column flexGrow={1} align="left">
                    <HeaderCell>PL Head Name</HeaderCell>
                    <Cell dataKey='description'>
                      </Cell>                  
                    </Column>
                  
                  <Column flexGrow={1} align="center">
                    <HeaderCell>...</HeaderCell>
                    <Cell>{rowData=>
                    //console.log(this.state.modalExclusionName)
                      <Checkbox defaultChecked={this.state.modalExclusionName===undefined||this.state.modalExclusionName===null?
                                            this.state['P_' + rowData.plparent_id + '_' + this.state.rowIntId]!==undefined?this.state['P_' + rowData.plparent_id + '_' + this.state.rowIntId]:false:rowData['assigned']} 
                      id={rowData.plparent_id} 
                      onChange={(value, checked)=>{
                        var key = ''
                        key = this.state.rowExclId!==undefined? 'P_' + rowData.plparent_id + '_' + this.state.rowIntId + '_' + this.state.rowExclId: 'P_' + rowData.plparent_id + '_' + this.state.rowIntId
                        var obj = {}
                        obj[key] = checked
                        this.setState(obj)
                      }}>
                        
                      </Checkbox>
                    }</Cell>
                  </Column>
                    
                    
                  </Table>   :<></>}
                                
                </Flex>

 
       

            </ModalBody>

            <ModalFooter>
              <Flex width={'100%'} gap={2} justifyContent={'center'}>

                <Button appearance='primary' onClick={() => {
                  this.setState({plParentHead:!this.state.plParentHead, rowIntId:undefined})
                }} loading={this.state.saveBtnLoading} block>
                  Assign PL Head
                </Button>
                <Button onClick={()=>{
                  this.setState({plParentHead:!this.state.plParentHead, rowIntId:undefined})
                  }} flex={1} block>Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>

        <CardBody justifyContent={'center'}>
          {this.state.exclusion_data!==undefined?
        <Table
            height={600}
            data={this.state.exclusion_data.exclusion_data}
            bordered
            
          >


            <Column width={200} flexGrow={1}  align="left" >
              <HeaderCell>Exclusion Name</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column width={200} align='center' flexGrow={1} >
              <HeaderCell>Created on</HeaderCell>
              <Cell dataKey="created_date" />
            </Column>

           

            
            <Column width={200}  align="center" flexGrow={1}>
              <HeaderCell>...</HeaderCell>

              <Cell style={{ paddingLeft: '30px' }}>
                {rowData => (
                  <Flex gap={2}>
                    <Button appearance="link" onClick={() => this.fetchPrivModalData(rowData.priviledge_id, rowData.description, 'edit')} loading={this.state.tableButtonLoading}>
                      Edit
                    </Button>
                    <Button appearance="link" onClick={() => {
                          console.log(rowData.priviledge_id)
                            this.setState({rowExclId:rowData.priviledge_id}, ()=>{
                               
                                  this.sendData('delete')
                            })
                            
                        }} loading={this.state.tableButtonLoading}>
                      Delete
                    </Button>
                  </Flex>
                  
                )}
              </Cell>
            </Column>
          </Table>
          :<></>}
        </CardBody>
        </Card>
        </>);
    }
}
 
export default DefineExclusionSettings
;