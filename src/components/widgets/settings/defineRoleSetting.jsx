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
  Switch,
  Tag,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { Component, useEffect, useState } from 'react';
import { FaCross, FaFileUpload, FaPlus, FaUnlink, } from 'react-icons/fa';
import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack,Button, Uploader, DateRangePicker, Table, Checkbox, CheckboxGroup } from 'rsuite';
import inuit from '../../config/inuitConfig';
import apiEndpoint from '../../config/data';
import { isThisSecond } from 'date-fns';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import qbBotton from '../../../media/images/quickbookButton.png'
import { useHotglue } from '@hotglue/widget';



class DefineRoleSettings extends Component {
    
  constructor(props) {
    super(props);
  this.state = { 
      screens:[],
      modalRoleName : undefined
     } 

     this.handleChange = this.handleChange.bind(this)
    
    }
    fetchData = () =>{
      fetch(apiEndpoint + '/api/all_screens/', {
        headers: { "Authorization": "Bearer " + localStorage['access'] }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === undefined) {
                    this.setState({ screens: data['screen_list'] })
                } else {
                    window.open("/login", "_self")
                    alert('Session Expired!.')
                }


            }).catch(err => console.log(err))


    }

    
    fetchRoleData = () =>{
      this.setState({role_data:[]})
      fetch(apiEndpoint + '/api/get_role_data/null/', {
        headers: { "Authorization": "Bearer " + localStorage['access'] }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === undefined) {
                    this.setState({ role_data: data }, ()=>{
                      console.log(this.state.role_data)
                    })
                } else {
                    window.open("/login", "_self")
                    alert('Session Expired!.')
                }


            }).catch(err => console.log(err))
          this.setState({connectModal:false, modalRoleName:undefined})

    }
    fetchRoleModalData = (value, role_name) =>{
      this.setState({tableButtonLoading:true, modalRoleName:role_name, rowId:value})
      fetch(apiEndpoint + '/api/get_role_data/' + value + '/', {
        headers: { "Authorization": "Bearer " + localStorage['access'] }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === undefined) {
                    this.setState({ value: data, connectModal:!this.state.connectModal }, ()=>{
                      console.log(this.state.value)
                      
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

    sendData = () =>{
      
      if(this.state.value!==undefined && (document.getElementById('roleName').value!=='' || this.state.modalRoleName!==undefined)){
        var data = new FormData()
        if (this.state.modalRoleName===undefined ){
          data.append('roleName', document.getElementById('roleName').value)
        }else{
          if (this.state.modalRoleName!==document.getElementById('roleName').value){
            data.append('roleName', document.getElementById('roleName').value)

          }else{
            data.append('roleName', this.state.modalRoleName)

          }
        if (this.state.modalRoleName===''){
          data.append('roleName', document.getElementById('roleName').value)

        }
        data.append('roleId', this.state.rowId)
      }

        data.append('screen_list', this.state.value)
        fetch(apiEndpoint + '/api/set_screen_role/', {
          headers: { "Authorization": "Bearer " + localStorage['access'] },
          method:'POST',
          body:data
          }).then(response => response.json())
              .then(data => {
                  console.log(data)
                  if (data.code === undefined) {
                      console.log(data)
                      console.log('Sent Data')
                  } else {
                      window.open("/login", "_self")
                      alert('Session Expired!.')
                  }


              }).catch(err => console.log(err))

              this.fetchRoleData()
      }else{
        alert("Enter Role name and atleast 1 screen")
      }
      
      
    }

    componentDidMount = () =>{
      this.fetchData()
      this.fetchRoleData()
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
                this.setState({ connectModal: !this.state.connectModal, value:[] });
              }}
            >
              <Icon as={FaPlus} />
              <Text>Add Role</Text>
            </Button>
          </Flex>
          
        </Flex>
        </CardHeader>
        {/*Modal*/}
        <Modal
          closeOnOverlayClick={false}
          isOpen={this.state.connectModal}
          onClose={()=>{this.setState({connectModal:!this.state.connectModal, modalRoleName:undefined, value:[]})}}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Define Role {this.state.rowId!==undefined?this.state.rowId:''}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
              <Flex direction={'column'} gap={2}>
                <Flex gap={2} justify={'space-between'}>
                  <Flex justifyContent={'start'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xs'}>Role Name</Text>
                      </FormLabel>
                      <Input type="text" id='roleName' placeholder={this.state.modalRoleName!==undefined?this.state.modalRoleName:''} />
                    </FormControl>
                  </Flex>


                </Flex>
                <Flex>
                  <CheckboxGroup
                    inline
                    name="checkboxList"
                    value={this.state.value}
                    onChange={this.handleChange}
                    
                  >
                    <Flex direction={'column'}>
                    {
                      this.state.screens.map((item)=>{
                        return(
                 
                            <Checkbox value={item.id}>{item.name}</Checkbox>

                        )
                      })
                    }
                          </Flex>

                  </CheckboxGroup>

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
                <Button onClick={()=>{
                  this.setState({connectModal:!this.state.connectModal, modalRoleName:undefined, value:[]})
                  }} flex={1} block>Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>

        <CardBody justifyContent={'center'}>
          {this.state.role_data!==undefined?
        <Table
            height={600}
            data={this.state.role_data}
            bordered
            
          >


            <Column width={200} flexGrow={1}  align="left" >
              <HeaderCell>Role Name</HeaderCell>
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
                  <Button appearance="link" onClick={() => this.fetchRoleModalData(rowData.role_id, rowData.description)} loading={this.state.tableButtonLoading}>
                    Edit
                  </Button>
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
 
export default DefineRoleSettings;