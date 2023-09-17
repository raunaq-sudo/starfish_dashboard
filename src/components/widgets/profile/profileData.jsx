import { Box, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormLabel, Heading, Icon, Input, Spacer, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { Component } from 'react'
import { FaAddressCard, FaBell, FaBriefcase, FaEdit, FaRegUser } from 'react-icons/fa';
import { Button, Checkbox, Divider, IconButton } from 'rsuite';
import BtnNavigate from '../../utility/templates/navigateBtn';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Card width={'100%'} height={window.innerHeight}>
                <CardHeader>
                    <Flex gap={2} alignItems={'center'}>
                        <Icon as={FaRegUser} />
                        <Text fontSize={'sm'}>Profile</Text>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Box gap={3}>

                        <Flex direction={'column'} width={'100%'} >
                            <Flex direction={'column'} flex={2} height={'100%'} gap={2}>
                                {/*Contact Information */}
                                <Flex gap={'10'} justifyContent={'space-between'} direction={window.screen.width > 500 ? 'row' : 'column'} width={'100%'}>
                                    <Spacer flex={1} />
                                </Flex>

                                <Flex gap={10} direction={window.screen.width > 500 ? 'row' : 'column'}>

                                    {/* first column */}

                                    <Flex direction={'column'} flex={1} gap={2}>
                                        <FormControl  >
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                Name
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'} type="text">

                                                </Input><IconButton size='sm' icon={<FaEdit />}></IconButton>
                                            </Flex>
                                        </FormControl>
                                        <FormControl >
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                Phone
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'} type="number" name="phone" />
                                                <IconButton size='sm' icon={<FaEdit />}></IconButton></Flex>
                                        </FormControl>
                                        <FormControl >
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                Address Line 1
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'}
                                                    type="text" />
                                                <IconButton size='sm' icon={<FaEdit />}></IconButton>
                                            </Flex>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                Address Line 2
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'}
                                                    type="text" />
                                                <IconButton size='sm' icon={<FaEdit />}></IconButton>
                                            </Flex>
                                        </FormControl>



                                    </Flex>

                                    {/* second column */}
                                    <Flex direction={'column'} flex={1} gap={2}>
                                        <FormControl >
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                Mobile Number
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'} type="number" />
                                                <IconButton size='sm' icon={<FaEdit />}></IconButton></Flex>
                                        </FormControl>
                                        <FormControl >
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                Email
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'} type="email" name="email" />
                                                <IconButton size='sm' icon={<FaEdit />}></IconButton></Flex>
                                        </FormControl>
                                        <FormControl >
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                City
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'} type="text" />
                                                <IconButton size='sm' icon={<FaEdit />}></IconButton></Flex>

                                        </FormControl>
                                        <FormControl >
                                            <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                                Zip Code
                                            </FormLabel><Flex>
                                                <Input disabled bgColor={'gray.200'} size={'sm'} type="number" />
                                                <IconButton size='sm' icon={<FaEdit />}></IconButton></Flex>
                                        </FormControl>

                                    </Flex>
                                </Flex>
                                <Flex gap={'2'}>

                                </Flex>
                                {/*password */}
                                <Flex gap={'10'} direction={window.screen.width > 500 ? 'row' : 'column'}>
                                    <FormControl >
                                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                            Password
                                        </FormLabel><Flex>
                                            <Input disabled bgColor={'gray.200'} size={'sm'} type="password" />
                                            <IconButton size='sm' icon={<FaEdit />}></IconButton></Flex>



                                    </FormControl>
                                    <FormControl >
                                        <FormLabel fontSize={'12'} fontWeight={'bold'}>
                                            Re-Enter Password
                                        </FormLabel><Flex>
                                            <Input disabled bgColor={'gray.200'} size={'sm'} type="password" />
                                            <IconButton size='sm' icon={<FaEdit />}></IconButton></Flex>


                                    </FormControl>
                                </Flex>



                            </Flex>


                        </Flex>
                    </Box>
                </CardBody>
                <CardFooter width={'100%'} justifyContent={'end'}>
                    <BtnNavigate
                        width={'30%'}
                        bgColor={'#faac35'}
                        borderBottomRadius={'5'}
                        borderTopRadius={'5'}
                        textColor={'white'}
                        mb={2}
                        onClick={() => { this.props.onClick('Dashboard') }}
                        gap={5}
                    >
                        <Text>Save</Text>

                    </BtnNavigate>
                </CardFooter>
            </Card>
        );
    }
}

export default Profile;