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
              <AccordionItem>
                <h2>
                  <AccordionButton height={'10'}>
                    <Box as="span" flex="1" textAlign="left" fontSize={'xs'}>
                      Dashboarding
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex direction={'column'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <Flex justifyContent={'center'} gap={3}>
                      <IconButton as={Button} icon={<FaCheckCircle />} />
                      <IconButton as={Button} icon={<FaTrash />} />
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton height={'10'}>
                    <Box as="span" flex="1" textAlign="left" fontSize={'xs'}>
                      Dashboarding
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex direction={'column'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <Flex justifyContent={'center'} gap={3}>
                      <IconButton as={Button} icon={<FaCheckCircle />} />
                      <IconButton as={Button} icon={<FaTrash />} />
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton height={'10'}>
                    <Box as="span" flex="1" textAlign="left" fontSize={'xs'}>
                      Dashboarding
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex direction={'column'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <Flex justifyContent={'center'} gap={3}>
                      <IconButton as={Button} icon={<FaCheckCircle />} />
                      <IconButton as={Button} icon={<FaTrash />} />
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton height={'10'}>
                    <Box as="span" flex="1" textAlign="left" fontSize={'xs'}>
                      Dashboarding
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex direction={'column'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <Flex justifyContent={'center'} gap={3}>
                      <IconButton as={Button} icon={<FaCheckCircle />} />
                      <IconButton as={Button} icon={<FaTrash />} />
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton height={'10'}>
                    <Box as="span" flex="1" textAlign="left" fontSize={'xs'}>
                      Dashboarding
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex direction={'column'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <Flex justifyContent={'center'} gap={3}>
                      <IconButton as={Button} icon={<FaCheckCircle />} />
                      <IconButton as={Button} icon={<FaTrash />} />
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton height={'10'}>
                    <Box as="span" flex="1" textAlign="left" fontSize={'xs'}>
                      Meeting at 1600hrs
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex direction={'column'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <Flex justifyContent={'center'} gap={3}>
                      <IconButton as={Button} icon={<FaCheckCircle />} />
                      <IconButton as={Button} icon={<FaTrash />} />
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default TaskList;
