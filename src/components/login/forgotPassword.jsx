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
class ForgotPassword extends Component {
  state = {};
  componentDidMount = () => {
    window.scrollTo(0, 0)

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
            />
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
              bg={'#faac35'}
              borderBottomRadius={'5'}
              borderTopRadius={'5'}
              textColor={'white'}
              mb={2}
              link="/login"
            >
              Reset
            </BtnNavigate>
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
