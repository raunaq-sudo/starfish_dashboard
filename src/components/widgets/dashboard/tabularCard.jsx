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
    showOnlyTen: false, // State to track whether to show only 10 rows or all
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      showOnlyTen: !prevState.showOnlyTen, // Toggle between showing 10 and all
    }));
  };

  render() {
    const { showOnlyTen } = this.state;
    const { data, bgColor, headerIcon, header, chartCurrency, icon, clickThru } = this.props;

    const displayedData = showOnlyTen ? data.slice(0, 10) : data; // Display first 10 or all data

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
                    <Th>Header</Th>
                    <Th>% / {chartCurrency} Change</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayedData ? (
                    displayedData.map((dat, index) => (
                      <Tr key={index}>
                        <Td maxWidth={200}>
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
                        <Td>
                          {dat.per_change}% <Icon as={icon} /> {chartCurrency}{' '}
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
