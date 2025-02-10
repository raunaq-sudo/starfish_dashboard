import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
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
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaArrowAltCircleRight, FaCheckCircle, FaCross, FaFileUpload, FaPlus, FaTimesCircle, FaTrash, FaUnlink } from 'react-icons/fa';
import { IconButton, Stack, Button, Uploader, DateRangePicker, Table, Checkbox, CheckboxGroup } from 'rsuite';
import apiEndpoint from '../../config/data';
import { Select } from 'chakra-react-select';
import { withTheme } from '@emotion/react';

class AuthorisationSettings extends Component {
  state = {
    userSubmit: false,
    changePass: false,
    type: "Add"
  };

  fetchAuthData = async () => {
    this.setState({
      data: undefined,
      value: [],
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      role: undefined,
      priviledge: undefined,
      exclusion: undefined,
      user_id: undefined,
      changePass: false
    });

    await fetch(apiEndpoint + '/api/fetch_auth_data/', {
      method: 'GET',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
    }).then(data => data.json())
      .then((data) => {
        this.setState({ data });
        console.log(data);
      }).catch(err => console.error(err));
  }

  addUser = async () => {
    this.setState({ userSubmit: true });
    if (document.getElementById('pass') != null ? (document.getElementById('pass').value === document.getElementById('rePass').value) : false || !this.state.changePass) {
      var formBody = new FormData();
      this.state.roleSelected !== undefined ? formBody.append('role_id', this.state.roleSelected) : <></>;
      this.state.priviledgeSelected !== undefined ? formBody.append('priviledge_id', this.state.priviledgeSelected) : <></>;
      this.state.exclusionSelected !== undefined ? formBody.append('exclusion_id', this.state.exclusionSelected) : <></>;
      formBody.append('firstName', document.getElementById('firstName').value);
      formBody.append('lastName', document.getElementById('lastName').value);
      formBody.append('userEmail', document.getElementById('email').value);
      document.getElementById('pass') !== null ? formBody.append('pass', document.getElementById('pass').value) : <></>;
      formBody.append('changePass', this.state.changePass);
      formBody.append('user_id', this.state.user_id === undefined ? 'newUser' : this.state.user_id);

      await fetch(apiEndpoint + '/api/add_user/', {
        method: 'POST',
        headers: { "Authorization": "Bearer " + localStorage['access'] },
        body: formBody
      }).then((response) => response.json())
        .then((data) => {
          if (data['registration_status'] !== 'passed') {
            alert(data['registration_status']);
          }
        }).catch((err) => {
          console.error(err);
        });
      this.setState({ userSubmit: false, connectModal: false });
      this.fetchAuthData();
    } else {
      alert('Please check the password');
      this.setState({ userSubmit: false, connectModal: true });
    }
  }

  deactivateUser = async (user_id) => {
    const formBody = new FormData();
    formBody.append('deactivate', 'true');
    formBody.append('user_id', user_id);

    await fetch(apiEndpoint + '/api/add_user/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formBody
    }).then((response) => response.json())
      .then((data) => {
        if (data['registration_status'] !== 'passed') {
          alert(data['registration_status']);
        }
      }).catch((err) => {
        console.error(err);
      });

