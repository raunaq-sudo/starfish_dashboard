import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Flex,
  Icon,
  Text,
  CardHeader,
  CardFooter,
  color,
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
  Select
} from '@chakra-ui/react';
import { FaTrash, FaPlus, FaTasks } from 'react-icons/fa';
import taskTable from './taskTable';
import TaskTable from './taskTable';
import { SelectPicker } from 'rsuite';
import apiEndpoint from '../../config/data';

function ModalButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(isOpen);
  return <></>;
}

class TaskManager extends Component {
  state = {
    MisOpen: false,
    tasks:
      []

  };


  fetchUsers = () => {
    fetch(apiEndpoint + '/api/get_users/', {
      method: 'GET',
      headers: { "Authorization": "Bearer " + localStorage['access'] },


    }).then(response => response.json())
      .then(data => {
        const dd_data = Array.isArray(data['data']) ? data['data'].map((item) => (
          { label: item.first_name, value: item.user_id_id })
        ) : []
        if (Array.isArray(dd_data)) {
          this.setState({ users: dd_data })
        }
      }).catch(err => console.error(err))

  }

  fetchTasks = () => {
    const formDat = new FormData()
    formDat.append('type', 'created')
    fetch(apiEndpoint + '/api/get_tasks/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formDat
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        const tasks = []
        data['data'].forEach((item) => {
          console.log(item.first_name)
          const temp = {
            id: item.id,
            ownerName: item.first_name,
            lastName: item.last_name,
            firstName: item.first_name,
            dueDate: item.due_on,
            header: item.task_title,
            status: item.status,
            description: item.task_desc
          }
          tasks.push(temp)
        })
        this.setState(
          { tasks })

      }).catch(err => console.error(err))

  }



  handelDelete = (id) => {
    const taskData = new FormData()
    taskData.append('taskId', id)
    taskData.append('action', 'delete')


    fetch(apiEndpoint + '/api/modify_task/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: taskData


    }).then(response => response.json())
      .then(data => {
        console.log(data)



      }).catch(err => console.error(err))



    const taskList = this.state.tasks
    taskList.forEach((data, index) => {
      if (data.id === id) {
        taskList.splice(index, 1)
      }

    })
    this.setState({ tasks: taskList })
  }

  modifyTasks = (rowData) => {
    console.log('row')
    console.log(rowData)
    const taskData = new FormData()
    taskData.append('task_title', rowData.header)
    taskData.append('task_desc', rowData.description)
    //taskData.append('assigned_to', rowData.ownerName)
    taskData.append('status', 'Not yet Started')
    taskData.append('due_on', rowData.dueDate)
    taskData.append('taskId', rowData.id)
    taskData.append('action', 'modify')
    console.log('formdata')
    console.log(taskData)
    fetch(apiEndpoint + '/api/modify_task/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: taskData


    }).then(response => response.json())
      .then(data => {
        console.log(data)

      }).catch(err => console.error(err))

    this.fetchTasks()


  }

  addTasks = () => {



    /// push to server

    const taskData = new FormData()
    taskData.append('task_title', document.getElementById('taskName').value)
    taskData.append('task_desc', document.getElementById('desc').value)
    taskData.append('assigned_to', document.getElementById('owner').value)
    taskData.append('status', 'Not yet Started')
    taskData.append('due_on', document.getElementById('dueOn').value)
    taskData.append('taskId', '')


    fetch(apiEndpoint + '/api/modify_task/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: taskData


    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.fetchTasks()
      }).catch(err => console.error(err))





    //this.fetchTasks()
    this.setState({ MisOpen: !this.state.MisOpen });

  };


  componentDidMount = () => {
    this.fetchUsers()
    this.fetchTasks()


  }
  render() {
    return (
      <Card width={'100%'} height={window.innerHeight}>
        <CardHeader fontSize={'sm'}>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'}>
              <Icon as={FaTasks} />
              <Text>Tasks</Text>
            </Flex>
            <Flex flex={1} justifyContent={'flex-end'}>
              {/**/}
              <Button
                fontSize={'sm'}
                onClick={() => {
                  this.setState({ MisOpen: !this.state.MisOpen });
                  this.fetchTasks()
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
                          <FormLabel fontSize={'sm'}>Owner</FormLabel>
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
        <CardBody>
          <Flex direction={'column'} width={'100%'}>

            <TaskTable data={this.state.tasks} handleDel={this.handelDelete} modify={this.modifyTasks} />
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default TaskManager;
