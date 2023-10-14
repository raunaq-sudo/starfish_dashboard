import { FormControl } from '@chakra-ui/react';
//import { Select } from 'chakra-react-select';
import { TagPicker } from 'rsuite'
import React, { Component } from 'react';
//import { SelectPicker } from 'rsuite';

class LocationDropDown extends Component {
  state = {};
  render() {
    return (
      <FormControl>
        <TagPicker disabled

          data={[
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Delhi', value: 'Delhi' },
            { label: 'Agra', value: 'Agra' },
            { label: 'Hyderabad', value: 'Hyderabad' },
            { label: 'Kolkata', value: 'Kolkata' },
            { label: 'Chennai', value: 'Chennai' },
          ]}

          size='sm'
          placeholder="Location"
          style={{ width: '100%' }}


        />
      </FormControl>
    );
  }
}

export default LocationDropDown;
