import { Flex, FormControl, Select } from '@chakra-ui/react';
import React, { Component } from 'react';

class LocationDropDown extends Component {
  state = {};
  render() {
    return (
      <Flex justifyContent={'flex-end'}>
        <FormControl>
          <Select placeholder="Location" fontSize={'xs'}>
            <option>Noida</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Pune</option>
          </Select>
        </FormControl>
      </Flex>
    );
  }
}

export default LocationDropDown;
