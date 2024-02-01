import { addMonths, endOfMonth, startOfMonth, subDays } from 'date-fns';
import React, { Component } from 'react'
import { DateRangePicker } from 'rsuite';

class CustomDateRangePicker extends Component {
    state = {}
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
                format='MM-dd-yyyy'
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
            /></>
        );
    }
}

export default CustomDateRangePicker;