import { Box, Divider, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import logo from '../../media/images/Logo.png';
import MenuSideBar from '../utility/templates/menuSideBar';

const Sidebar = ({ sidebar, onClick, clickThruScreen, children }) => {
  const [dashboard, setDashboard] = useState(true);
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)');
  const [isMediumScreen] = useMediaQuery(
    '(min-width: 601px) and (max-width: 1250px)'
  );
  const [isLargeScreen] = useMediaQuery('(min-width: 1250px)');

  let sidebarWidth;
  if (isSmallScreen) {
    sidebarWidth = sidebar ? '100%' : '60%';
  } else if (isMediumScreen) {
    sidebarWidth = sidebar ? '100px' : '250px';
  } else if (isLargeScreen) {
    sidebarWidth = sidebar ? '5%' : '20%';
  }

  return (
    <Flex
      h="100vh"
      id="main"
      zIndex={200}
      width={sidebarWidth}
      style={{
        transition: 'width 0.5s',
        transitionTimingFunction: 'ease-in-out',
      }}
      position="fixed"
    >
      <Flex direction="column" width="100%">
        <Box
          width="100%"
          justifyContent="center"
          bgColor="white"
          style={{
            transition: 'width 0.5s, height 0.5s',
            transitionTimingFunction: 'ease',
            overflowY: 'hidden',
          }}
        >
          <Image
            src={logo}
            p={2}
            align="center"
            onClick={() => {
              onClick('dashboard');
              setDashboard(true);
            }}
          />
          <Divider />
          <MenuSideBar
            clickThruScreen={clickThruScreen}
            onClick={onClick}
            clickEvent={() => {
              console.log('clicked');
            }}
          />
          <Flex
            pos="relative"
            mt={window.innerHeight - 100}
            width="100%"
            direction="column"
          >
            {/*<Flex mt={4} mb={2} justify={'center'}>
              <Avatar mr={sidebar ? 0 : 2} />
              <Flex
                direction={'column'}
                display={sidebar ? 'none' : 'flex'}
              >
                <Text fontSize={'md'}>Raunaq Siraswar</Text>
                <Text fontSize={'sm'}>Admin</Text>
              </Flex>
            </Flex> */}
          </Flex>
        </Box>
        {children}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
