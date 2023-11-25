import { FormControl } from '@chakra-ui/react';
//import { Select } from 'chakra-react-select';
import { SelectPicker, TagPicker } from 'rsuite'
import React, { Component } from 'react';
import apiEndpoint from '../config/data';
//import { SelectPicker } from 'rsuite';

class LocationDropDown extends Component {
  state = {locationData:[{label:''}]};
  componentDidMount = async ()=>{ 
    await fetch(apiEndpoint + '/api/fetch_locations/',{
      method:"POST",
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then((response=>response.json()))
    .then((data)=>{
      console.log(data)
      var dataNew = data.map((item)=>{
        return{
          label:item.ui_label,
          value:item.ui_label
        }
    })
    this.setState({locationData:dataNew})

    })
    .catch(err=>console.error(err))
  }
  render() {
    return (
      <FormControl>
        <SelectPicker 
          loading={this.state.locationData===undefined}
          data={this.state.locationData}
          value={this.props.locationValue!==undefined?this.props.locationValue:""}
          defaultValue={this.state.locationData[0]}
          size='sm'
          placeholder="Location"
          style={{ width: '100%' }}
          onSelect={this.props.setLocation}
        />
      </FormControl>
    );
  }
}

export default LocationDropDown;
