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
  Center,
  Image,
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
import smallLogo from '../../media/images/Emoticon.png';
import BtnNavigate from '../utility/templates/navigateBtn';
import { useParams } from 'react-router-dom';

class RegistrationForm extends Component {
  state = {
    form: 1,
    //id: this.props.params.uid,
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

  render() {
    return (
      <Flex alignItems={'center'} width={'100%'}>
        <Card
          align={'center'}
          borderRadius={'10'}
          boxShadow={'2xl'}
          fontFamily={'DM Sans, sans-serif'}
          p={'9vH'}
          flex={1}
        >
          <CardHeader justifyContent={'center'} width={'90%'}>
            <Flex>
              <Image src={smallLogo} htmlHeight={80} htmlWidth={80} />
              <Flex direction={'column'}>
                <Heading fontSize={'2xl'} mb={1}>
                  Registration form
                </Heading>
                <Text fontSize={10} color={'gray.500'}>
                  Please enter in the following details.
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody justifyContent={'space-between'}>
            <Flex>
              <Flex direction={'column'} flex={1} gap={2}>
                <Heading fontSize={'lg'} mb={1}>
                  Company Details
                </Heading>
                <FormControl isRequired>
                  <FormLabel fontSize={'12'} fontWeight={'bold'}>
                    Company Name
                  </FormLabel>
                  <Input type="text" name="company" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize={'12'} fontWeight={'bold'}>
                    Address Line 1
                  </FormLabel>
                  <Input type="text" name="addr1" />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={'12'} fontWeight={'bold'} name="addr2">
                    Address Line 2
                  </FormLabel>
                  <Input type="text" />
                </FormControl>

                <Flex gap={'2'}>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      Country
                    </FormLabel>
                    <Select placeholder="Select country" name="country">
                      <option>United Arab Emirates</option>
                      <option>Nigeria</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      State
                    </FormLabel>
                    <Input type="text" name="state" />
                  </FormControl>
                </Flex>
                <Flex gap={'2'}>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      City
                    </FormLabel>
                    <Input type="text" name="city" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize={'12'}
                      fontWeight={'bold'}
                      name="zipCode"
                    >
                      Zip Code
                    </FormLabel>
                    <Input type="number" />
                  </FormControl>
                </Flex>
              </Flex>

              {/* Divider */}
              <Flex height={400} flex={0.4} justifyContent={'center'}>
                <Divider
                  orientation="vertical"
                  colorScheme={'orange'}
                  size={'400px'}
                />
              </Flex>
              <Flex direction={'column'} flex={1} height={'100%'} gap={2}>
                <Heading fontSize={'lg'} mb={1}>
                  Contact Details
                </Heading>
                <Flex gap={'2'} justifyContent={'space-between'}>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      Contact Number
                    </FormLabel>
                    <Input type="number" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      Fax Number
                    </FormLabel>
                    <Input type="number" />
                  </FormControl>
                </Flex>
                <FormControl isRequired m={1}>
                  <Checkbox>
                    <Text fontSize={'12'} fontWeight={'bold'}>
                      Same as Company
                    </Text>
                  </Checkbox>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize={'12'} fontWeight={'bold'}>
                    Address Line 1
                  </FormLabel>
                  <Input
                    type="text"
                    disabled={this.state.disable}
                    value={this.state.disable ? this.state.addr1 : ''}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={'12'} fontWeight={'bold'}>
                    Address Line 2
                  </FormLabel>
                  <Input
                    type="text"
                    disabled={this.state.disable}
                    value={this.state.disable ? this.state.addr2 : ''}
                  />
                </FormControl>

                <Flex gap={'2'}>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      Country
                    </FormLabel>
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
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      State
                    </FormLabel>
                    <Input
                      type="text"
                      disabled={this.state.disable}
                      value={this.state.disable ? this.state.state : ''}
                    />
                  </FormControl>
                </Flex>
                <Flex gap={'2'}>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      City
                    </FormLabel>
                    <Input
                      type="text"
                      disabled={this.state.disable}
                      value={this.state.disable ? this.state.city : ''}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      Zip Code
                    </FormLabel>
                    <Input
                      type="number"
                      disabled={this.state.disable}
                      value={this.state.disable ? this.state.zipCode : ''}
                    />
                  </FormControl>
                </Flex>
                <Flex gap={'2'}>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      Password
                    </FormLabel>
                    <Input type="password" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={'12'} fontWeight={'bold'}>
                      Re Enter Password
                    </FormLabel>
                    <Input type="password" />
                  </FormControl>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
          <CardFooter width={'100%'} justifyContent={'end'}>
            <BtnNavigate
              width={'30%'}
              bgColor={'#faac35'}
              borderBottomRadius={'5'}
              borderTopRadius={'5'}
              textColor={'white'}
              mb={2}
              link="/login"
            >
              Register
            </BtnNavigate>
          </CardFooter>
        </Card>
      </Flex>
    );
  }
}

export default RegistrationForm;
{
  /*bg={'#3311db'}*/
}
