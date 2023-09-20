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

import ReCAPTCHA from 'react-google-recaptcha';
class MiniFormCard extends Component {
  state = {};
  render() {
    return (
      <Flex alignItems={'center'} width={'100%'} pl={window.screen.width > 500 ? 'auto' : 'auto'} justifyContent={'center'}>
        {window.screen.width > 500 ? <Image src={this.props.bg} flex={2} maxHeight={window.innerHeight}
          zIndex={100} alignSelf={'start'} /> : <></>}

        <Fade>
          <Card
            align={'center'}
            borderRadius={'10'}
            boxShadow={'lg'}
            fontFamily={'DM Sans, sans-serif'}
            p={window.screen.width > 500 ? '9vH' : '2'}
            pt={window.screen.width > 500 ? '8vh' : '3'}
            flex={1}
            zIndex={200}
            height={window.innerHeight}
          >
            <CardBody justifyContent={'space-between'} width={window.screen.width > 500 ? 400 : '100%'}>
              <Flex
                direction={'column'}
                textAlign={'left'}
                width={'100%'}
                mb={4}
                align={'center'}
                gap={2}
              >
                <Image src={this.props.logo} height={'auto'} width={300} />
                <Flex textAlign={'left'} width={'100%'} direction={'column'}>
                  <Heading fontSize={'2xl'} mb={1}>
                    {this.props.header}
                  </Heading>
                  <Text fontSize={10} color={'gray.500'}>
                    {this.props.headerDescription}
                  </Text>
                </Flex>
              </Flex>
              {this.props.children}
            </CardBody>
          </Card>
        </Fade>
      </Flex>
    );
  }
}

export default MiniFormCard;
