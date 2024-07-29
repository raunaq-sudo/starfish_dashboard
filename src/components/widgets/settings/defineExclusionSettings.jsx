import {
  Card,
  CardBody,
  CardHeader,
  //Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { Component, useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaCross, FaFileUpload, FaPlus, FaUnlink, } from 'react-icons/fa';
// import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack,Button, Uploader, DateRangePicker, Table, Checkbox, CheckboxGroup } from 'rsuite';
import apiEndpoint from '../../config/data';
// import { fetchData } from '../../utility/authFetch';
import FuzzySearch from 'fuzzy-search';


class DefineExclusionSettings
 extends Component {
    
  constructor(props) {
    super(props);
  this.state = { 
      screens:[],
      modalExclusionName : undefined, 
      plSearch:[],
      plParents:[]
     } 

     this.handleChange = this.handleChange.bind(this)
    
    }
    
    fetchData =   (url, method, body, state)=>{
      // this.setState({returnData:undefined})
      if (method==='POST'){
           fetch(apiEndpoint + url, {
              headers: { "Authorization": "Bearer " + localStorage['access'] },
              method: method,
              body:body
          }).then(response => response.json())
          .then(data => {
              if (data.code === undefined) {
                //  this.setState({returnData:data}, ()=>{
                //   // console.log(this.state.returnData)
                //   // if (this.state.returnData.alert!==undefined){
                //   //   alert(this.state.returnData.alert)
                //   // }
                //  })
                
              } else {
                  window.open("/login", "_self")
                  alert('Session Expired!.')
              }
          })
          .catch(error => console.error(error))
      } else{
        if(method==='GET'){
          fetch(apiEndpoint + url, {
              headers: { "Authorization": "Bearer " + localStorage['access'] },
              method: method,
          }).then(response => response.json())
          .then(data => {
              if (data.code === undefined) {
                var obj = {}
                obj[state] = data
                 this.setState(obj, ()=>{
                  console.log(data)
                 })
              } else {
                  window.open("/login", "_self")
                  alert('Session Expired!.')
              }
          })
          .catch(error => console.error(error))
      }
    }

  }
  




    
    fetchExclusionData = () =>{
      this.setState({excl_data:[], 
        // saveBtnLoading:true,
        // sendButtonLoading:true,
      })
        this.fetchData('/api/get_exclusion_data/null/', 'GET', undefined, "excl_data")
      
      this.state.excl_data!==undefined && console.log(this.state.excl_data.excl_data)
      this.setState({saveBtnLoading:false, sendButtonLoading:false,
        rowExclId:undefined,
        assignedIntegrations:undefined, 
        assignedPLParent:undefined, 
        modalExclusionName:''
      })
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
      // var alertResponse = this.sanityChecks(type)
      const alertResponse = ''
     
      if (alertResponse===''){
        // this.setState({sendButtonLoading:true})
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
        
      
    

        this.state.rowExclId!==undefined  ? formData.append('exclId', this.state.rowExclId):  formData.append('exclId', '')
  
        formData.append('type', type)
        
        this.fetchData('/api/set_exclusion_data/', 'POST', formData, [])


        
        

            // if (this.state.returnData===undefined || this.state.returnData===null){
            setTimeout(()=>{
              this.fetchExclusionData()
              this.setState({sendButtonLoading:false, connectModal:false})
              console.log(this.state)
            }, 4000)
            // } else{
              // alert(this.state.returnData.alert)
              
            // }
            

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
          this.state.excl_data.excl_data.map((item)=>{
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


    returnIndex = (arr, id) =>{
      // console.log(arr)
      // console.log(arr.length)
      var indexExcl = undefined
      if (arr.length>0){
        var i = arr.length
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          // console.log(id)
          if (element['id']===id){
            // console.log(index)
            indexExcl = index
          }
          
        }

      }
      return indexExcl
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
                this.setState({ connectModal: !this.state.connectModal, value:[], assignedIntegrations:undefined, rowExclId:undefined });
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
            <ModalHeader>Define Exclusion {this.state.rowExclId!==undefined?this.state.rowExclId:''}</ModalHeader>
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
                  {this.state.excl_data!==undefined? 
                  <Table data={this.state.excl_data.integrations} bordered width={'100%'} loading={this.state.sendButtonLoading}>
                    <Column  align="left" flexGrow={1}>
                      <HeaderCell>Integration Name</HeaderCell>
                      <Cell dataKey='app_name'/>
                    </Column>
                    <Column  align="center" flexGrow={1}>
                      <HeaderCell>Exclude Integration</HeaderCell>
                      <Cell>
                      {rowData=>
                        //console.log(rowData)
                          <Checkbox id = {rowData.id} defaultChecked={
                            this.state.connectModal && this.state.rowExclId===undefined?false:
                            this.state['I_' + rowData.id]!==undefined?this.state['I_' + rowData.id]:
                            this.state.assignedIntegrations!==undefined ? this.state.assignedIntegrations.includes(rowData.id): false
                          } 
                          onChange={(value, checked)=>{
                            console.log(checked)
                            var key = ''
                            key = 'I_' + rowData.id
                            var obj = {}
                            obj[key] = checked
                            this.setState(obj, ()=>{
                              console.log(key, this.state[key])
                            })
                            
                          }
                        }
                          />
                      }
                      </Cell>
                      
                    </Column>
                    <Column  align="center" flexGrow={1}>
                      <HeaderCell>Exclude Accounts</HeaderCell>
                      <Cell>
                      {rowData=>
                        <IconButton style={{marginBottom:1}} icon={<FaArrowAltCircleRight />} 
                          disabled={
                          document.getElementById(rowData.id)!==undefined && document.getElementById(rowData.id)!==null && this.state.excl_data[rowData.id]!==undefined?!document.getElementById(rowData.id).checked || this.state.excl_data[rowData.id].length===0:true
                        }
                        onClick={()=>{
                          const index = this.returnIndex(this.state.excl_data.excl_data, this.state.rowExclId)
                        this.setState({rowIntId:rowData.id, 
                          assignedPLParent:index!==undefined?this.state.excl_data.excl_data[index]['assigned_plparent_' + rowData.id]:[],
                          plParentHead:true, plParents:this.state.excl_data[rowData.id], plSearch:[], showTable:true}, ()=>{
                          //console.log(this.state.excl_data)
                          //console.log(this.state.excl_data[this.state.rowIntId])
                          
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
                  this.setState({sendButtonLoading:true})
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
          size={'xl'}
          onClose={()=>{this.setState({plParentHead:!this.state.plParentHead})}}
          
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Exclude Accounts</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6} minHeight={500} >
              
                                
           {/* PL Head Table*/ }
                <Flex gap={2} justify={'space-between'} direction={'column'}>
                <FormControl>
                      <FormLabel>
                        <Text fontSize={'xs'}>Search</Text>
                      </FormLabel>
                      <Input type="text" id='search' onChange={(value)=>{
                        this.setState({plSearch:[], plLoading:true, showTable:false})
                        const searcher = new FuzzySearch(this.state.plParents, ['desc', 'pk'], {
                          caseSensitive: false,
                        });
                        if(document.getElementById('search').value!==''){
                          const result = searcher.search(document.getElementById('search').value)
                          this.setState({plSearch:result, plLoading:false },()=>{
                            console.log(result)
                          })
                          
                        }else{
                          this.setState({plSearch:[], plLoading:false})
                        }
                        setTimeout(()=>{
                          this.setState({showTable:true})
                        }, 10)
                      }}
                      placeholder='Enter search text here..'
                      />
                    </FormControl>
                  {this.state.excl_data!==undefined?

                  <Table data={this.state.showTable?this.state.plSearch.length===0?this.state.plParents:this.state.plSearch:[]} 
                          bordered 
                          virtualized
                          height={500}
                          loading={this.state.plLoading}
                          width={'100%'}
                          
                          >
                  <Column flexGrow={1} align="left">
                    <HeaderCell>Account Name</HeaderCell>
                    <Cell dataKey='desc'>
                      </Cell>                  
                    </Column>
                  
                  <Column flexGrow={1} align="center">
                    <HeaderCell>...</HeaderCell>
                    <Cell>{rowData=>
                    //console.log(this.state.modalExclusionName)
                      <Checkbox defaultChecked={this.state.modalExclusionName===undefined||this.state.modalExclusionName===null?
                                            this.state['P_' + rowData.pk + '_' + this.state.rowIntId]!==undefined?
                                            this.state['P_' + rowData.pk + '_' + this.state.rowIntId]:false:
                                            this.state['P_' + rowData.pk + '_' + this.state.rowIntId + '_' + this.state.rowExclId]!==undefined?
                                            this.state['P_' + rowData.pk + '_' + this.state.rowIntId + '_' + this.state.rowExclId]:
                                          this.state.assignedPLParent!==undefined ? this.state.assignedPLParent.includes(rowData.pk):
                                          this.state.connectModal && this.state.rowExclId===undefined?false:false
                                      } 
                      id={rowData.pk} 
                      onChange={(value, checked)=>{
                        var key = ''
                        key = this.state.rowExclId!==undefined? 'P_' + rowData.pk + '_' + this.state.rowIntId + '_' + this.state.rowExclId: 'P_' + rowData.pk + '_' + this.state.rowIntId
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
                  this.setState({plParentHead:!this.state.plParentHead, rowIntId:undefined, plParents:[], plSearch:[]})
                }} loading={this.state.saveBtnLoading} block>
                  Exclude Accounts
                </Button>
                <Button onClick={()=>{
                  this.setState({plParentHead:!this.state.plParentHead, rowIntId:undefined, plParents:[], plSearch:[]})
                  }} flex={1} block>Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>

        <CardBody justifyContent={'center'}>
          {this.state.excl_data!==undefined?
        <Table
            
            data={this.state.excl_data.excl_data}
            bordered
            loading = {this.state.excl_data.excl_data===undefined}
            virtualized
            fillHeight
            
          >


            <Column width={200} flexGrow={1}  align="left" >
              <HeaderCell>Exclusion Name</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            {/* <Column width={200} align='center' flexGrow={1} >
              <HeaderCell>Created on</HeaderCell>
              <Cell dataKey="created_date" />
            </Column> */}

           

            
            <Column width={200}  align="center" flexGrow={1}>
              <HeaderCell>...</HeaderCell>
              {/* <Cell></Cell> */}
              <Cell style={{ paddingLeft: '30px' }}>
                {rowData => (
                  <Flex gap={2}>
                    <Button appearance="link" onClick={() => {
                      
                      this.setState({connectModal:true, 
                        rowExclId:rowData.id, 
                        modalExclusionName:rowData.description,
                      assignedIntegrations:rowData.assigned_integrations})
                      // assignedPLParent:rowData.assigned_plparent})
                      }}>
                      Edit
                    </Button>
                    <Button appearance="link" onClick={() => {
                          console.log(rowData.id)
                            this.setState({rowExclId:rowData.id}, ()=>{    
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