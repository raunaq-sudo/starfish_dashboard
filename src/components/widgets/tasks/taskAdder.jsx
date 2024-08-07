import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Flex,
  Icon,
  Text,
  CardHeader,
  CardFooter,
  Wrap,
  WrapItem,
  AccordionProvider,
  Accordion,
  AccordionItem,
  AccordionButton,
  Badge,
  AccordionPanel,
  Button,
  useDisclosure,
  ModalHeader,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  FormLabel,
  Input,
  FormControl,
  ModalBody,
  Textarea,
  useUpdateEffect,
  Select,
} from '@chakra-ui/react';
import { FaTrash, FaPlus, FaTasks } from 'react-icons/fa';
import TaskTable from './taskTable';
import { SelectPicker } from 'rsuite';
import apiEndpoint from '../../config/data';

class TaskManager extends Component {
  state = {
    MisOpen: false,
    tasks: [],
    tableLoading: true,
    cardBodyOverflow: 'auto',
  };

  fetchUsers = () => {
    this.setState({ users: [], tableLoading: true }, () => {
      fetch(apiEndpoint + '/api/get_users/', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage['access'] },
      })
        .then(response => response.json())
        .then(data => {
          const dd_data = Array.isArray(data['data'])
            ? data['data'].map(item => ({
                label: item.first_name,
                value: item.user_id_id,
              }))
            : [];
          if (Array.isArray(dd_data)) {
            this.setState({ users: dd_data });
          }
        })
        .catch(err => console.error(err));
    });
  };

  fetchTasks = sortType => {
    const formDat = new FormData();
    formDat.append('type', 'created');
    formDat.append('sortType', sortType);
    console.log(sortType);
    fetch(apiEndpoint + '/api/get_tasks/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: formDat,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const tasks = data['data'].map(item => ({
          id: item.id,
          ownerName: item.first_name,
          lastName: item.last_name,
          firstName: item.first_name,
          dueDate: item.due_on,
          header: item.task_title,
          status: item.status,
          description: item.task_desc,
        }));
        this.setState(
          { tasks, tableLoading: false },
          this.checkCardBodyOverflow
        );
      })
      .catch(err => console.error(err));
  };

  checkCardBodyOverflow = () => {
    const cardBodyHeight = document.getElementById('cardBody').clientHeight;
    const contentHeight = document.getElementById('content').scrollHeight;
    if (contentHeight > cardBodyHeight) {
      this.setState({ cardBodyOverflow: 'scroll' });
    } else {
      this.setState({ cardBodyOverflow: 'auto' });
    }
  };

  handelDelete = id => {
    const taskData = new FormData();
    taskData.append('taskId', id);
    taskData.append('action', 'status_update');
    taskData.append('status', 'Cancelled');
    fetch(apiEndpoint + '/api/modify_task/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: taskData,
    })
      .then(response => response.json())
      .then(() => {
        this.fetchTasks();
      })
      .catch(err => console.error(err));
  };

  modifyTasks = rowData => {
    this.setState({ tableLoading: true, tasks: [] });
    console.log('row');
    console.log(rowData);
    console.log('owner id ' + document.getElementById('owner1').value);
    const ownerId =
      document.getElementById('owner1').value ||
      this.state.users.find(item => item.label === rowData.ownerName).value;
    console.log('replacement id' + ownerId.value);
    const taskData = new FormData();
    taskData.append('task_title', document.getElementById('taskName1').value);
    taskData.append('task_desc', document.getElementById('desc1').value);
    taskData.append('assigned_to', ownerId);
    taskData.append('status', 'Not yet Started');
    taskData.append('due_on', document.getElementById('dueOn1').value);
    taskData.append('taskId', rowData.id);
    taskData.append('action', 'modify');
    console.log('formdata');
    console.log(taskData);
    fetch(apiEndpoint + '/api/modify_task/', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      body: taskData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.fetchTasks();
      })
      .catch(err => console.error(err));
  };

  addTasks = () => {
    this.setState({ tableLoading: true, tasks: [] }, () => {
      const taskData = new FormData();
      taskData.append('task_title', document.getElementById('taskName').value);
      taskData.append('task_desc', document.getElementById('desc').value);
      taskData.append('assigned_to', document.getElementById('owner').value);
      taskData.append('status', 'Not yet Started');
      taskData.append('due_on', document.getElementById('dueOn').value);
      taskData.append('taskId', '');
      fetch(apiEndpoint + '/api/modify_task/', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + localStorage['access'] },
        body: taskData,
      })
        .then(response => response.json())
        .then(() => {
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    });
    this.setState({ MisOpen: !this.state.MisOpen });
  };

  componentDidMount = () => {
    this.setState({ tableLoading: true });
    this.fetchUsers();
    this.fetchTasks();
  };

  render() {
    return (
      <Flex direction="column" height="100vh">
        <Card width={'100%'} flex="1" display="flex" flexDirection="column">
          <CardHeader fontSize={'sm'}>
            <Flex>
              <Flex gap={2} flex={1} alignItems={'center'}>
                <Icon as={FaTasks} />
                <Text >Tasks</Text>
              </Flex>
              <Flex flex={1} justifyContent={'flex-end'}>
                <Button
                fontSize={'sm'}
                  onClick={() => {
                    this.setState({ MisOpen: !this.state.MisOpen });
                    this.fetchTasks();
                  }}
                >
                  <Icon as={FaPlus} />
                  <Text>Add Task</Text>
                </Button>
                <Modal
                isOpen={this.state.MisOpen}
                onClose={() => {
                  this.setState({ MisOpen: !this.state.MisOpen });
                }}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex
                      width={'100%'}
                      direction={'column'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      gap={4}
                    >
                      <FormControl>
                        <FormLabel fontSize={'sm'}>Task name</FormLabel>
                        <Input placeholder="Task name" id="taskName" required />
                      </FormControl>
                      <Flex gap={2} width={'100%'}>
                        <FormControl flex={1}>
                          <FormLabel fontSize={'sm'}>Assigned To</FormLabel>
                          <Select width='100%' id='owner'>
                            {this.state.users !== undefined ? this.state.users.map((item) => (<option value={item.value}>
                              {item.label}
                            </option>)) : <></>}
                          </Select>
                        </FormControl>
                        <FormControl flex={1}>
                          <FormLabel fontSize={'sm'} >Due Date</FormLabel>
                          <Input
                            placeholder="Due Date"
                            type="date"
                            id="dueOn"
                            required
                          />
                        </FormControl>
                      </Flex>
                      <FormControl>
                        <FormLabel fontSize={'sm'}>Description</FormLabel>
                        <Textarea
                          style={{whiteSpace:'pre-line'}}
                          placeholder="Desription"
                          id="desc"
                          required
                        ></Textarea>
                      </FormControl>
                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => {
                        this.addTasks()

                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        this.fetchTasks()
                        this.setState({
                          MisOpen: !this.state.MisOpen
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody
            id="cardBody"
            overflowY={this.state.cardBodyOverflow}
            flex="1"
          >
            <Flex direction="column" gap={2} id="content">
            <TaskTable
              data={this.state.tasks}
              users={this.state.users}
              handleDel={this.handelDelete}
              modify={this.modifyTasks}
              setLoading={this.setLoading}
              loading={this.state.tableLoading}
              retrieveData={this.fetchTasks}
            />
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    );
  }
}

export default TaskManager;
