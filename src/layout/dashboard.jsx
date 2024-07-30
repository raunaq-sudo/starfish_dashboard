import React, { Component } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import { Flex } from '@chakra-ui/react';
import Navbar from '../components/navbar/navbar';
import WidgetDrawer from '../components/widgets/drawer';

class Dashboard extends Component {
  state = {
    view: 'dashboard',
    sidebarCollapse: false,
    costDesc: null,
    showSidebar: window.matchMedia('(min-width: 1000px)').matches,
    isMobile: window.matchMedia('(max-width: 500px)').matches,
  };

  handleResize = () => {
    this.setState({
      showSidebar: window.matchMedia('(min-width: 1000px)').matches,
      isMobile: window.matchMedia('(max-width: 500px)').matches,
    });
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  render() {
    return (
      <>
        <Flex width={'100%'}>
          {this.state.showSidebar ? (
            <Flex flex={1}>
              <Sidebar
                clickThruScreen={this.state.costDesc}
                onClick={value => {
                  this.setState({ view: value, costDesc: null }, () => {
                    console.log(this.state.view);
                  });
                }}
              ></Sidebar>
            </Flex>
          ) : (
            <></>
          )}

          <Flex direction={'column'} flex={4} width={'100%'}>
            <Flex width={'100%'}>
              <Navbar
                modeMobile={this.state.isMobile}
                onClick={value => {
                  this.setState({ view: value }, () => {
                    console.log(value);
                  });
                }}
              />
            </Flex>
            <Flex width={'100%'} p={0}>
              <WidgetDrawer
                highlightDesc={this.state.costDesc}
                view={this.state.view}
                modeMobile={this.state.isMobile}
                clickThru={(screen, desc) => {
                  this.setState({
                    view: screen,
                    clickThruScreen: screen,
                    costDesc: desc,
                  });
                  console.log(desc);
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