    this.setState({ userSubmit: false, connectModal: false });
    this.fetchAuthData();
  }

  componentDidMount = () => {
    this.fetchAuthData();
  }

  render() {
    const { Column, HeaderCell, Cell } = Table;
    const bgColor = this.props.theme?.colors?.gray[500] || "white";
    return (
      <Box>
        <Card minH="700px" p={5} borderRadius="lg" shadow="xl">
          <CardHeader bg="gray.100" color="white" py={3} borderRadius="md">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="bold" color="orange">{this.props?.title || "Manage Users"}</Text>
              <Button size="sm" colorScheme="teal" onClick={() => this.setState({ 
                    connectModal: !this.state.connectModal,
                    value: [],
                    assignedIntegrations: undefined,
                    rowUserId: undefined,
                    type: "Add"
                  })}>
                <Icon as={FaPlus} mr={2} /> Add User
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            {this.state.data && (
              <Table height={500} data={this.state.data.users} loading={this.state.data.users === undefined} bordered>
                <Column width={200} minWidth={150} flexGrow={1} align="left" fixed>
                  <HeaderCell>First Name</HeaderCell>
                  <Cell dataKey="first_name" />
                </Column>
                <Column width={200} minWidth={150} flexGrow={1} align="left">
                  <HeaderCell>Last Name</HeaderCell>
                  <Cell dataKey="last_name" />
                </Column>
                <Column width={200} minWidth={50} flexGrow={0.5} align="center">
                  <HeaderCell>Status</HeaderCell>
                  <Cell>{rowData => rowData.active ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</Cell>
                </Column>
                <Column width={200} minWidth={150} flexGrow={1} align="center">
                  <HeaderCell>Actions</HeaderCell>
                  <Cell>
                    {rowData => (
                      <Flex gap={3} justifyContent="center">
                        <Button size="xs" colorScheme="blue" onClick={() => this.setState({ connectModal: true, type: "Edit", firstName: rowData.first_name,
                          lastName: rowData.last_name,
                          email: rowData.email_id,
                          role: rowData.role_description,
                          priviledge: rowData.priv_description,
                          exclusion: rowData.exclusions,
                          user_id: rowData.user_id_id,})}>
                          Edit
                        </Button>
                        <Button size="xs" colorScheme={rowData.active ? "red" : "green"} onClick={() => this.deactivateUser(rowData.user_id_id)} loading={this.state.tableButtonLoading}>
                          {rowData.active ? "Deactivate" : "Activate"}
                        </Button>
                      </Flex>
                    )}
                  </Cell>
                </Column>
              </Table>
            )}
          </CardBody>
        </Card>

        {/* Modal for Add/Edit User */}
        <Modal closeOnOverlayClick={false} isOpen={this.state.connectModal} onClose={() => this.setState({ 
                connectModal: !this.state.connectModal,
                firstName: undefined,
                lastName: undefined,
                email: undefined,
                role: undefined,
                priviledge: undefined,
                exclusion: undefined,
                user_id: undefined,
                changePass: false 
                })} 
                size={{ base: 'full', sm: '2xl', md: '2xl', lg: '3xl' }}>
          <ModalOverlay />
          <ModalContent  borderRadius="md">
            <ModalHeader color='orange'>{this.state.type} a User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                <FormControl isRequired flex={1}>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" id="firstName" defaultValue={this.state.firstName !== undefined ? this.state.firstName : ''}/>
                </FormControl>

                <FormControl isRequired flex={1}>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" id="lastName" defaultValue={this.state.lastName !== undefined ? this.state.lastName : ''}/>
                </FormControl>           
                </Flex>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input id="email" type="email" defaultValue={this.state.email !== undefined ? this.state.email : ''}/>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel fontSize={'sm'}>Role</FormLabel>
                    <Select
                      options={this.state.data !== undefined ? this.state.data['roles'] : {}}
                      size={'sm'}
                      id='roleSelection'
                      onChange={(val) => {
                        this.setState({ roleSelected: val['value'] });
                      }}
                      placeholder={this.state.role !== undefined ? this.state.role : ''}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={'sm'}>Privilege</FormLabel>
                    <Select
                      options={this.state.data !== undefined ? this.state.data['priviledges'] : {}}
                      size={'sm'}
                      id='privSelection'
                      onChange={(val) => {
                        this.setState({ priviledgeSelected: val['value'] });
                      }}
                      placeholder={this.state.priviledge !== undefined ? this.state.priviledge : ''}
                    />
                  </FormControl>
                  <Flex direction={{ base: 'column', md: 'row' }} gap={4} alignItems="center" justifyContent='center'>
                    <FormControl isRequired flex={1}>
                      <FormLabel fontSize={'sm'}>Exclusion List</FormLabel>
                      <Select
                        options={this.state.data !== undefined ? this.state.data['exclusions'] : {}}
                        size={'sm'}
                        id='exclSelection'
                        onChange={(val) => {
                          this.setState({ exclusionSelected: val['value'] });
                        }}
                        placeholder={this.state.exclusion !== undefined ? this.state.exclusion : ''}
                      />
                    </FormControl>
                    <IconButton icon={<FaTrash />} size='sm' onClick={() => {
                      this.setState({ exclusion: '', exclusionSelected: '' });
                    }}/>
                  </Flex>
                  {this.state.user_id !== undefined &&
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Change User Password</FormLabel>
                      <Switch onChange={(val) => this.setState({ changePass: !this.state.changePass })} />
                    </FormControl>
                  } 
                  {(this.state.user_id === undefined || this.state.changePass) &&
                    <>
                      <FormControl isRequired>
                        <FormLabel fontSize={'sm'}>Enter Password</FormLabel>
                        <Input type='password' id='pass' />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize={'sm'}>Re-enter Password</FormLabel>
                        <Input type='password' id='rePass' />
                      </FormControl>
                    </>
                  }
              </VStack>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button colorScheme="blue" isLoading={this.state.userSubmit} onClick={() => {
                  this.addUser();}}>Save</Button>
              <Button ml={3} onClick={() => this.setState({ 
                    connectModal: !this.state.connectModal,
                    value: [],
                    firstName: undefined,
                    lastName: undefined,
                    email: undefined,
                    role: undefined,
                    priviledge: undefined,
                    exclusion: undefined,
                    user_id: undefined,
                    changePass: false
                    })}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
}

export default withTheme(AuthorisationSettings);
