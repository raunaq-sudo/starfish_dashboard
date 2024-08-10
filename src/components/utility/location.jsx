import { FormControl } from '@chakra-ui/react';
//import { Select } from 'chakra-react-select';
import { SelectPicker, TagPicker } from 'rsuite'
import React, { Component } from 'react';
import apiEndpoint from '../config/data';
import {connect} from 'react-redux'
import { current } from '@reduxjs/toolkit';
import { setCurrency, setLocation } from '../../redux/slices/locationSlice';

//import { SelectPicker } from 'rsuite';

class LocationDropDown extends Component {
  state = {
    locationData:[
      {label:"Location", value:"Location"}
    ]
  };
  componentDidMount = async ()=>{ 
    await fetch(apiEndpoint + '/api/fetch_locations/',{
      method:"POST",
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then((response=>response.json()))
    .then((data)=>{
      console.log(data)
      if (data.length>0){
        var dataNew = data.map((item)=>{
          return{
            label:item.ui_label,
            value:item.ui_label,
            currency:item.currency
          }
      })
      this.setState({locationData:dataNew})
      }


    })
    .catch(err=>console.error(err))


    if(this.props.locationValue!==undefined && this.props.locationValue!==''){
      console.log("Prop Location" + " " + this.props.locationValue)
      this.props.setCurrency(this.findLocation(this.props.locationValue)[0]?.currency)
    }else{
      setTimeout(()=>{
        console.log("Prop Location in timer" + " " + this.props.locationValue)
        if(this.props.locationValue!==undefined && this.props.locationValue!==''){
          this.props.setCurrency(this.findLocation(this.props.locationValue)[0]?.currency)
        }else{
          this.props.setCurrency(this.state.locationData[0]?.currency)
        }
      }, 2000)
    }

  
  }

  timerLocationUpdate = () =>{
    
  }

  findLocation = (location) => {
    return this.state.locationData.filter(
      function(data){ return data.value == location }
  ); 
  }
  render() {
    return (
      <FormControl>
        <SelectPicker 
          loading={this.state.locationData===undefined || this.props.dataLoading}
          data={this.state.locationData}
          value={this.props.locationValue!==undefined?this.props.locationValue:""}
          //value={this.props.valueLocation}
          size='sm'
          placeholder={this.state.locationData[0].label}
          style={{ width: '100%' }}
          onSelect={(val)=>{
            this.props.setLocation(val)
            console.log(this.findLocation(val)[0]?.currency)
            this.props.setCurrency(this.findLocation(val)[0]?.currency)
          }}
          onChange = {(val)=>{
            this.props.setLocation(val)
            console.log(this.findLocation(val)[0]?.currency)
            this.props.setCurrency(this.findLocation(val)[0]?.currency)
          }}
          
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

const mapDispatchToProps = { setCurrency };


export default connect(mapStateToProps, mapDispatchToProps)(LocationDropDown);
