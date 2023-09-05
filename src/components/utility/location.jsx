import { FormControl } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { Component } from 'react';

class LocationDropDown extends Component {
  state = {};
  render() {
    return (
      <FormControl>
        <Select
          options={[
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Delhi', value: 'Delhi' },
            { label: 'Agra', value: 'Agra' },
            { label: 'Hyderabad', value: 'Hyderabad' },
            { label: 'Kolkata', value: 'Kolkata' },
            { label: 'Chennai', value: 'Chennai' },
          ]}
          isMulti
          size={'sm'}
          placeholder="Location"
        />
      </FormControl>
    );
  }
}

export default LocationDropDown;
