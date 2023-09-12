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
            <TableContainer>
              <Table fontSize={'sm'}>
                <Thead>
                  <Tr>
                    <Th>Header</Th>
                    <Th>% / $ Change</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Sales from Distrubutors</Td>
                    <Td>
                      {' '}
                      +2% <Icon as={this.props.icon} /> $ 2000
                    </Td>
                  </Tr>
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
