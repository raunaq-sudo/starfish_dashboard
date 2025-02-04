import React, { Component } from 'react';
import { Table, Button, Dropdown } from 'rsuite';
import apiEndpoint from '../../config/data';
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Input,
  Select,
  Spinner,
  Box,
} from '@chakra-ui/react';

const { Column, HeaderCell, Cell } = Table;

class PLSummarySetting extends Component {
  state = {
    data: null,
    classification: 'Expense',
    data: undefined,
    integrationID: undefined,
    integrationLabel: undefined,
    integration_ids: [],
    loading: false,
    buttonLoader: false,
    row_id: undefined,
    alias: undefined,
  };

  set_data = async (id, classification, alias) => {
    const body = new FormData();
    if (id !== undefined) {
      body.append('plParentId', id);
      body.append('classification', classification);
      body.append('alias', alias);

      await fetch(apiEndpoint + '/api/set_plparent_settings/', {
        headers: { Authorization: 'Bearer ' + localStorage['access'] },
        method: 'POST',
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.error(err));
    }
  };

  fetch_data_integration_ids = async () => {
    const body = new FormData();
    body.append('type', 'integration_ids');
    await fetch(apiEndpoint + '/api/fetch_budget_settings/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ integration_ids: data });
      })
      .catch((err) => console.error(err));
  };

  fetch_data = async () => {
    this.setState({ loading: true, data: [] });
    const body = new FormData();
    body.append('integration_id', this.state.integrationID);
    await fetch(apiEndpoint + '/api/fetch_plparent_settings/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data }, () => {
          console.log(this.state.data);
        });
      })
      .catch((err) => console.error(err));
    this.setState({ loading: false });
  };

  componentDidMount = async () => {
    this.fetch_data();
    this.fetch_data_integration_ids();
  };

  render() {
    return (
      <Card minH="700px" p={5} borderRadius="lg" shadow="xl">
        <CardHeader bg="gray.100" p={4} borderRadius="md">
          <Flex alignItems="center" justifyContent="space-between">
            {/* Dropdown for Integration Selection */}
            <Dropdown title={this.state.integrationLabel || 'Choose Integration'}>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {this.state.integration_ids &&
                  this.state.integration_ids.map((row, key) => (
                    <Dropdown.Item
                      key={key}
                      onClick={() => {
                        this.setState({ integrationID: row.id, integrationLabel: row.app_name }, () => {
                          this.fetch_data();
                        });
                      }}
                    >
                      {row.app_name}
                    </Dropdown.Item>
                  ))}
              </div>
            </Dropdown>

            {/* Update Button */}
            <Button
              color="orange"
              appearance="primary"
              isLoading={this.state.buttonLoader}
              onClick={() => {
                this.setState({ buttonLoader: true });
                this.fetch_data();
                this.setState({ buttonLoader: false });
              }}
            >
              Update
            </Button>
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
                data={this.state.data !== undefined ? this.state.data : []}
                virtualized
                rowKey={'id'}
                loading={this.state.loading}
                bordered
                cellBordered
              >
                {/* Description Column */}
                <Column flexGrow={1} minWidth={200}>
                  <HeaderCell>Description</HeaderCell>
                  <Cell dataKey="desc" />
                </Column>

                {/* Classification Column - Fully Centered */}
                <Column flexGrow={1} minWidth={200}>
                  <HeaderCell textAlign="center">Classification</HeaderCell>
                  <Cell dataKey="classification">
                    {(rowData) => (
                      <Flex justify="center" align="center" height="100%">
                        <Select
                          defaultValue={rowData.classification}
                          size="sm"
                          bg="white"
                          border="1px solid #ccc"
                          _focus={{ borderColor: 'blue.500' }}
                          onChange={(value) => {
                            this.set_data(rowData.id, value.target.value, rowData.alias);
                          }}
                          width="80%"
                        >
                          <option>Revenue</option>
                          <option>Expense</option>
                        </Select>
                      </Flex>
                    )}
                  </Cell>
                </Column>

                {/* Alias Column - Fully Centered */}
                <Column flexGrow={1} minWidth={200}>
                  <HeaderCell textAlign="center">Alias</HeaderCell>
                  <Cell dataKey="alias">
                    {(rowData) => (
                      <Flex justify="center" align="center" height="100%">
                        <Input
                          placeholder={rowData.alias}
                          size="sm"
                          bg="white"
                          border="1px solid #ccc"
                          _focus={{ borderColor: 'blue.500' }}
                          onBlur={() => {
                            this.set_data(this.state.row_id, this.state.classification, this.state.alias);
                            this.setState({ row_id: undefined, classification: undefined, alias: undefined });
                          }}
                          onFocus={() => {
                            this.set_data(this.state.row_id, this.state.classification, this.state.alias);
                            this.setState({ row_id: undefined, classification: undefined, alias: undefined });
                          }}
                          onChange={(val) => {
                            this.setState({ row_id: rowData.id, classification: rowData.classification, alias: val.target.value });
                          }}
                          width="80%" 
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

export default PLSummarySetting;
