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
} from '@chakra-ui/react';
import { FaTrash, FaPlus, FaTasks } from 'react-icons/fa';
import taskTable from './taskTable';
import TaskTable from './taskTable';
function ModalButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(isOpen);
  return <></>;
}

class TaskManager extends Component {
  state = {
    MisOpen: false,
    tasks: [
      {
        task: 'Something to do',
        dueDate: '25.08.2023',
        owner: 'Alan',
        status: 'C',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.Quibusdam sapiente modi, tempore est dolor ut reprehenderit aliquam necessitatibus eum quod dictamagnam, mollitia veritatis et perferendis, ipsam accusamus placeat dolore!',
      },
    ],
  };

  updateTasks = () => {
    const tempTask = this.state.tasks;
    Array.isArray(tempTask)
      ? this.setState({
        tasks: tempTask.push({
          task: document.getElementsByName('taskName')[0].value,
          dueDate: document.getElementsByName('dueOn')[0].value,
          owner: document.getElementsByName('owner')[0].value,
          description: document.getElementsByName('desc')[0].value,
          status: 'N',
        }),
      })
      : console.log('Error in Tasks' + tempTask);
    this.setState({ MisOpen: !this.state.MisOpen });
    console.log(this.state.tasks);
  };
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
                        <Input placeholder="Task name" name="taskName" />
                      </FormControl>
                      <Flex gap={2}>
                        <FormControl flex={1}>
                          <FormLabel fontSize={'sm'}>Owner</FormLabel>
                          <Input placeholder="Owner" name="owner" />
                        </FormControl>
                        <FormControl flex={1}>
                          <FormLabel fontSize={'sm'}>Due On</FormLabel>
                          <Input
                            placeholder="Due Date"
                            type="date"
                            name="dueOn"
                          />
                        </FormControl>
                      </Flex>
                      <FormControl>
                        <FormLabel fontSize={'sm'}> Description</FormLabel>
                        <Textarea
                          placeholder="Desription"
                          name="desc"
                        ></Textarea>
                      </FormControl>
                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={this.updateTasks}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        this.setState({ MisOpen: !this.state.MisOpen });
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
            {/*<AccordionProvider>
              <Accordion allowToggle>
                {Array.isArray(this.state.tasks) ? (
                  this.state.tasks.map((item, KEY) => {
                    return (
                      <AccordionItem>
                        <AccordionButton>
                          <Flex
                            fontSize={'sm'}
                            width={'100%'}
                            gap={2}
                            textAlign={'center'}
                          >
                            <Flex flex={1}>
                              <Text>
                                <b>Task:</b>
                                {item.task}
                              </Text>
                            </Flex>
                            <Flex flex={1}>
                              <Text>
                                <b>Due date:</b> {item.dueDate}
                              </Text>
                            </Flex>
                            <Flex flex={1}>
                              <Text>
                                <b>Owner:</b>
                                {item.owner}
                              </Text>
                            </Flex>
                            <Flex flex={1} width={'100%'}>
                              <Badge
                                width={'100%'}
                                colorScheme={
                                  item.status === 'C'
                                    ? 'green'
                                    : item.status === 'O'
                                    ? 'yellow'
                                    : item.status === 'D'
                                    ? 'red'
                                    : 'gray'
                                }
                              >
                                {item.status === 'C'
                                  ? 'Completed'
                                  : item.status === 'O'
                                  ? 'Open'
                                  : item.status === 'D'
                                  ? 'Deleted'
                                  : 'New'}
                              </Badge>
                            </Flex>
                          </Flex>
                        </AccordionButton>
                        <AccordionPanel
                          fontSize={'sm'}
                          flexDirection={'column'}
                          justifyContent={'center'}
                        >
                          <Flex direction={'column'} gap={2}>
                            <b>Description</b>
                            <p>{item.description}</p>
                            <Flex>
                              <Button
                                bgColor={'#faac35'}
                                fontSize={'xs'}
                                gap={2}
                              >
                                <Icon as={FaTrash} />
                                Delete Task
                              </Button>
                            </Flex>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })
                ) : (
                  <>Not an array {this.state.tasks}</>
                )}
              </Accordion>
                </AccordionProvider>*/}
            <TaskTable />
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default TaskManager;
