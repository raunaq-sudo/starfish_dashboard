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
  Tag,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

const integrationModal = (props, onClose) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.connectModal}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Integrations</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex direction={'column'} gap={2}>
            <Flex gap={2} justify={'space-between'}>
              <Flex justifyContent={'start'} flex={1}>
                <FormControl>
                  <FormLabel>
                    <Text fontSize={'xs'}>App Name</Text>
                  </FormLabel>
                  <Input type="text" />
                </FormControl>
              </Flex>
              <Flex alignItems={'center'} flex={1}>
                <FormControl>
                  <FormLabel>
                    <Text fontSize={'xs'}>Active</Text>
                  </FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
            </Flex>

            <FormControl>
              <FormLabel>
                <Text fontSize={'xs'}>Comments</Text>
              </FormLabel>
              <Textarea type="text" />
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel fontSize={'xs'} mb={0}>
              API URL
            </FormLabel>
            <Input type="text" size={'sm'} />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'xs'} mb={0}>
              API key
            </FormLabel>
            <Input type="text" size={'sm'} />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'xs'} mb={0}>
              Secret key
            </FormLabel>
            <Input type="text" size={'sm'} />
          </FormControl>
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

class IntegrationSetting extends Component {
  state = {};
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
            <AccordionItem>
              <AccordionButton>
                <Box flex={1} textAlign={'left'} fontSize={'sm'}>
                  ZohoBooks
                </Box>
                <Flex
                  flex={1}
                  justifyContent={'flex-end'}
                  gap={4}
                  alignItems={'center'}
                >
                  <Switch
                    onChange={() => {
                      this.setState({ connected: !this.state.connected });
                    }}
                  ></Switch>
                  <Tag
                    colorScheme={this.state.connected ? 'green' : 'red'}
                    justifyContent={'center'}
                  >
                    {this.state.connected ? 'Connected' : 'Disconnected'}
                  </Tag>
                </Flex>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel flexDirection={'column'}>
                <Flex direction={'column'}>
                  <FormControl>
                    <FormLabel fontSize={'xs'} mb={0}>
                      API URL
                    </FormLabel>
                    <Input type="text" size={'sm'} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'xs'} mb={0}>
                      API key
                    </FormLabel>
                    <Input type="text" size={'sm'} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'xs'} mb={0}>
                      Secret key
                    </FormLabel>
                    <Input type="text" size={'sm'} />
                  </FormControl>
                </Flex>
                <Flex justifyContent={'end'} mt={2}>
                  <Button size={'sm'}>Test</Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>

        {/*Modal*/}
        {integrationModal(this.state, () => {
          this.setState({ connectModal: !this.state.connectModal });
        })}
      </>
    );
  }
}

export default IntegrationSetting;
