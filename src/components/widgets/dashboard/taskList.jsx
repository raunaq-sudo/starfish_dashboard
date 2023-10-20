import {
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  Text,
  Card,
  Divider,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  IconButton,
  Button,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import {
  FaCheck,
  FaCheckCircle,
  FaCross,
  FaTasks,
  FaTrash,
} from 'react-icons/fa';

class TaskList extends Component {
  state = {};
  fetchTasks = () => {
    const formDat = new FormData()
    formDat.append('type', 'assigned')
    fetch('/api/get_tasks/', {
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
        this.setState({ tasks: tasks })
        console.log(this.state.tasks)
      }).catch(err => console.error(err))

  }

  modifyTasks = (item, action, status) => {

    /// push to server

    const taskData = new FormData()

    taskData.append('taskId', item.id)
    taskData.append('action', action)
    taskData.append('status', status)

    fetch('/api/modify_task/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: taskData


    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ MisOpen: !this.state.MisOpen });
      }).catch(err => console.error(err))



  };


  handelDelete = (id) => {
    const taskList = this.state.tasks
    taskList.forEach((data, index) => {
      if (data.id === id) {
        taskList.splice(index, 1)
      }

    })
    this.setState({ tasks: taskList })
  }

  componentDidMount = () => {
    this.fetchTasks()
  }
  render() {
    return (
      <>
        <Card
          width={'100%'}
          overflowY={'scroll'}
          whiteSpace={'wrap'}
          maxHeight={600}
          scrollBehavior={'smooth'}
        >
          <CardHeader>
            <Flex direction={'column'}>
              <Flex alignItems={'center'} gap={2}>
                <Icon as={FaTasks}></Icon>
                <Text fontSize={'md'}>Task List</Text>
              </Flex>
              <Text fontSize={'xs'}>Pending List</Text>
            </Flex>
          </CardHeader>
          <Divider mt={0} />
          <CardBody p={2} pt={0} wordBreak={'break-word'}>
            <Accordion allowToggle fontSize={'sm'} fontWeight={'light'}>
              {this.state.tasks ? this.state.tasks.map((item) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton height={'10'}>
                      <Box as="span" flex="1" textAlign="left" fontSize={'xs'}>
                        {item.header}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex direction={'column'}>
                      {item.description}
                      <Flex justifyContent={'center'} gap={3}>
                        <IconButton as={Button} icon={<FaCheckCircle />} onClick={() => {
                          this.modifyTasks(item, 'status_update', 'Completed')
                          this.fetchTasks()

                        }} />
                        <IconButton as={Button} icon={<FaTrash />} onClick={() => {
                          this.modifyTasks(item, 'status_update', 'Cancelled')
                          this.fetchTasks()

                        }} />
                      </Flex>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>)) : <></>
              }

            </Accordion>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default TaskList;
