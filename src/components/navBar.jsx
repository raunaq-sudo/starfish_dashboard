import { Box, Flex, Heading, Menu } from '@chakra-ui/react';
import React, { Component } from 'react';

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Flex width={'100%'} position={'fixed'} zIndex={'200'}>
        <Box
          shadow={'md'}
          borderRadius={'10'}
          height={'40px'}
          mb={'20px'}
          flex={'1'}
          textAlign={'center'}
          justifyContent={'center'}
          bgColor={'white'}
        ></Box>
      </Flex>
    );
  }
}

export default NavBar;
