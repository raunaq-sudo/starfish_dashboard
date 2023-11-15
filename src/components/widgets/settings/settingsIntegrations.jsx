import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
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
import React, { Component } from 'react';
import { FaPlus, } from 'react-icons/fa';
import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack } from 'rsuite';
import inuit from '../../config/inuitConfig';
import apiEndpoint from '../../config/data';



class IntegrationSetting extends Component {
  state = {
    connectModal: false,
    apps: [{
      app_name: 'Quickbook',
      company_id: '123456789',
      integration_type: 'Online',
      last_sync: '2023-12-23',
      daily_sync: 'On'
    }]
  };

  handleAuth = () => {

    var data = new FormData()
    data.append('client_id', this.state.client_id)
    data.append('secret_key', this.state.secret_key)
    data.append('inuit_company_id', this.state.inuit_company_id)
    data.append('type', inuit['type'])

    fetch(apiEndpoint + '/api/inuit_auth/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'POST',
      body: data,

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.redirect(data)

      }).catch(err => {
        console.error(err)
        alert('Error occured.')
      })
  }

  redirect = (url) => {
    this.setState({ modalButtonLoading: false, modalOpen: false })
    window.open(url)
  }


  render() {
    return (
      <>
        <Flex direction={'column'} gap={4}>
          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              size={'sm'}
              onClick={() => {
                this.setState({ connectModal: !this.state.connectModal });
              }}
            >
              <Icon as={FaPlus} />
              <Text>Add Integration</Text>
            </Button>
          </Flex>
          <Accordion allowToggle>
            {this.state.apps !== undefined ? this.state.apps.map((data) => (<AccordionItem>
              <AccordionButton>
                <Box flex={1} textAlign={'left'} fontSize={'sm'}>
                  <Heading size={'sm'}>{data.app_name}</Heading>

                </Box>
                <Flex
                  flex={1}
                  justifyContent={'flex-end'}
                  gap={4}
                  alignItems={'center'}
                >

                  <Tag
                    colorScheme={this.state.connected ? 'green' : 'red'}
                    justifyContent={'center'}
                  >
                    {this.state.connected ? 'Connected' : 'Disconnected'}
                  </Tag>
                </Flex>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel flexDirection={'column'} gap={3}>
                <Flex flex={1} gap={2}>
                  <Flex flex={1}>
                    <Heading size={'xs'} p={1}>Intuit Company ID:</Heading>
                    <Text p={1} size={'xs'}>{data.company_id}</Text>
                  </Flex>
                  <Flex flex={1} justifyContent={'start'}>
                    <Heading size={'xs'} p={1}>Integration Type:</Heading>
                    <Text pt={1} pb={1} size={'xs'}>{data.integration_type}</Text>
                  </Flex>
                </Flex>
                <Flex flex={1} gap={2}>
                  <Flex flex={1}>
                    <Heading size={'xs'} p={1}>Date of last sync:</Heading>
                    <Text p={1} size={'xs'}>{data.last_sync}</Text>
                  </Flex>
                  <Flex flex={1} justifyContent={'start'}>
                    <Heading size={'xs'} p={1}>Daily sync status:</Heading>
                    <Text pt={1} pb={1} size={'xs'}>{data.daily_sync}</Text>
                  </Flex>
                </Flex>
                <Flex flex={1}>
                  <IconButton as={Button} icon={<IoMdRefresh />} flex={1} onClick={() => { this.handleAuth() }}>
                    <Text p={2}>Sync with quickbooks</Text></IconButton>
                </Flex>
              </AccordionPanel>
            </AccordionItem>)) : <></>}
          </Accordion>
        </Flex>

        {/*Modal*/}
        <Modal
          closeOnOverlayClick={false}
          isOpen={this.state.connectModal}
          onClose={this.state.onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Integrations</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={'column'} gap={2}>
                <Flex gap={2} justify={'space-between'}>
                  <Flex justifyContent={'start'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xs'}>App Name</Text>
                      </FormLabel>
                      <Input type="text" id='appName' />
                    </FormControl>
                  </Flex>


                </Flex>
                <Flex>

                  <RadioGroup defaultValue='online' id='appType' onChange={this.setState({ quikbooksType: !this.state.quickbooksType })}>
                    <Stack spacing={5} direction='column'>

                      <Radio colorScheme='green' value='online' id='online' >
                        Quickbooks Online
                      </Radio>
                      <Radio colorScheme='green' value='desktop' pl={3} id='desktop'>
                        Quickbooks Desktop
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
                <Flex direction={'row'}>
                  <Flex alignItems={'center'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xxs'}>Capture Location</Text>
                      </FormLabel>
                      <Switch onChange={this.setState({ captureLocation: !this.state.captureLocation })} />
                    </FormControl>
                  </Flex>
                  <Flex alignItems={'center'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xxs'}>Location Attribute</Text>
                      </FormLabel>
                      <Switch onChange={this.setState({ captureLocation: !this.state.captureLocation })} />
                    </FormControl>
                  </Flex>
                </Flex>
              </Flex>

            </ModalBody>

            <ModalFooter>
              <Flex width={'100%'}>

                <Button colorScheme="blue" mr={3} flex={1} onClick={() => {
                  console.log(this.state)

                }}>
                  Save
                </Button>
                <Button onClick={this.state.onClose} flex={1}>Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>

      </>
    );
  }
}

export default IntegrationSetting;
