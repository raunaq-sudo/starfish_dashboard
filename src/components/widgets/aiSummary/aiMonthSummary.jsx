import React, { Component } from 'react';
import { Table, Button, Dropdown, Header } from 'rsuite';
import apiEndpoint from '../../config/data';
import { Card, CardBody, CardHeader, Flex, Select, Box } from '@chakra-ui/react';

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === 'EDIT';
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          style={{ padding: 0, maxHeight: 30, maxWidth: 100 }}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: '6px' }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData.id);
        }}
      >
        {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
      </Button>
    </Cell>
  );
};

class AIMonthSummary extends Component {
    state = {
        companyOptions: ['Company A', 'Company B', 'Company C'],
        integrationOptions: ['Integration 1', 'Integration 2'],
        locationOptions: ['Location X', 'Location Y'],
        yearOptions: [2023, 2024, 2025],
        selectedCompany: '',
        selectedIntegration: '',
        selectedLocation: '',
        selectedYear: '',
        data: [
          {
            id: 1,
            subject: 'Integration Issue A',
            createdOn: '2023-05-21',
            incorrect: false,
            view: 'View Details',
            pdf: 'Download PDF',
            company: 'Company A',
            integration: 'Integration 1',
            location: 'Location X',
            year: 2023,
            status: null,
          },
          {
            id: 2,
            subject: 'Integration Issue B',
            createdOn: '2024-08-15',
            incorrect: true,
            view: 'View Details',
            pdf: 'Download PDF',
            company: 'Company B',
            integration: 'Integration 2',
            location: 'Location Y',
            year: 2024,
            status: null,
          },
          {
            id: 3,
            subject: 'Integration Issue C',
            createdOn: '2023-11-05',
            incorrect: false,
            view: 'View Details',
            pdf: 'Download PDF',
            company: 'Company C',
            integration: 'Integration 1',
            location: 'Location X',
            year: 2023,
            status: null,
          },
          {
            id: 4,
            subject: 'Integration Issue D',
            createdOn: '2025-01-12',
            incorrect: true,
            view: 'View Details',
            pdf: 'Download PDF',
            company: 'Company A',
            integration: 'Integration 2',
            location: 'Location Y',
            year: 2025,
            status: null,
          },
          {
            id: 5,
            subject: 'Integration Issue E',
            createdOn: '2024-03-28',
            incorrect: false,
            view: 'View Details',
            pdf: 'Download PDF',
            company: 'Company B',
            integration: 'Integration 1',
            location: 'Location X',
            year: 2024,
            status: null,
          },
        ],
        filteredData: [], // This will be filled after filtering
        loading: false,
      };
      

  handleDropdownChange = (value, key) => {
    this.setState({ [key]: value }, this.filterData);
  };

  handleChange = (id, key, value) => {
    const nextData = Object.assign([], this.state.data);
    nextData.find((item) => item.id === id)[key] = value;
    this.setState({ data: nextData });
    console.log(id, key, value);
  };

