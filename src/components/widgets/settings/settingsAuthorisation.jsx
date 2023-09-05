import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  TabsProvider,
  Tag,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { Component } from 'react';
import { FaDesktop, FaEdit, FaMap, FaPlus, FaUser } from 'react-icons/fa';
import { GiScreenImpact } from 'react-icons/gi';

const entityModal = (props, onClose) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.entityIsOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register your Location</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex direction={'column'} gap={2}>
            <Flex gap={2} justify={'space-between'}>
              <Flex justifyContent={'start'} flex={1}>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Location ID</FormLabel>
                  <Input type="text" disabled bgColor={'gray.100'} />
                </FormControl>
              </Flex>
              <Flex alignItems={'center'} flex={1}>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Active</FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
            </Flex>
            <FormControl isRequired width={'100%'}>
              <FormLabel fontSize={'xs'}>Location Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={'xs'}>Location Address</FormLabel>
              <Textarea type="text" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xs'}>Comments</FormLabel>
              <Textarea type="text" />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const entitySet = () => {
  return (
    <>
      <TableContainer>
        <Table variant={'simple'} colorScheme="cyan" fontSize={'xs'}>
          <Thead>
            <Tr textAlign={'center'}>
              <Th>Location ID</Th>
              <Th>Location Name</Th>
              <Th>Address</Th>
              <Th>Active</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>023</Td>
              <Td>Delhi</Td>
              <Td>203, sai Kirloskar</Td>
              <Td>
                <FormControl>
                  <Switch></Switch>
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>
            <Tr>
              <Td>023</Td>
              <Td>Delhi</Td>
              <Td>203, sai Kirloskar</Td>
              <Td>
                <FormControl>
                  <Switch></Switch>
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>
            <Tr>
              <Td>023</Td>
              <Td>Delhi</Td>
              <Td>203, sai Kirloskar</Td>
              <Td>
                <FormControl>
                  <Switch></Switch>
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const userModal = (props, onClose) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.userIsOpen}
      onClose={onClose}
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
                  <Input type="text" />
                </FormControl>
              </Flex>
              <Flex alignItems={'center'} flex={1}>
                <FormControl isRequired>
                  <FormLabel fontSize={'xs'}>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Flex>
            </Flex>
            <Flex gap={2} justify={'space-between'}>
              <Flex justifyContent={'start'} flex={1}>
                <FormControl isRequired>
                  <FormLabel fontSize={'xs'}>Email</FormLabel>
                  <Input type="email" />
                </FormControl>
              </Flex>
              <Flex alignItems={'center'} flex={1}>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Active</FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
            </Flex>
            <FormControl isRequired>
              <FormLabel fontSize={'xs'}>Role</FormLabel>
              <Select
                options={[
                  { label: 'Manager' },
                  { label: 'Super User' },
                  { label: 'User' },
                ]}
                size={'sm'}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={'xs'}>Privilege</FormLabel>
              <Select
                options={[
                  { label: 'Priv123' },
                  { label: 'Priv223' },
                  { label: 'Priv345' },
                ]}
                size={'sm'}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'xs'}>Comments</FormLabel>
              <Textarea type="text" />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const userSet = () => {
  return (
    <>
      <TableContainer>
        <Table variant={'simple'} fontSize={'xs'}>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Role</Th>
              <Th>Privilege</Th>
              <Th>Active</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>Manager</Td>
              <Td>Privilege12</Td>
              <Td>
                <FormControl>
                  <Switch />
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>Manager</Td>
              <Td>Privilege223</Td>
              <Td>
                <FormControl>
                  <Switch />
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>

            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>Manager</Td>
              <Td>Privilege34</Td>
              <Td>
                <FormControl>
                  <Switch />
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const roleModal = (props, onClose) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.roleIsOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Roles</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex direction={'column'} gap={2}>
            <Flex gap={2} justify={'space-between'}>
              <Flex justifyContent={'start'} flex={1}>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Role Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Flex>
              <Flex alignItems={'center'} flex={1}>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Active</FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
            </Flex>

            <FormControl>
              <FormLabel fontSize={'xs'}>Screens</FormLabel>
              <Select
                isMulti
                options={[
                  { label: 'Dashboard', value: 'Dashboard' },
                  { label: 'Cost', value: 'Cost' },
                  { label: 'Benchmark', value: 'Benchmark' },
                  { label: 'Budget', value: 'Budget' },
                  { label: 'Task', value: 'Task' },
                  { label: 'Setting', value: 'Setting' },
                ]}
                size={'sm'}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={'xs'}>Comments</FormLabel>
              <Textarea type="text" />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const roleSet = () => {
  return (
    <>
      <TableContainer>
        <Table variant={'simple'} fontSize={'xs'}>
          <Thead>
            <Tr>
              <Th>Role Name</Th>
              <Th>Screens</Th>

              <Th>Active</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Manager</Td>
              <Td maxWidth={200}>
                <Flex gap={1} flexWrap={'wrap'}>
                  <Tag>Dashboard</Tag>
                  <Tag>Budget</Tag>
                  <Tag>Tasks</Tag>
                  <Tag>Benchmark</Tag>
                </Flex>
              </Td>
              <Td>
                <FormControl>
                  <Switch />
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const privModal = (props, onClose) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.privIsOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Privileges</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex direction={'column'} gap={2}>
            <Flex gap={2} justify={'space-between'}>
              <Flex justifyContent={'start'} flex={1}>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Privilege Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Flex>
              <Flex alignItems={'center'} flex={1}>
                <FormControl>
                  <FormLabel fontSize={'xs'}>Active</FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
            </Flex>
            <Divider />
            <Text width={'100%'} fontSize={'sm'}>
              Screen Privileges
            </Text>
            <Divider />
            <Flex width={'100%'} direction={'column'} gap={2}>
              <FormControl width={'100%'}>
                <FormLabel fontSize={'xs'} flexDirection={'row'}>
                  <Text fontWeight={'bold'}>Dashboard</Text>
                </FormLabel>

                <Select
                  options={[
                    { label: 'Mumbai', value: 'Mumbai' },
                    { label: 'Delhi', value: 'Delhi' },
                    { label: 'Agra', value: 'Agra' },
                    { label: 'Hyderabad', value: 'Hyderabad' },
                    { label: 'Kolkata', value: 'Kolkata' },
                    { label: 'Chennai', value: 'Chennai' },
                  ]}
                  isMulti
                  size={'xs'}
                />
              </FormControl>

              <FormControl width={'100%'}>
                <FormLabel fontSize={'xs'} gap={2} flexDirection={'row'}>
                  <Text fontWeight={'bold'}>Budget</Text>
                </FormLabel>

                <Select
                  options={[
                    { label: 'Mumbai', value: 'Mumbai' },
                    { label: 'Delhi', value: 'Delhi' },
                    { label: 'Agra', value: 'Agra' },
                    { label: 'Hyderabad', value: 'Hyderabad' },
                    { label: 'Kolkata', value: 'Kolkata' },
                    { label: 'Chennai', value: 'Chennai' },
                  ]}
                  isMulti
                  size={'xs'}
                />
              </FormControl>
              <FormControl width={'100%'}>
                <FormLabel fontSize={'xs'} gap={2} flexDirection={'row'}>
                  <Text fontWeight={'bold'}>Task</Text>
                </FormLabel>

                <Select
                  options={[
                    { label: 'Mumbai', value: 'Mumbai' },
                    { label: 'Delhi', value: 'Delhi' },
                    { label: 'Agra', value: 'Agra' },
                    { label: 'Hyderabad', value: 'Hyderabad' },
                    { label: 'Kolkata', value: 'Kolkata' },
                    { label: 'Chennai', value: 'Chennai' },
                  ]}
                  isMulti
                  size={'xs'}
                />
              </FormControl>
              <FormControl width={'100%'}>
                <FormLabel fontSize={'xs'} gap={2} flexDirection={'row'}>
                  <Text fontWeight={'bold'}>Cost</Text>
                </FormLabel>

                <Select
                  options={[
                    { label: 'Mumbai', value: 'Mumbai' },
                    { label: 'Delhi', value: 'Delhi' },
                    { label: 'Agra', value: 'Agra' },
                    { label: 'Hyderabad', value: 'Hyderabad' },
                    { label: 'Kolkata', value: 'Kolkata' },
                    { label: 'Chennai', value: 'Chennai' },
                  ]}
                  isMulti
                  size={'xs'}
                />
              </FormControl>
            </Flex>
            <Divider mt={2} mb={2} />
            <FormControl>
              <FormLabel fontSize={'xs'}>Comments</FormLabel>
              <Textarea type="text" />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const privSet = () => {
  return (
    <>
      <TableContainer>
        <Table variant={'simple'} fontSize={'xs'}>
          <Thead>
            <Tr>
              <Th>Privilege Name</Th>
              <Th>Active</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Privilege123</Td>

              <Td>
                <FormControl>
                  <Switch />
                </FormControl>
              </Td>
              <Td>
                <IconButton as={FaEdit} bgColor={'white'} size={'xs'} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const privAuthSet = () => {
  return (
    <>
      <TableContainer>
        <Table variant={'simple'} fontSize={'xs'}>
          <Thead>
            <Tr>
              <Th>Screen Name</Th>
              <Th>Controlled</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Dashboard</Td>

              <Td>
                <FormControl>
                  <Switch checked />
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>Cost</Td>

              <Td>
                <FormControl>
                  <Switch checked />
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>Benchmark</Td>

              <Td>
                <FormControl>
                  <Switch checked />
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>Budget</Td>

              <Td>
                <FormControl>
                  <Switch checked />
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>Task</Td>

              <Td>
                <FormControl>
                  <Switch checked />
                </FormControl>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

class AuthorisationSettings extends Component {
  state = {};
  render() {
    return (
      <>
        <TabsProvider>
          <Tabs height={400} align="center" isManual variant="enclosed">
            <TabList textAlign={'left'}>
              <Tab justifyContent={'start'}>
                <Text fontSize={'xs'} textAlign={'start'}>
                  Manage Location
                </Text>
              </Tab>
              <Tab justifyContent={'start'}>
                <Text fontSize={'xs'} textAlign={'start'}>
                  Manage Users
                </Text>
              </Tab>
              <Tab justifyContent={'start'}>
                <Text fontSize={'xs'} textAlign={'start'}>
                  Manage Role
                </Text>
              </Tab>
              <Tab justifyContent={'start'}>
                <Text fontSize={'xs'} textAlign={'start'}>
                  Manage Priv.
                </Text>
              </Tab>
              <Tab justifyContent={'start'}>
                <Text fontSize={'xs'} textAlign={'start'}>
                  Screen Auth Master
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <Card height={400}>
                  <CardHeader alignItems={'center'}>
                    <Flex justifyContent={'space-between'}>
                      <Flex gap={2} flex={1} alignItems={'center'}>
                        <Icon as={FaMap} />
                        <Text fontSize={'sm'}>Location</Text>
                      </Flex>
                      <Flex flex={1} justify={'flex-end'}>
                        <Button
                          fontSize={'sm'}
                          onClick={() => {
                            this.setState({
                              entityIsOpen: !this.state.entityIsOpen,
                            });
                          }}
                        >
                          <Icon as={FaPlus} />
                          <Text>Add Location</Text>
                        </Button>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody overflowY={'scroll'}>{entitySet()}</CardBody>
                </Card>
              </TabPanel>
              <TabPanel p={0}>
                <Card height={400}>
                  <CardHeader alignItems={'center'}>
                    <Flex justifyContent={'space-between'}>
                      <Flex gap={2} flex={1} alignItems={'center'}>
                        <Icon as={FaUser} />
                        <Text fontSize={'sm'}>Manage User</Text>
                      </Flex>
                      <Flex flex={1} justify={'flex-end'}>
                        <Button
                          fontSize={'sm'}
                          onClick={() => {
                            this.setState({
                              userIsOpen: !this.state.userIsOpen,
                            });
                          }}
                        >
                          <Icon as={FaPlus} />
                          <Text>Add user</Text>
                        </Button>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody overflowY={'scroll'} overflowX={'scroll'}>
                    {userSet()}
                  </CardBody>
                </Card>
              </TabPanel>
              <TabPanel p={0}>
                <Card height={400}>
                  <CardHeader alignItems={'center'}>
                    <Flex justifyContent={'space-between'}>
                      <Flex gap={2} flex={1} alignItems={'center'}>
                        <Icon as={FaUser} />
                        <Text fontSize={'sm'}>Manage Role</Text>
                      </Flex>
                      <Flex flex={1} justify={'flex-end'}>
                        <Button
                          fontSize={'sm'}
                          onClick={() => {
                            this.setState({
                              roleIsOpen: !this.state.roleIsOpen,
                            });
                          }}
                        >
                          <Icon as={FaPlus} />
                          <Text>Add role</Text>
                        </Button>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody overflowY={'scroll'}>{roleSet()}</CardBody>
                </Card>
              </TabPanel>
              <TabPanel p={0}>
                <Card height={400}>
                  <CardHeader alignItems={'center'}>
                    <Flex justifyContent={'space-between'}>
                      <Flex gap={2} flex={1} alignItems={'center'}>
                        <Icon as={FaUser} />
                        <Text fontSize={'sm'}>Manage Privilege</Text>
                      </Flex>
                      <Flex flex={1} justify={'flex-end'}>
                        <Button
                          fontSize={'sm'}
                          onClick={() => {
                            this.setState({
                              privIsOpen: !this.state.privIsOpen,
                            });
                          }}
                        >
                          <Icon as={FaPlus} />
                          <Text>Add Privilege</Text>
                        </Button>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody overflowY={'scroll'}>{privSet()}</CardBody>
                </Card>
              </TabPanel>
              <TabPanel p={0}>
                <Card height={400}>
                  <CardHeader alignItems={'center'}>
                    <Flex justifyContent={'space-between'}>
                      <Flex gap={2} flex={1} alignItems={'center'}>
                        <Icon as={FaDesktop} />
                        <Text fontSize={'sm'}>Screen Auth Master</Text>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody overflowY={'scroll'}>{privAuthSet()}</CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/*modals */}
          {entityModal(this.state, () => {
            this.setState({ entityIsOpen: !this.state.entityIsOpen });
          })}

          {userModal(this.state, () => {
            this.setState({ userIsOpen: !this.state.userIsOpen });
          })}
          {roleModal(this.state, () => {
            this.setState({ roleIsOpen: !this.state.roleIsOpen });
          })}
          {privModal(this.state, () => {
            this.setState({ privIsOpen: !this.state.privIsOpen });
          })}
        </TabsProvider>
      </>
    );
  }
}

export default AuthorisationSettings;
