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
import apiEndpoint from '../config/data';
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
    show: true,
    passFlag: true
  };

  stateUpdater = (e) => {
    if (e.target.value) {
      const key = e.target.id;
      this.setState({ [key]: e.target.value })
    }
  }

  transCompUser = () => {
    const userData = [
      'userPhone',
      'userAddr1',
      'userAddr2',
      'userCountry',
      'userEmail',
      'userCity',
      'userZipCode',
      'userState',
    ]
    const companyData = [
      'companyPhone',
      'companyAddr1',
      'companyAddr2',
      'companyCountry',
      'companyEmail',
      'companyCity',
      'companyZipCode',
      'companyState',
    ]
    function zip(arrays) {
      return arrays[0].map(function (_, i) {
        return arrays.map(function (array) { return array[i] })
      });
    }
    const array = zip([userData, companyData])

    array.forEach(ele => {
      document.getElementById(ele[0]).value = document.getElementById(ele[1]).value
    })
  }

  passData = () => {
    const required_fields = [
      'companyName',
      'companyPhone',
      'companyAddr1',
      'companyAddr2',
      'companyCountry',
      'companyEmail',
      'companyCity',
      'companyZipCode',
      'companyState',
      'userPhone',
      'userAddr1',
      'userCountry',
      'userEmail',
      'userCity',
      'userZipCode',
      'userState',
      'firstName',
      'lastName',
      'pass',
      'userAddr2'

    ]
    // check if the pass are matching
    if (document.getElementById('pass').value !== undefined && document.getElementById('pass').value === document.getElementById('pass1').value) {
      var field_list = []
      required_fields.forEach((val) => {
        if (document.getElementById(val).value === undefined || document.getElementById(val).value === null) {
          this.setState({ passFlag: false })
          this.setState({ [val + "_i"]: true })
        }
      })

    } else {
      alert('Please check the passwords entered.')

    }

    if (this.state.passFlag) {
      var formData = new FormData()
      required_fields.forEach((val) => {
        formData.append(val, document.getElementById(val).value)
      })
      formData.append('code', this.props.code)
      console.log(formData)

      fetch(apiEndpoint + "/api/regData/", {
        body: formData,
        method: 'POST',
      }).then(response => response.json()).then(data => { this.setState({ statusData: data }) }).catch(err => { console.error(err) })

      if (this.state.statusData !== undefined) {
        if (this.state.statusData['registration_status'] === 'passed') {
          alert('Registration successfull!.')
          window.open('/', '_self')
        } else {
          alert(this.state.statusData['registration_status'])
        }
      }

    } else {
      alert('Please fill ' + field_list)
    }


  }


  componentDidMount = () => {
    fetch(apiEndpoint + '/api/country/', {
      method: 'GET',
    }).then(response => response.json()).then((data) => {
      this.setState({ countryData: data })
      console.log(data)
    }).catch(err => console.error(err))
  }
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
                <Image src={logo} maxH={'50px'} />
              </Flex>
              <Flex flex={1} justifyContent={'flex-end'} p={0}>
                <IconButton as={Button} icon={<FaQuestionCircle />} bgColor={'white'} />
              </Flex>

            </Flex>

          </CardHeader>
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
                      <FormControl isRequired isInvalid={this.state['companyName_i']}>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Company Name
                        </FormLabel>
                        <Input
                          size={'sm'} type="text" id="companyName" />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['companyPhone_i']}>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Phone
                        </FormLabel>
                        <Input
                          size={'sm'} type="number" id="companyPhone" />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['companyAddr1_i']}>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Address Line 1
                        </FormLabel>
                        <Input
                          size={'sm'} type="text" id="companyAddr1" />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={'12'} fontWeight={'bold'} >
                          Address Line 2
                        </FormLabel>
                        <Input
                          size={'sm'} type="text" id="companyAddr2" />
                      </FormControl>

                      <FormControl isRequired isInvalid={this.state['companyCountry_i']} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Country
                        </FormLabel>
                        <Select placeholder="Select country" id="companyCountry" size={'sm'} onChange={(e) => {
                          this.stateUpdater(e)
                        }}>
                          {this.state.countryData !== undefined ?
                            this.state.countryData.map((ele) => <option>{ele.country_label}</option>)
                            : <></>}

                        </Select>
                      </FormControl>

                    </Flex>
                    {/* second columns */}
                    <Flex gap={'2'} direction={'column'} flex={1}>
                      <FormControl isRequired isInvalid={this.state['companyCity_i']} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          City
                        </FormLabel>
                        <Input
                          size={'sm'} type="text" id="companyCity" />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['companyEmail_i']} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Email
                        </FormLabel>
                        <Input
                          size={'sm'} type="email" id="companyEmail" />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['companyZipCode_i']}>
                        <FormLabel
                          fontSize={'12'}
                          fontWeight={'bold'}
                          id="zipCode" onChange={(e) => this.stateUpdater(e)}
                        >
                          Zip Code
                        </FormLabel>
                        <Input
                          size={'sm'} type="number" id='companyZipCode' />
                      </FormControl>


                      {/* <FormControl isRequired isInvalid={this.state['']===undefined} isInvalid={document.getElementById('').value.length>0}>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Business Type
                        </FormLabel>
                        <Select placeholder="Business Entity" id="country" onChange={(e)=>this.stateUpdater(e)} size={'sm'}>
                          <option>LLC</option>
                          <option>Private</option>
                        </Select>
            </FormControl> */}
                      <FormControl isRequired isInvalid={this.state['companyState_i']} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          State
                        </FormLabel>
                        <Input
                          size={'sm'} type="text" id="companyState" />
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
                    <FormControl isRequired isInvalid={this.state['firstName_i']} >
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        First Name
                      </FormLabel>
                      <Input
                        size={'sm'} type="text" id='firstName' />
                    </FormControl>
                    <FormControl isRequired isInvalid={this.state['lastName_i']} >
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Last Name
                      </FormLabel>
                      <Input
                        size={'sm'} type="text" id='lastName' />
                    </FormControl>
                    <FormControl isRequired isInvalid={this.state['userMobile_i']} >
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Mobile Number
                      </FormLabel>
                      <Input
                        size={'sm'} type="number" id='userMobile' />
                    </FormControl>



                  </Flex>
                  <FormControl isRequired m={1}>
                    <Checkbox onChange={(e) => {
                      console.log(this.state.show)
                      this.setState({ show: !this.state.show }, () => {

                        this.transCompUser()

                      })


                    }}>
                      <Text fontSize={'12'} fontWeight={'bold'}>
                        Same as Company
                      </Text>
                    </Checkbox>
                  </FormControl>

                  <Flex gap={10} direction={window.screen.width > 500 ? 'row' : 'column'}>

                    {/* first column */}

                    <Flex direction={'column'} flex={1} gap={2}>
                      <FormControl isRequired isInvalid={this.state['userPhone_i'] && this.state.show} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Phone
                        </FormLabel>
                        <Input disabled={!this.state.show}
                          size={'sm'} type="number" id="userPhone" />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['userAddr1_i'] && this.state.show} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Address Line 1
                        </FormLabel>
                        <Input disabled={!this.state.show}
                          size={'sm'}
                          type="text"
                          id='userAddr1'
                          onChange={(e) => this.stateUpdater(e)}

                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Address Line 2
                        </FormLabel>
                        <Input disabled={!this.state.show}
                          size={'sm'}
                          type="text"
                          id='userAddr2'
                          onChange={(e) => this.stateUpdater(e)}

                        />
                      </FormControl>


                      <FormControl isRequired isInvalid={this.state['userCountry_i'] && this.state.show} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Country
                        </FormLabel>
                        <Select
                          placeholder="Select country"
                          size={'sm'}
                          id='userCountry'
                          onChange={(e) => this.stateUpdater(e)}
                          disabled={!this.state.show}

                        >
                          {this.state.countryData !== undefined ?
                            this.state.countryData.map((ele) => <option>{ele.country_label}</option>)
                            : <></>}


                        </Select>
                      </FormControl>

                    </Flex>

                    {/* second column */}
                    <Flex direction={'column'} flex={1} gap={2}>
                      <FormControl isRequired isInvalid={this.state['userEmail_i'] && this.state.show} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Email
                        </FormLabel>
                        <Input disabled={!this.state.show}
                          size={'sm'} type="email" id="userEmail" />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['userCity_i'] && this.state.show} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          City
                        </FormLabel>
                        <Input disabled={!this.state.show}
                          size={'sm'}
                          type="text"
                          id='userCity'
                          onChange={(e) => this.stateUpdater(e)}

                        />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['userZipCode_i'] && this.state.show} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          Zip Code
                        </FormLabel>
                        <Input disabled={!this.state.show}
                          size={'sm'}
                          type="number"
                          id='userZipCode'
                          onChange={(e) => this.stateUpdater(e)}

                        />
                      </FormControl>
                      <FormControl isRequired isInvalid={this.state['userState_i'] && this.state.show} >
                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                          State
                        </FormLabel>
                        <Input disabled={!this.state.show}
                          size={'sm'}
                          type="text"
                          id='userState'
                          onChange={(e) => this.stateUpdater(e)}

                        />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex gap={'2'}>

                  </Flex>
                  {/*password */}
                  <Flex gap={'10'} direction={window.screen.width > 500 ? 'row' : 'column'}>
                    <FormControl isRequired isInvalid={this.state['pass_i'] && this.state.show} >
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Password
                      </FormLabel>
                      <Input
                        size={'sm'} type="password" id='pass' />
                    </FormControl>
                    <FormControl isRequired isInvalid={this.state['pass1_i'] && this.state.show} >
                      <FormLabel fontSize={'12'} fontWeight={'bold'}>
                        Re-Enter Password
                      </FormLabel>
                      <Input
                        size={'sm'} type="password" id='pass1' />
                    </FormControl>
                  </Flex>


                  <Divider />
                  {/* Uploader
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

                  </Uploader>*/}

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
              onClick={() => {

                this.passData()
              }}
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
