import { Box, Divider, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Import icons
// import { TbLayoutSidebarLeftExpand,TbLayoutSidebarRightExpand } from "react-icons/tb";
// import { BiCollapseHorizontal,BiExpandHorizontal } from "react-icons/bi";
// import { TbSomeIcon } from 'react-icons/tb';
import logo from '../../media/images/Logo.png';
import MenuSideBar from '../utility/templates/menuSideBar';

const Sidebar = ({ sidebar,sidebarCollapsed,toggleSidebar,sidebarWidth, handleVisibleScreen,onClick, clickThruScreen, children,view,}) => {
  const [dashboard, setDashboard] = useState(true);
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)');
  const [isMediumScreen] = useMediaQuery(
    '(min-width: 601px) and (max-width: 1250px)'
  );
  const [isLargeScreen] = useMediaQuery('(min-width: 1250px)');

  return (
    <Flex
      h="100vh"
      id="main"
      zIndex={200}
      width={sidebarWidth}
      style={{
        transition: 'width 0.6s ease-in-out',
        // transitionTimingFunction: 'ease-in-out',
      }}
      position="fixed"
    >
      <Flex direction="column" width="100%" height="100%">
        <Box
          width="100%"
          justifyContent="center"
          bgColor="white"
          style={{
            transition: 'width 0.5s, height 0.5s',
            transitionTimingFunction: 'ease',
            overflowY: 'visible', // Change from 'hidden' to 'visible'
            // position: "relative",
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
            cursor="pointer"
          />
          {/* Divider with Toggle Button */}
          <Flex position="relative" alignItems="center">
            <Divider flex="1" />
            <Box
              onClick={toggleSidebar}
              cursor="pointer"
              p={2}
              textAlign="center"
              bgColor="#fae3a0"
              borderRadius="md"
              position="absolute"
              right="-10px" // Moves the button slightly to the right of the sidebar
              zIndex={1000}
            >
              {/* {sidebarCollapsed ? '>' : '<'} */}
              {/* Replace > and < with proper icons */}
              {sidebarCollapsed ? (
                <FiChevronRight />
              ) : (
                <FiChevronLeft />
              )}
            </Box>
          </Flex>
          <Box
            height="calc(100vh - 150px)" // Adjust to subtract any header/footer heights
            flexGrow={1} // Allows the sidebar to take up remaining space
            position="relative"
          >
            <MenuSideBar
              clickThruScreen={clickThruScreen}
              onClick={onClick}
              view={view}
              clickEvent={() => {
                console.log('clicked');
              }}
              padding={sidebarCollapsed ? 0 : 5}
              sidebarCollapse={sidebarCollapsed}
              handleVisibleScreen={handleVisibleScreen}
            />
            </Box>
          
          <Flex
            width="100%"
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
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
