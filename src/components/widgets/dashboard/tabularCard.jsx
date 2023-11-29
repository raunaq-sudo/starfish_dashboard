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
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

class TabularCard extends Component {
  state = {};
  render() {
    return (
      <>
        <Card width={'100%'} gap={0}>
          <CardHeader textAlign={'center'} bgColor={this.props.bgColor}>
            <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
              <Icon as={this.props.headerIcon} />
              <Text fontSize={'md'}>{this.props.header}</Text>
            </Flex>
          </CardHeader>
          <Divider mt={0} />
          <CardBody>
            <TableContainer maxWidth={'100%'}>
              <Table fontSize={'sm'} size={'sm'}>
                <Thead>
                  <Tr>
                    <Th>Header</Th>
                    <Th>% / $ Change</Th>
                  </Tr>
                </Thead>
                <Tbody>

                  {this.props.data ? this.props.data.map((dat) => {
                    return (<><Tr>
                      <Td maxWidth={200} ><Text isTruncated>{dat.name}</Text></Td>
                      <Td>
                        {' '}
                        {dat.per_change}% <Icon as={this.props.icon} /> $ {dat.change!==undefined?dat.change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):""}
                      </Td>
                    </Tr></>)
                  }) : <></>}

                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default TabularCard;
