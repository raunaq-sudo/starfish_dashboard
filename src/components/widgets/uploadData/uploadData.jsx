import React, { Component } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';
import { Table, Uploader } from 'rsuite';
import apiEndpoint from '../../config/data';
import fileDownload from 'js-file-download';

class UploadPage extends Component {
  state = {
    uploadModal: false,
    tableDat: [],
    tableLoading: false,
    excelUploadData: [],
    int_id: '',
    cardBodyOverflow: 'auto', // State to manage overflow
  };

  fetchData = async () => {
    this.setState({ tableLoading: true });
    await fetch(apiEndpoint + '/api/fetch_excel_data/', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ tableDat: data }, this.checkCardBodyOverflow);
      })
      .catch(err => {
        console.error(err);
        alert('Error Occured.');
      });
    this.setState({ tableLoading: false });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  checkCardBodyOverflow = () => {
    const cardBodyElement = document.getElementById('cardBody');
    const contentElement = document.getElementById('content');
    if (contentElement?.scrollHeight > cardBodyElement.clientHeight) {
      this.setState({ cardBodyOverflow: 'scroll' });
    } else {
      this.setState({ cardBodyOverflow: 'auto' });
    }
  };

  objToJson = (key, value) => {
    var res = {};
    res[key] = value;
    console.log(res);
    return res;
  };

  handleDownloads = async id => {
    await fetch(apiEndpoint + '/api/xls_filedownload/', {
      headers: { Authorization: 'Bearer ' + localStorage['access'] },
      method: 'POST',
      body: { id: id },
    })
      .then(res => {
        fileDownload(res.data, 'filename.xls');
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <>
        <Card width={'100%'} height={'88vh'}>
          <CardHeader>
            <Flex gap={2} alignItems={'center'}>
              <Icon as={FaCog} />
              <Text fontSize={'sm'}>Settings</Text>
            </Flex>
          </CardHeader>
          <CardBody id="cardBody" overflowY={this.state.cardBodyOverflow}>
            <Flex direction={'column'} gap={4}>
              <Accordion allowToggle>
                {this.state.tableDat.length ? (
                  this.state.tableDat.map(item => (
                    <AccordionItem key={item.id}>
                      <h3>
                        <AccordionButton
                          onClick={() => {
                            this.setState({ int_id: item.id });
                          }}
                        >
                          <Box flex={1} textAlign={'left'} fontSize={'sm'}>
                            <Heading size={'sm'}>{item.name}</Heading>
                          </Box>
                          <Box flex={1} textAlign={'right'} fontSize={'sm'}>
                            <Heading size={'sm'}>{item.app_name}</Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h3>
                      <AccordionPanel flexDirection={'column'} gap={3}>
                        <Flex flex={1} gap={2}>
                          <Flex flex={1} justifyContent={'start'}>
                            <Heading size={'xs'} p={1}>
                              From Date:
                            </Heading>
                            <Text pt={1} size={'xs'}>
                              {item.from_date}
                            </Text>
                          </Flex>

                          <Flex flex={1} justifyContent={'start'}>
                            <Heading size={'xs'} p={1}>
                              To Date:
                            </Heading>
                            <Text pt={1} size={'xs'}>
                              {item.to_date}
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex flex={1} gap={2}>
                          <Flex flex={1} justifyContent={'start'} p={1}>
                            <Heading size={'xs'} p={1}>
                              Download Link:
                            </Heading>
                            <a
                              href={`${apiEndpoint}/api/xls_filedownload/${item.id}/`}
                              download
                            >
                              Link
                            </a>
                          </Flex>
                        </Flex>

                        <Flex width={'100%'} justifyContent={'center'}>
                          <Uploader
                            listType="picture-text"
                            action={`${apiEndpoint}/api/xls_fileupload_user/`}
                            draggable
                            autoUpload
                            headers={{
                              Authorization: 'Bearer ' + localStorage['access'],
                            }}
                            method="POST"
                            data={{ id: item.id, user_type: 'puser' }}
                            multiple={false}
                            accept=".xlsx"
                            disabledFileItem
                            disabled={this.state['fl' + item.id]}
                            onChange={filelist => {
                              if (filelist.length === 1) {
                                this.setState(
                                  this.objToJson('fl' + item.id, true)
                                );
                              }
                            }}
                          >
                            <div
                              style={{
                                width: 500,
                                height: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <span>
                                Click or Drag files to this area to upload
                              </span>
                            </div>
                          </Uploader>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  ))
                ) : (
                  <></>
                )}
              </Accordion>
            </Flex>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default UploadPage;
