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
import MenuItemDropdown from './menuItemDropdown';



class MenuItemSide extends Component {
  state = {
    open:false
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

  validateMenuObj = (menuObj) =>{
      
      if (menuObj.child===undefined){
        return true
      }
      if (Array.isArray(menuObj.child)){
        if (menuObj.child.length>0){
          return false
        }else {
          return true
        }
      }
  
  }
  render() {
    return (
      <Flex align={'center'} width={'100%'}>
        {this.validateMenuObj(this.props.menuObj)?(
             <Button
             as={this.props.sidebarCollapse ? IconButton : Button}
             textAlign={'start'}
             width={'100%'}
             opacity={1}
             backgroundColor={'white'}
             isActive={this.props.active}
             onClick={()=>{this.props.onClick(this.props.menuObj, this.props.menuObj.key)}}
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
                     this.props.menuObj.key === 'dashBoard' ? FaDatabase :
                       this.props.menuObj.key === 'budget' ? FaRecycle :
                         this.props.menuObj.key === 'cost' ? FaDollarSign :
                           this.props.menuObj.key === 'benchmark' ? FaChartPie :
                             this.props.menuObj.key === 'task' ? FaTasks :
                               this.props.menuObj.key === 'setting' ? GiSettingsKnobs :
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
                   {this.props.menuObj.name}{' '}
                 </Text>
               </Flex>
             </Flex>
           </Button>
        ):
        <Menu placement={'right-end'} isOpen={this.state.open}>
        <MenuButton
          as={this.props.sidebarCollapse ? IconButton : Button}
          textAlign={'start'}
          width={'100%'}
          opacity={1}
          backgroundColor={this.props.active?'#faac35':'white'}
          isActive={this.props.active}
          onMouseEnter={()=>{
            this.setState({open:true})
          }}
          onMouseLeave={()=>{
            this.setState({open:false})
          }}
          _hover={this.props.modeMobile ? this.style : this.styleHover}
          style={this.props.active?this.styleSelected:{}}
        >
          <Flex
            justifyContent={this.props.sidebarCollapse ? 'center' : 'left'}
            width={'100%'}
            gap={1}
            p={this.props.sidebarCollapse ? 0 : 3}
          >
            <Flex justifyContent={'center'}>
              <IconContext.Provider value={{ color: 'black' }}>
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
                color={'black'}
              >
                {this.props.menuObj.name}
              </Text>
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList 
        onMouseEnter={()=>{
          this.setState({open:true})
        }}
        onMouseLeave={()=>{
          this.setState({open:false})
        }}>
    {/* MenuItems are not rendered unless Menu is open */}
    {Array.isArray(this.props.menuObj.child)?this.props.menuObj.child.map((child_list)=>(
       <MenuItem onClick={()=>{this.props.onClick(child_list, this.props.menuObj.key)}}>{child_list.description}</MenuItem>
    )):<></>}
   
  </MenuList>
  </Menu>}
     
      </Flex>
    );
  }
}

export default MenuItemSide;
