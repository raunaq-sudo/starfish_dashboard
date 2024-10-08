import {
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
import { GiSettingsKnobs } from 'react-icons/gi';
import { FaRegListAlt } from 'react-icons/fa';
import {
  FaChartPie,
  FaDatabase,
  FaDollarSign,
  FaRecycle,
  FaTasks,
} from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

class MenuItemSide extends Component {
  state = {
    open: false,
  };

  styleHover = {
    opacity: 1.0,
    zIndex: 50,
    bgColor: '#fae3a0',
    fontWeight: 'bold',
    boxShadow: '0px 10px 30px rgb(0,0,0,0.1)',
    fontSize: 'lg',
    borderColor: 'black',
  };

  styleSelected = {
    opacity: 1.0,
    zIndex: 100,
    bgColor: '#faac35',
    fontWeight: 'bold',
    boxShadow: '0px 10px 30px rgb(0,0,0,0.1)',
    fontSize: 'lg',
    borderColor: 'black',
  };

  style = {
    bgColor: 'white',
    width: '100%',
    textAlign: 'start',
    opacity: 1,
  };

  validateMenuObj = menuObj => {
    return (
      !menuObj.child ||
      (Array.isArray(menuObj.child) && menuObj.child.length === 0)
    );
  };

  getIcon = key => {
    switch (key) {
      case 'dashBoard':
        return FaDatabase;
      case 'budget':
        return FaRecycle;
      case 'cost':
        return FaDollarSign;
      case 'benchmark':
        return FaChartPie;
      case 'task':
        return FaTasks;
      case 'setting':
        return GiSettingsKnobs;
      case 'aiSummary':
        return FaRegListAlt;
      default:
        return FaDatabase;
    }
  };

  handleClick = (menuObj, key) => {
    this.props.onClick(menuObj, key);
  };

  handleMouseEnter = () => {
    this.setState({ open: true });
  };

  handleMouseLeave = () => {
    this.setState({ open: false });
  };

  render() {
    const { menuObj, sidebarCollapse, active, modeMobile } = this.props;
    const { open } = this.state;
    const isSingleItem = this.validateMenuObj(menuObj);

    return (
      <Flex align={'center'} width={'100%'}>
        {isSingleItem ? (
          <Button
            as={sidebarCollapse ? IconButton : Button}
            textAlign={'start'}
            width={'100%'}
            backgroundColor={'white'}
            isActive={active}
            onClick={() => this.handleClick(menuObj, menuObj.key)}
            _hover={modeMobile ? this.style : this.styleHover}
            _active={this.styleSelected}
          >
            <Flex
              justifyContent={sidebarCollapse ? 'center' : 'left'}
              width={'100%'}
              gap={1}
              p={sidebarCollapse ? 0 : 3}
            >
              <IconContext.Provider value={{ color: '' }}>
                <Icon as={this.getIcon(menuObj.key)} />
              </IconContext.Provider>
              <Text
                fontSize={'sm'}
                display={sidebarCollapse ? 'none' : 'flex'}
                ml={7}
              >
                {menuObj.name}
              </Text>
            </Flex>
          </Button>
        ) : (
          <Menu placement={'right-end'} isOpen={open}>
            <MenuButton
              as={sidebarCollapse ? IconButton : Button}
              textAlign={'start'}
              width={'100%'}
              backgroundColor={active ? '#faac35' : 'white'}
              isActive={active}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              _hover={modeMobile ? this.style : this.styleHover}
              style={active ? this.styleSelected : {}}
            >
              <Flex
                justifyContent={sidebarCollapse ? 'center' : 'left'}
                width={'100%'}
                gap={1}
                p={sidebarCollapse ? 0 : 3}
              >
                <IconContext.Provider value={{ color: 'black' }}>
                  <Icon as={this.getIcon(menuObj.key)} />
                </IconContext.Provider>
                <Text
                  fontSize={'sm'}
                  display={sidebarCollapse ? 'none' : 'flex'}
                  ml={7}
                  color={'black'}
                >
                  {menuObj.name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              {Array.isArray(menuObj.child) &&
                menuObj.child.map(childItem => (
                  <MenuItem
                    key={childItem.key}
                    onClick={() => this.handleClick(childItem, menuObj.key)}
                  >
                    {childItem.description}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        )}
      </Flex>
    );
  }
}

export default MenuItemSide;
