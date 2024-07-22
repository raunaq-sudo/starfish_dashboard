import {
  Card,
  CardBody,
  CardHeader,
  Divider,
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
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { Component, useEffect, useState } from 'react';
import { FaArrowAltCircleRight, FaCheckCircle, FaCross, FaFileUpload, FaPlus, FaTimesCircle, FaUnlink, } from 'react-icons/fa';
// import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack,Button, Uploader, DateRangePicker, Table, Checkbox, CheckboxGroup } from 'rsuite';
import apiEndpoint from '../../config/data';
import { Select } from 'chakra-react-select';
// import { fetchData } from '../../utility/authFetch';




class AuthorisationSettings extends Component {
  state = {
    userSubmit:false,
    changePass: false
  };

  fetchAuthData = async () =>{
    this.setState({data:undefined,
      value:[],
      firstName:undefined,
      lastName:undefined,
      email:undefined,
      role:undefined, 
      priviledge:undefined,
      exclusion:undefined,
      user_id:undefined,
      changePass:false
      })
    await fetch(apiEndpoint + '/api/fetch_auth_data/', {
      method:'GET',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
    }).then(data=>data.json())
    .then((data)=>{
          this.setState({data})
          console.log(data)}).catch(err=>console.error(err))
  }
 addUser = async () =>{
    this.setState({userSubmit:true})
    if(document.getElementById('pass')!=null?(document.getElementById('pass').value===document.getElementById('rePass').value):false || !this.state.changePass){
      console.log(this.state.role)
      var formBody = new FormData()
      this.state.roleSelected!==undefined?formBody.append('role_id', this.state.roleSelected):<></>
      this.state.priviledgeSelected!==undefined?formBody.append('priviledge_id', this.state.priviledgeSelected):<></>
      this.state.exclusionSelected!==undefined?formBody.append('exclusion_id', this.state.exclusionSelected):<></>
      formBody.append('firstName', document.getElementById('firstName').value)
      formBody.append('lastName', document.getElementById('lastName').value)
      formBody.append('userEmail', document.getElementById('email').value)
      document.getElementById('pass')!==null?formBody.append('pass', document.getElementById('pass').value):<></>
      formBody.append('changePass', this.state.changePass)
      formBody.append('user_id', this.state.user_id===undefined?'newUser':this.state.user_id)
      await fetch(apiEndpoint + '/api/add_user/', {
        method:'POST',
        headers: { "Authorization": "Bearer " + localStorage['access'] },
        body: formBody
      }).then((response)=>response.json())
      .then((data)=>{
        if(data['registration_status']!=='passed'){
          alert(data['registration_status'])
        }
      }).catch((err)=>{
          console.error(err)
      })
      //this.setState({connectModal:!this.state.connectModal})
      this.setState({userSubmit:false, connectModal:false})
      this.fetchAuthData()
  }else{
    alert('Please check the password')
    this.setState({userSubmit:false, connectModal:true})

  }
  
  }

  deactivateUser = async (user_id) =>{
      const formBody = new FormData()
      formBody.append('deactivate', 'true')
      formBody.append('user_id', user_id)
      await fetch(apiEndpoint + '/api/add_user/', {
        method:'POST',
        headers: { "Authorization": "Bearer " + localStorage['access'] },
        body: formBody
      }).then((response)=>response.json())
      .then((data)=>{
        if(data['registration_status']!=='passed'){
          alert(data['registration_status'])
        }
      }).catch((err)=>{
          console.error(err)
      })
      //this.setState({connectModal:!this.state.connectModal})
  
  this.setState({userSubmit:false, connectModal:false})
  this.fetchAuthData()
  }
  componentDidMount = () =>{
    this.fetchAuthData()
  }
  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <>
     <Card minH={"700"}>
         <CardHeader>
         <Flex direction={'column'} gap={4}>
          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              size={'sm'}
              onClick={() => {
                this.setState({ connectModal: !this.state.connectModal, value:[], assignedIntegrations:undefined, rowUserId:undefined });
              }}
            >
              <Icon as={FaPlus} />
              <Text>Add User</Text>
            </Button>
          </Flex>
          
        </Flex>
        </CardHeader>
        {/*User Modal*/}
        <Modal
            closeOnOverlayClick={false}
            isOpen={this.state.connectModal}
            onClose={()=>{
            this.setState({
              connectModal:!this.state.connectModal, 
              firstName:undefined,
              lastName:undefined,
              email:undefined,
              role:undefined,
              priviledge:undefined,
              exclusion:undefined,
              user_id:undefined,
              changePass:false
            })}}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a User</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Flex direction={'column'} gap={2} width={'100%'}>
                  <Flex gap={2} justify={'space-between'}>
                    <Flex justifyContent={'start'} flex={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={'xs'}>First Name</FormLabel>
                        <Input type="text" id='firstName' defaultValue={
                          this.state.firstName!==undefined ? this.state.firstName:''
                          }/>
                      </FormControl>
                    </Flex>
                    <Flex alignItems={'center'} flex={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={'xs'}>Last Name</FormLabel>
                        <Input type="text"  id='lastName' defaultValue={
                          this.state.lastName!==undefined ? this.state.lastName:''
                          }/>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex gap={2} justify={'space-between'}>
                    <Flex justifyContent={'start'} flex={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={'xs'}>Email</FormLabel>
                        <Input type="email" id='email' defaultValue={
                          this.state.email!==undefined ? this.state.email:''
                          }/>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <FormControl isRequired>
                    <FormLabel fontSize={'xs'}>Role</FormLabel>
                    <Select
                      options={this.state.data!==undefined?this.state.data['roles'] :{}}
                      size={'sm'}
                      id='roleSelection'
                      onChange={(val)=>{
                        this.setState({roleSelected: val['value']})

                      }}
                      placeholder = {this.state.role!==undefined?this.state.role:''}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={'xs'}>Privilege</FormLabel>
                    <Select
                      options={this.state.data!==undefined?this.state.data['priviledges']:{}}
                      size={'sm'}
                      id='privSelection'
                      onChange={(val)=>{
                        this.setState({priviledgeSelected: val['value']})

                      }}
                      placeholder = {this.state.priviledge!==undefined?this.state.priviledge:''}

                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={'xs'}>Exclusion List</FormLabel>
                    <Select
                      options={this.state.data!==undefined?this.state.data['exclusions']:{}}
                      size={'sm'}
                      id='exclSelection'
                      onChange={(val)=>{
                        this.setState({exclusionSelected: val['value']})
                      }}
                      placeholder = {this.state.exclusion!==undefined?this.state.exclusion:''}

                    />
                  </FormControl>
                  
                  {this.state.user_id!==undefined?
                  <>
                  <FormControl isRequired>
                    <FormLabel fontSize={'xs'}>Change User password</FormLabel>
                    <Switch onChange={(val)=>this.setState({changePass:!this.state.changePass})}/>
                  </FormControl>
                  </>:<></>}

                {this.state.user_id===undefined||this.state.changePass?<>
                  <FormControl isRequired>
                      <FormLabel fontSize={'xs'}>Enter password</FormLabel>
                          <Input type='password' id='pass'></Input>
                      </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'xs'}>Re-enter password</FormLabel>
                      <Input type='password' id='rePass'></Input>
                    </FormControl></>:<></>}                  
                    
                  
                </Flex>
              </ModalBody>

              <ModalFooter gap={2}>
                <Button colorScheme="blue" mr={3} onClick={()=>{
                  this.addUser()
                  // this.setState({connectModal:!this.state.connectModal})
                    
                }} isLoading={this.state.userSubmit}>
                  Save
                </Button>
                <Button onClick={()=>{
                  this.setState({connectModal:!this.state.connectModal, 
                    value:[],
                    firstName:undefined,
                    lastName:undefined,
                    email:undefined,
                    role:undefined,
                    priviledge:undefined,
                    exclusion:undefined,
                    user_id:undefined,
                    changePass:false
                  })
                }}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
       

        <CardBody justifyContent={'center'}>
          {this.state.data!==undefined?
        <Table
            height={600}
            data={this.state.data.users}
            bordered
            loading = {this.state.data.users===undefined}
          >


            <Column width={200} flexGrow={1}  align="left" >
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="first_name" />
            </Column>

            <Column width={200} flexGrow={1}  align="left" >
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="last_name" />
            </Column>

            <Column width={200} flexGrow={1}  align="left" >
              <HeaderCell>Active</HeaderCell>
              <Cell>{rowData=>
                rowData.active?<FaCheckCircle/>:<FaTimesCircle/>
              }</Cell>
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
                        firstName: rowData.first_name,
                        lastName: rowData.last_name,
                        email: rowData.email_id,
                        role:rowData.role_description,
                        priviledge:rowData.priv_description,
                        exclusion:rowData.exclusions,
                        user_id:rowData.user_id_id
                      })
                      }}>
                      Edit
                    </Button>
                    <Button appearance="link" onClick={() => {
                          this.deactivateUser(rowData.user_id_id)
                        }} loading={this.state.tableButtonLoading}>
                      {rowData.active?"Deactivate":"Activate"}
                    </Button>
                  </Flex>
                  
                )}
              </Cell>
            </Column>
          </Table>
          :<></>}
        </CardBody>
        </Card>
        
          
       
      </>
    );
  }
}

export default AuthorisationSettings;
