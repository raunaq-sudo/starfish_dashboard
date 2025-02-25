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
import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';


class DefineExclusionSettingsNew
 extends Component {
    
  constructor(props) {
    super(props);
  this.state = { 
      screens:[],
      modalExclusionName : undefined, 
      plSearch:[],
      plParents:[],
      tablevirtualizesd:true
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
                var obj = {}
                obj[state] = data
                 this.setState(obj, ()=>{
                  console.log(data)
                 })
                 this.setState({sendButtonLoading:false, connectModal:false})
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
      var alertResponse = this.sanityChecks(type)
      // const alertResponse = ''
     
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
        
        this.fetchData('/api/set_exclusion_data/', 'POST', formData, 'excl_data')


        
        

            // if (this.state.returnData===undefined || this.state.returnData===null){
            // setTimeout(()=>{
            //   // this.fetchExclusionData()
            //   this.setState({sendButtonLoading:false, connectModal:false})
            //   console.log(this.state)
            // }, 4000)
            // } else{
              // alert(this.state.returnData.alert)
              
            // }
            

      }else{
        alert(alertResponse)
        this.setState({sendButtonLoading:false})
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
          if(this.state.modalExclusionName===undefined) {
            this.state.excl_data.excl_data.forEach((item)=>{
              if (document.getElementById('exclusionName').value.toLowerCase()===item.description.toLowerCase()){
                alertResponse='Exclusion Name already exists.'
                
              }    
            
            })
        }
      }
        
      
     // if (type==='delete'){
     //   flag = true
     // }

      return alertResponse
    }
  
  indepthSearch=(pk, plParents)=>{
    plParents.forEach((item)=>{
      if(item.pk === pk){
        this.setState({tempItem:item})

      }
    })
    plParents.forEach((item)=>{
        if (item.children!==undefined){
          this.indepthSearch(pk, item.children)
        }
      })
    
  }

  checkingMagic(value, checked, rowData, plParents) {
     // Define the key based on the existence of rowExclId
    var key = this.state.rowExclId !== undefined ? 
    'P_' + rowData.pk + '_' + this.state.rowIntId + '_' + this.state.rowExclId : 
    'P_' + rowData.pk + '_' + this.state.rowIntId;

    // Create an object to update the state
    var obj = {};
    obj[key] = checked;
    console.log(obj)
    this.setState(obj);

    // Recursive call for children items
    if (plParents !== undefined ) {
      plParents.forEach((items) => {
        if (items.children!==undefined){
          this.checkingMagic(undefined, checked, items, []);
          items.children.forEach((children_item) => {
              this.checkingMagic(undefined, checked, children_item, items.children);
          });
          


        }else{

          this.checkingMagic(undefined, checked, items, []);
        }
          
      });
  }
     
      
  }
  
    checkedFlag = (rowData) =>{
      var flag = false
      /// new exclusion
      if(this.state.rowExclId===undefined){
        flag = this.state['P_' + rowData.pk + '_'+this.state.rowIntId]!==undefined? 
                this.state['P_' + rowData.pk + '_'+this.state.rowIntId]:false

      }else{
        flag = this.state['P_' + rowData.pk + '_'+this.state.rowIntId + "_" + this.state.rowExclId]!==undefined? 
                this.state['P_' + rowData.pk + '_'+this.state.rowIntId+ "_" + this.state.rowExclId]:
                this.state.assignedPLParent!==undefined?
                this.state.assignedPLParent.includes(rowData.pk):false

      }
      return flag
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

    deleteStateKeys = () =>{
      Object.keys(this.state).forEach((item)=>{
        if (item.startsWith('P_') || item.startsWith('I_')){
          delete this.state[item]
        }
      })
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
                this.setState({ 
                  connectModal: !this.state.connectModal, 
                  value:[], 
                  assignedIntegrations:undefined, 
                  rowExclId:undefined });
              
                  this.deleteStateKeys()
                }
              
              }
              
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
          size={{sm:'md',md:'2xl',lg:'3xl'}}
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
                      <Input type="text" id='exclusionName' 
                      defaultValue={this.state.modalExclusionName!==undefined?this.state.modalExclusionName:''} 
                      onChange={()=>{
                        this.state.excl_data.excl_data.forEach((val)=>{
                          
                        })
                      }}
                     />
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
                            this.state.rowExclId===undefined?false:
                            this.state['I_' + rowData.id]!==undefined?this.state['I_' + rowData.id]:
                            this.state.assignedIntegrations!==undefined ? 
                            this.state.assignedIntegrations.includes(rowData.id): false
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
                        this.setState({rowIntId:rowData.id, tablevirtualizesd:true,
                          assignedPLParent:index!==undefined?this.state.excl_data.excl_data[index]['assigned_plparent_' + rowData.id]:[],
                          plParentHead:true, plParents:this.state.excl_data[rowData.id], plParents_nt:this.state.excl_data[rowData.id+"_nt"],plSearch:[], showTable:true}, ()=>{
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
                  console.log(this.state)
                    this.sendData('edit')

                }}  flex={1}>
                  Save
                </Button>
                <Button onClick={()=>{
                  this.setState({connectModal:!this.state.connectModal, modalExclusionName:undefined, value:[], rowIntId:undefined, rowExclId:undefined})
                }} flex={1} >Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>

       {/**PL Head Modal */}
       <Modal
          closeOnOverlayClick={false}
          isOpen={this.state.plParentHead}
          size={'xl'}
          height={400}
          onClose={()=>{this.setState({plParentHead:!this.state.plParentHead})}}
          
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Exclude Accounts</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={3} minHeight={300} >
              
                                
           {/* PL Head Table*/ }
                <Flex gap={2} justify={'space-between'} direction={'column'}>
                <FormControl>
                      <FormLabel>
                        <Text fontSize={'xs'}>Search</Text>
                      </FormLabel>
                      <Input type="text" id='search' onChange={(value)=>{
                        this.setState({plSearch:[], plLoading:true, showTable:false})
                        const searcher = new FuzzySearch(this.state.plParents_nt, ['desc', 'pk'], {
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
                          rowHeight={(rowData) => {
                            if (rowData!==undefined){
                            if(rowData.account_key === "-" || rowData.account_key === null || rowData.account_key==="" ){ 
                            return 35
                            }else{
                              return 35
                            }
                          }
                          }}
                          // virtualized
                          height={300}
                          loading={this.state.plLoading}
                          width={'100%'}
                          isTree={true}
                          rowKey="index_ui"
                          shouldUpdateScroll={false}
                          className='custom-table'
                          // defaultExpandAllRows
                          >
                  <Column flexGrow={1} align="left">
                    <HeaderCell>Account Name</HeaderCell>
                    <Cell dataKey='desc'>
                      </Cell>                  
                    </Column>
                  
                  <Column flexGrow={1} align="center">
                    <HeaderCell>...</HeaderCell>
                    <Cell style={{p:0}}>{rowData=>
                    //console.log(this.state.modalExclusionName)
                      <Checkbox  
                      // disabled={rowData.account_key==='' || rowData.account_key==='-'}
                      checked={this.checkedFlag(rowData)}
                      defaultChecked={
                        ()=>{
                          if (this.state.rowExclId===undefined){
                            return false
                          }
                        }
                      }
                      id={rowData.pk} 
                      onChange={(value, checked)=>{
                        console.log('row data', rowData)
                        if (rowData.children!==undefined){
                          this.checkingMagic(value, checked, rowData, rowData.children)
                         
                        }else{
                          if (this.state.plSearch.length!==0){
                            this.indepthSearch(rowData.pk, this.state.plParents)
                            setTimeout(()=>
                            {
                              if(this.state.tempItem.children!==undefined){
                                this.checkingMagic(value, checked, rowData, this.state.tempItem.children)
                                this.setState({tempItem:undefined})
                              }
                            }
                              ,5)
                           
                            
                          }
                          this.checkingMagic(value, checked, rowData, [])
                        }
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
                  this.setState({plParentHead:!this.state.plParentHead, rowIntId:undefined, plParents:[], plParents_nt:[], plSearch:[]})
                }} loading={this.state.saveBtnLoading} block>
                  Exclude Accounts
                </Button>
                <Button onClick={()=>{
                  this.setState({plParentHead:!this.state.plParentHead, rowIntId:undefined, plParents:[], plParents_nt:[],plSearch:[]})
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


            <Column width={200} minWidth={200} flexGrow={1}  align="left" >
              <HeaderCell>Exclusion Name</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            {/* <Column width={200} align='center' flexGrow={1} >
              <HeaderCell>Created on</HeaderCell>
              <Cell dataKey="created_date" />
            </Column> */}

           

            
            <Column width={200} minWidth={200} align="center" flexGrow={1}>
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
                            this.setState({rowExclId:rowData.id, tableButtonLoading:true, sendButtonLoading:true,excl_data:[]}, ()=>{    
                                  this.sendData('delete')
                            })
                            this.setState({tableButtonLoading:false, sendButtonLoading:false})
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
 
export default DefineExclusionSettingsNew
;