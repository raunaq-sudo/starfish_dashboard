import React, { Component } from 'react';
import { Table, Button, Dropdown } from 'rsuite';
import apiEndpoint from '../../config/data';
import { Flex } from '@chakra-ui/react';

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


class SettingBudget extends Component {


    state = {data:null,
        classification:'Expense',
        integration_ids:[{id:12, app_name:'App Name'}],
        integrationID:'',
        integrationLabel:'Integration ID'


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

    set_data = async (activeItem) =>{
        const body = new FormData()
        body.append('amount', [activeItem[String(new Date().getFullYear()-1)], activeItem[String(new Date().getFullYear())], activeItem[String(new Date().getFullYear()+1)], activeItem[String(new Date().getFullYear()+2)]])
        body.append('budgetId', activeItem['id'])
        body.append('year', [String(new Date().getFullYear()-1),String(new Date().getFullYear()),String(new Date().getFullYear()+1), String(new Date().getFullYear()+2)])
        body.append('classification', this.state.classification)

        await fetch(apiEndpoint + '/api/set_budget_settings/', {
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            method:'POST',
            body:body
        }).then(response=>response.json())
        .then((data)=>{
            console.log(data)
           
        }).then(err => console.error(err))


    }

    fetch_data = async (type) =>{
        this.setState({loading:true})
        this.setState({data:[]})
        const body = new FormData()
        body.append('type', this.state.classification)
        body.append('integration_id', this.state.integrationID)
        await fetch(apiEndpoint + '/api/fetch_budget_settings/', {
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            method:'POST',
            body:body
            
        }).then(response=>response.json())
        .then((data)=>{
            console.log(data)
            this.setState({data:data[0]})
        }).then(err => console.error(err))
        this.setState({loading:false})
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

    componentDidMount = async () =>{
        this.fetch_data_integration_ids()
    }

    render(){
        return(<><Flex gap={2}>
            <Dropdown title={this.state.classification}> 
            <Dropdown.Item onClick={()=>{
                    
                    this.setState({classification:'Expense'}, ()=>{
                      if (this.state.integrationLabel!=="Integration ID"){
                        this.fetch_data()
                      }
                    })
                }}>Budget(Expense)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                 
                    this.setState({classification:'Revenue'}, ()=>{
                      if (this.state.integrationLabel!=="Integration ID"){
                        this.fetch_data()
                      }})

                }}>Revenue</Dropdown.Item>
                
            </Dropdown>
            <Dropdown title={this.state.integrationLabel}> 
            {this.state.integration_ids?this.state.integration_ids.map((row, key)=>(
              <Dropdown.Item onClick={()=>{
                this.setState({integrationID:row.id, integrationLabel:row.app_name}, ()=>{
                  this.fetch_data()
                })
              }}>{row.app_name}</Dropdown.Item>
            )):<></>}
            </Dropdown>
            </Flex>
            {this.state.data===null ? <></>:
             <Table height={500} data={this.state.data} virtualized rowKey={'id'} loading = {this.state.loading}>
             <Column width={400}>
                 <HeaderCell>Header</HeaderCell>
                 <Cell dataKey={"desc"} onChange={this.handleChange} />
             </Column>
                
             <Column width={100}>
                 <HeaderCell>{new Date().getFullYear()-1}</HeaderCell>
                 <EditableCell dataKey={String(new Date().getFullYear()-1)} onChange={this.handleChange} />
             </Column>
             <Column width={100}>
                 <HeaderCell>{new Date().getFullYear()}</HeaderCell>
                 <EditableCell dataKey={new Date().getFullYear()} onChange={this.handleChange} />
             </Column>
             <Column width={100}>
                 <HeaderCell>{new Date().getFullYear()+1}</HeaderCell>
                 <EditableCell dataKey={new Date().getFullYear()+1} onChange={this.handleChange} />
             </Column>
 
             <Column width={100}>
                 <HeaderCell>{new Date().getFullYear()+2}</HeaderCell>
                 <EditableCell dataKey={new Date().getFullYear()+2} onChange={this.handleChange} />
             </Column>
          
             <Column flexGrow={1}>
                 <HeaderCell>...</HeaderCell>
                 <ActionCell dataKey="id" onClick={this.handleEditState} />
             </Column>

     </Table>}
           
    </>
        )
    }
        


}



export default SettingBudget;
