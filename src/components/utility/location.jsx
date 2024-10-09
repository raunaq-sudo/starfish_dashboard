import { FormControl } from '@chakra-ui/react';
//import { Select } from 'chakra-react-select';
import { SelectPicker, TagPicker } from 'rsuite'
import React, { Component } from 'react';
import apiEndpoint from '../config/data';
import {connect} from 'react-redux'
import { current } from '@reduxjs/toolkit';
import { setCurrency, setIntegration, setLocationData } from '../../redux/slices/locationSlice';
import { setCompanySwitcherActive, setDefaultDateValue, setPeriodData, setPeriodFrom, setPeriodSwitcher, setPeriodTo } from '../../redux/slices/dateSlice';


//import { SelectPicker } from 'rsuite';

class LocationDropDown extends Component {
  state = {
    locationData:undefined
  };


  fetchPeriod =  () => {
    console.log('integration' + this.props.integration)
    var url = apiEndpoint + '/api/fetch_periods/'
    if (this.props.integration !== null && this.props.integration!==undefined){
      url = url +  this.props.integration
    }else{
      url = url +  'null'
    }
    console.log(url)
     fetch(url, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Period Fetch')
        // console.log(data);
        if (data.code === undefined) {
          console.log(data)
          if (data.period_cal === 'true') {
            var dataNew = data.period_data.map(item => {
              return {
                label: item.period_label,
                value: item.period_label,
              };
            });
            this.setState({ periodData: dataNew });
            this.props.setPeriodData(dataNew);
            if (this.props.periodFrom === '') {
              this.setState({
                periodFrom: data.from_period,
                periodTo: data.to_period,
              });
              this.props.setPeriodFrom(data.from_period);
              this.props.setPeriodTo(data.to_period);
              this.props.setCompanySwitcherActive(true)
            }
            // this.props.setLocation(this.props.locationValue)


            // this.props.setPeriodSwitcher(true);//Removed as now the same will be shifted to the integration/location 
          } else {
            this.props.setCompanySwitcherActive(false)
            this.props.setPeriodSwitcher(false)
            
          }
        } else {
          window.open('/', '_self');
          alert('Session Expired!.');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  storeDateConverter = (value) =>{
    const val = []
    if (value!==undefined){value.map((value)=>{
      val.push(value.toISOString())
    })}
    return val
  }

  calenderPropsDateConverter = (value) =>{
    const val = []
    if (value!==undefined){value.map((item)=>{
      val.push(new Date(new Date(item).toString()))
    })}
    console.log(value)
    console.log(val)
    return val
  }

  fetchLocations () {
    if (this.props.locationData.length===0){
      fetch(apiEndpoint + '/api/fetch_locations/',{
      method:"POST",
      headers: { "Authorization": "Bearer " + localStorage['access'] },

    }).then((response=>response.json()))
    .then((data)=>{
      console.log('locations')
      console.log(data)
      if (data.length>0){
        console.log(data[0].currency)
        this.props.setCurrency(data[0].currency)

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
      // this.props.setLocation(dataNew[0].value)
      this.props.setIntegration(dataNew[0]?.ddl_value.split("|")[1])
      
      }

  
      })
      .catch(err=>console.error(err))
      console.log('Default date value ' + this.props.defaultDateValue)
      if (this.props.defaultDateValue===undefined || this.props.defaultDateValue===null || this.props.defaultDateValue===''){
        if(this.props.periodSwitcher && this.props.periodSelect){
          console.log("Location Period False")
        }else{
          console.log("Not date ffound")
          this.fetchPeriod()
        }
      }
   
    }
    this.handleLocationSelect(this.props.locationValue)
}


  
  componentDidMount = () =>{
    
    this.fetchLocations()

  }

  handleLocationSelect = (val) =>{
    // this.props.setLocation(val)
    this.setState({loader:true})
    if (val!==undefined){
      const location =this.findLocation(val) 
      console.log(location[0])
      
      this.props.setCurrency(location[0]?.currency)

      if (location[0]?.ddl_value.split("|")[3].split("=")[1]==='false'){
        this.props.setPeriodSwitcher(false)
        this.props.setPeriodFrom('');
        this.props.setPeriodTo('');
      }else{
        // this.props.setDefaultDateValue(undefined)
        this.props.setPeriodSwitcher(true)
        this.props.setIntegration(location[0]?.ddl_value.split("|")[1])
        setTimeout(()=>{this.fetchPeriod()},20)
      }
      
    }
    this.setState({loader:false})

    
  }

  findLocation = (location) => {
    return this.props.locationData.filter(
      function(data){ return data.value == location }
  ); 
  
  }
  render() {
    return (
      <FormControl>
        <SelectPicker 
          loading={this.props.dataLoading || this.state.loader}
          data={this.props.locationData}
          value={this.props.locationValue!==undefined?this.props.locationValue:""}
          //value={this.props.valueLocation}
          size='sm'
          placeholder={this.props.locationData.length>0?this.props.locationData[0].label:'Loading'}
          style={{ minWidth: '150px', width:'100%' }}
          onSelect={(val)=>{
            this.handleLocationSelect(val)
            setTimeout(()=>{
              this.props.setLocation(val)
            }, 1000)
            // console.log("Select" + val)
          }}
          
        />
      </FormControl>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    dataLoading:state.dataFetch.dataLoading,
    companySwitcherActive: state.dateFormat.companySwitcherActive,
    periodFrom: state.dateFormat.periodFrom,
    periodTo: state.dateFormat.periodTo,
    // location: state.locationSelectFormat.location,
    defaultDateValue: state.dateFormat.defaultDateValue,
    locationData: state.locationSelectFormat.locationData,
    periodSwitcher: state.dateFormat.periodSwitcher,
    periodSelect: state.dateFormat.periodSelect

  }
}

const mapDispatchToProps = { setCurrency, 
                            setPeriodSwitcher, 
                            setIntegration, 
                            setPeriodData, 
                            setPeriodFrom, 
                            setPeriodTo, 
                            setLocationData,
                            setCompanySwitcherActive,
                            setDefaultDateValue };


export default connect(mapStateToProps, mapDispatchToProps)(LocationDropDown);
