import React, { Component } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import { Flex } from '@chakra-ui/react';
import Navbar from '../components/navbar/navbar';
import WidgetDrawer from '../components/widgets/drawer';
import { setScreen } from '../redux/slices/setScreenSlice';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'dashboard',
      sidebarCollapsed: false,
      costDesc: null,
      showSidebar: window.matchMedia('(min-width: 1000px)').matches,
      isMobile: window.matchMedia('(max-width: 500px)').matches,
      sidebarWidth: this.getSidebarWidth(false),
      contentWidth: this.getContentWidth(
        window.matchMedia('(min-width: 1000px)').matches
      ),
    };
    this.handleResize = this.handleResize.bind(this);
    this.getSidebarWidth = this.getSidebarWidth.bind(this);
    this.getContentWidth = this.getContentWidth.bind(this);
  }

  handleResize = () => {
    const showSidebar = window.matchMedia('(min-width: 1000px)').matches;
    this.setState({
      showSidebar: showSidebar,
      isMobile: window.matchMedia('(max-width: 500px)').matches,
      sidebarWidth: this.state.sidebarCollapsed ? this.getSidebarWidth(true) : this.getSidebarWidth(false),
      contentWidth: this.getContentWidth(showSidebar),
    });
  };

  // Toggle sidebar collapse
  toggleSidebar = () => {
    this.setState(
      prevState => ({
        sidebarCollapsed: !prevState.sidebarCollapsed,
      }),
      () => {
        // Update sidebar and content widths after collapse state changes
        this.setState({
          sidebarWidth: this.getSidebarWidth(this.state.sidebarCollapsed),
          contentWidth: this.getContentWidth(this.state.showSidebar),
        });
      }
    );
  };

  getSidebarWidth = (collapsed) => {
    // Adjust sidebar widths based on collapsed state
    if (collapsed) return '60px'; // Minimal width when collapsed

    const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
    const isMediumScreen = window.matchMedia(
      '(min-width: 601px) and (max-width: 1250px)'
    ).matches;
    const isLargeScreen = window.matchMedia('(min-width: 1250px)').matches;

    if (isSmallScreen) {
      return '60%';
    } else if (isMediumScreen) {
      return '250px';
    } else if (isLargeScreen) {
      return '20%';
    }
    return '20%';
  };

  getContentWidth = (showSidebar) => {
    // const { sidebarCollapsed } = this.state; // Consider collapsed state
    const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
    const isMediumScreen = window.matchMedia('(min-width: 601px) and (max-width: 1250px)').matches;
    const isLargeScreen = window.matchMedia('(min-width: 1250px)').matches;
  
    let sidebarWidth = this.getSidebarWidth(this.state?.sidebarCollapsed);
  
    if (isSmallScreen) {
      return '100%'; // Full width for small screens
    } else if (isMediumScreen || isLargeScreen) {
      return showSidebar ? `calc(100% - ${sidebarWidth})` : '100%';
    }
    return '100%';
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
    this.setState({
      sidebarWidth: this.getSidebarWidth(),
      contentWidth: this.getContentWidth(this.state.showSidebar),
    });
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
                  this.props.setScreen(value)
                  this.setState({ view: value, costDesc: null}, () => {
                    console.log(this.state.view);
                    
                  });
                }}
                sidebarCollapsed={this.state.sidebarCollapsed}
                toggleSidebar={this.toggleSidebar} // Pass toggle function as prop
                view={this.state.view}
                sidebarWidth={this.state.sidebarWidth}
              />
            </Flex>
          ) : (
            <></>
          )}

          <Flex
            direction={'column'}
            width={this.state.contentWidth}
            // ml={this.state.showSidebar ? this.state.sidebarWidth : '0'}
          >
            <Flex width={'100%'}>
              <Navbar
                modeMobile={this.state.isMobile}
                clickThruScreen={this.state.costDesc}
                onClick={value => {
                  this.setState({ view: value }, () => {
                    console.log(value);
                  });
                }}
                view={this.state.view}
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
                sidebarWidth={this.state.sidebarWidth}
              />
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
}

const mapDispatchToProps = {
  setScreen,
};

const mapStateToProps  = state => { 

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
