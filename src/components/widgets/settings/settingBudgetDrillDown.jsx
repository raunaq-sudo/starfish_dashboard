import React, { Component } from 'react';
import { Table, Button, Dropdown, Header, Uploader } from 'rsuite';
import apiEndpoint from '../../config/data';
import { Box, Card, CardBody, CardHeader, Flex } from '@chakra-ui/react';
import { downloadExcel } from 'react-export-table-to-excel';
import { isThisSecond } from 'date-fns';



class SettingBudgetDrillDown extends Component {

  state= {
    locationDisable:false,
    types : [
      {'key':1, 'label':'Revenue'},
      {'key':2, 'label':'Expense'}
    ],
    limitUploader : [],
    excelUploadData : [{
      integration_id : 0,
      location_id : 0,
      type : 'upload',
      budget_type : 0
    }],
    fileUploadDisabled: false,
    filelist:[]
  }


componentDidMount = async () =>{
  await fetch(apiEndpoint + '/api/fetch_budget_settings_dd/?' + new URLSearchParams({
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
        years: data['years']
      }); 
      
    })
    .catch((err) => console.error(err));
}

fetchBudgetConfiguration = async () =>{
  const formData = new FormData()
  formData.append('integration_id', this.state.selectedIntegration)
  this.state.location_id!==undefined?formData.append('location_id', this.state.location_id):<></>
  formData.append('year', this.state.year)
  formData.append('budget_type', this.state.type)
  formData.append('type', 'download')
  await fetch(apiEndpoint + '/api/fetch_budget_settings_dd/', {
    headers: { Authorization: 'Bearer ' + localStorage['access'] },
    method: 'POST',
    body:formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.setState({budgetData:data}, ()=>{
        this.handleDownloadExcel()
      })
      
    })
    .catch((err) => console.error(err));
}



handleDownloadExcel = () => {
  downloadExcel({
    fileName: 'Budget Configuration',
    sheet: 'summary',
    tablePayload: {
      header: Object.keys(this.state.budgetData[0]),
      body: this.state.budgetData,
    },
  });
};


generalFilter = (value, array, key) =>{
  const ddFiltered = array.filter((item) => {
    return (
      (item[key] === value)
    );
  });
  return ddFiltered
}

handleIntegrationDD = (item) =>{
  var location_data = this.generalFilter(item.integration_id, this.state.integration_location, 'integration_id')
  this.setState({locationDisable:!item.location_flag, 
    selectedIntegration:item.integration_id, 
    selectedIntegrationDesc:item.integration_name, 
    location_data:location_data})
}

objToJson = (key, value) => {
  var res = {}
  res[key] = value
  ////console.log(res)
  return res
}
resetValues = () =>{
  this.setState({
    selectedIntegration:undefined,
    selectedIntegrationDesc:undefined,
    selectedLocationDesc:undefined,
    location_id:undefined,
    year: undefined,
    type:undefined,
    locationDisable:false,
    fileUploadDisabled:false,
    filelist:[],
    typeDesc:undefined
  })
}
render(){
  return(
    <Card minH={700}>
          <CardHeader gap={2} >
        <Flex gap={2}>
          <h4>Update Budget</h4></Flex>
        <Flex gap={2} justifyContent={'center'}>
        {/* dropdowns for selection of budget data */}

                    {/* Integration Dropdown */}
        <Box>
          <Header>Integration</Header>
          <Dropdown title={this.state.selectedIntegrationDesc || 'Select Integration'}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.company_integration
              ?.slice()
              .sort((a, b) => a.integration_name.localeCompare(b.integration_name)) // Sorting by integration_name
              .map((item) => (
                <Dropdown.Item
                  key={item.integration_id}
                  onClick={() => this.handleIntegrationDD(item)}
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
          <Dropdown title={this.state.selectedLocationDesc || 'Select Location'} disabled={this.state.locationDisable}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.location_data
              ?.slice()
              // .sort((a, b) => {
              //   const nameA = a.location_name || 'All Locations';
              //   const nameB = b.location_name || 'All Locations';
              //   return nameA.localeCompare(nameB); // Sorting, treating empty names as "All Locations"
              // })
              .map((item) => (
                <Dropdown.Item
                  key={item.location_id}
                  onClick={() => this.setState({location_id:item.location_id, selectedLocationDesc:item.location_name})}
                >
                  {item.location_name === '' ? <></> : item.location_name}
                </Dropdown.Item>
              ))}
              </div>
          </Dropdown>
        </Box>

          {/* Year Dropdown */}
        <Box>
          <Header>Year</Header>
          <Dropdown title={this.state.year || 'Select Year'}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {this.state.years
            ?.map((item) => (
                <Dropdown.Item
                  key={item}
                  onClick={() => this.setState({year:item})}
                >
                  {item}
                </Dropdown.Item>
              ))}
              </div>
          </Dropdown>
        </Box>

 {/* Type Dropdown */}
          <Box>
            <Header>Type</Header>
            <Dropdown title={this.state.typeDesc || 'Select Type'}>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {this.state.types
              ?.map((item) => (
                  <Dropdown.Item
                    key={item.key}
                    onClick={() => this.setState({type:item.key, typeDesc:item.label})}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
                </div>
            </Dropdown>
          </Box>
          
          

          </Flex>
          <Flex marginTop={5} gap={4} justifyContent={'center'}>
          {/* <Button color='green' appearance='primary'>Upload</Button> */}
          <Button color='yellow' appearance='primary' 
            disabled={this.state.selectedIntegration===undefined || this.state.year===undefined || this.state.type === undefined}
            onClick={()=>{
              // console.log(this.state)
              this.fetchBudgetConfiguration()
              }}>
              Download
            </Button>

            <Button color='yellow' appearance='primary' 
            // disabled={this.state.selectedIntegration===undefined || this.state.year===undefined || this.state.type === undefined}
            onClick={()=>{
              // console.log(this.state)
              this.resetValues()
              }}>
              Reset
            </Button>

          </Flex>
        </CardHeader>
          <CardBody justifyContent={'center'}>
              <Flex justifyContent={'center'}>
          <Uploader
          listType="picture-text"
          action={`${apiEndpoint}/api/fetch_budget_settings_dd/`}
          draggable
          autoUpload
          headers={{ Authorization: `Bearer ${localStorage['access']}` }}
          method="POST"
          data={{
            integration_id : this.state.selectedIntegration,
            location_id : this.state.location_id,
            type : 'upload',
            budget_type : this.state.type,
            year: this.state.year
          }}
          multiple={false}
          accept=".xls,.csv,.xlsx"
          disabledFileItem
          // disabled={this.state.selectedIntegration===undefined || this.state.year===undefined || this.state.type === undefined || this.state.fileUploadDisabled}
          onChange={(filelist)=>{
            if (filelist.length>0){
              this.setState(
                {
                  fileUploadDisabled:true,
                  filelist:filelist
                }
                )
              
            }
          }}
          fileList={this.state.filelist}
          onSuccess={()=>{
            alert("File Uploaded sucessfully!")
            this.resetValues()
          }}
          onError={()=>{
            alert("Error in uploading file please check the file before uploading.")
          }}
        >
          <div
            style={{
              width: 500,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>
              Click or Drag files to this area to upload. Files will get uploaded automatically,
            </span>
          </div>
        </Uploader>
        </Flex>
     </CardBody>
    </Card>
  )
}
        


}



export default SettingBudgetDrillDown;
