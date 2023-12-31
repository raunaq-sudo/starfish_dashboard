import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Flex,
  GenericAvatarIcon,
  IconButton,
  Image,
  Text,
  theme,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link,
  ListItem,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Modal,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import MenuItemSide from './menuItem';
import { GiCloudUpload, GiHamburgerMenu, GiSettingsKnobs } from 'react-icons/gi';
import logo from '../../media/images/Logo.png';
import minilogo from '../../media/images/Emoticon.png';
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
import { IoIosSettings } from 'react-icons/io';
import { Input } from 'rsuite';
import apiEndpoint from '../config/data';
import inuit from '../config/inuitConfig';
import MenuSideBar from '../utility/templates/menuSideBar';

class Sidebar extends Component {
  state = { sidebarCollapse: this.props.sidebar, view: '', Dashboard: true, modalOpen: false, modalButtonLoading: false };


  componentDidMount = () => {

  }
  render() {
    return (
      <Flex
        h={window.innerHeight}
        id="main"
        zIndex={200}
        width={
          this.props.sidebar ? '5%' : this.props.modeMobile ? '100%' : '20%'
        }
        style={{
          transition: 'width 0.5s',
          transitionTimingFunction: 'ease-in',
        }}
        position={'fixed'}
      >
        <Flex>
          <Box
            width={'100%'}
            justifyContent={'center'}
            bgColor={'white'}
            style={{
              transition: 'width 0.5s, height 0.5s',
              transitionTimingFunction: 'ease',
            }}
          >
            <Image src={logo} p={2} align={'center'} onClick={() => {
              this.props.onClick('Dashboard');
              this.setState({ 'Dashboard': true });
            }} />

            <Divider />
            <MenuSideBar onClick={this.props.onClick} clickEvent={() => { console.log('clicked') }} />
            <Flex
              pos={'relative'}
              mt={window.innerHeight - 100}
              width={'100%'}
              direction={'column'}
            >
              {/*<Flex mt={4} mb={2} justify={'center'}>
                <Avatar mr={this.props.sidebar ? 0 : 2} />
                <Flex
                  direction={'column'}
                  display={this.props.sidebar ? 'none' : 'flex'}
                >
                  <Text fontSize={'md'}>Raunaq Siraswar</Text>
                  <Text fontSize={'sm'}>Admin</Text>
                </Flex>
              </Flex> */}
            </Flex>
          </Box>

          {this.props.children}
        </Flex>
      </Flex>
    );
  }
}

export default Sidebar;
