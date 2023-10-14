import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Flex,
} from '@chakra-ui/react';

class BenchmarkOWStat extends Component {
  state = {};
  render() {
    return (
      <Card width={'100%'}>
        <CardHeader bgColor={this.props.bgColor} p={1}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {this.props.header}
          </Text>
        </CardHeader>
        <CardBody p={10} bgColor={this.props.bgColor}>
          <Flex direction={'column'}>
            <Flex gap={1} justifyContent={'center'} alignItems={'center'}>
              <Flex>
                <Text
                  fontSize={'2xl'}
                  textColor={'red.400'}
                  fontWeight={'bold'}
                >
                  {this.props.num}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize={'2xl'}>/</Text>
              </Flex>
              <Flex>
                <Text
                  fontSize={'2xl'}
                  textColor={'green.400'}
                  fontWeight={'bold'}
                >
                  {this.props.denom}
                </Text>
              </Flex>
            </Flex>
            <Flex gap={1} justifyContent={'center'} alignItems={'center'}>
              <Flex>
                <Text fontSize={'xs'} textColor={'red.400'} fontWeight={'bold'}>
                  {this.props.numDesc}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize={'xs'}>/</Text>
              </Flex>
              <Flex>
                <Text
                  fontSize={'xs'}
                  textColor={'green.400'}
                  fontWeight={'bold'}
                >
                  {this.props.denomDesc}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </CardBody>

        <CardFooter justifyContent={'center'} bgColor={this.props.bgColor}>
          <Flex m={2}>
            <Text
              fontSize={'xs'}
              style={{ color: 'green' }}
              textAlign={'center'}
            >
              {this.props.footer}
            </Text>
          </Flex>
        </CardFooter>
      </Card>
    );
  }
}

export default BenchmarkOWStat;
