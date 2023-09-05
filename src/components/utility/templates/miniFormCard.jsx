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
      <Flex alignItems={'center'} width={'100%'} pl={'10%'}>
        <Image src={this.props.bg} flex={2} width={300}></Image>
        <Fade>
          <Card
            align={'center'}
            borderRadius={'10'}
            boxShadow={'2xl'}
            fontFamily={'DM Sans, sans-serif'}
            p={'9vH'}
            pt={'8vh'}
            flex={1}
            zIndex={200}
          >
            <CardBody justifyContent={'space-between'} width={400}>
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
