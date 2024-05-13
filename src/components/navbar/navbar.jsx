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
  FaCalculator,
  FaCalendar,
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
import apiEndpoint from '../config/data';
import inuit from '../config/inuitConfig';
import MenuSideBar from '../utility/templates/menuSideBar';
import {connect} from 'react-redux'
import { dateFormatSlice, setDateFormat } from '../../redux/slices/dateSlice';

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

  
  updatePreference = (value) =>{
    var formData = new FormData()
    formData.append("preference", "date_format")
    formData.append("value", value)

    fetch(apiEndpoint + '/api/set_preference/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json()).then((data) => {
      this.props.dispatch(setDateFormat(data['date_format']))
    }).catch(err => console.error(err))
  }
  

  componentDidMount = () => {
    fetch(apiEndpoint + '/api/fetch_preference/', {
      method: 'GET',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
    }).then(response => response.json()).then((data) => {
      this.props.dispatch(setDateFormat(data['date_format']))
    }).catch(err => console.error(err))
  }
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
                          <MenuSideBar onClick={this.props.onClick} clickEvent={(flag) => {
                            this.setState({ drawerOpen: !flag })
                          }} />
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
                leftIcon={<FaCalendar/>}
                bgColor={'white'}
                fontSize={'sm'}
              >
                
              </MenuButton>
              <MenuList>
                <MenuItem onClick={()=>{
                  this.props.dispatch(setDateFormat('MM-dd-yyyy'))
                  this.updatePreference("MM-dd-yyyy")
                }}>MM-dd-yyyy</MenuItem>
                <MenuItem onClick = {()=>{
                  this.props.dispatch(setDateFormat('dd-MM-yyyy'))
                  this.updatePreference("dd-MM-yyyy")
                }}>dd-MM-yyyy</MenuItem>
                <MenuItem onClick = {()=>{
                  this.props.dispatch(setDateFormat('yyyy-MM-dd'))
                  this.updatePreference('yyyy-MM-dd')
                }}>yyyy-MM-dd</MenuItem>
                
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

                </Flex>
              </Flex>
            </MenuButton>
            <MenuList>
              {/*<MenuItem
                as={Button}
                gap={2}
                onClick={() => { this.props.onClick('Profile') }}
                justifyContent={'start'}
              >
                <Icon as={FaUser} />
                <Text>View Profile</Text>
            </MenuItem>*/}
              <MenuItem
                as={Button}
                gap={2}

                justifyContent={'start'}
                onClick={() => {
                  window.open("/", "_self")
                  localStorage.clear()
                }}
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
          <Menu>
            <MenuButton
              as={IconButton}
              bgColor={'white'}
              fontSize={'sm'}
              rightIcon={<FaRegQuestionCircle />}
            >
              <Flex gap={2} width={'100%'} p={1}>
                {/*<Icon as={Avatar} flex={1} />*/}

                <Text fontSize={12}>Contact Us</Text>


              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <a href='https://usestarfish.my.site.com/s/' target="_blank" rel='noreferrer'>
                  <Text>
                    Help & Support
                  </Text>
                </a>
              </MenuItem>
              <MenuItem>
                <a href='https://www.jotform.com/form/232675275492162' target="_blank" rel='noreferrer'>
                  <Text>
                    Feedback
                  </Text>
                </a>
              </MenuItem>
            </MenuList>
          </Menu>

        </Flex>
      </Flex>
    );
  }
}



export default connect()(Navbar) ;
