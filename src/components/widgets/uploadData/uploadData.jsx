import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaCog, FaFile, FaUpload } from 'react-icons/fa';
import { Uploader } from 'rsuite';


class UploadPage extends Component {
    state = {};
    render() {
        return (
            <Card width={'100%'} height={window.innerHeight}>
                <CardHeader>
                    <Flex gap={2} alignItems={'center'}>
                        <Icon as={FaUpload} />
                        <Text fontSize={'sm'}>Upload Excel</Text>
                    </Flex>
                </CardHeader>
                <CardBody>
                    {/* Uploader */}
                    <Flex gap={2} alignItems={'center'} width={'100%'} mt={5}>
                        <Icon as={FaFile} />
                        <Heading fontSize={'md'} mb={1}>
                            File upload
                        </Heading>
                    </Flex>

                    <Uploader
                        listType="picture-text"
                        action="//jsonplaceholder.typicode.com/posts/"
                        draggable>
                        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Click or Drag files to this area to upload</span>
                        </div>

                    </Uploader>
                </CardBody>
            </Card>
        );
    }
}

export default UploadPage;
