import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
  Spacer,
  Box,
  Button,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Avatar,
  Text,
  useDisclosure,
  Input,
  Divider,
  Image,
} from '@chakra-ui/react';
import React, { Component, useState } from 'react';
import {
  FaBars,
  FaBell,
  FaChartPie,
  FaChevronCircleDown,
  FaChevronDown,
  FaDatabase,
  FaDollarSign,
  FaHamburger,
  FaQuestionCircle,
  FaRecycle,
  FaRegQuestionCircle,
  FaSignOutAlt,
  FaTasks,
  FaUser,
} from 'react-icons/fa';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import US from 'country-flag-icons/react/3x2/US';
import LnkNavigate from '../utility/templates/navigateLink';
import BtnNavigate from '../utility/templates/navigateBtn';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import Sidebar from '../sidebar/sidebar';
import MenuItemSide from '../sidebar/menuItem';
import { GiSettingsKnobs } from 'react-icons/gi';
import logo from '../../media/images/Logo.png';
import miniLogo from '../../media/images/xslogo.png';

function DrawerSideBar(props) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setOnOpen] = useState(false);
  // const [onClose, setOnClose] = useState(true);

  return <></>;
}

function genNavbar(props) {
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
        bgColor={'whitesmoke'}
      ></Box>
    </Flex>
  );
}

class Navbar extends Component {
  state = {
    sidebarCollapse: this.props.sidebar,
    view: '',
    dashboardBtn: true,
  };

  disableAllBtn = () => {
    this.setState({
      dashboardBtn: false,
      costBtn: false,
      benchmarkBtn: false,
      taskBtn: false,
      settingBtn: false,
      budgetBtn: false,
      drawerOpen: false,
    });
  };

  render() {
    return (
      <Flex
        shadow={'sm'}
        height={'40px'}
        alignItems={'center'}
        zIndex={100}
        position={'fixed'}
        bgColor={'white'}
        width={'100%'}
        style={{ transition: 'width 1s left 1s' }}
      >
        <Flex flex={1} p={5} fontSize={'sm'}>
          {window.screen.width < 1000 ? (
            <>

              <Flex p={2} flex={1} justifyContent={'center'}>
                <IconButton
                  as={FaBars}
                  p={2}
                  bgColor={'white'}
                  onClick={() => {
                    this.setState({ drawerOpen: true });
                  }}
                  flex={1}
                />
              </Flex>
              <Flex p={2} flex={2} alignItems={'center'} justifyContent={'center'}>
                <Image src={logo} height={'40px'} />
              </Flex>

              <Drawer
                isOpen={this.state.drawerOpen}
                placement="left"
                onClose={() => {
                  this.setState({ drawerOpen: false });
                }}
              >
                <DrawerOverlay />
                <DrawerContent p={0} width={'100%'}>
                  <DrawerCloseButton />

                  <DrawerBody p={0} justifyContent={'center'}>
                    <Flex
                      h={window.innerHeight}
                      id="main"
                      zIndex={200}
                      width={
                        this.props.sidebar
                          ? '5%'
                          : '100%'
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
                          <Image src={logo} p={2} align={'center'} />

                          <Divider />
                          <Flex
                            direction={'column'}
                            mt={4}
                            align={'center'}
                            gap={6}
                            p={5}
                          >
                            <MenuItemSide
                              icon={FaDatabase}
                              menuName="Dashboard"
                              onClick={() => {
                                this.props.onClick('Dashboard');

                                this.disableAllBtn();
                                this.setState({
                                  dashboardBtn: true,
                                });
                              }}
                              active={this.state.dashboardBtn}
                              modeMobile={true}
                            />
                            <MenuItemSide
                              icon={FaDollarSign}
                              menuName="Cost"
                              onClick={() => {
                                this.props.onClick('Cost');
                                this.disableAllBtn();
                                this.setState({
                                  costBtn: true,
                                });
                              }}
                              active={this.state.costBtn}
                              modeMobile={true}
                            />
                            <MenuItemSide
                              icon={FaChartPie}
                              menuName="Benchmark"
                              onClick={() => {
                                this.props.onClick('Benchmark');
                                this.disableAllBtn();
                                this.setState({
                                  benchmarkBtn: true,
                                });
                              }}
                              active={this.state.benchmarkBtn}
                              modeMobile={true}
                            />
                            <MenuItemSide
                              icon={FaRecycle}
                              menuName="Budget"
                              onClick={() => {
                                this.props.onClick('Budget');
                                this.disableAllBtn();
                                this.setState({
                                  budgetBtn: true,
                                });
                              }}
                              active={this.state.budgetBtn}
                              modeMobile={true}
                            />
                            <MenuItemSide
                              icon={FaTasks}
                              menuName="Task"
                              onClick={() => {
                                this.props.onClick('Task');
                                this.disableAllBtn();
                                this.setState({ taskBtn: true });
                              }}
                              active={this.state.taskBtn}
                              modeMobile={true}
                            />
                            <MenuItemSide
                              icon={GiSettingsKnobs}
                              menuName="Setting"
                              onClick={() => {
                                this.props.onClick('Setting');
                                this.disableAllBtn();
                                this.setState({
                                  settingBtn: true,
                                });
                              }}
                              active={this.state.settingBtn}
                              modeMobile={true}
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
                      </Flex>
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (<>
            {/*<Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>*/}</>
          )}
        </Flex>

        <Flex width={'100%'} alignItems={'center'} flex={1} gap={4}>
          {window.screen.width > 500 ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FaChevronDown />}
                bgColor={'white'}
                fontSize={'sm'}
              >
                {getUnicodeFlagIcon('US')}
              </MenuButton>
              <MenuList>
                {/*<MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>*/}
              </MenuList>
            </Menu>
          ) : (
            <></>
          )}

          <Menu>
            <MenuButton as={IconButton} bgColor={'white'} fontSize={'sm'}>
              <Icon as={FaBell} />
            </MenuButton>
            <MenuList>
              {/*<MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>*/}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={IconButton}
              bgColor={'white'}
              fontSize={'sm'}
              rightIcon={<FaChevronDown />}
            >
              <Flex gap={2} width={'100%'} p={3}>
                {/*<Icon as={Avatar} flex={1} />*/}
                <Flex direction={'column'} textAlign={'left'} flex={1}>
                  <Text fontSize={12}>John Doe</Text>
                  <Text fontSize={10}>Admin</Text>
                </Flex>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Button}
                gap={2}
                onClick={() => { this.props.onClick('Profile') }}
                justifyContent={'start'}
              >
                <Icon as={FaUser} />
                <Text>View Profile</Text>
              </MenuItem>
              <MenuItem
                as={BtnNavigate}
                gap={2}
                link="/login"
                justifyContent={'start'}
              >
                <Icon as={FaSignOutAlt} />
                <Text>Sign out</Text>
              </MenuItem>
              {/*<MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>*/}
            </MenuList>
          </Menu>

          <Icon as={FaRegQuestionCircle} ml={3} height={'100%'} />
        </Flex>
      </Flex>
    );
  }
}

export default Navbar;
