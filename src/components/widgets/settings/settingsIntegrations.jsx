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
import { FaPlus } from 'react-icons/fa';
import { Stack } from 'rsuite';

const quickbooksType = (props, onClose) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.connectModal}
      onClose={onClose}
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
            <Flex>

              <RadioGroup defaultValue='1'>
                <Stack spacing={5} direction='column'>

                  <Radio colorScheme='green' value='1'>
                    Quickbooks Online
                  </Radio>
                  <Radio colorScheme='green' value='2' pl={3}>
                    Quickbooks Desktop
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <Flex direction={'row'}>
              <Flex alignItems={'center'} flex={1}>
                <FormControl>
                  <FormLabel>
                    <Text fontSize={'xs'}>Capture Location</Text>
                  </FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
              <Flex alignItems={'center'} flex={1}>
                <FormControl>
                  <FormLabel>
                    <Text fontSize={'xs'}>Location Attribute</Text>
                  </FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
            </Flex>
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

              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>

        {/*Modal*/}
        {quickbooksType(this.state, () => {
          this.setState({ connectModal: !this.state.connectModal });
        })}
      </>
    );
  }
}

export default IntegrationSetting;
