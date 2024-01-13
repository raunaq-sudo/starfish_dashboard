import "rsuite/dist/rsuite.css";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import "rsuite/dist/rsuite.css";

import { Table, Tag, IconButton } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Badge, Select, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from "@chakra-ui/react";
//import { Select } from "chakra-react-select";


const { Column, HeaderCell, Cell } = Table;

const rowKey = 'id';


export default function TaskTable(props) {
    const [MisOpen, setMisOpen] = useState(false)
    const [ModalRowData, setModalRowData] = useState(false)

    const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, onClick, ...props }) => (
        <Cell {...props} style={{ padding: 5 }}>
            <IconButton
                appearance="subtle"
                onClick={() => {
                    onClick(rowData);
                }}
                icon={
                    expandedRowKeys.some(key => key === rowData[rowKey]) ? (
                        <CollaspedOutlineIcon />
                    ) : (
                        <ExpandOutlineIcon />
                    )
                }
            />
        </Cell>
    );

    const handleDel = (id) => {
        props.handleDel(id)
    }









    const renderRowExpanded = rowData => {
        return (
            <>
                <Flex direction={'column'} gap={2} height={300}>
                    <Flex justifyContent={'left'} p={2} gap={1} direction={'column'}>
                        <Heading size={'sm'}>Description</Heading>

                        <Text fontSize={'xs'}>{rowData.description}
                        </Text>
                    </Flex>
                    <Flex gap={3} justify={'end'} width='100%'>
                        <Button
                            bgColor={'#faac35'}
                            fontSize={'xs'}
                            gap={2}
                            size={'xs'}
                            onClick={() => {
                                if (rowData.status === 'Not yet Started') {
                                    setMisOpen(true)
                                    setModalRowData(rowData)
                                    console.log(rowData)
                                } else {
                                    alert('Task cant be Edited.')
                                }

                            }}
                        >
                            <Icon as={FaEdit} />
                            Edit Task
                        </Button>
                        <Button
                            bgColor={'#faac35'}
                            fontSize={'xs'}
                            gap={2}
                            onClick={() => {
                                if (rowData.status === 'Not yet Started') {
                                    handleDel(rowData.id)
                                } else {
                                    alert('Task cant be deleted.')
                                }

                            }}
                            size={'xs'}
                        >
                            <Icon as={FaTrash} />
                            Delete Task
                        </Button>
                    </Flex>
                </Flex>

            </>
        );
    };








    const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);
    console.log(props)
    const TagCell = ({ rowData, dataKey, ...props }) => {
        <Cell {...props} style={{ padding: '2' }}>
            <Tag color="green">{rowData[dataKey]}</Tag>
        </Cell>
    }

    const handleExpanded = (rowData, dataKey) => {
        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach(key => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });

        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }

        setExpandedRowKeys(nextExpandedRowKeys);
    };

    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const [loading, setLoading] = React.useState(props.loading);

    const getData = (value) => {
        if (sortColumn && sortType) {
            return value.data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        
        return value.data;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };



    if (props) {

        return (<>

            <Modal
                isOpen={MisOpen}
                onClose={() => {
                    setMisOpen(false)
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            width={'100%'}
                            direction={'column'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            gap={4}
                        >
                            <FormControl>
                                <FormLabel fontSize={'sm'}>Task name</FormLabel>
                                <Input placeholder="Task name" id="taskName1" required defaultValue={ModalRowData.header} />
                            </FormControl>
                            <Flex gap={2} width={'100%'}>
                                <FormControl flex={1}>
                                    <FormLabel fontSize={'sm'}>Assigned To</FormLabel>
                                    <Select width='100%' id='owner1' placeholder={ModalRowData.ownerName} onClickCapture={(val) => {console.log(val)}}>
                                        {props.users !== undefined ? props.users.map((item) => (
                                        <option value={item.value}>
                                            {item.label}
                                        </option>)) : <></>}
                                    </Select>
                                </FormControl>
                                <FormControl flex={1}>
                                    <FormLabel fontSize={'sm'} >Due Date</FormLabel>
                                    <Input
                                        placeholder="Due Date"
                                        type="date"
                                        id="dueOn1"
                                        required
                                        defaultValue={ModalRowData.dueDate}
                                    />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel fontSize={'sm'}>Description</FormLabel>
                                <Textarea
                                    placeholder="Desription"
                                    id="desc1"
                                    required

                                    defaultValue={ModalRowData.description}
                                ></Textarea>
                            </FormControl>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                            
                                console.log("rowData ")
                                console.log(ModalRowData)
                                setExpandedRowKeys([])
                                props.modify(ModalRowData)
                                setMisOpen(!MisOpen)
                                
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                setMisOpen(!MisOpen)

                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            < Table
                width={'100%'}
                height={400}
                data={getData(props)}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                renderRowExpanded={renderRowExpanded}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={props.loading}
                shouldUpdateScroll={false}
                bordered
                cellBordered
                affixHorizontalScrollbar
                virtualized
                autoHeight
            >
                <Column align="center" resizable fixed >
                    <HeaderCell>#</HeaderCell>
                    <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onClick={handleExpanded} />
                </Column>

                <Column maxWidth={230} resizable fixed >
                    <HeaderCell>Assigned to</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>


                <Column maxWidth={230} resizable flexGrow={1} >
                    <HeaderCell>Task</HeaderCell>
                    <Cell dataKey="header" />
                </Column>
                <Column maxWidth={100} resizable flexGrow={1}>
                    <HeaderCell>Due Date</HeaderCell>
                    <Cell dataKey="dueDate" />
                </Column>
                <Column maxWidth={'100%'} sortable resizable flexGrow={1} align="center">
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="status" >{rowData => <Tag color={rowData.status === "Completed" ? "green" : rowData.status === "Cancelled" ? "orange" : "red"}>{rowData.status}</Tag>}</Cell>
                </Column>

            </Table >
        </>
        );
    } else { <></> }

};
