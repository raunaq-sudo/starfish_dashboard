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
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import MiniFormCard from '../utility/templates/miniFormCard';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate, useNavigation } from 'react-router-dom';
import birdLogo from '../../media/images/Logo.png';
import bg from '../../media/images/background.png';
import LnkNavigate from '../utility/templates/navigateLink';
import BtnNavigate from '../utility/templates/navigateBtn';
import apiEndpoint from '../config/data';

class RegistrationMini extends Component {
  state = {};


  handleMiniReg = () => {
    var flag = false
    console.log(document.getElementById('companyName').value)
    if ((document.getElementById('companyName').value !== '') && (document.getElementById('email').value !== '')) {
      flag = true
    } else {
      flag = false
    }
    if (flag) {
      var formData = new FormData()
      formData.append('company_name', document.getElementById('companyName').value)
      formData.append('email', document.getElementById('email').value)
      fetch(apiEndpoint + '/api/miniReg/', {
        method: 'POST',
        body: formData
      }).then((data) => data.json()).then((data) => {
        console.log(data)
        alert(data['status'])
      }).catch(err => console.error(err))
    } else {
      alert("Please Fill all the details.")
    }

  }

  componentDidMount = () => {
    window.scrollTo(0, 0)

  }
  render() {
    return (
      <MiniFormCard
        header="New Registration"
        headerDescription="Enter your information to proceed further!"
        logo={birdLogo}
        bg={bg}
        p={10}
      >
        <FormControl isRequired width={'100%'} mb={4}>
          <FormLabel fontSize={'12'} fontWeight={'bold'}>
            Company Name
          </FormLabel>
          <Input type="text" width={'100%'} id='companyName' />
        </FormControl>
        <FormControl isRequired width={'100%'} mb={4}>
          <FormLabel fontSize={'12'} fontWeight={'bold'}>
            Email
          </FormLabel>
          <Input type="email" width={'100%'} id='email' />
        </FormControl>
        <Flex width={'100%'} justifyContent={'center'} mb={4}>
          <ReCAPTCHA render="explicit" sitekey="your_site_key" />
        </Flex>
        <Flex
          align={'center'}
          justify={'center'}
          width={'100%'}
          direction={'column'}
        >
          <BtnNavigate
            width={'100%'}
            bgColor={'#fcaa35'}
            borderBottomRadius={'5'}
            borderTopRadius={'5'}
            textColor={'white'}
            mb={2}
            link="2"
            onClick={() => {
              this.handleMiniReg()
            }}
          >
            Continue
          </BtnNavigate>
          <Flex width={'100%'} textAlign={'left'}>
            <Text fontSize={'xs'} color={'gray.500'} >
              Already registered?{' '}
              <LnkNavigate color="blue" link="/login">
                Click here to login!
              </LnkNavigate>
            </Text>
          </Flex>
        </Flex>
      </MiniFormCard>
    );
  }
}

export default RegistrationMini;
