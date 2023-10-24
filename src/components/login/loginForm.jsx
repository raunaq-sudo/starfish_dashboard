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
import React, { Children, Component } from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from 'react-router-dom';
import MiniFormCard from '../utility/templates/miniFormCard';
import birdLogo from '../../media/images/Logo.png';
import bg from '../../media/images/background.png';
import BtnNavigate from '../utility/templates/navigateBtn';
import LnkNavigate from '../utility/templates/navigateLink';
import { Message } from 'rsuite';

class LoginForm extends Component {
  state = { loading: false };
  componentDidMount = () => {
    window.scrollTo(0, 0)
    localStorage.setItem('access', '')
    localStorage.setItem('refresh', '')

  }

  handleLogin = () => {
    this.setState({ loading: true, auth: false })
    var formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);

    fetch('api/token/', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data['access']) {
          localStorage.setItem('access', data['access'])
          localStorage.setItem('refresh', data['refresh'])
          this.setState({ auth: true })
        } else {
          alert('Please Check your credentials.')
        }

        this.setState({ loading: false })

      })
      .catch(error => {
        console.error(error)
        this.setState({ loading: false })
        alert('Please Check your credentials.')

      });
  }


  render() {
    return (

      <>

        <MiniFormCard
          header=""
          headerDescription=""
          logo={birdLogo}
          bg={bg}
          p={10}
        >
          <FormControl isRequired width={'100%'} mb={4}>
            <FormLabel fontSize={'12'} fontWeight={'bold'} >
              Email
            </FormLabel>
            <Input type="email" placeholder="mailId@domain.com" width={'100%'} id='username' required />
          </FormControl>
          <FormControl isRequired width={'100%'} mb={4}>
            <FormLabel fontSize={'12'} fontWeight={'bold'} >
              Password
            </FormLabel>
            <Input type="password" width={'100%'} id='password' required />
          </FormControl>
          <Flex
            align={'center'}
            justify={'center'}
            width={'100%'}
            direction={'column'}
          >
            <BtnNavigate
              width={'100%'}
              bgColor={'#faac35'}
              borderBottomRadius={'5'}
              borderTopRadius={'5'}
              textColor={'white'}
              mb={2}
              auth={this.state.auth}
              link="/Dash"
              onClick={() => {
                if (document.getElementById('username').value === '' || document.getElementById('password').value === '') { alert('Please enter your login details.') } else {

                  this.handleLogin()
                }


              }}
              isLoading={this.state.loading}
            >
              Login
            </BtnNavigate>
            {/*<Button
            width={'100%'}
            bgColor={'#faac35'}
            borderBottomRadius={'5'}
            borderTopRadius={'5'}
            textColor={'white'}
            mb={2}
          >
            Login
    </Button>*/}
            {/* Tst */}
            <Flex width={'100%'} textAlign={'left'}>
              <Flex flex={1} direction={'column'} fontSize={'xs'}>
                <Text fontSize={'xs'} color={'gray.500'}>
                  Not registered yet?{' '}
                </Text>
                <LnkNavigate color="blue" link="/register">
                  Create an Account!
                </LnkNavigate>
              </Flex>
              {/*<Flex flex={1} justifyContent={'end'} width={'100%'}>
                <LnkNavigate fontSize={'xs'} color={'blue'} link="resetPass">
                  Forgot password?
                </LnkNavigate>
  </Flex>*/}
            </Flex>
          </Flex>
        </MiniFormCard></>
    );
  }
}

export default LoginForm;
