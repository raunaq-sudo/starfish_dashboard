import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Input,
  Link,
  Spacer,
  Text,
  Grid,
  GridItem,
  Stack,
  Divider,
  StackDivider,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepIcon,
  StepNumber,
  Select,
  Progress,
  Checkbox,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import RegistrationMini from './registrationMini';
import withRouter from '../utility/withRouter';
import { country } from '../../config/data';

class RegistrationForm extends Component {
  state = {
    form: 1,
    id: this.props.params.uid,
    disable: false,
    companyName: '',
    addr1: '',
    addr2: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
  };

  updateState = () => {
    this.setState({
      companyName: document.getElementsByName('company')[0].value,
      addr1: document.getElementsByName('addr1')[0].value,
      addr2: document.getElementsByName('addr1')[0].value,
      country: document.getElementsByName('country')[0].value,
      state: document.getElementsByName('state')[0].value,
      city: document.getElementsByName('city')[0].value,
      zipCode: document.getElementsByName('zipCode')[0].value,
    });
  };

  form1 = () => {
    return (
      <Flex alignItems={'center'} width={'100%'}>
        <Spacer flex={'1'} />
        <Fade>
          <Card flex={'1'} borderRadius={'10'} boxShadow={'2xl'} width={'auto'}>
            <Stack divider={<StackDivider />}>
              <CardHeader textAlign={'center'}>
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                  Company Details
                </Text>
              </CardHeader>
              <CardBody justifyContent={'center'}>
                <Flex gap={'2'} direction={'column'}>
                  <FormControl isRequired>
                    <FormLabel fontSize={'sm'}>Company Name</FormLabel>
                    <Input type="text" name="company" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize={'sm'}>Address Line 1</FormLabel>
                    <Input type="text" name="addr1" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'sm'} name="addr2">
                      Address Line 2
                    </FormLabel>
                    <Input type="text" />
                  </FormControl>

                  <Flex gap={'2'}>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Country</FormLabel>
                      <Select placeholder="Select country" name="country">
                        <option>United Arab Emirates</option>
                        <option>Nigeria</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>State</FormLabel>
                      <Input type="text" name="state" />
                    </FormControl>
                  </Flex>
                  <Flex gap={'2'}>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>City</FormLabel>
                      <Input type="text" name="city" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'} name="zipCode">
                        Zip Code
                      </FormLabel>
                      <Input type="number" />
                    </FormControl>
                  </Flex>
                </Flex>
              </CardBody>

              <CardFooter flexWrap="wrap" justify={'center'}>
                <Box justifyContent={'space-between'}>
                  <ButtonGroup>
                    <Button
                      bg={'yellowgreen'}
                      borderBottomRadius={'5'}
                      borderTopRadius={'5'}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled
                      bg={'darkgray'}
                      borderBottomRadius={'5'}
                      borderTopRadius={'5'}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        this.setState({ form: 2 });
                        this.updateState();
                      }}
                    >
                      Next
                    </Button>

                    <Button
                      bg={'#279EFF'}
                      borderBottomRadius={'5'}
                      borderTopRadius={'5'}
                    >
                      Register
                    </Button>
                  </ButtonGroup>
                </Box>
              </CardFooter>
            </Stack>
          </Card>
        </Fade>
        <Spacer flex={'1'} />
      </Flex>
    );
  };

  form2 = () => {
    return (
      <Flex alignItems={'center'} width={'100%'}>
        <Spacer flex={'1'} />
        <Fade>
          <Card
            flex={'1'}
            borderRadius={'10'}
            boxShadow={'2xl'}
            width={'auto'}
            bgColor={'whiteAlpha.400'}
          >
            <Stack divider={<StackDivider />}>
              <CardHeader textAlign={'center'}>
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                  Contact Details
                </Text>
              </CardHeader>
              <CardBody justifyContent={'center'}>
                <Flex gap={'3'} direction={'column'}>
                  <Flex gap={'2'}>
                    `
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Contact Number</FormLabel>
                      <Input type="number" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Fax Number</FormLabel>
                      <Input type="number" />
                    </FormControl>
                  </Flex>
                  <FormControl isRequired>
                    <Checkbox
                      onChange={() => {
                        this.setState({ disable: !this.state.disable });
                      }}
                    >
                      <Text fontSize={'sm'}>Same as Company</Text>
                    </Checkbox>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize={'sm'}>Address Line 1</FormLabel>
                    <Input
                      type="text"
                      disabled={this.state.disable}
                      value={this.state.disable ? this.state.addr1 : ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'sm'}>Address Line 2</FormLabel>
                    <Input
                      type="text"
                      disabled={this.state.disable}
                      value={this.state.disable ? this.state.addr2 : ''}
                    />
                  </FormControl>

                  <Flex gap={'2'}>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Country</FormLabel>
                      <Select
                        placeholder="Select country"
                        disabled={this.state.disable}
                        value={this.state.disable ? this.state.country : ''}
                      >
                        <option>United Arab Emirates</option>
                        <option>Nigeria</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>State</FormLabel>
                      <Input
                        type="text"
                        disabled={this.state.disable}
                        value={this.state.disable ? this.state.state : ''}
                      />
                    </FormControl>
                  </Flex>
                  <Flex gap={'2'}>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>City</FormLabel>
                      <Input
                        type="text"
                        disabled={this.state.disable}
                        value={this.state.disable ? this.state.city : ''}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Zip Code</FormLabel>
                      <Input
                        type="number"
                        disabled={this.state.disable}
                        value={this.state.disable ? this.state.zipCode : ''}
                      />
                    </FormControl>
                  </Flex>
                  <Flex gap={'2'}>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Password</FormLabel>
                      <Input
                        type="password"
                        disabled={this.state.disable}
                        value={this.state.disable ? this.state.city : ''}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'sm'}>Re Enter Password</FormLabel>
                      <Input
                        type="password"
                        disabled={this.state.disable}
                        value={this.state.disable ? this.state.zipCode : ''}
                      />
                    </FormControl>
                    `
                  </Flex>
                </Flex>
              </CardBody>

              <CardFooter flexWrap="wrap" justify={'center'}>
                <Box justifyContent={'space-between'}>
                  <ButtonGroup>
                    <Button
                      bg={'yellowgreen'}
                      borderBottomRadius={'5'}
                      borderTopRadius={'5'}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        this.setState({ form: 1 });
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled
                      bg={'darkgray'}
                      borderBottomRadius={'5'}
                      borderTopRadius={'5'}
                    >
                      Next
                    </Button>

                    <Button
                      bg={'#279EFF'}
                      borderBottomRadius={'5'}
                      borderTopRadius={'5'}
                    >
                      Register
                    </Button>
                  </ButtonGroup>
                </Box>
              </CardFooter>
            </Stack>
          </Card>
        </Fade>
        <Spacer flex={'1'} />
      </Flex>
    );
  };

  renderer = () => {
    if (this.props.params.uid == null) {
      return <RegistrationMini />;
    } else {
      return <>{this.state.form === 1 ? <this.form1 /> : <this.form2 />}</>;
    }
  };

  render() {
    return <>{<this.renderer />}</>;
  }
}

export default withRouter(RegistrationForm);
