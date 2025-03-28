import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Text,
  Divider,
  Icon,
  Flex,
  Button,
  Link,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toggle } from 'rsuite';

class TabularCard extends Component {
  state = {
    showOnlyTen: true, // State to track whether to show only 10 rows or all
    sortByHeader: null, // Sorting state for the "Header" column (null = not sorted)
    sortByPercentage: null, // Sorting state for percentage column
    sortByChange: null, // Sorting state for dollar change column
    lastSorted: null, // Track which column was last sorted
  };

  // Function to toggle the rows (10 or all)
  handleToggle = () => {
    this.setState((prevState) => ({
      showOnlyTen: !prevState.showOnlyTen, // Toggle between showing 10 and all
    }));
  };

  // Function to toggle sort state (asc -> desc) and reset the other column's sort state
  toggleSort = (column) => {
    this.setState((prevState) => {
      // Determine the new sorting state (alternate between asc and desc)
      let newState;
      if (prevState[column] === 'desc') {
        newState = 'asc';
      } else {
        newState = 'desc';
      }

      // Reset the other column's sort state to null (unsorted)
      const otherColumns = ['sortByHeader', 'sortByPercentage', 'sortByChange'].filter(
        (col) => col !== column
      );

      let resetColumns = {};
      otherColumns.forEach((col) => {
        resetColumns[col] = null;
      });

      return {
        [column]: newState,
        ...resetColumns, // Reset other columns' sorting state
        lastSorted: column, // Track the last sorted column
      };
    });
  };

  // Function to sort data based on the column and sort state
  sortData = (data, column, sortState, isString = false) => {
    if (!sortState) return data; // If not sorted, return the data as is
    return data.slice().sort((a, b) => {
      if (isString) {
        if (sortState === 'asc') {
          return a[column].localeCompare(b[column]);
        } else {
          return b[column].localeCompare(a[column]);
        }
      } else {
        if (sortState === 'asc') {
          return a[column] - b[column];
        } else {
          return b[column] - a[column];
        }
      }
    });
  };

  render() {
    const { showOnlyTen, sortByHeader, sortByPercentage, sortByChange } = this.state;
    const { data, bgColor, headerIcon, header, chartCurrency, icon, clickThru } = this.props;

    // Sort the data based on the current sort state
    let displayedData = this.sortData(data, 'name', sortByHeader, true); // Sorting by header (string)
    displayedData = this.sortData(displayedData, 'per_change', sortByPercentage);
    displayedData = this.sortData(displayedData, 'change', sortByChange);

    // Display first 10 or all data
    displayedData = showOnlyTen ? displayedData.slice(0, 10) : displayedData;

    return (
      <>
        <Card width={'100%'} gap={0}>
          <CardHeader textAlign={'center'} bgColor={bgColor}>
            <Flex alignItems={'center'} justifyContent={'center'}>
             <Flex gap={2} alignItems={'center'} flex={3} justifyContent={'center'}>
              <Icon as={headerIcon} />
              <Text fontSize={'md'}>{header}</Text>
             </Flex>
              <Flex justifyContent={'center'} alignItems={'flex-end'} flex={{base:2,sm:1}}> 
                <Toggle
                  checked={showOnlyTen}
                  onChange={this.handleToggle}
                  checkedChildren="10 rows"
                  unCheckedChildren="All"
                />
              </Flex>
            </Flex>
          </CardHeader>
          <Divider mt={0} />
          <CardBody>
            <TableContainer maxWidth={'100%'}>
              <Table fontSize={'sm'} size={'sm'}>
                <Thead>
                  <Tr>
                    <Th
                      onClick={() => this.toggleSort('sortByHeader')}
                      style={{ cursor: 'pointer' }}
                      width="50%" // Static width for Header column
                    >
                      Header {sortByHeader === 'asc' ? '↑' : sortByHeader === 'desc' ? '↓' : ''}
                    </Th>
                    <Th
                      onClick={() => this.toggleSort('sortByPercentage')}
                      style={{ cursor: 'pointer' }}
                      width="25%" // Static width for % Change column
                    >
                      % Change {sortByPercentage === 'asc' ? '↑' : sortByPercentage === 'desc' ? '↓' : ''}
                    </Th>
                    <Th
                      onClick={() => this.toggleSort('sortByChange')}
                      style={{ cursor: 'pointer' }}
                      width="25%" // Static width for Change column
                    >
                      {chartCurrency} Change {sortByChange === 'asc' ? '↑' : sortByChange === 'desc' ? '↓' : ''}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayedData && displayedData?.length > 0 ? (
                    displayedData.map((dat, index) => (
                      <Tr key={index}>
                        <Td width="50%" maxWidth={200}>
                          <Button
                            variant="ghost"
                            justifyContent={'left'}
                            width={'100%'}
                            as={Link}
                            size={'xs'}
                            onClick={() => {
                              clickThru('cost', dat.name);
                            }}
                          >
                            <Text isTruncated>{dat.name}</Text>
                          </Button>
                        </Td>
                        <Td width="25%">
                          {dat.per_change}% <Icon as={icon} />
                        </Td>
                        <Td width="25%">
                          <Icon as={icon} /> {chartCurrency}{' '}
                          {dat.change !== undefined
                            ? dat.change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : ''}
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <></>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartCurrency: state.locationSelectFormat.currency,
  };
};

export default connect(mapStateToProps)(TabularCard);
