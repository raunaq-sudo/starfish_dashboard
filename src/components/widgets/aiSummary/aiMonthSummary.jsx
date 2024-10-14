import React, { Component } from 'react';
import { Table, Button, Dropdown, Header, Checkbox } from 'rsuite';
import apiEndpoint from '../../config/data';
import { Card, CardBody, CardHeader, Flex, Select, Box, filter, Modal, ModalCloseButton, ModalHeader, ModalContent, ModalBody, ModalFooter, ModalOverlay, Textarea, Text, Input, Icon, Grid } from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon, ViewIcon } from '@chakra-ui/icons';

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
         <Icon as={ViewIcon} w={6} h={6} cursor="pointer" onClick={() => {
          onClick(rowData);
        }}/>
    </Cell>
  );
};

class AIMonthSummary extends Component {
    state = {
        companyOptions: [],
        integrationOptions: [],
        locationOptions: [],
        yearOptions: [2023, 2024, 2025],
        selectedCompany: '',
        selectedIntegration: '',
        selectedLocation: '',
        selectedYear: '',
        data: [],
        filteredData: [], // This will be filled after filtering
        loading: false,
        modalOpen:false
      };
      

  handleDropdownChange = (value, key) => {
    this.setState({ [key]: value});
    if(key ==='selectedCompany'){
        this.setState({integration_data:this.generalFilter(value, this.state.company_integration, 'company_id')})
    }
    if(key === 'selectedIntegration'){
      this.setState({location_data:this.generalFilter(value, this.state.integration_location, 'integration_id')})
    }
  };


  generalFilter = (value, array, key) =>{
    const ddFiltered = array.filter((item) => {
      return (
        (item[key] === value)
      );
    });
    return ddFiltered
  }

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

  setData = async () => {
    const body = new FormData();
    Object.keys(this.state).forEach((item)=>{
      if(item.startsWith("output_")){
        body.append(item, this.state[item])
      }
    })

    body.append('incorrect_summary', this.state.incorrect)
    body.append('subject', this.state.subject)
    body.append('id', this.state.id)
    await fetch(apiEndpoint + '/api/update_data_aisummary/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({data:[]})
        this.closeModal()

        // this.fetchData()
      })
      .catch((err) => console.error(err));
  };


  fetchData = async (type) => {
    this.setState({ loading: true });
    if(type==='aisummary'){
      await fetch(apiEndpoint + '/api/fetch_data_aisummary/?' + new URLSearchParams({
        company_id: this.state.selectedCompany,
        integration_id: this.state.selectedIntegration,
        location_id: this.state.selectedLocation,
        year: this.state.selectedYear
      }), {
        headers: { Authorization: 'Bearer ' + localStorage['access'] },
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({ data }); 
        })
        .catch((err) => console.error(err));
    }else{
      await fetch(apiEndpoint + '/api/fetch_data_aisummary/?' + new URLSearchParams({
        initial_load:'1'
      }), {
        headers: { Authorization: 'Bearer ' + localStorage['access'] },
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({ 
            company_data: data['company'], 
            company_integration: data['company_integration'], 
            integration_location: data['integration_location'] 
          }); 
        })
        .catch((err) => console.error(err));
    }
    
    this.setState({ loading: false });
  };


