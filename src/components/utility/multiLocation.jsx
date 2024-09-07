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

  fetchLocations () {
    if (this.props.locationData.length===0){
      fetch(apiEndpoint + '/api/fetch_locations/',{
      method:"POST",
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then((response=>response.json()))
    .then((data)=>{
      // console.log('locations')
      // console.log(data)
      if (data.length>0){
        var dataNew = data.map((item)=>{
          return{
            label:item.ui_label,
            value:item.ui_label,
            currency:item.currency,
            ddl_value:item.ddl_value,
            period_length:item.period_length

          }
      })

      this.setState({locationData:dataNew})
      this.props.setLocationData(dataNew)
      this.props.setLocation(dataNew[0].value)
      this.props.setIntegration(dataNew[0]?.ddl_value.split("|")[1])
      this.props.setCurrency(dataNew[0]?.currency)
      if (dataNew[0]?.ddl_value.split("|")[3].split("=")[1]==='false'){
        this.props.setPeriodSwitcher(false)
      }else{
        this.props.setPeriodSwitcher(true)
      }
      }

  
      })
      .catch(err=>console.error(err))
  
    }
    this.fetchPeriod()
}


  componentDidMount = async ()=>{ 
    if (this.props.locationData.length===0){
      
    }
  }

  checkLocation = (value) =>{
    console.log('checkLocation')
    console.log(value)
    if (value[0]===undefined || value==="location"){
      return false
    } else {
      return true
    }
  }
  render() {
    return (
      <FormControl minWidth={'150px'}>
        <TagPicker 
          loading={this.props.locationData[0].label===undefined || this.props.dataLoading}
          data={this.props.locationData}
          value={this.checkLocation(this.props.locationValue)?this.props.locationValue:Array(this.props.locationData[0].label)}
          
          size='sm'
          //placeholder={this.props.locationData[0].label}
          //value={[this.props.locationData[0].label]}
          //style={{ width: '100%' }}
          block
          onChange={this.props.onChange}
          onClose={this.props.onClose}
          onClean={()=>this.props.onClean(Array(this.props.locationData[0].label))}
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
    dataLoading:state.dataFetch.dataLoading,
    locationData:state.locationSelectFormat.locationData,
    location: state.locationSelectFormat.location
  }
}


export default connect(mapStateToProps, {})(MultiLocationDropDown);
