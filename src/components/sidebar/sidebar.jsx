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

class Sidebar extends Component {
  state = { sidebarCollapse: this.props.sidebar, view: '', dashboardBtn: true };

  disableAllBtn = () => {
    this.setState({
      dashboardBtn: false,
      costBtn: false,
      benchmarkBtn: false,
      taskBtn: false,
      settingBtn: false,
      budgetBtn: false,
      uploadBtn: false,
    });
  };

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
              this.disableAllBtn();
              this.setState({ dashboardBtn: true });
            }} />

            <Divider />
            <Flex direction={'column'} mt={2} align={'center'} gap={6} p={5} pt={1}>
              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                icon={FaDatabase}
                menuName="Dashboard"
                onClick={() => {
                  window.scrollTo(0, 0);

                  this.props.onClick('Dashboard');
                  this.disableAllBtn();
                  this.setState({ dashboardBtn: true });
                }}
                active={this.state.dashboardBtn}
              />
              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                icon={FaDollarSign}
                menuName="Costs"
                onClick={() => {
                  window.scrollTo(0, 0);

                  this.props.onClick('Cost');
                  this.disableAllBtn();
                  this.setState({ costBtn: true });
                }}
                active={this.state.costBtn}
              />
              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                icon={FaChartPie}
                menuName="Benchmark"
                onClick={() => {
                  window.scrollTo(0, 0);

                  this.props.onClick('Benchmark');
                  this.disableAllBtn();
                  this.setState({ benchmarkBtn: true });
                }}
                active={this.state.benchmarkBtn}
              />
              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                icon={FaRecycle}
                menuName="Budget"
                onClick={() => {
                  window.scrollTo(0, 0);

                  this.props.onClick('Budget');
                  this.disableAllBtn();
                  this.setState({ budgetBtn: true });
                }}
                active={this.state.budgetBtn}
              />
              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                icon={FaTasks}
                menuName="Tasks"
                onClick={() => {
                  window.scrollTo(0, 0);

                  this.props.onClick('Task');
                  this.disableAllBtn();
                  this.setState({ taskBtn: true });
                }}
                active={this.state.taskBtn}
              />
              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                icon={GiSettingsKnobs}
                menuName="Settings"
                onClick={() => {
                  window.scrollTo(0, 0);

                  this.props.onClick('Setting');
                  this.disableAllBtn();
                  this.setState({ settingBtn: true });
                }}
                active={this.state.settingBtn}
              />
              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                icon={GiCloudUpload}
                menuName="Upload Data"
                onClick={() => {
                  window.scrollTo(0, 0);

                  this.props.onClick('UploadData');
                  this.disableAllBtn();
                  this.setState({ uploadBtn: true });
                }}
                active={this.state.uploadBtn}
              />
            </Flex>
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
