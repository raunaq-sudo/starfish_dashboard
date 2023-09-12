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

class RegistrationMini extends Component {
  state = {};
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
          <Input type="text" width={'100%'} />
        </FormControl>
        <FormControl isRequired width={'100%'} mb={4}>
          <FormLabel fontSize={'12'} fontWeight={'bold'}>
            Email
          </FormLabel>
          <Input type="email" width={'100%'} />
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
          >
            Continue
          </BtnNavigate>
          <Flex width={'100%'} textAlign={'left'}>
            <Text fontSize={'xs'} color={'gray.500'}>
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
