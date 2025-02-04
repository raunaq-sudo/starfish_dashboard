import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Icon,
  Text,
  Button,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaSearchDollar, FaDownload } from 'react-icons/fa';
import ChartRenderCol from './chartRenderColumns';
import { downloadExcel } from 'react-export-table-to-excel';

class ColumnCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //  Function to handle Excel download with three columns
  handleDownloadExcel = () => {
    const headers = ['Category', 'Total', 'Target'];
    
    const body = this.props?.categories?.map((category, index) => [
      category,
      this.props?.series?.length > 0 ? this.props?.series[0].data[index] : 0, // Spending Value
      this.props?.series?.length > 1 ? this.props?.series[1].data[index] : 0, // Actual Value
    ]);

    downloadExcel({
      fileName: 'Spending_to_Budget', // Filename for the Excel file
      sheet: 'Spending Data', // Excel sheet name
      tablePayload: {
        header: headers,
        body: body,
      },
    });
  };

  render() {
    return (
      <Card width={'100%'} height={this.props?.categories?.length ? this.props?.categories.length * 30 + 200 : 200} minHeight={'400px'}>
        <CardHeader>
          {console.log(this.props,"this.prrrrooooooo")}
          <Flex gap={2} justifyContent={'space-between'} alignItems={'center'}>
            {/* Title */}
            <Flex gap={4} alignItems={'center'}>
              <Icon as={FaSearchDollar} />
              <Text fontSize={'md'}>Spending to Budget</Text>
            </Flex>

            {/*  Download Button */}
            <Button size="sm" leftIcon={<FaDownload />} colorScheme="blue" onClick={this.handleDownloadExcel}>
              Download
            </Button>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody justifyContent={'center'} width={'100%'} height={'100%'}>
          {this.props?.categories !== undefined ? (
            <ChartRenderCol clickThru={this.props?.clickThru} series={this.props?.series} categories={this.props?.categories} id="Budget" />
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default ColumnCharts;
