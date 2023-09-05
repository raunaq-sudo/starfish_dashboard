import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { GiCash, GiSettingsKnobs } from 'react-icons/gi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { IoIosCash } from 'react-icons/io';
import { FaDollarSign } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

class MenuItemSide extends Component {
  state = {};
  styleHover = {
    opacity: 1.0,

    zIndex: 50,
    bgColor: '#fae3a0',
    fontWeight: 'bold',
    boxShadow: '0px 10px 30px rgb(0,0,0,0.2)',
    fontSize: 'lg',
    borderColor: 'black',
  };
  styleSelected = {
    opacity: 1.0,

    zIndex: 100,
    bgColor: '#faac35',
    fontWeight: 'bold',
    boxShadow: '0px 10px 30px rgb(0,0,0,0.2)',
    fontSize: 'lg',
    borderColor: 'black',
  };
  style = {
    bgColor: 'white',
    width: '100%',
    textAlign: 'start',
    opacity: 1,
  };
  render() {
    return (
      <Flex align={'center'} width={'100%'}>
        <Button
          as={this.props.sidebarCollapse ? IconButton : Button}
          textAlign={'start'}
          width={'100%'}
          opacity={1}
          backgroundColor={'white'}
          isActive={this.props.active}
          onClick={this.props.onClick}
          _hover={this.props.modeMobile ? this.style : this.styleHover}
          _active={this.styleSelected}
        >
          <Flex
            justifyContent={this.props.sidebarCollapse ? 'center' : 'left'}
            width={'100%'}
            gap={1}
            p={this.props.sidebarCollapse ? 0 : 3}
          >
            <Flex justifyContent={'center'}>
              <IconContext.Provider value={{ color: '' }}>
                <Icon as={this.props.icon}></Icon>
              </IconContext.Provider>
            </Flex>
            <Flex justifyContent={'left'}>
              <Text
                fontSize={'sm'}
                display={this.props.sidebarCollapse ? 'none' : 'flex'}
                ml={7}
                transition={'display 5s'}
              >
                {' '}
                {this.props.menuName}{' '}
              </Text>
            </Flex>
          </Flex>
        </Button>
      </Flex>
    );
  }
}

export default MenuItemSide;
