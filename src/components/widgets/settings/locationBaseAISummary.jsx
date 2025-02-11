import React, { Component } from 'react';
import { Table, Checkbox, Dropdown } from 'rsuite';
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
    body.append('type', 'integration_ids');

    await fetch(apiEndpoint + '/api/fetch_budget_settings/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
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

    await fetch(apiEndpoint + '/api/fetch_location_ai_settings/', {
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
    const body = new FormData();
    body.append('location_id', id);
    body.append(column, checked ? 'true' : 'false');

    await fetch(apiEndpoint + '/api/update_location_ai_settings/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
    }).catch((err) => console.error(err));
  };

  componentDidMount() {
    this.fetchIntegrationIDs();
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
                  <Cell dataKey="location_name" />
                </Column>

                {/* Column 2 Checkbox */}
                <Column flexGrow={1} minWidth={150}>
                <HeaderCell textAlign="center">Column 2</HeaderCell>
                <Cell>
                    {(rowData) => (
                    <Flex justify="center" align="center" height="100%">
                        <Checkbox
                        defaultChecked={rowData?.column2} // Use defaultChecked instead of checked
                        onChange={(e) => {
                            const isChecked = e?.target?.checked;
                            rowData.column2 = isChecked; // Directly update rowData to reflect UI change
                            this.setState((prevState) => ({
                            data: prevState?.data?.map((row) =>
                                row?.id === rowData?.id ? { ...row, column2: isChecked } : row
                            ),
                            }));
                        }}
                        />
                    </Flex>
                    )}
                </Cell>
                </Column>

                <Column flexGrow={1} minWidth={150}>
                <HeaderCell textAlign="center">Column 3</HeaderCell>
                <Cell>
                    {(rowData) => (
                    <Flex justify="center" align="center" height="100%">
                        <Checkbox
                        defaultChecked={rowData?.column3} // Use defaultChecked instead of checked
                        onChange={(e) => {
                            const isChecked = e?.target?.checked;
                            rowData.column3 = isChecked; // Directly update rowData
                            this.setState((prevState) => ({
                            data: prevState?.data?.map((row) =>
                                row?.id === rowData?.id ? { ...row, column3: isChecked } : row
                            ),
                            }));
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
