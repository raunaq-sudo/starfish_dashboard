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

import { IconContext } from 'react-icons/lib';
import colorScheme from '../config/colorPicker'
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaChartPie,
  FaChevronDown,
  FaDatabase,
  FaDollarSign,
  FaRecycle,
  FaTasks,
} from 'react-icons/fa';
class MenuItemDropdown extends Component {
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
        <Menu placement={'right-end'}>
        <MenuButton
          as={Button}
          textAlign={'start'}
          width={'100%'}
          opacity={1}
          backgroundColor={'white'}
          isActive={this.props.active}
          
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
                <Icon as={
                  this.props.menuName === 'DashBoard' ? FaDatabase :
                    this.props.menuName === 'Budget' ? FaRecycle :
                      this.props.menuName === 'Cost' ? FaDollarSign :
                        this.props.menuName === 'Benchmark' ? FaChartPie :
                          this.props.menuName === 'Task' ? FaTasks :
                            this.props.menuName === 'Setting' ? GiSettingsKnobs :
                              FaDatabase
                }></Icon>
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
        </MenuButton>
        <MenuList>
    {/* MenuItems are not rendered unless Menu is open */}
    <MenuItem onClick={this.props.onClick}>Location Analysis</MenuItem>
  </MenuList>
  </Menu>
      </Flex>
    );
  }
}

export default MenuItemDropdown;
