import { FormControl } from '@chakra-ui/react';
//import { Select } from 'chakra-react-select';
import { SelectPicker, TagPicker } from 'rsuite'
import React, { Component } from 'react';
import apiEndpoint from '../config/data';
import {connect} from 'react-redux'

//import { SelectPicker } from 'rsuite';

class MultiLocationDropDown extends Component {
  state = {
    locationData:[
      {
        label:undefined,
        value:undefined
      }
    ],
    locationValue:[]
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
      this.setState({locationData:dataNew}, ()=>{

      })
      }
      

    })
    .catch(err=>console.error(err))
  }

  checkLocation = (value) =>{
    if (value[0]===undefined){
      return false
    } else {
      return true
    }
  }
  render() {
    return (
      <FormControl>
        <TagPicker 
          loading={this.state.locationData[0].label===undefined || this.props.dataLoading}
          data={this.state.locationData}
          value={this.checkLocation(this.props.locationValue)?this.props.locationValue:Array(this.state.locationData[0].label)}
          
          size='sm'
          //placeholder={this.state.locationData[0].label}
          //value={[this.state.locationData[0].label]}
          //style={{ width: '100%' }}
          block
          onChange={this.props.onChange}
          onClose={this.props.onClose}
          onClean={this.props.onClean}
          onTagRemove={this.props.onTagRemove}
          style={{overflowY:'scroll',
                  maxHeight:30}}

        />
      </FormControl>
    );
  }
}
const mapStateToProps = (state)=>{
  return{
    dataLoading:state.dataFetch.dataLoading
  }
}


export default connect(mapStateToProps, {})(MultiLocationDropDown);
