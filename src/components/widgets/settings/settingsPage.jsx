import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaCog } from 'react-icons/fa';
import AuthorisationSettings from './settingsAuthorisation';
import IntegrationSetting from './settingsIntegrations';
import SettingBudget from './settingBudget';
import PLSummarySetting from './plSumSetting';

class SettingPage extends Component {
  state = {};
  render() {
    return (
      <Card width={'100%'} height={window.innerHeight}>
        <CardHeader>
          <Flex gap={2} alignItems={'center'}>
            <Icon as={FaCog} />
            <Text fontSize={'sm'}>Settings</Text>
          </Flex>
        </CardHeader>
        <CardBody overflowY={'scroll'}>
          <Tabs>
            <TabList>
              <Tab>Authorization</Tab>
              <Tab>Integrations</Tab>
              <Tab>Budget Update</Tab>
              <Tab>Account Alias</Tab>
            </TabList>
            <TabPanels>
              <TabPanel height={'100%'}>
                <AuthorisationSettings />
              </TabPanel>
              <TabPanel >
                <IntegrationSetting />
              </TabPanel>
              <TabPanel >
                <SettingBudget />
              </TabPanel>
              <TabPanel >
                <PLSummarySetting />
    </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    );
  }
}

export default SettingPage;