  handleEditState = (id) => {
    const nextData = Object.assign([], this.state.data);
    const activeItem = nextData.find((item) => item.id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';
    console.log(activeItem);
    this.setState({ data: nextData });

    if (activeItem.status === null) {
      this.setData(activeItem);
    }
  };

  setData = async (activeItem) => {
    const body = new FormData();
    body.append('subject', activeItem.subject);
    body.append('createdOn', activeItem.createdOn);
    body.append('incorrect', activeItem.incorrect);

    await fetch(apiEndpoint + '/api/update_data/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

//   fetchData = async () => {
//     this.setState({ loading: true });
//     await fetch(apiEndpoint + '/api/fetch_data/', {
//       headers: { Authorization: 'Bearer ' + localStorage['access'] },
//       method: 'GET',
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         this.setState({ data, filteredData: data }); // Initially, filteredData is the same as data
//       })
//       .catch((err) => console.error(err));
//     this.setState({ loading: false });
//   };
fetchData = () => {
    // Simulating fetch delay
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        filteredData: this.state.data, // Initially set filteredData as the full data
        loading: false,
      });
    }, 1000); // Simulated delay
  };
  

  filterData = () => {
    const { data, selectedCompany, selectedIntegration, selectedLocation, selectedYear } = this.state;
    const filteredData = data.filter((item) => {
      return (
        (!selectedCompany || item.company === selectedCompany) &&
        (!selectedIntegration || item.integration === selectedIntegration) &&
        (!selectedLocation || item.location === selectedLocation) &&
        (!selectedYear || item.year === selectedYear)
      );
    });
    this.setState({ filteredData });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { companyOptions, integrationOptions, locationOptions, yearOptions, filteredData, loading } = this.state;

    return (
      <Card minH={700}>
       <CardHeader>
        <Flex direction="column" gap={4}>
            {/* First Row with Company and Integration Dropdowns */}
            <Flex gap={4} flexWrap="wrap">
            {/* Company Dropdown */}
            <Box flex="1 1 200px" minW="200px">
                <Header>Company</Header>
                <Dropdown title={this.state.selectedCompany || 'Select Company'}>
                {companyOptions.map((company, index) => (
                    <Dropdown.Item
                    key={index}
                    onClick={() => this.handleDropdownChange(company, 'selectedCompany')}
                    >
                    {company}
                    </Dropdown.Item>
                ))}
                </Dropdown>
            </Box>

            {/* Integration Dropdown */}
            <Box flex="1 1 200px" minW="200px">
                <Header>Integration</Header>
                <Dropdown title={this.state.selectedIntegration || 'Select Integration'}>
                {integrationOptions.map((integration, index) => (
                    <Dropdown.Item
                    key={index}
                    onClick={() => this.handleDropdownChange(integration, 'selectedIntegration')}
                    >
                    {integration}
                    </Dropdown.Item>
                ))}
                </Dropdown>
            </Box>
            </Flex>

            {/* Second Row with Year and Location Dropdowns */}
            <Flex gap={4} flexWrap="wrap">
            {/* Year Dropdown */}
            <Box flex="1 1 200px" minW="200px">
                <Header>Year</Header>
                <Dropdown title={this.state.selectedYear || 'Select Year'}>
                {yearOptions.map((year, index) => (
                    <Dropdown.Item
                    key={index}
                    onClick={() => this.handleDropdownChange(year, 'selectedYear')}
                    >
                    {year}
                    </Dropdown.Item>
                ))}
                </Dropdown>
            </Box>

            {/* Location Dropdown */}
            <Box flex="1 1 200px" minW="200px">
                <Header>Location</Header>
                <Dropdown title={this.state.selectedLocation || 'Select Location'}>
                {locationOptions.map((location, index) => (
                    <Dropdown.Item
                    key={index}
                    onClick={() => this.handleDropdownChange(location, 'selectedLocation')}
                    >
                    {location}
                    </Dropdown.Item>
                ))}
                </Dropdown>
            </Box>
            </Flex>
        </Flex> 
       </CardHeader>


        <CardBody>
          <Table height={400} data={filteredData} virtualized rowKey={'id'} loading={loading}>
            <Column width={200} align="center" fixed>
              <HeaderCell>Subject</HeaderCell>
              <Cell dataKey="subject" />
            </Column>

            <Column width={150} align="center" fixed>
              <HeaderCell>Created On</HeaderCell>
              <Cell dataKey="createdOn" />
            </Column>

            <Column width={150} align="center">
              <HeaderCell>Incorrect</HeaderCell>
              <EditableCell dataKey="incorrect" onChange={this.handleChange} />
            </Column>

            <Column width={100} align="center">
              <HeaderCell>View</HeaderCell>
              <Cell dataKey="view" />
            </Column>

            <Column width={100} align="center">
              <HeaderCell>PDF</HeaderCell>
              <Cell dataKey="pdf" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Actions</HeaderCell>
              <ActionCell dataKey="id" onClick={this.handleEditState} />
            </Column>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default AIMonthSummary;
