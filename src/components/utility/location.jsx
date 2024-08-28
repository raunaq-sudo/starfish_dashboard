import { FormControl } from '@chakra-ui/react';
//import { Select } from 'chakra-react-select';
import { SelectPicker, TagPicker } from 'rsuite'
import React, { Component } from 'react';
import apiEndpoint from '../config/data';
import {connect} from 'react-redux'
import { current } from '@reduxjs/toolkit';
import { setCurrency, setIntegration, setLocation } from '../../redux/slices/locationSlice';
import { setPeriodSwitcher } from '../../redux/slices/dateSlice';


//import { SelectPicker } from 'rsuite';

class LocationDropDown extends Component {
  state = {
    locationData:undefined
  };
  // componentDidMount = async ()=>{ 
  //   if (this.props.companySwitcherActive!==undefined){
  //     await fetch(apiEndpoint + '/api/fetch_locations/',{
  //       method:"POST",
  //       headers: { "Authorization": "Bearer " + localStorage['access'] },
  
  //     }).then((response=>response.json()))
  //     .then((data)=>{
  //       // console.log('locations')
  //       // console.log(data)
  //       if (data.length>0){
  //         var dataNew = data.map((item)=>{
  //           return{
  //             label:item.ui_label,
  //             value:item.ui_label,
  //             currency:item.currency,
  //             ddl_value:item.ddl_value
  //           }
  //       })
  //       this.setState({locationData:dataNew})
  //       }
  
  
  //     })
  //     .catch(err=>console.error(err))
  
  //   }
    

  //   if(this.props.locationValue!==undefined && this.props.locationValue!==''){
  //     // console.log("Prop Location" + " " + this.props.locationValue)
  //     const location =this.findLocation(this.props.locationValue)
  //     this.props.setCurrency(location[0]?.currency)
  //     this.props.setIntegration(location[0]?.ddl_value.split("|")[1])
  //     if (location[0]?.ddl_value.split("|")[3].split("=")[1]==='false'){
  //       this.props.setPeriodSwitcher(false)
  //     }else{
  //       if(this.props.companySwitcherActive){
  //         this.props.setPeriodSwitcher(true)
  //         }else{
  //           this.props.setPeriodSwitcher(false)
  //         }
  //     }
      
  //   }else{
  //     setTimeout(()=>{
  //       // console.log("Prop Location in timer" + " " + this.props.locationValue)
  //       if(this.props.locationValue!==undefined && this.props.locationValue!==''){
  //         const location =this.findLocation(this.props.locationValue)
  //         // console.log(location)
  //         this.props.setCurrency(location[0]?.currency)
  //         this.props.setIntegration(location[0]?.ddl_value.split("|")[1])

  //         if (location[0]?.ddl_value.split("|")[3].split("=")[1]==='false'){
  //           this.props.setPeriodSwitcher(false)
  //         }else{
  //           if(this.props.companySwitcherActive){
  //           this.props.setPeriodSwitcher(true)
  //           }else{
  //             this.props.setPeriodSwitcher(false)
  //           }
  //           // this.props.setIntegration(location[0]?.ddl_value.split("|")[1])

  //         }
      
  //       }else{
  //         const location = this.state.locationData[0]
  //         // console.log(location?.ddl_value.split("|")[1])
  //         this.props.setCurrency(location?.currency)
  //         this.props.setIntegration(location?.ddl_value.split("|")[1])

  //         if (location?.ddl_value.split("|")[3].split("=")[1]==='false'){
  //           this.props.setPeriodSwitcher(false)
  //         }else{
  //           if(this.props.companySwitcherActive){
  //           this.props.setPeriodSwitcher(true)
  //           }else{
  //             this.props.setPeriodSwitcher(false)
  //           }
  //           // this.props.setIntegration(location?.ddl_value.split("|")[1])

  //         }
      
  //       }
  //     }, 1000)
  //   }

  
  // }
  fetchLocations () {
    if (this.props.companySwitcherActive!==undefined){
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
                  ddl_value:item.ddl_value
                }
            })

           this.setState({locationData:dataNew})
            }
      
      
          })
          .catch(err=>console.error(err))
      
        }
  }


  
  componentDidMount = () =>{
    const intervalId = setInterval(()=>{
      if(this.props.companySwitcherActive!==undefined){
        this.fetchLocations()
        /// if company id is true then set it based on the first integration
        // console.log(location?.ddl_value.split("|")[1])
        setTimeout(()=>{
          this.props.setCurrency(this.state.locationData[0]?.currency)
          this.props.setIntegration(this.state.locationData[0]?.ddl_value.split("|")[1])
          /// setting the switcher
          if(this.props.companySwitcherActive){
            if (this.state.locationData[0]?.ddl_value.split("|")[3].split("=")[1]==='false'){
              this.props.setPeriodSwitcher(false)
            }else{
              this.props.setPeriodSwitcher(true)
              }
            }
        }, 1000)
          
          clearInterval(intervalId)

        
        
  }

    }, 1000)
    

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
          placeholder={this.state.locationData!==undefined?this.state.locationData[0].label:'Loading'}
          style={{ width: '100%' }}
          onSelect={(val)=>{
            this.props.setLocation(val)
            const location =this.findLocation(val) 
            console.log(location[0])
            this.props.setCurrency(location[0]?.currency)
            if (location[0]?.ddl_value.split("|")[3].split("=")[1]==='false'){
              this.props.setPeriodSwitcher(false)
            }else{
               if(this.props.companySwitcherActive){
            this.props.setPeriodSwitcher(true)
            }else{
              this.props.setPeriodSwitcher(false)
            }
              this.props.setIntegration(location[0]?.ddl_value.split("|")[1])
            }
            
          }}
          onChange = {(val)=>{
            this.props.setLocation(val)
            const location =this.findLocation(val) 
            console.log(location[0])
            this.props.setCurrency(location[0]?.currency)
            if (location[0]?.ddl_value.split("|")[3].split("=")[1]==='false'){
              this.props.setPeriodSwitcher(false)
            }else{
               if(this.props.companySwitcherActive){
            this.props.setPeriodSwitcher(true)
            }else{
              this.props.setPeriodSwitcher(false)
            }
              this.props.setIntegration(location[0]?.ddl_value.split("|")[1])

            }
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
  }
}

const mapDispatchToProps = { setCurrency, setPeriodSwitcher, setIntegration };


export default connect(mapStateToProps, mapDispatchToProps)(LocationDropDown);
