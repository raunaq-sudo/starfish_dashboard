import React, { Component } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import { Container, Flex, IconButton } from '@chakra-ui/react';
import Navbar from '../components/navbar/navbar';
import WidgetDrawer from '../components/widgets/drawer';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { GiRhinocerosHorn } from 'react-icons/gi';

class Dashboard extends Component {
  state = { view: 'dashboard', sidebarCollapse: false, costDesc:null }

  componentDidMount = () => { };

  render() {
    return (
      <>
        <Flex width={'100%'}>
          {window.screen.width > 1000 ? (
            <Flex flex={1}>
              <Sidebar
                clickThruScreen = {this.state.costDesc}
                onClick={value => {
                  this.setState({ view: value, costDesc:null }, () => {
                  console.log(this.state.view)
                  });
                }}

              >
                {/* code for adjustable sidebar
                
                <Flex justify={'center'} mb={3} width={'1px'}>
                  <IconButton
                    icon={
                      this.state.sidebarCollapse ? (
                        <FaArrowCircleRight />
                      ) : (
                        <FaArrowCircleLeft />
                      )
                    }
                    background={'white'}
                    onClick={() => {
                      this.setState({
                        sidebarCollapse: !this.state.sidebarCollapse,
                      });
                    }}
                    boxShadow={'1px 1px 2px rgb(0,0,0,0.5)'}
                    borderRadius={'50%'}
                    style={{
                      top: this.state.sidebarCollapse ? '%5' : '12%',
                      transition: 'top 0.5s ease',
                    }}
                  />
                  </Flex> */}
              </Sidebar>
            </Flex>
          ) : (
            <></>
          )}

          <Flex
            direction={'column'}
            // flex={this.state.sidebarCollapse ? 15 : 4}
            flex={4}
            width={'100%'}
          >
            <Flex width={'100%'}>
              <Navbar
                // sidebar={this.state.sidebarCollapse}
                modeMobile={window.screen.width > 500 ? false : true}
                onClick={value => {
                  this.setState({ view: value }, () => {
                    console.log(value);
                  });
                }}
              />{' '}
            </Flex>
            <Flex width={'100%'} p={0} >
              <WidgetDrawer
                // sidebar={this.state.sidebarCollapse}
                highlightDesc={this.state.costDesc}
                view={this.state.view}
                modeMobile={window.screen.width > 500 ? false : true}
                clickThru = {(screen, desc)=>{
                  this.setState({view:screen, clickThruScreen:screen, costDesc:desc})
                  console.log(desc)
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
}

export default Dashboard;
