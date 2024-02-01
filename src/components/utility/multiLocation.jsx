import { FormControl } from '@chakra-ui/react';
//import { Select } from 'chakra-react-select';
import { SelectPicker, TagPicker } from 'rsuite'
import React, { Component } from 'react';
import apiEndpoint from '../config/data';
//import { SelectPicker } from 'rsuite';

class MultiLocationDropDown extends Component {
  state = {
    locationData:[
      {label:"Location", value:"Location"}
    ]
  };
  componentDidMount = async ()=>{ 
    var body = new FormData()
    body.append('type', '')
    await fetch(apiEndpoint + '/api/fetch_locations/',{
      method:"POST",
      body:body,
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then((response=>response.json()))
    .then((data)=>{
      console.log(data)
      if (data.length>0){
        var dataNew = data.map((item)=>{
          return{
            label:item.ui_label,
            value:item.ui_label
          }
      })
      this.setState({locationData:dataNew})
      }
      

    })
    .catch(err=>console.error(err))
  }
  render() {
    return (
      <FormControl>
        <TagPicker 
          loading={this.state.locationData===undefined}
          data={this.state.locationData}
        //  value={this.props.locationValue!==undefined?this.props.locationValue:""}
          size='sm'
        ///  placeholder={this.state.locationData[0].label}
          //style={{ width: '100%' }}
          block
          onChange={this.props.onChange}
          onClose={this.props.onClose}
          onTagRemove={this.props.onTagRemove}
          style={{overflowY:'scroll',
                  maxHeight:30}}

        />
      </FormControl>
    );
  }
}

export default MultiLocationDropDown;
