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
  Icon,
  Badge,
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
import { FaAddressCard, FaArrowRight, FaBell, FaBriefcase, FaFile, FaQuestionCircle } from 'react-icons/fa';
import logo from '../../media/images/Logo.png'
import { IconButton } from '@chakra-ui/react';
import "rsuite/dist/rsuite.css";
import { Uploader } from 'rsuite';


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
    show: true,
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

          borderRadius={'10'}
          boxShadow={'2xl'}
          fontFamily={'DM Sans, sans-serif'}

          flex={1}
        >
          <CardHeader justifyContent={'center'} width={'100%'}>
            <Flex width={'100%'} alignItems={'center'}>
              <Flex flex={1}>
                <Image src={logo} maxH={20} />
              </Flex>
              <Flex flex={1} justifyContent={'flex-end'} p={0}>
                <IconButton as={Button} icon={<FaQuestionCircle />} bgColor={'white'} />
              </Flex>
              {/*   <Image src={smallLogo} htmlHeight={80} htmlWidth={80} />
              <Flex direction={'column'}>
              <Heading fontSize={'xl'} mb={1}>
                  Registration form
                </Heading>
                <Text fontSize={10} color={'gray.500'}>
                  Please enter in the following details.
    </Text>

              </Flex>*/}
            </Flex>

          </CardHeader>
          <Divider />
          <CardBody>
            <Box gap={3}>
              <Flex bgColor={'orange.100'} padding={3} width={'100%'} mb={10} mt={0} gap={4} alignItems={'center'}>
                <Icon as={FaBell} />
                <Text size={'sm'}> Collecting this information to ensure your security and indentity  </Text>
              </Flex>

              <Flex direction={'column'} width={'100%'} >
                <Flex direction={'column'} flex={2} gap={2} width={'100%'}>
                  {/* Heading */}
                  <Flex gap={2} alignItems={'center'}>
                    <Icon as={FaBriefcase} />
                    <Heading fontSize={'md'} mb={1}>
                      Company Details
                    </Heading></Flex>


                  {/*Business details */}
                  <Flex gap={'10'} direction={window.screen.width > 500 ? 'row' : 'column'}>
                    {/* first columns */}
                    <Flex gap={'2'} direction={'column'} flex={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Company Name
                        </FormLabel>
                        <Input size={'sm'} type="text" name="company" />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Phone
                        </FormLabel>
                        <Input size={'sm'} type="number" name="phone" />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Address Line 1
                        </FormLabel>
                        <Input size={'sm'} type="text" name="addr1" />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={'12'} fontWeight={'bold'} name="addr2">
                          Address Line 2
                        </FormLabel>
                        <Input size={'sm'} type="text" />
                      </FormControl>

                      <FormControl isRequired size={'sm'}>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Country
                        </FormLabel>
                        <Select placeholder="Select country" name="country" size={'sm'}>
                          <option>United Arab Emirates</option>
                          <option>Nigeria</option>
                        </Select>
                      </FormControl>

                    </Flex>
                    {/* second columns */}
                    <Flex gap={'2'} direction={'column'} flex={1}>
                      <FormControl isRequired>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          City
                        </FormLabel>
                        <Input size={'sm'} type="text" name="city" />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Email
                        </FormLabel>
                        <Input size={'sm'} type="email" name="email" />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel
                          fontSize={'12'}
                          fontWeight={'bold'}
                          name="zipCode"
                        >
                          Zip Code
                        </FormLabel>
                        <Input size={'sm'} type="number" />
                      </FormControl>


                      <FormControl isRequired size={'sm'}>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Business Type
                        </FormLabel>
                        <Select placeholder="Business Entity" name="country" size={'sm'}>
                          <option>LLC</option>
                          <option>Private</option>
                        </Select>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          State
                        </FormLabel>
                        <Input size={'sm'} type="text" name="state" />
                      </FormControl>
                    </Flex>

                  </Flex>
                </Flex>

                {/* Divider */}
                <Flex width={'100%'} flex={1} justifyContent={'center'}>
                  <Divider
                    orientation="horizontal"
                    colorScheme={'orange'}
                    size={'400px'}
                    width={'100%'}
                  />
                </Flex>

                {/* Heading */}
                <Flex gap={2} alignItems={'center'}>
                  <Icon as={FaAddressCard} />
                  <Heading fontSize={'md'} mb={1}>
                    Contact Details
                  </Heading></Flex>


                <Flex direction={'column'} flex={2} height={'100%'} gap={2}>
                  {/*Contact Information */}
                  <Flex gap={'10'} justifyContent={'space-between'} direction={window.screen.width > 500 ? 'row' : 'column'}>
                    <FormControl isRequired>
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Contact Number
                      </FormLabel>
                      <Input size={'sm'} type="number" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Fax Number
                      </FormLabel>
                      <Input size={'sm'} type="number" />
                    </FormControl>
                  </Flex>
                  <FormControl isRequired m={1}>
                    <Checkbox onChange={() => { this.setState({ show: !this.state.show }, console.log(this.state.show)) }}>
                      <Text fontSize={'12'} fontWeight={'bold'}>
                        Same as Company
                      </Text>
                    </Checkbox>
                  </FormControl>
                  {this.state.show ?
                    <Flex gap={10} direction={window.screen.width > 500 ? 'row' : 'column'}>

                      {/* first column */}

                      <Flex direction={'column'} flex={1} gap={2}>
                        <FormControl isRequired>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            Phone
                          </FormLabel>
                          <Input size={'sm'} type="number" name="phone" />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            Address Line 1
                          </FormLabel>
                          <Input size={'sm'}
                            type="text"


                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            Address Line 2
                          </FormLabel>
                          <Input size={'sm'}
                            type="text"


                          />
                        </FormControl>


                        <FormControl isRequired>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            Country
                          </FormLabel>
                          <Select
                            placeholder="Select country"
                            size={'sm'}
                          >
                            <option>United Arab Emirates</option>
                            <option>Nigeria</option>
                          </Select>
                        </FormControl>

                      </Flex>

                      {/* second column */}
                      <Flex direction={'column'} flex={1} gap={2}>
                        <FormControl isRequired>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            Email
                          </FormLabel>
                          <Input size={'sm'} type="email" name="email" />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            City
                          </FormLabel>
                          <Input size={'sm'}
                            type="text"


                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            Zip Code
                          </FormLabel>
                          <Input size={'sm'}
                            type="number"


                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel fontSize={'12'} fontWeight={'bold'}>
                            State
                          </FormLabel>
                          <Input size={'sm'}
                            type="text"


                          />
                        </FormControl>
                      </Flex>
                    </Flex> : <></>}
                  <Flex gap={'2'}>

                  </Flex>
                  {/*password */}
                  <Flex gap={'10'} direction={window.screen.width > 500 ? 'row' : 'column'}>
                    <FormControl isRequired>
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Password
                      </FormLabel>
                      <Input size={'sm'} type="password" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Re Enter Password
                      </FormLabel>
                      <Input size={'sm'} type="password" />
                    </FormControl>
                  </Flex>


                  <Divider />
                  {/*uploader*/}
                  <Flex gap={2} alignItems={'center'} width={'100%'} mt={5}>
                    <Icon as={FaFile} />
                    <Heading fontSize={'md'} mb={1}>
                      File upload
                    </Heading>
                  </Flex>

                  <Uploader
                    listType="picture-text"
                    action="//jsonplaceholder.typicode.com/posts/"
                    draggable>
                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span>Click or Drag files to this area to upload</span>
                    </div>

                  </Uploader>

                </Flex>
              </Flex>
            </Box>
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
              gap={5}
            >
              <Text>Continue</Text>
              <Image as={FaArrowRight} />

            </BtnNavigate>
          </CardFooter>
        </Card>
      </Flex >
    );
  }
}

export default RegistrationForm;
{
  /*bg={'#3311db'}*/
}