// fetchData = () => {
//     // Simulating fetch delay
//     this.setState({ loading: true });
//     setTimeout(() => {
//       this.setState({
//         filteredData: this.state.data, // Initially set filteredData as the full data
//         loading: false,
//       });
//     }, 1000); // Simulated delay
//   };
  openModal = (rowData)=>{
    console.log(Object.keys(rowData))
    this.setState({outputs:[]})
    const outputs = []
    this.setState({id:rowData['id'], subject:rowData['subject'], incorrect:rowData['incorrect_summary']})
    Object.keys(rowData).forEach((item)=>{
      if (item.startsWith('output_')){
        if (rowData[item]){
          outputs.push({'output':rowData[item], 'key':item, 'id':rowData['id']})
          this.setState({[item]:rowData[item]})
        }
      }
    })
    this.setState({outputs}, ()=>{
      this.setState({modalOpen:true})
    })
     
  }

  closeModal = () =>{
    console.log(this.state)

    this.setState({subject:'', incorrect:undefined, modalOpen:false},()=>{
      const tempState = this.state
      Object.keys(this.state).forEach((item)=>{
        if(item.startsWith('output_')){
          delete tempState[item]
        }
      })
      this.setState({tempState}, ()=>{
        console.log(this.state)
      })
    })
  }


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
    this.fetchData("asd");
  }

  render() {
    const { companyOptions, integrationOptions, locationOptions, yearOptions, filteredData, loading } = this.state;

    return (
      <>
    
    <Card minH={700}>
        <CardHeader>
          <Flex direction="column" gap={4}>
            {/* Filters with Responsive Behavior */}
            <Grid templateColumns={{ base: "1fr",sm:"1fr 1fr", md: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={4}>
              {/* Company Dropdown */}
              <Box>
                <Header>Company</Header>
                <Dropdown title={this.state.selectedCompany || 'Select Company'}>
                  {this.state.company_data !== undefined
                    ? this.state.company_data.map((item) => (
                        <Dropdown.Item
                          key={item.company_id}
                          onClick={() => this.handleDropdownChange(item.company_id, 'selectedCompany')}
                        >
                          {item.company_name}
                        </Dropdown.Item>
                      ))
                    : <></>}
                </Dropdown>
              </Box>

              {/* Integration Dropdown */}
              <Box>
                <Header>Integration</Header>
                <Dropdown title={this.state.selectedIntegration || 'Select Integration'}>
                  {this.state.integration_data !== undefined
                    ? this.state.integration_data.map((item) => (
                        <Dropdown.Item
                          key={item.integration_id}
                          onClick={() => this.handleDropdownChange(item.integration_id, 'selectedIntegration')}
                        >
                          {item.integration_name}
                        </Dropdown.Item>
                      ))
                    : <></>}
                </Dropdown>
              </Box>

              {/* Year Dropdown */}
              <Box>
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
              <Box>
                <Header>Location</Header>
                <Dropdown title={this.state.selectedLocation || 'Select Location'}>
                  {this.state.location_data !== undefined
                    ? this.state.location_data.map((item) => (
                        <Dropdown.Item
                          key={item.location_id}
                          onClick={() => this.handleDropdownChange(item.location_id, 'selectedLocation')}
                        >
                          {item.location_name}
                        </Dropdown.Item>
                      ))
                    : <></>}
                </Dropdown>
              </Box>
            </Grid>

            {/* Fetch Button */}
            <Flex gap={4} justifyContent="flex-start">
              <Button color="primary" onClick={() => this.fetchData('aisummary')}>
                Fetch
              </Button>
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody >
       
        <Table height={400} data={this.state.data} virtualized rowKey={'id'} loading={loading} style={{ width: '100%' }}>
          <Column width={200} minWidth={150} flexGrow={1} align="center">
            <HeaderCell>Subject</HeaderCell>
            <Cell dataKey="subject" />
          </Column>

          <Column width={200} minWidth={150} flexGrow={1} align="center">
            <HeaderCell>Created On</HeaderCell>
            <Cell dataKey="created_date" />
          </Column>

          <Column width={150} minWidth={100} flexGrow={1} align="center">
            <HeaderCell>Incorrect</HeaderCell>
            <Cell dataKey="incorrect_summary">
              {rowData => rowData.incorrect_summary ? <CheckCircleIcon /> : <NotAllowedIcon />}
            </Cell>
          </Column>

          <Column width={150} minWidth={100} flexGrow={1} align="center">
            <HeaderCell>View Output</HeaderCell>
            <ActionCell dataKey="id" onClick={this.openModal} />
          </Column>
        </Table>


        <Modal
          size={'xl'} // Use 'lg' or 'md' for better responsiveness
          onClose={this.closeModal}
          isOpen={this.state.modalOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            maxWidth={{ base: '90%', md: '80%', lg: '70%' }} // Responsive width
            padding={{ base: 4, md: 6 }} // Adjust padding for different screen sizes
          >
            <ModalHeader textAlign="center">AI Summary Output</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY={'auto'} padding={4}> {/* Change to auto for scrollable content */}
              <Flex wrap={'wrap'} direction={'row'} margin={5} justifyContent={'center'}>
                <Header>Subject</Header>
                <Input
                  onChange={(e) => {
                    this.setState({ subject: e.target.value });
                  }}
                  defaultValue={this.state.subject}
                  // width={{ base: '100%', md: 'auto' }} // Full width on small screens
                />
              </Flex>
              <Flex wrap={'wrap'} direction={'row'} gap={2} justifyContent={'center'}>
                {this.state.outputs !== undefined
                  ? this.state.outputs.map((item) => {
                      return (
                        <Textarea
                          minHeight={600}
                          maxWidth={{ base: '100%', md: '45%' }} // Full width on small screens
                          onChange={(e) => {
                            this.setState({ [item.key]: e.target.value });
                          }}
                          key={item.key} // Add a unique key for each Textarea
                        >
                          {item.output}
                        </Textarea>
                      );
                    })
                  : <></>}
              </Flex>
            </ModalBody>
            <ModalFooter gap={5} justifyContent="space-between"> {/* Ensure footer is spaced properly */}
              <Checkbox onChange={() => {
                this.setState({ incorrect: !this.state.incorrect });
              }}>Incorrect</Checkbox>
              <Flex gap={3}> {/* Add a flex container to align buttons */}
                <Button onClick={() => this.setData()}>Save</Button>
                <Button onClick={() => this.closeModal()}>Close</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </CardBody>
      </Card>

      </>
    );
  }
}

export default AIMonthSummary;
