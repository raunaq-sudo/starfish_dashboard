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

class Sidebar extends Component {
  state = { sidebarCollapse: this.props.sidebar, view: '', Dashboard: true, modalOpen: false, modalButtonLoading: false };

  handleAuth = () => {

    var data = new FormData()
    data.append('client_id', this.state.client_id)
    data.append('secret_key', this.state.secret_key)
    data.append('inuit_company_id', this.state.inuit_company_id)
    data.append('type', 'sandbox')

    fetch(apiEndpoint + '/api/inuit_auth/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'POST',
      body: data,

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.redirect(data)
        this.setState({ modalButtonLoading: false })
      }).catch(err => {
        console.error(err)
        alert('Error occured.')
      })
  }

  redirect = (url) => {
    this.setState({ modalButtonLoading: false, modalOpen: false })
    window.open(url)
  }

  fetchTokens = () => {
    fetch(apiEndpoint + '/api/fetch_tokens/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'GET',

    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ client_id: data['client_id'], secret_key: data['secret_key'], inuit_company_id: data['inuit_company_id'] }, () => {
          this.handleAuth()
        })
      }).catch(err => {
        console.error(err)
        alert('Error occured.')
      })
  }

  objToJson = (key, value) => {
    var res = {}
    res[key] = value
    console.log(res)
    return res
  }

  disableAll = () => {
    this.setState({
      Dashboard: false,
      Cost: false,
      Benchmark: false,
      Task: false,
      Setting: false,
      Budget: false,
      Upload: false,
    });



  };

  componentDidMount = () => {
    this.setState({ modalButtonLoading: false })


    fetch(apiEndpoint + '/api/screens/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] }
    }).then(response => response.json())
      .then(data => {
        console.log(data)

        if (data.code === undefined) {
          this.setState({ screens: data['screen_list'] })
        } else {
          window.open("/login", "_self")
          alert('Session Expired!.')
        }


      }).catch(err => console.log(err))
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
              this.disableAll();
              this.setState({ 'Dashboard': true });
            }} />

            <Divider />
            <Flex direction={'column'} mt={2} align={'center'} gap={6} p={5} pt={1}>

              {this.state.screens ? this.state.screens.map((screen) => (
                <MenuItemSide
                  sidebarCollapse={this.props.sidebar}
                  icon={FaDatabase}
                  menuName={screen['name']}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    this.disableAll(screen['name']);
                    this.setState(this.objToJson(screen['name'], true))
                    this.props.onClick(screen['name']);

                  }}
                  active={this.state[screen['name']]}
                />
              )) : <></>}

              <MenuItemSide
                sidebarCollapse={this.props.sidebar}
                menuName={'Connect To Inuit'}
                onClick={() => {


                  this.handleAuth()

                }}

              />
              <Modal

                isOpen={this.state.modalOpen}
                onClose={() => { this.setState({ modalOpen: false }) }}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create your account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Client ID</FormLabel>
                      <Input placeholder='Client ID' id='client_id' />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Secret Key</FormLabel>
                      <Input placeholder='Secret Key' id='secret_key' />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Company ID</FormLabel>
                      <Input placeholder='Company ID' id='inuit_company_id' />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} isLoading={this.state.modalButtonLoading}
                      onClick={() => {

                        this.handleAuth()
                      }}>
                      Proceed
                    </Button>
                    <Button onClick={() => {
                      this.setState({ modalOpen: false })
                    }}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
