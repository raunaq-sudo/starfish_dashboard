import React, { Component } from 'react';
import { Table, Button, Dropdown, Header, Checkbox } from 'rsuite';
import apiEndpoint from '../../config/data';
import { Card, CardBody, CardHeader, Flex, Select, Box, filter, Modal, ModalCloseButton, ModalHeader, ModalContent, ModalBody, ModalFooter, ModalOverlay, Textarea, Text, Input, Icon, Grid } from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon, ViewIcon } from '@chakra-ui/icons';
import { saveAs } from 'file-saver';
import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx'; // Import docx for Word file generation

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
      outputLabel:[],
        companyOptions: [],
        integrationOptions: [],
        locationOptions: [],
        yearOptions: [2023, 2024, 2025],
        monthOptions:['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        periodLabel:'Month',
        periodOption: [''],
        dropDownOption:[],
        promptTypes:[],
        selectedCompany: '',
        selectedIntegration: '',
        selectedLocation: '',
        selectedYear: '',
        data: [],
        filteredData: [], // This will be filled after filtering
        loading: false,
        modalOpen:false,
        status_data:[
          {status_key:'undefined',status_name:'All Status'},
          {status_key:'not_viewed',status_name:'Not Viewed'},
           {status_key:'viewed',status_name:'Viewed'},
           {status_key:'approved',status_name:'Approved'},
           {status_key:'skipped',status_name:'Skipped'},
           {status_key:'rejected',status_name:'Rejected'},
          
        ],
        sortColumn: null,
        sortType: null,
      };
      
  findDesc = (id, idKey, array, key) =>{
    const struct = this.generalFilter(id, array, idKey)
    console.log(struct)
    return struct[0][key]
  }

  // Sorting function
  handleSortColumn = (sortColumn, sortType) => {
    const sortedData = [...this.state.data].sort((a, b) => {
      let x = a[sortColumn];
      let y = b[sortColumn];
      if (typeof x === 'string') x = x.toLowerCase();
      if (typeof y === 'string') y = y.toLowerCase();
      if (sortType === 'asc') {
        return x > y ? 1 : x < y ? -1 : 0;
      } else {
        return x < y ? 1 : x > y ? -1 : 0;
      }
    });

    this.setState({
      data: sortedData,
      sortColumn,
      sortType,
    });
  };

  handleDropdownChange = (value, key) => {
    this.setState({ [key]: value});
    if(key ==='selectedCompany'){
        this.setState({integration_data:this.generalFilter(value, this.state.company_integration, 'company_id'), 
                      selectedCompanyDesc: this.findDesc(value, 'company_id', this.state.company_data, 'company_name'),
                      selectedIntegration:undefined, selectedIntegrationDesc:undefined,
                      selectedYear:undefined, selectedMonth:undefined,
                      selectedPromptType:undefined,
                      selectedPromptTypeId:undefined})
    }
    if(key === 'selectedIntegration'){
      const periodData = []
      if (this.generalFilter(value, this.state.integration_period, 'integration_id')[0]['period_cal']){
        const period_count = this.generalFilter(value, this.state.integration_period, 'integration_id')[0]['period_count']
        // const periodData = []
        for (let index = 0; index < period_count; index++) {
          periodData.push('P' + (index + 1).toString())
          
        }
      }
      this.setState({location_data:this.generalFilter(value, this.state.integration_location, 'integration_id'), 
              selectedIntegrationDesc:this.findDesc(value, 'integration_id', this.state.company_integration, 'integration_name'),
              selectedLocation:undefined, 
              selectedLocationDesc:undefined,
              selectedYear:undefined,
              selectedMonth:undefined,
              dropDownOption:this.generalFilter(value, this.state.integration_period, 'integration_id')[0]['period_cal']?periodData:this.state.monthOptions,
              periodLabel:this.generalFilter(value, this.state.integration_period, 'integration_id')[0]['period_cal']?'Period':'Month',
              selectedPromptType:undefined,
              selectedPromptTypeId:undefined
              // period_cal:this.generalFilter(value, this.state.integration_period, 'integration_id')[0]['period_cal']
            }, ()=>{
              console.log(this.state)
            })
              
    }
    if(key === 'selectedLocation'){
      this.setState({selectedLocationDesc:value===0?'All Locations':this.findDesc(value, 'location_id', this.state.integration_location, 'location_name')})
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
    const { subject, incorrect, outputs, id } = this.state;
    const body = new FormData();
    console.log(outputs)
    // Instead of manually appending every item, we could loop over the dynamic fields
    body.append('subject', subject);
    body.append('incorrect_summary', incorrect);
    body.append('id', id);
    
    // Add dynamic output fields
    Object.keys(this.state).forEach((key) => {
      if(key.startsWith('output_')){
        body.append(key, this.state[key]);
      }
    });

    try {
      const response = await fetch(apiEndpoint + '/api/update_data_aisummary/', {
        headers: { Authorization: 'Bearer ' + localStorage['access'] },
        method: 'POST',
        body: body,
      });
      const data = await response.json();
      console.log(data);
      this.setState({ data: [] });
      this.closeModal();
    } catch (err) {
      console.error('Error saving data:', err);
    }

    setTimeout(() => {
      this.fetchData('aisummary');
    }, 200);
};



  fetchData = async (type) => {
    this.setState({ loading: true });
    if(type==='aisummary'){
      await fetch(apiEndpoint + '/api/fetch_data_aisummary/?' + new URLSearchParams({
        company_id: this.state.selectedCompany,
        integration_id: this.state.selectedIntegration,
        location_id: this.state.selectedLocation,
        year: this.state.selectedYear,
        month: this.state.selectedMonth,
        status: this.state.selectedStatus, 
        promptType: this.state.selectedPromptTypeId
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
            integration_location: data['integration_location'],
            integration_period:data['integration_period'],
            promptTypes: data['promptTypes'],
            // showPdf :data['pdf_feature']
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
    const outputLabel = []
    this.setState({id:rowData['id'], subject:rowData['subject'], incorrect:rowData['incorrect_summary']}, ()=>{
      console.log(rowData['incorrect_summary'])
    })
    Object.keys(rowData).forEach((item)=>{
      if (item.startsWith('output_')){
        if (rowData[item]){
          outputs.push({'output':rowData[item], 'key':item, 'id':rowData['id']})
          outputLabel.push({'label':item, 'key':item})
          this.setState({[item]:rowData[item], outputLabel:outputLabel})
        }
      }
    })
    this.setState({outputs}, ()=>{
      var showPdfVar = false
      if (rowData.prompt_type==='run_monthly_summary'){
        showPdfVar = true
        console.log("PDF Flag Active")
      }

      this.setState({modalOpen:true, showPdf:showPdfVar, selectedOutputLabel:undefined})
    })
     
  }

  closeModal = () =>{
    console.log(this.state)

    this.setState({subject:'', id:'', incorrect:undefined, modalOpen:false},()=>{
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

  generatePdf =(id, output)=>{
    window.open(apiEndpoint + '/api/pdf/' + id + '|' + output)
  }


  // Method to generate a Word document
  generateWordDocument = () => {
    const { subject, outputs, incorrect } = this.state;
  
    // Define sections with headings and dynamic content
    const sections = [
      {
        heading: "Subject",
        content: subject,
      },
      {
        heading: "Status",
        content: incorrect,
      },
      ...outputs.map((item) => {
        // Extract heading from content up to the first ":"
        const [dynamicHeading, ...restContent] = item.output.split(":");
        return {
          heading: dynamicHeading || "Summary",
          content: restContent.join(":").trim(), // Join the rest back as content without the heading part
        };
      }),
    ];
  
    // Helper function to format content and handle line breaks
    const formatContent = (text) => {
      const lines = text.split(/\r?\n/);
      return lines.map((line) => {
        const regex = /\*\*(.*?)\*\*/g;
        let parts = [];
        let lastIndex = 0;
        let match;
  
        while ((match = regex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(new TextRun({ text: line.slice(lastIndex, match.index), size: 15, font: "Calibri" }));
          }
          parts.push(new TextRun({ text: match[1], bold: true, size: 15, font: "Calibri" }));
          lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
          parts.push(new TextRun({ text: line.slice(lastIndex), size: 15, font: "Calibri" }));
        }
        return new Paragraph({
          children: parts,
          alignment: AlignmentType.LEFT,
        });
      });
    };
  
    // Build document content by iterating through the sections
    const children = sections
      .filter((section) => section.content)
      .map((section) => [
        new Paragraph({
          children: [
            new TextRun({ text: `${section.heading}:`, bold: true, size: 18, font: "Calibri" }),
          ],
          spacing: { after: 200 },
          alignment: AlignmentType.LEFT,
        }),
        ...formatContent(section.content),
        new Paragraph({ text: "", spacing: { after: 200 } }),
      ])
      .flat();
  
    // Create a new Word document with dynamically created sections
    const doc = new Document({
      sections: [
        {
          properties: {},
          children,
        },
      ],
    });
  
    // Generate and download the Word document
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "AI_Summary.docx");
    });
  };
  
  calculatePlacement(index) {
    let columns;
  
    // Adjust column count based on grid template columns breakpoints
    if (window.innerWidth < 480) {
      columns = 2; // Below 480px: 2 columns
    } else if (window.innerWidth >= 480 && window.innerWidth < 520) {
      columns = 2; // 480px to 520px: 2 columns
    } else if (window.innerWidth >= 520 && window.innerWidth < 768) {
      columns = 2; // 520px to 768px: 3 columns
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      columns = 3; // 768px to 992px: 3 columns
    } else {
      columns = 6; // 992px and above: 6 columns
    }
  
    // Check if the dropdown is the last in its row
    return (index + 1) % columns === 0 ? 'leftStart' : 'bottomStart';
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
    const { companyOptions, integrationOptions, locationOptions, yearOptions, monthOptions, filteredData, loading } = this.state;

    return (
      <>
    
    <Card minH={700}>
    <CardHeader>
      <Grid
        templateColumns={[
          'repeat(2, 1fr)',  // Below 480px: 2 columns
          'repeat(2, 1fr)',  // 480px to 520px: 2 columns
          'repeat(3, 1fr)',  // 520px to 768px: 3 columns
          'repeat(3, 1fr)',  // 768px to 992px: 4 columns
          'repeat(6, 1fr)',  // 992px and above: 6 columns
        ]}
        gap={4}
      >
        {/* Company Dropdown */}
        <Box>
          <Header>Company</Header>
          <Dropdown title={this.state.selectedCompanyDesc || 'Select Company'} placement={this.calculatePlacement(0)}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.company_data
              ?.slice()
              .sort((a, b) => a.company_name.localeCompare(b.company_name)) // Sorting by company_name
              .map((item) => (
                <Dropdown.Item
                  key={item.company_id}
                  onClick={() => this.handleDropdownChange(item.company_id, 'selectedCompany')}
                >
                  {item.company_name}
                </Dropdown.Item>
              ))}
              </div>
          </Dropdown>
        </Box>

        {/* Integration Dropdown */}
        <Box>
          <Header>Integration</Header>
          <Dropdown title={this.state.selectedIntegrationDesc || 'Select Integration'} placement={this.calculatePlacement(1)}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.integration_data
              ?.slice()
              .sort((a, b) => a.integration_name.localeCompare(b.integration_name)) // Sorting by integration_name
              .map((item) => (
                <Dropdown.Item
                  key={item.integration_id}
                  onClick={() => this.handleDropdownChange(item.integration_id, 'selectedIntegration')}
                >
                  {item.integration_name}
                </Dropdown.Item>
              ))}
              </div>
          </Dropdown>
        </Box>

        {/* Location Dropdown */}
        <Box>
          <Header>Location</Header>
          <Dropdown title={this.state.selectedLocationDesc || 'Select Location'} placement={this.calculatePlacement(2)}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.location_data
              ?.slice()
              .sort((a, b) => {
                const nameA = a.location_name || 'All Locations';
                const nameB = b.location_name || 'All Locations';
                return nameA.localeCompare(nameB); // Sorting, treating empty names as "All Locations"
              })
              .map((item) => (
                <Dropdown.Item
                  key={item.location_id}
                  onClick={() => this.handleDropdownChange(item.location_id, 'selectedLocation')}
                >
                  {item.location_name === '' ? 'All Locations' : item.location_name}
                </Dropdown.Item>
              ))}
              </div>
          </Dropdown>
        </Box>

        {/* Status Dropdown */}
        <Box>
          <Header>Status</Header>
          <Dropdown title={this.state.selectedStatusDesc || 'All Status'} placement={this.calculatePlacement(3)}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.status_data?.map((item) => (
              <Dropdown.Item
                key={item.status_key}
                onClick={() => {
                  this.handleDropdownChange(item.status_name, 'selectedStatusDesc');
                  this.handleDropdownChange(item.status_key, 'selectedStatus');
                }}
              >
                {item.status_name}
              </Dropdown.Item>
            ))}
            </div>
          </Dropdown>
        </Box>

        {/* Year Dropdown */}
        <Box>
          <Header>Year</Header>
          <Dropdown title={this.state.selectedYear || 'Select Year'} placement={this.calculatePlacement(4)}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {yearOptions.map((year, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => this.handleDropdownChange(year, 'selectedYear')}
              >
                {year}
              </Dropdown.Item>
            ))}
            </div>
          </Dropdown>
        </Box>

        {/* Month Dropdown */}
        <Box>
          <Header>{this.state.periodLabel}</Header>
          <Dropdown title={this.state.selectedMonth || 'Select ' + this.state.periodLabel} placement={this.calculatePlacement(5)}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.dropDownOption.map((month) => (
              <Dropdown.Item
                key={month}
                onClick={() => this.handleDropdownChange(month, 'selectedMonth')}
              >
                {month}
              </Dropdown.Item>
            ))}
            </div>
          </Dropdown>
        </Box>

        {/* Prompt Type Dropdown */}
        <Box>
          <Header>Prompt Type</Header>
          <Dropdown title={this.state.selectedPromptType || 'Select Prompt Type'} placement={this.calculatePlacement(6)}>
          <Dropdown.Item
                key={''}
                onClick={() => {this.handleDropdownChange('All Types', 'selectedPromptType')
                  this.handleDropdownChange(undefined, 'selectedPromptTypeId')
                }
              }
              >
                {'All Types'}
              </Dropdown.Item>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {this.state.promptTypes.map((pt) => (
                  <Dropdown.Item
                    key={pt.id}
                    onClick={() => {this.handleDropdownChange(pt.desc, 'selectedPromptType')
                      this.handleDropdownChange(pt.id, 'selectedPromptTypeId')
                    }
                  }
                  >
                    {pt.desc}
                  </Dropdown.Item>
              ))}
              </div>
          </Dropdown>
        </Box>
      </Grid>

      {/* Fetch Button */}
      <Flex gap={4} justifyContent="space-around" marginTop={4}>
        <Button color="primary" onClick={() => this.fetchData('aisummary')}>Fetch</Button>
      </Flex>
    </CardHeader>

        <CardBody >
       
          <Table
            height={400}
            data={this.state.data}
            virtualized
            rowKey={'id'}
            loading={loading}
            sortColumn={this.state.sortColumn}
            sortType={this.state.sortType}
            onSortColumn={this.handleSortColumn}
            style={{ width: '100%' }}
          >
            <Column width={400} minWidth={150} flexGrow={1} fullText sortable>
              <HeaderCell>Subject</HeaderCell>
              <Cell dataKey="subject" />
            </Column>

            <Column width={200} minWidth={150} flexGrow={1} align="center" sortable>
              <HeaderCell>Created On</HeaderCell>
              <Cell dataKey="created_date" />
            </Column>

            <Column width={150} minWidth={100} flexGrow={1} align="center" sortable>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="incorrect_summary">
                {rowData => rowData['incorrect_summary'].toUpperCase()}
              </Cell>
            </Column>

            <Column width={150} minWidth={100} flexGrow={1} align="center" sortable>
              <HeaderCell>Prompt Type</HeaderCell>
              <Cell dataKey="desc" />
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
                      this.setState({ subject: e.target.value, showPdf:false });
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
                              this.setState({ [item.key]: e.target.value, showPdf:false }, ()=>{
                                // console.log(item)
                              });
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
              <ModalFooter gap={5} justifyContent="end"> {/* Ensure footer is spaced properly */}
                <Select id='status' maxW={'20%'} onChange={(value) => {
                  this.setState({ incorrect:  document.getElementById('status').value});
                  }} defaultValue={this.state.incorrect}>
                    <option value="not_viewed">Not Viewed</option>
                    <option value="viewed">Viewed</option>
                    <option value="approved">Approved</option>
                    <option value="skipped">Skipped</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                  
                  {this.state.showPdf?
                  
                  <Select id='outputLabel' maxW={'20%'} onChange={(value) => {
                  this.setState({ selectedOutputLabel:  document.getElementById('outputLabel').value}, ()=>{
                    console.log(this.state.selectedOutputLabel)
                  });
                  }} placeholder={'Please select output'}>
                    {this.state.outputLabel.map((item)=>{
                        return (
                          <option value={item.key}>{item.label}</option>
                        )
                    })}
                  </Select>
                  :<></>}
                  <Flex gap={3}>
                  {/* Download Button */}
                  {this.state.showPdf?
                  <Button onClick={()=>{
                    if (this.state.selectedOutputLabel===undefined){
                      alert('Please Select the output you want to generate the pdf for.')
                    }else{
                      this.generatePdf(this.state.id, this.state.selectedOutputLabel)
                    }
                    }
                  }>
                    Export to PDF
                  </Button>:<></>
                }
                  
                  <Button onClick={this.generateWordDocument}>
                    Download as Word
                  </Button>
                  <Button onClick={() => this.setData()}>Save</Button>
                  <Button onClick={this.closeModal}>Close</Button>
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