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
  state = { reCapPass: false, buttonLoader:false };


  handleMiniReg = () => {
    this.setState({buttonLoader:true})
    var flag = false
    console.log(document.getElementById('companyName').value)
    if ((document.getElementById('companyName').value !== '') && (document.getElementById('email').value !== '')) {
      flag = true
    } else {
      flag = false
    }
    if (flag) {
      if (this.state.reCapPass) {
        var formData = new FormData()
        formData.append('company_name', document.getElementById('companyName').value)
        formData.append('email', document.getElementById('email').value)
        fetch(apiEndpoint + '/api/miniReg/', {
          method: 'POST',
          body: formData
        }).then((data) => data.json()).then((data) => {
          console.log(data)
          this.setState({buttonLoader:false})

          alert(data['status'])
          window.open('/', '_self')
        }).catch(err => {
          console.error(err)
          this.setState({buttonLoader:false})
          
        }
        )
      } else {
        alert("Please select the ReCaptcha.")
        this.setState({buttonLoader:false})

      }

    } else {
      alert("Please Fill all the details.")
      this.setState({buttonLoader:false})

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
          <ReCAPTCHA render="explicit" sitekey="6LdthfQoAAAAAHaSkvGKWDLNN5F10hmofZjkssFl"
            onChange={() => { this.setState({ reCapPass: true }) }}
            onError={() => {
              this.setState({ reCapPass: false })
              alert('Please try the ReCaptcha again!')
            }}
            onExpired={() => {
              this.setState({ reCapPass: false })
              alert('Please try the ReCaptcha again!')
            }} />
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
            isLoading = {this.state.buttonLoader}
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
