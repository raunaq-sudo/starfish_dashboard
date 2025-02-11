import React, { Component } from 'react';
import { Table, Checkbox, Dropdown, Button } from 'rsuite';
import apiEndpoint from '../../config/data';
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Spinner,
} from '@chakra-ui/react';

const { Column, HeaderCell, Cell } = Table;

class LocationBaseAISummary extends Component {
  state = {
    data: [],
    integrationLabel: 'Choose Integration',
    integrationID: undefined,
    integration_ids: [],
    loading: false,
  };

  fetchIntegrationIDs = async () => {
    const body = new FormData();
    // body.append('type', 'integration_ids');

    await fetch(apiEndpoint + '/api/location_ai_settings/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'GET',
      // body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ integration_ids: data });
      })
      .catch((err) => console.error(err));
  };

  fetchData = async () => {
    if (!this.state.integrationID) return;

    this.setState({ loading: true, data: [] });
    const body = new FormData();
    body.append('integration_id', this.state.integrationID);
    body.append('type', 'fetch_location')

    await fetch(apiEndpoint + '/api/location_ai_settings/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data, loading: false });
      })
      .catch((err) => console.error(err));
  };

  updateCheckbox = async (id, column, checked) => {
    this.setState({ loading: true})
    const body = new FormData();
    body.append('type', 'upload_data')
    // body.append('integration_id', this.state.integrationID);

    Object.keys(this.state).map(item=>{
      if (item.startsWith('l_')){
        body.append(item, this.state[item])
      }
    })
    await fetch(apiEndpoint + '/api/location_ai_settings/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
    }).catch((err) => console.error(err))

    this.fetchData()

  };

  componentDidMount() {
    this.fetchIntegrationIDs();
  }

  assignState = (value, checked, type, location_id) =>{
    var obj = {}
    if (type==='exclude_from_ai'){
      obj[
        'l_' + location_id + '_e'
      ] = checked
    }else if (type==='active'){
      obj[
        'l_' + location_id + '_a'
      ] = checked
  }
  this.setState(obj)
}


  render() {
    return (
      <Card minH="600px" p={5} borderRadius="lg" shadow="xl">
        <CardHeader bg="gray.100" p={4} borderRadius="md">
          <Flex alignItems="center" justifyContent="space-between">
            {/* Integration Dropdown */}
            <Dropdown title={this.state.integrationLabel}>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {this.state.integration_ids.map((row, key) => (
                  <Dropdown.Item
                    key={key}
                    onClick={() => {
                      this.setState(
                        { integrationID: row.id, integrationLabel: row.app_name },
                        () => this.fetchData()
                      );
                    }}
                  >
                    {row.app_name}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
            <Button appearance='primary' color='warning' onClick={this.updateCheckbox}>Update</Button>
          </Flex>
        </CardHeader>

        <CardBody>
          <Flex direction="column">
            {this.state.loading ? (
              <Flex justify="center" align="center" height="400px">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Table
                height={500}
                data={this.state.data}
                virtualized
                rowKey={'id'}
                loading={this.state.loading}
                bordered
                cellBordered
              >
                {/* Location Name Column */}
                <Column flexGrow={1} minWidth={250}>
                  <HeaderCell>Location Name</HeaderCell>
                  <Cell dataKey="description" />
                </Column>

                {/* Column 2 Checkbox */}
                <Column flexGrow={1} minWidth={150}>
                <HeaderCell textAlign="center">Active</HeaderCell>
                <Cell>
                    {(rowData) => (
                    <Flex justify="center" align="center" height="100%">
                        <Checkbox
                        defaultChecked={rowData?.active} // Use defaultChecked instead of checked
                        onChange={(value, checked) => {
                          this.assignState(value, checked, 'active', rowData.location_id)
                          }}
                        />
                    </Flex>
                    )}
                </Cell>
                </Column>

                <Column flexGrow={1} minWidth={150}>
                <HeaderCell textAlign="center">Exclude From AI</HeaderCell>
                <Cell>
                    {(rowData) => (
                    <Flex justify="center" align="center" height="100%">
                        <Checkbox
                        defaultChecked={rowData?.exclude_from_ai} // Use defaultChecked instead of checked
                        onChange={(value, checked) => {
                            this.assignState(value, checked, 'exclude_from_ai', rowData.location_id)
                            }}
                        
                        />
                    </Flex>
                    )}
                </Cell>
                </Column>
              </Table>
            )}
          </Flex>
        </CardBody>
      </Card>
    );
  }
}

export default LocationBaseAISummary;
