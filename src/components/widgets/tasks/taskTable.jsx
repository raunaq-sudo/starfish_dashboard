import "rsuite/dist/rsuite.css";
import React from 'react';
import ReactDOM from 'react-dom';

import "rsuite/dist/rsuite.css";

import { Table, Tag, IconButton } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { FaTrash } from "react-icons/fa";
import { Badge, Button, Flex, Icon, Text } from "@chakra-ui/react";


const { Column, HeaderCell, Cell } = Table;
const data = [{
    id: 1,
    ownerName: "test",
    lastName: "testlm",
    dueDate: "04.04.2023",
    header: "Something to do",
    status: "Completed",
    description: "lorem ispsinasdah ajsdajkjdfja sdasskdjaskjnz"
}, {
    id: 2,
    ownerName: "test",
    lastName: "testlm",
    dueDate: "05.04.2023",
    status: "Pending"
}]
const rowKey = 'id';
console.log(data)
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props} style={{ padding: 5 }}>
        <IconButton
            appearance="subtle"
            onClick={() => {
                onChange(rowData);
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

const renderRowExpanded = rowData => {
    return (
        <div>
            <Flex direction={'column'} gap={2} >
                <Flex>
                    <Text fontSize={'xs'}>{rowData.description}
                    </Text>
                </Flex>
                <Flex>
                    <Button
                        bgColor={'#faac35'}
                        fontSize={'xs'}
                        gap={2}


                        size={'xs'}
                    >
                        <Icon as={FaTrash} />
                        Delete Task
                    </Button>
                </Flex>
            </Flex>

        </div>
    );
};




export default function TaskTable() {
    const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

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
    const [loading, setLoading] = React.useState(false);

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
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
        console.log(data)
        return data;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };




    return (


        < Table
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table content area height changes.
            height={400}
            data={getData()}
            rowKey={rowKey}
            expandedRowKeys={expandedRowKeys}
            onRowClick={data => {
                console.log(data);
            }
            }
            renderRowExpanded={renderRowExpanded}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
        >
            <Column width={70} align="center">
                <HeaderCell>#</HeaderCell>
                <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
            </Column>

            <Column width={230}>
                <HeaderCell>Owner Name</HeaderCell>
                <Cell dataKey="ownerName" />
            </Column>


            <Column width={230}>
                <HeaderCell>Task Header</HeaderCell>
                <Cell dataKey="header" />
            </Column>
            <Column width={230} sortable>
                <HeaderCell>Due Date</HeaderCell>
                <Cell dataKey="dueDate" />
            </Column>
            <Column width={'100%'} sortable>
                <HeaderCell>Status</HeaderCell>
                <Cell dataKey="status" >{rowData => <Tag color={rowData.status === "Completed" ? "green" : "red"}>{rowData.status}</Tag>}</Cell>
            </Column>

        </Table >
    );
};
