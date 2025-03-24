import { addMonths, endOfMonth, startOfMonth, subDays } from 'date-fns';
import React, { Component } from 'react';
import {
  Button,
  DateRangePicker,
  Modal,  
  Panel,
  SelectPicker,
  Toggle,
} from 'rsuite';
import { connect } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import apiEndpoint from '../config/data';
import {
  setCompanySwitcherActive,
  setDefaultDateValue,
  setPeriodData,
  setPeriodFrom,
  setPeriodSelect,
  setPeriodSwitcher,
  setPeriodTo,
} from '../../redux/slices/dateSlice';

class CustomDateRangePicker extends Component {
  state = {
    period: false,
    periodFrom: this.props.periodFrom,
    periodTo: this.props.periodTo,
    openModal: false,
    defaultSwitcher: false
  };

  fetchPeriod =  () => {
    console.log('integration' + this.props.integration)
    var url = apiEndpoint + '/api/fetch_periods/'
    if (this.props.integration !== null){
      url = url +  this.props.integration
    }else{
      url = url + 'null'
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
          console.log('period_cal', data)
          if (data.period_cal === 'true') {
            // this.props.setCompanySwitcherActive(true)
            // this.props.setPeriodSwitcher(true)

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
            }

            // this.props.setPeriodSwitcher(true);//Removed as now the same will be shifted to the integration/location 
          } else {
            // this.props.setCompanySwitcherActive(false)
            // this.props.setPeriodSwitcher(false)
            this.props.setPeriodFrom('');
            this.props.setPeriodTo('');

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

  periodLabel = () =>{
    var periodFrom = ''
    var periodTo = ''
    if (this.props.periodFrom !=='' || this.props.periodTo !==''){
      periodFrom = this.props.periodFrom
      periodTo = this.props.periodTo
    } else{
      if(this.state.defaultSwitcher){
        this.fetchPeriod()
        periodFrom = this.props.periodFrom
        periodTo = this.props.periodTo
      } 
    }
    return periodFrom + ' ~ ' + periodTo
  }

  // shouldComponentUpdate =(nextProps)=>{
  //   if (nextProps.periodSwitcher!= this.props.periodSwitcher){
  //     return true
  //   } else{
  //     return false
  //   }
  // }

  componentDidMount = () => {
    // if(this.props.periodSelect===false){
    //   this.props.setPeriodFrom(undefined)
    //   this.props.setPeriodTo(undefined)
    // }
    // console.log('PeriodFrom')
    // console.log(this.state.periodFrom)
    // const screenList = ['financialAnalysis', 'locationAnalysis']
    // if(screenList.includes(this.props.screen)){
    //   if(this.props.locationData!==undefined || this.props.locationData !==null){
    //     this.props.locationData.forEach((element)=>{
    //       if(element.ddl_value.split("|")[3].split("=")[1]==='true'){
    //         this.setState({defaultSwitcher:true})
    //         return false
    //       }
    //     }  
    //   )
    // } 
    // }
    // console.log(this.props.defaultDateValue)
   };


  checkSwticherCondition = (props) =>{
    console.log('dateRagne',props)
    return (props.periodSwitcher || props.defaultSwitcher) && props.companySwitcherActive
  }

  handleClose = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  predefinedBottomRanges = [
    {
      label: 'Last 30 days',
      value: [subDays(new Date(), 29), new Date()],
    },

    {
      label: 'Last month',
      value: [
        startOfMonth(addMonths(new Date(), -1)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
    },

    {
      label: 'All time',
      value: [subDays(new Date(), 365), new Date()],
    },
  ];

  render() {
    return (
      <>
        <Modal
          open={this.state.openModal}
          onClose={this.handleClose}
          backdrop={false}
        >
          <Modal.Body>
            <Flex direction={'row'}>
              <Panel bordered header="From">
                <SelectPicker
                  placeholder="Period"
                  id="periodFrom"
                  style={{ width: 224 }}
                  onChange={value => {
                    this.setState({ periodFrom: value });
                  }}
                  data={this.props.periodData}
                  value={this.state.periodFrom}
                  onClean={() => {
                    this.setState({ periodFrom: '' });
                  }}
                  onSelect={value => this.setState({ periodFrom: value })}
                />
              </Panel>
              <Panel bordered header="To">
                <SelectPicker
                  placeholder="Period"
                  id="periodTo"
                  style={{ width: 224 }}
                  onChange={value => {
                    this.setState({ periodTo: value });
                  }}
                  data={this.props.periodData}
                  value={this.state.periodTo}
                  onClean={() => {
                    this.setState({ periodTo: '' });
                  }}
                  onSelect={value => this.setState({ periodTo: value })}
                />
              </Panel>
            </Flex>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.handleClose();
                this.props.setPeriodFrom(this.state.periodFrom);
                this.props.setPeriodTo(this.state.periodTo);
               setTimeout(()=>this.props.dateValue(),120) 
              }}
              appearance="primary"
            >
              Ok
            </Button>
            <Button onClick={this.handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        { this.checkSwticherCondition(this.props) ? (
          <Flex
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
            <Toggle
              checkedChildren="Period"
              unCheckedChildren="Period"
              onChange={value => {
                this.props.setPeriodSelect(value);
                // if (value === false) {
                 setTimeout(()=>this.props.dateValue(),20) 
                // } else {
                  //setTimeout(()=>this.props.dateValue(),20) 
                // }
              }}
              defaultChecked={this.props.periodSelect}
              disabled={this.props.dataLoading}
            />

            {this.props.periodSelect ? (
              <>
                <Button
                  size="sm"
                  onClick={()=>{
                    this.handleClose()
                    this.setState({periodFrom:this.props.periodFrom, periodTo:this.props.periodTo})
                  }}
                  style={{ width: '200px', marginBlockEnd: 0 }}
                  loading={this.props.dataLoading}
                >
                  {this.periodLabel()}
                </Button>
              </>
            ) : (
              <DateRangePicker
                loading={this.props.dataLoading}
                appearance="default"
                cleanable={false}
                placeholder="Date Range"
                placement={'auto'}
                menuAutoWidth={window.screen.width > 500 ? false : true}
                style={{ width: '100%', minWidth: '200px' }}
                block
                size="sm"
                showOneCalendar
                format={this.props.dateFormat}
                ranges={this.predefinedBottomRanges}
                // onOk={value => {
                //     this.props.setDefaultDateValue(this.storeDateConverter(value));
                //    setTimeout(()=>this.props.dateValue(),20) 
                // }}
                onChange={value => {
                    this.props.setDefaultDateValue(this.storeDateConverter(value));
                   setTimeout(()=>this.props.dateValue(),20) 
                  console.log("Default Date Value " + this.props.defaultDateValue)             

                  
                }}
                value={this.props.defaultDateValue!==undefined?this.calenderPropsDateConverter(this.props.defaultDateValue)
                  :[subDays(new Date(), 365), new Date()]
                }
                editable={false}
                defaultValue={
                  this.props.defaultDateValue === undefined
                    ? [subDays(new Date(), 365), new Date()]
                    : this.calenderPropsDateConverter(this.props.defaultDateValue)
                }
              />
            )}
          </Flex> 
        ) : (
          <>
            <DateRangePicker
              loading={this.props.dataFetch || this.props.dataLoading}
              appearance="default"
              cleanable={false}
              placeholder="Date Range"
              placement={'auto'}
              menuAutoWidth={window.screen.width > 500 ? false : true}
              style={{ width: '100%', minWidth: '200px' }}
              block
              size="sm"
              showOneCalendar
              format={this.props.dateFormat}
              ranges={this.predefinedBottomRanges}
              // onOk={value => {
              //     // console.log(value)   
              //     this.props.setDefaultDateValue(this.storeDateConverter(value));
              //    setTimeout(()=>{this.props.dateValue()
                 
                
              //   }
              //    ,20)
              // }}
              onChange={value => {               
                  this.props.setDefaultDateValue(this.storeDateConverter(value));
                 setTimeout(()=>this.props.dateValue(),20) 
                 console.log("Default Date Value " + this.props.defaultDateValue)             

                
              }}
              value={this.props.defaultDateValue!==undefined?this.calenderPropsDateConverter(this.props.defaultDateValue)
                :[subDays(new Date(), 365), new Date()]
              }
              editable={false}
              defaultValue={
                this.props.defaultDateValue === undefined
                  ? [subDays(new Date(), 365), new Date()]
                  : this.calenderPropsDateConverter(this.props.defaultDateValue)
              }
            />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    dateFormat: state.dateFormat.value,
    periodFrom: state.dateFormat.periodFrom,
    periodTo: state.dateFormat.periodTo,
    periodSelect: state.dateFormat.periodSelect,
    periodData: state.dateFormat.periodData,
    periodSwitcher: state.dateFormat.periodSwitcher,
    dataLoading: state.dataFetch.dataLoading,
    defaultDateValue: state.dateFormat.defaultDateValue,
    integration: state.locationSelectFormat.integration,
    companySwitcherActive: state.dateFormat.companySwitcherActive,
    screen: state.setScreen.screen,
    locationData: state.locationSelectFormat.locationData
  };
};

const mapDispatchToProps = {
  setPeriodFrom,
  setPeriodTo,
  setPeriodSelect,
  setPeriodData,
  setPeriodSwitcher,
  setDefaultDateValue,
  setCompanySwitcherActive,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDateRangePicker);
