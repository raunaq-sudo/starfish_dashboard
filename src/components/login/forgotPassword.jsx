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
  Text,
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
import birdLogo from '../../media/images/Logo.png';
import bg from '../../media/images/background.png';
import ReCAPTCHA from 'react-google-recaptcha';
import MiniFormCard from '../utility/templates/miniFormCard';
import BtnNavigate from '../utility/templates/navigateBtn';
import LnkNavigate from '../utility/templates/navigateLink';
import apiEndpoint from '../config/data';
class ForgotPassword extends Component {
  state = {buttonLoader:false};
  componentDidMount = () => {
    window.scrollTo(0, 0)

  }
  resetCheck = () => {
    this.setState({buttonLoader:true})
    var flag = false
    const emailRegex = /^(.+)@(.+)$/
    if ((emailRegex.test(document.getElementById('email').value)) && (document.getElementById('email').value !== '')) {
      flag = true
    } else {
      if(!emailRegex.test(document.getElementById('email').value)){
        alert("Please enter valid email id.")
      } 
      flag = false
    }
    if (flag) {
      if (this.state.reCapPass) {
        var formData = new FormData()
        //formData.append('company_name', document.getElementById('companyName').value)
        formData.append('email', document.getElementById('email').value)
        formData.append('email_type', 'password_reset')
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
        })
      } else {
        alert("Please select the ReCaptcha.")
        this.setState({buttonLoader:false})

      }

    } else {
      alert("Please Fill all the details.")
      this.setState({buttonLoader:false})

    }
  }
  render() {
    return (
      <>
        <MiniFormCard
          header="Forgot Password"
          headerDescription="Enter your email id to reset your password"
          logo={birdLogo}
          bg={bg}
          p={10}
        >
          <FormControl isRequired width={'100%'} mb={4}>
            <FormLabel fontSize={'12'} fontWeight={'bold'}>
              Email
            </FormLabel>
            <Input
              type="email"
              placeholder="mailId@domain.com"
              width={'100%'}
              id='email'
            />
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
            <Button
              width={'100%'}
              bg={'#faac35'}
              borderBottomRadius={'5'}
              borderTopRadius={'5'}
              textColor={'white'}
              mb={2}
              isLoading = {this.state.buttonLoader}
              onClick ={()=>{
                this.resetCheck()}
              }
            >
              Reset
            </Button>
            <Flex width={'100%'} direction={'column'} fontSize={'xs'}>
              <Text fontSize={'xs'} color={'gray.500'}>
                Not registered yet?{' '}
              </Text>
              <LnkNavigate color="blue" link="/register">
                Create an Account!
              </LnkNavigate>
            </Flex>
          </Flex>
        </MiniFormCard>
      </>
    );
  }
}

export default ForgotPassword;

//<Flex alignItems={'center'} width={'100%'} pl={'10%'}>
//<Fade>
//  <Card
//    align={'center'}
//    borderRadius={'10'}
//    boxShadow={'2xl'}
//    fontFamily={'DM Sans, sans-serif'}
//    p={'9vH'}
//    flex={1}
//    zIndex={200}
//  >
//    <CardBody justifyContent={'space-between'} width={400}>
//      <Flex
//        direction={'column'}
//        textAlign={'left'}
//        width={'100%'}
//        mb={4}
//        align={'center'}
//      >
//        <Image src={birdLogo} height={'auto'} width={100} />
//        <Flex textAlign={'left'} width={'100%'} direction={'column'}>
//          <Heading fontSize={'2xl'} mb={1}>
//            Forgot Password
//          </Heading>
//          <Text fontSize={10} color={'gray.500'}>
//            Enter your email to reset your password!
//          </Text>
//        </Flex>
//      </Flex>
//      <FormControl isRequired width={'100%'} mb={4}>
//        <FormLabel fontSize={'12'} fontWeight={'bold'}>
//          Email
//        </FormLabel>
//        <Input
//          type="email"
//          placeholder="mailId@domain.com"
//          width={'100%'}
//        />
//      </FormControl>
//
//      {/*<ReCAPTCHA render="explicit" sitekey="your_site_key" />*/}
//      <Flex
//        align={'center'}
//        justify={'center'}
//        width={'100%'}
//        direction={'column'}
//      >
//        <Button
//          width={'100%'}
//          bg={'#3311db'}
//          borderBottomRadius={'5'}
//          borderTopRadius={'5'}
//          textColor={'white'}
//          mb={2}
//        >
//          Reset
//        </Button>
//        <Flex width={'100%'} textAlign={'left'}>
//          <Text fontSize={'xs'} color={'gray.500'}>
//            Not registered yet?{' '}
//            <Link color="blue">Create an Account!</Link>
//          </Text>
//        </Flex>
//      </Flex>
//    </CardBody>
//  </Card>
//</Fade>
//
//<Image src={bg} flex={2}></Image>
//</Flex>
