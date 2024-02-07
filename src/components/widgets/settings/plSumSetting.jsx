import React, { Component } from 'react';
import { Table, Button, Dropdown } from 'rsuite';
import apiEndpoint from '../../config/data';

import { Flex, Input, Select, Text } from '@chakra-ui/react';

const { Column, HeaderCell, Cell } = Table;


const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
      <Cell {...props} className={editing ? 'table-content-editing' : ''}>
        {editing ? (
          <input
            className="rs-input"
            defaultValue={rowData[dataKey]}
            style={{padding:0, maxHeight:30, maxWidth:100}}
            onChange={event => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };

const  ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
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



class PLSummarySetting extends Component {
    state = {data:null,
        classification:'Expense',
        data:undefined

    }


    handleChange = (id, key, value) => {
        const nextData = Object.assign([], this.state.data);
        nextData.find(item => item.id === id)[key] = value;
        this.setState({data:nextData});
        console.log(id + key + value)
      };


    handleEditState = id => {
        const nextData = Object.assign([], this.state.data);
        const activeItem = nextData.find(item => item.id === id);
        activeItem.status = activeItem.status ? null : 'EDIT';
        console.log(activeItem)
        this.setState({data:nextData});

        if(activeItem.status==null){
            this.set_data(activeItem)
        }
        
      };

    set_data = async (id, classification, alias) =>{
        const body = new FormData()
        if (id!==undefined){
          body.append('plParentId', id)
          body.append('classification', classification)
          body.append('alias', alias)

        await fetch(apiEndpoint + '/api/set_plparent_settings/', {
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            method:'POST',
            body:body
        }).then(response=>response.json())
        .then((data)=>{
            console.log(data)
           
        }).then(err => console.error(err))

        }
        

    }

    fetch_data_integration_ids = async () => {
      const body = new FormData()
      body.append('type', 'integration_ids')
      await fetch(apiEndpoint + '/api/fetch_budget_settings/', {
        headers: { "Authorization": "Bearer " + localStorage['access'] },
        method:'POST',
        body:body
        
    }).then(response=>response.json())
    .then((data)=>{
        console.log(data)
        this.setState({integration_ids:data})
    }).then(err => console.error(err))

    }

    fetch_data = async (type) =>{

        this.setState({loading:true})
        this.setState({data:[]})
        const body = new FormData()
        body.append('integration_id', this.state.integrationID)
        await fetch(apiEndpoint + '/api/fetch_plparent_settings/', {
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            method:'POST',
            body:body
            
        }).then(response=>response.json())
        .then((data)=>{
            this.setState({data:data}, ()=>{
              console.log(this.state.data)
            })
        }).then(err => console.error(err))
        this.setState({loading:false})
    }
    componentDidMount = async () =>{
        this.fetch_data()
        this.fetch_data_integration_ids()
    }

    render() { 
        return (
            <>
            <Flex direction={'column'} >
              <Flex>
              <Flex flex={1}>
              <Dropdown title={this.state.integrationLabel!==undefined?this.state.integrationLabel:'Choose Integration'}> 
              {this.state.integration_ids?this.state.integration_ids.map((row, key)=>(
                <Dropdown.Item onClick={()=>{
                  this.setState({integrationID:row.id, integrationLabel:row.app_name}, ()=>{
                    this.fetch_data()
                  })
                }}>{row.app_name}</Dropdown.Item>
              )):<></>}
              </Dropdown>
              </Flex>
              <Flex flex={1}>
              <Button color='orange' appearance='primary' loading={this.state.buttonLoader} onClick={()=>{
                  this.setState({buttonLoader:true})
                  this.fetch_data()
                  this.setState({buttonLoader:false})
                }}>
                  Update
                </Button>
              
              </Flex>
              </Flex>
              
               <Table height={500} data={this.state.data!==undefined?this.state.data:[]} virtualized rowKey={'id'} loading = {this.state.loading}>
             <Column flexGrow={1}>
                 <HeaderCell>Description</HeaderCell>
                 <Cell dataKey={"desc"}  />
             </Column>
                
             <Column flexGrow={1}>
                 <HeaderCell>Classification</HeaderCell>
                 <Cell dataKey={"classification"} >
                  {
                    rowData=><Select defaultValue={rowData.classification} size={'sm'}
                    onChange={(value)=>{
                      this.set_data(rowData.id, value.target.value, rowData.alias)
                     }}
                     >
                      <option>Revenue</option>
                      <option>Expense</option>
                      <option></option>
                    </Select>
                  }

                 </Cell>
             </Column>
             <Column flexGrow={1}>
                 <HeaderCell>Alias</HeaderCell>
                 <Cell dataKey={"alias"}>
                  {rowData=>
                  <Input placeholder={rowData.alias} 
                  size={'sm'} 
                  onBlur={()=>{
                    this.set_data(this.state.row_id, this.state.classification, this.state.alias)
                    this.setState({row_id:undefined, classification:undefined, alias:undefined})
                  }}
                  onFocus={()=>{
                    this.set_data(this.state.row_id, this.state.classification, this.state.alias)
                    this.setState({row_id:undefined, classification:undefined, alias:undefined})
                  }}
                  onChange={(val)=>{
                    this.setState({row_id:rowData.id, classification:rowData.classification, alias:val.target.value})
                  }}></Input>}
                 </Cell>
             </Column>
            

     </Table>       

     </Flex>
            </>
        );
    }
}
 
export default PLSummarySetting;