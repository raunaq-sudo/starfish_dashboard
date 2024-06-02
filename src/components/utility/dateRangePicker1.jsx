import { addMonths, endOfMonth, startOfMonth, subDays } from 'date-fns';
import React, { Component } from 'react'
import { Button, DateRangePicker, Modal, Panel, SelectPicker, Toggle } from 'rsuite';
import {connect} from 'react-redux'
import { Flex } from '@chakra-ui/react';
import apiEndpoint from '../config/data';
import { setPeriodData, setPeriodFrom, setPeriodSelect, setPeriodTo } from '../../redux/slices/dateSlice';

class CustomDateRangePicker extends Component {

    state={
        period:false,
        periodFrom:"",
        periodTo:"",
        openModal:false

    }

    fetchPeriod = async () =>{
        await fetch(apiEndpoint + '/api/fetch_periods/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + localStorage['access'] },
          }).then(response => response.json())
            .then(data => {
              console.log(data)
              if (data.code === undefined) {
                var dataNew = data.period_data.map((item)=>{
                    return{
                      label:item.period_label,
                      value:item.period_label,
                    }
                })
                this.setState({periodData:dataNew})
                this.props.setPeriodData(dataNew)
                if(this.props.periodFrom===""){
                    this.setState({periodFrom:data.from_period, periodTo:data.to_period})
                    
                }else{
                    this.setState({periodFrom:this.props.periodFrom, periodTo:this.props.periodTo})
                }
                this.props.setPeriodFrom(this.state.periodFrom)
                this.props.setPeriodTo(this.state.periodTo)
              } else {
                window.open('/', "_self")
                alert('Session Expired!.')
              }
            }).catch(err => {
              console.log(err)
            })
          }
          

    componentDidMount = () =>{
        if(this.props.periodFrom===""){
            this.fetchPeriod()
        }
        
        
    }

    handleClose = () =>{
        this.setState({openModal:!this.state.openModal})
    }
    predefinedBottomRanges = [

        {
            label: 'Last 30 days',
            value: [subDays(new Date(), 29), new Date()]
        },

        {
            label: 'Last month',
            value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
        },

        {
            label: 'All time',
            value: [subDays(new Date(), 365), new Date()]
        }
    ];

    render() {
        return (<>
        <DateRangePicker
                appearance="default"
                cleanable={false}
                placeholder="Date Range"
                placement={'auto'}
                menuAutoWidth={window.screen.width > 500 ? false : true}
                style={{ width: '100%' }}
                block
                size="sm"
                showOneCalendar
                format={this.props.dateFormat}
                ranges={this.predefinedBottomRanges}
                onOk={(value) => {
                    if (value) {
                        this.props.dateValue(value)
                    }
                }}
                onChange={(value) => {
                    if (value) {
                        this.props.dateValue(value)

                    }
                }}
                value={this.props.value}
                editable={false}
                defaultValue={[subDays(new Date(), 365), new Date()]}
            />
          
            </>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return {
        dateFormat: state.dateFormat.value,
        periodFrom: state.dateFormat.periodFrom,
        periodTo: state.dateFormat.periodTo,
        periodSelect: state.dateFormat.periodSelect,
        periodData: state.dateFormat.periodData
    }
}

const mapDispatchToProps = { setPeriodFrom, setPeriodTo, setPeriodSelect, setPeriodData };

export default connect(mapStateToProps, mapDispatchToProps)(CustomDateRangePicker);