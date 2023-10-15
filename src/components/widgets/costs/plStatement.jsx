import React, { Component } from 'react';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  CardHeader,
  Text,

  Thead,
  Tr,
  Th,
  Icon,
  Tbody,
  Td,
  TableContainer,
  Divider,
} from '@chakra-ui/react';
import {
  FaArrowDown,
  FaArrowUp,
  FaCashRegister,
  FaDollarSign,
  FaDownload,
  FaList,
  FaPercentage,
} from 'react-icons/fa';

import "rsuite/dist/rsuite.css"
import { Table } from 'rsuite';
import "../costs/pltable.css"


class PLCard extends Component {

  state = {


    columnsTest: [{
      'key': 'desc',
      'value': 'Description'
    },
    {
      'key': 'tx_date',
      'value': 'Date'
    },
    {
      'key': 'txn_type',
      'value': 'Transaction Type'
    },
    {
      'key': 'doc_num',
      'value': 'Num'
    },
    { 'key': 'name', 'value': 'Name' },
    { 'key': 'memo', 'value': 'Memo/Description' },
    { 'key': 'split_acc', 'value': 'Split' },
    { 'key': 'subt_nat_amount', 'value': 'Amount' },
    { 'key': 'rbal_nat_amount', 'value': 'Balance' }],
    isTree: true,

    pltable: [],
    pltableMini: [],
    columnsMini: [],
    test: [





      {
        "label": "Uber Eats Fee",
        "value": 11949.33
      },
      {
        "label": "Preventative Maintenance",
        "value": 1111.2
      },
      {
        "label": "Office Supplies",
        "value": 199.98
      },
      {
        "label": "Credit Card Commissions & Fees",
        "value": 222.6
      },
      {
        "label": "Utilities - Hydro",
        "value": 594.44
      },
      {
        "label": "Waste Removal (Independent)",
        "value": 257.2
      },
      {
        "label": "Rent Basic",
        "value": 3300
      },
      {
        "label": "Business Insurance",
        "value": 691.58
      },
      {
        "label": "Travel Expense - Hotel",
        "value": 18.33
      }
    ],
    testTable: [
      {
        "id": "1",
        "label": "Total GROSS SALES",
        "value": 112233.371671519,
        "children": [
          {
            "id": "1-1",
            "label": "Purchased Food",
            "value": 28472.,
            "children": [
              {
                "id": "1-1-1",
                "label": "Purchased Food",
                "value": 28472.,
              },
              {
                "id": "1-1-2",
                "label": "Store Transfers",
                "value": 564.,
              },
            ]
          },
          {
            "id": "1-2",
            "label": "Store Transfers",
            "value": 564.,
          },
        ]
      },

      {
        "id": "2",
        "label": "Total Purchased Food",
        "value": 29036.58,
      },
      {
        "id": "3",
        "label": "Total Paper Takeout Packaing",
        "value": 3794.4,
      },
      {
        "id": "4",
        "label": "Total COST OF GOODS SOLD",
        "value": 32831.0,
      },
      {
        "id": "5",
        "label": "Gross Profit",
        "value": 79402.33167151,
      },
      {
        "id": "6",
        "label": "Total VARIABLE LABOUR",
        "value": 32954.77,
        "children": [
          {
            "id": "6-1",
            "label": "Supervisors",
            "value": 32954.,
          },
        ]
      },
      {
        "id": "7",
        "label": "BENEFITS & PAYROLL BURDEN",
        "value": 13,
        "children": [{
          "id": "7-1",
          "label": "Payroll Processing Fees",
          "value": 135.,
        },]
      },

    ],
    pltable3: [
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Income",
        "account_key": "",
        "selfId": "1-1",
        "index_ui": "1-1",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Design income",
            "account_key": "82",
            "selfId": "1-1-1",
            "index_ui": "1-1-1",
            "children": [
              {
                "tx_date": "2023-08-09",
                "txn_type": "Invoice",
                "doc_num": "1007",
                "name": "John Melton",
                "memo": "Custom Design",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "750.00",
                "rbal_nat_amount": "750.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-1-1"
              },
              {
                "tx_date": "2023-08-09",
                "txn_type": "Sales Receipt",
                "doc_num": "1008",
                "name": "Kate Whelan",
                "memo": "Custom Design",
                "split_acc": "Checking",
                "subt_nat_amount": "225.00",
                "rbal_nat_amount": "975.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-1-2"
              },
              {
                "tx_date": "2023-08-29",
                "txn_type": "Sales Receipt",
                "doc_num": "1003",
                "name": "Dylan Sollfrank",
                "memo": "Custom Design",
                "split_acc": "Checking",
                "subt_nat_amount": "337.50",
                "rbal_nat_amount": "1312.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-1-3"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1015",
                "name": "Paulsen Medical Supplies",
                "memo": "Custom Design",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "300.00",
                "rbal_nat_amount": "1612.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-1-4"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1010",
                "name": "Weiskopf Consulting",
                "memo": "Custom Design",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "375.00",
                "rbal_nat_amount": "1987.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-1-5"
              },
              {
                "tx_date": "2023-09-02",
                "txn_type": "Invoice",
                "doc_num": "1033",
                "name": "Geeta Kalapatapu",
                "memo": "Custom Design",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "262.50",
                "rbal_nat_amount": "2250.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-1-6"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "2250.00",
                "rbal_nat_amount": "",
                "desc": "Total for Design income",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-1-7"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Discounts given",
            "account_key": "86",
            "selfId": "1-1-2",
            "index_ui": "1-1-2",
            "children": [
              {
                "tx_date": "2023-08-20",
                "txn_type": "Invoice",
                "doc_num": "1012",
                "name": "Shara Barnett:Barnett Design",
                "memo": "Discount",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "-30.50",
                "rbal_nat_amount": "-30.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-2-1"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1015",
                "name": "Paulsen Medical Supplies",
                "memo": "Discount",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "-50.25",
                "rbal_nat_amount": "-80.75",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-2-2"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Sales Receipt",
                "doc_num": "1011",
                "name": "Pye's Cakes",
                "memo": "Discount",
                "split_acc": "Undeposited Funds",
                "subt_nat_amount": "-8.75",
                "rbal_nat_amount": "-89.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-2-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "-89.50",
                "rbal_nat_amount": "",
                "desc": "Total for Discounts given",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-2-4"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Landscaping Services",
            "account_key": "45",
            "selfId": "1-1-3",
            "index_ui": "1-1-3",
            "children": [
              {
                "tx_date": "2023-05-19",
                "txn_type": "Invoice",
                "doc_num": "1002",
                "name": "Bill's Windsurf Shop",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "140.00",
                "rbal_nat_amount": "140.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-1"
              },
              {
                "tx_date": "2023-08-18",
                "txn_type": "Invoice",
                "doc_num": "1017",
                "name": "Sushi by Katsuyuki",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "80.00",
                "rbal_nat_amount": "835.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-10"
              },
              {
                "tx_date": "2023-08-22",
                "txn_type": "Invoice",
                "doc_num": "1013",
                "name": "Travis Waldron",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "910.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-11"
              },
              {
                "tx_date": "2023-08-25",
                "txn_type": "Invoice",
                "doc_num": "1005",
                "name": "Freeman Sporting Goods:55 Twin Lane",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "50.00",
                "rbal_nat_amount": "960.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-12"
              },
              {
                "tx_date": "2023-08-25",
                "txn_type": "Invoice",
                "doc_num": "1018",
                "name": "Sushi by Katsuyuki",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "80.00",
                "rbal_nat_amount": "1040.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-13"
              },
              {
                "tx_date": "2023-08-30",
                "txn_type": "Sales Receipt",
                "doc_num": "1014",
                "name": "Diego Rodriguez",
                "memo": "Weekly Gardening Service",
                "split_acc": "Undeposited Funds",
                "subt_nat_amount": "140.00",
                "rbal_nat_amount": "1180.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-14"
              },
              {
                "tx_date": "2023-08-31",
                "txn_type": "Invoice",
                "doc_num": "1001",
                "name": "Amy's Bird Sanctuary",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "100.00",
                "rbal_nat_amount": "1280.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-15"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1019",
                "name": "Sushi by Katsuyuki",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "80.00",
                "rbal_nat_amount": "1360.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-16"
              },
              {
                "tx_date": "2023-09-02",
                "txn_type": "Invoice",
                "doc_num": "1034",
                "name": "Rondonuwu Fruit and Vegi",
                "memo": "Tree and Shrub Trimming",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "30.00",
                "rbal_nat_amount": "1390.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-17"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1036",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "87.50",
                "rbal_nat_amount": "1477.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-18"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "1477.50",
                "rbal_nat_amount": "",
                "desc": "Total for Landscaping Services",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-19"
              },
              {
                "tx_date": "2023-05-19",
                "txn_type": "Invoice",
                "doc_num": "1030",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "50.00",
                "rbal_nat_amount": "190.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-2"
              },
              {
                "tx_date": "2023-06-19",
                "txn_type": "Invoice",
                "doc_num": "1031",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "90.00",
                "rbal_nat_amount": "280.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-3"
              },
              {
                "tx_date": "2023-07-16",
                "txn_type": "Invoice",
                "doc_num": "1016",
                "name": "Kookies by Kathy",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "355.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-4"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1027",
                "name": "Bill's Windsurf Shop",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "50.00",
                "rbal_nat_amount": "405.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-5"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1025",
                "name": "Amy's Bird Sanctuary",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "120.00",
                "rbal_nat_amount": "525.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-6"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1028",
                "name": "Freeman Sporting Goods:55 Twin Lane",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "600.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-7"
              },
              {
                "tx_date": "2023-07-26",
                "txn_type": "Invoice",
                "doc_num": "1006",
                "name": "Freeman Sporting Goods:55 Twin Lane",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "80.00",
                "rbal_nat_amount": "680.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-8"
              },
              {
                "tx_date": "2023-08-12",
                "txn_type": "Invoice",
                "doc_num": "1022",
                "name": "Jeff's Jalopies",
                "memo": "Weekly Gardening Service",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "755.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-1-3-9"
              }
            ]
          }
        ]
      },
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Job Materials",
        "account_key": "",
        "selfId": "1-2",
        "index_ui": "1-2",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Fountains and Garden Lighting",
            "account_key": "48",
            "selfId": "1-2-1",
            "index_ui": "1-2-1",
            "children": [
              {
                "tx_date": "2023-06-19",
                "txn_type": "Invoice",
                "doc_num": "1031",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "275.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-1"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1015",
                "name": "Paulsen Medical Supplies",
                "memo": "Garden Rocks",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "180.00",
                "rbal_nat_amount": "1834.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-10"
              },
              {
                "tx_date": "2023-09-02",
                "txn_type": "Invoice",
                "doc_num": "1033",
                "name": "Geeta Kalapatapu",
                "memo": "Fountain Pump",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "45.00",
                "rbal_nat_amount": "1879.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-11"
              },
              {
                "tx_date": "2023-09-02",
                "txn_type": "Invoice",
                "doc_num": "1033",
                "name": "Geeta Kalapatapu",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "2154.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-12"
              },
              {
                "tx_date": "2023-09-02",
                "txn_type": "Invoice",
                "doc_num": "1034",
                "name": "Rondonuwu Fruit and Vegi",
                "memo": "Garden Lighting",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "45.00",
                "rbal_nat_amount": "2199.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-13"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1037",
                "name": "Sonnenschein Family Store",
                "memo": "Concrete for fountain installation",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "47.50",
                "rbal_nat_amount": "2246.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-14"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "2246.50",
                "rbal_nat_amount": "",
                "desc": "Total for Fountains and Garden Lighting",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-15"
              },
              {
                "tx_date": "2023-06-26",
                "txn_type": "Invoice",
                "doc_num": "1024",
                "name": "Red Rock Diner",
                "memo": "Garden Rocks",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "48.00",
                "rbal_nat_amount": "323.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-2"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1029",
                "name": "Dukes Basketball Camp",
                "memo": "Garden Rocks",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "72.00",
                "rbal_nat_amount": "395.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-3"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1029",
                "name": "Dukes Basketball Camp",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "670.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-4"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1029",
                "name": "Dukes Basketball Camp",
                "memo": "Concrete for fountain installation",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "745.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-5"
              },
              {
                "tx_date": "2023-08-12",
                "txn_type": "Invoice",
                "doc_num": "1021",
                "name": "Amy's Bird Sanctuary",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "1020.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-6"
              },
              {
                "tx_date": "2023-08-20",
                "txn_type": "Invoice",
                "doc_num": "1012",
                "name": "Shara Barnett:Barnett Design",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "1295.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-7"
              },
              {
                "tx_date": "2023-08-31",
                "txn_type": "Invoice",
                "doc_num": "1032",
                "name": "Travis Waldron",
                "memo": "Garden Rocks",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "84.00",
                "rbal_nat_amount": "1379.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-8"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1015",
                "name": "Paulsen Medical Supplies",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "1654.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-2-1-9"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Plants and Soil",
            "account_key": "49",
            "selfId": "1-2-2",
            "index_ui": "1-2-2"
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Sprinklers and Drip Systems",
            "account_key": "50",
            "selfId": "1-2-3",
            "index_ui": "1-2-3"
          }
        ]
      },
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Labor",
        "account_key": "",
        "selfId": "1-3",
        "index_ui": "1-3",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Installation",
            "account_key": "52",
            "selfId": "1-3-1",
            "index_ui": "1-3-1",
            "children": [
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1015",
                "name": "Paulsen Medical Supplies",
                "memo": "Installation of landscape design",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "250.00",
                "rbal_nat_amount": "250.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-1-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "250.00",
                "rbal_nat_amount": "",
                "desc": "Total for Installation",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-1-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Maintenance and Repair",
            "account_key": "53",
            "selfId": "1-3-2",
            "index_ui": "1-3-2"
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Pest Control Services",
            "account_key": "54",
            "selfId": "1-3-3",
            "index_ui": "1-3-3",
            "children": [
              {
                "tx_date": "2023-05-19",
                "txn_type": "Invoice",
                "doc_num": "1002",
                "name": "Bill's Windsurf Shop",
                "memo": "Pest Control Services",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "35.00",
                "rbal_nat_amount": "35.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-1"
              },
              {
                "tx_date": "2023-05-19",
                "txn_type": "Invoice",
                "doc_num": "1030",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Pest Control Services",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "35.00",
                "rbal_nat_amount": "70.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-2"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1027",
                "name": "Bill's Windsurf Shop",
                "memo": "Pest Control Services",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "35.00",
                "rbal_nat_amount": "105.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-3"
              },
              {
                "tx_date": "2023-07-17",
                "txn_type": "Invoice",
                "doc_num": "1025",
                "name": "Amy's Bird Sanctuary",
                "memo": "Pest Control Services",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "35.00",
                "rbal_nat_amount": "140.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-4"
              },
              {
                "tx_date": "2023-08-17",
                "txn_type": "Credit Memo",
                "doc_num": "1026",
                "name": "Amy's Bird Sanctuary",
                "memo": "Pest Control Services",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "-100.00",
                "rbal_nat_amount": "40.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-5"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Invoice",
                "doc_num": "1023",
                "name": "Red Rock Diner",
                "memo": "Pest Control Services",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "70.00",
                "rbal_nat_amount": "110.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-6"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Refund",
                "doc_num": "1020",
                "name": "Pye's Cakes",
                "memo": "Refund - Pest control was ineffective",
                "split_acc": "Checking",
                "subt_nat_amount": "-87.50",
                "rbal_nat_amount": "22.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-7"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Sales Receipt",
                "doc_num": "1011",
                "name": "Pye's Cakes",
                "memo": "Pest Control Services",
                "split_acc": "Undeposited Funds",
                "subt_nat_amount": "87.50",
                "rbal_nat_amount": "110.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-8"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "110.00",
                "rbal_nat_amount": "",
                "desc": "Total for Pest Control Services",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-3-9"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Sales of Product Income",
            "account_key": "79",
            "selfId": "1-3-4",
            "index_ui": "1-3-4",
            "children": [
              {
                "tx_date": "2023-08-22",
                "txn_type": "Invoice",
                "doc_num": "1004",
                "name": "Cool Cars",
                "memo": "Sprinkler Heads",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "20.00",
                "rbal_nat_amount": "20.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-1"
              },
              {
                "tx_date": "2023-08-22",
                "txn_type": "Invoice",
                "doc_num": "1004",
                "name": "Cool Cars",
                "memo": "Sprinkler Pipes",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "24.00",
                "rbal_nat_amount": "44.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-2"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1037",
                "name": "Sonnenschein Family Store",
                "memo": "Fountain Pump",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "12.75",
                "rbal_nat_amount": "56.75",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-3"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1035",
                "name": "Mark Cho",
                "memo": "Sprinkler Pipes",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "16.00",
                "rbal_nat_amount": "72.75",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-4"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1035",
                "name": "Mark Cho",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "347.75",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-5"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1036",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Fountain Pump",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "15.00",
                "rbal_nat_amount": "362.75",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-6"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1037",
                "name": "Sonnenschein Family Store",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "637.75",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-7"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1036",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "275.00",
                "rbal_nat_amount": "912.75",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-8"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "912.75",
                "rbal_nat_amount": "",
                "desc": "Total for Sales of Product Income",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-4-9"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Services",
            "account_key": "1",
            "selfId": "1-3-5",
            "index_ui": "1-3-5",
            "children": [
              {
                "tx_date": "2023-08-22",
                "txn_type": "Invoice",
                "doc_num": "1004",
                "name": "Cool Cars",
                "memo": "Installation Hours",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "400.00",
                "rbal_nat_amount": "400.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-5-1"
              },
              {
                "tx_date": "2023-08-31",
                "txn_type": "Invoice",
                "doc_num": "1009",
                "name": "Travis Waldron",
                "memo": "Lumber",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "103.55",
                "rbal_nat_amount": "503.55",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-5-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "503.55",
                "rbal_nat_amount": "",
                "desc": "Total for Services",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-5-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "10200.77",
                "rbal_nat_amount": "",
                "desc": "Total for Income",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-3-5-4"
              }
            ]
          }
        ]
      },
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Cost of Goods Sold",
        "account_key": "",
        "selfId": "1-4",
        "index_ui": "1-4",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Cost of Goods Sold",
            "account_key": "80",
            "selfId": "1-4-1",
            "index_ui": "1-4-1",
            "children": [
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1035",
                "name": "Mark Cho",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "125.00",
                "rbal_nat_amount": "125.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-1"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1035",
                "name": "Mark Cho",
                "memo": "Sprinkler Pipes",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "10.00",
                "rbal_nat_amount": "135.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-2"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1037",
                "name": "Sonnenschein Family Store",
                "memo": "Fountain Pump",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "10.00",
                "rbal_nat_amount": "145.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-3"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1036",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Fountain Pump",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "10.00",
                "rbal_nat_amount": "155.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-4"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1037",
                "name": "Sonnenschein Family Store",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "125.00",
                "rbal_nat_amount": "280.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-5"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1036",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Rock Fountain",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "125.00",
                "rbal_nat_amount": "405.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-6"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "405.00",
                "rbal_nat_amount": "",
                "desc": "Total for Cost of Goods Sold",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-7"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "405.00",
                "rbal_nat_amount": "",
                "desc": "Total for Cost of Goods Sold",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-4-1-8"
              }
            ]
          }
        ]
      },
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Expenses",
        "account_key": "",
        "selfId": "1-5",
        "index_ui": "1-5",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Advertising",
            "account_key": "7",
            "selfId": "1-5-1",
            "index_ui": "1-5-1",
            "children": [
              {
                "tx_date": "2023-09-01",
                "txn_type": "Expense",
                "doc_num": "",
                "name": "Lee Advertising",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "74.86",
                "rbal_nat_amount": "74.86",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-1-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "74.86",
                "rbal_nat_amount": "",
                "desc": "Total for Advertising",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-1-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Automobile",
            "account_key": "55",
            "selfId": "1-5-2",
            "index_ui": "1-5-2",
            "children": [
              {
                "tx_date": "2023-08-25",
                "txn_type": "Cash Expense",
                "doc_num": "",
                "name": "Squeaky Kleen Car Wash",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "19.99",
                "rbal_nat_amount": "19.99",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-2-1"
              },
              {
                "tx_date": "2023-09-01",
                "txn_type": "Check",
                "doc_num": "Debit",
                "name": "Squeaky Kleen Car Wash",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "19.99",
                "rbal_nat_amount": "39.98",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-2-2"
              },
              {
                "tx_date": "2023-09-08",
                "txn_type": "Credit Card Expense",
                "doc_num": "",
                "name": "Squeaky Kleen Car Wash",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "19.99",
                "rbal_nat_amount": "59.97",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-2-3"
              },
              {
                "tx_date": "2023-09-15",
                "txn_type": "Credit Card Expense",
                "doc_num": "",
                "name": "Squeaky Kleen Car Wash",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "19.99",
                "rbal_nat_amount": "79.96",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-2-4"
              },
              {
                "tx_date": "2023-09-28",
                "txn_type": "Credit Card Expense",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "34.00",
                "rbal_nat_amount": "113.96",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-2-5"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "113.96",
                "rbal_nat_amount": "",
                "desc": "Total for Automobile",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-2-6"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Fuel",
            "account_key": "56",
            "selfId": "1-5-3",
            "index_ui": "1-5-3",
            "children": [
              {
                "tx_date": "2023-07-15",
                "txn_type": "Check",
                "doc_num": "4",
                "name": "Chin's Gas and Oil",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "54.55",
                "rbal_nat_amount": "54.55",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-1"
              },
              {
                "tx_date": "2023-07-30",
                "txn_type": "Check",
                "doc_num": "5",
                "name": "Chin's Gas and Oil",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "62.01",
                "rbal_nat_amount": "116.56",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-2"
              },
              {
                "tx_date": "2023-08-19",
                "txn_type": "Expense",
                "doc_num": "1",
                "name": "Chin's Gas and Oil",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "65.00",
                "rbal_nat_amount": "181.56",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-3"
              },
              {
                "tx_date": "2023-08-26",
                "txn_type": "Cash Expense",
                "doc_num": "",
                "name": "Chin's Gas and Oil",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "52.14",
                "rbal_nat_amount": "233.70",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-4"
              },
              {
                "tx_date": "2023-09-02",
                "txn_type": "Cash Expense",
                "doc_num": "",
                "name": "Chin's Gas and Oil",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "63.15",
                "rbal_nat_amount": "296.85",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-5"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Expense",
                "doc_num": "1",
                "name": "Chin's Gas and Oil",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "52.56",
                "rbal_nat_amount": "349.41",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-6"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "349.41",
                "rbal_nat_amount": "",
                "desc": "Total for Fuel",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-7"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "463.37",
                "rbal_nat_amount": "",
                "desc": "Total for Automobile with sub-accounts",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-3-8"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Equipment Rental",
            "account_key": "29",
            "selfId": "1-5-4",
            "index_ui": "1-5-4",
            "children": [
              {
                "tx_date": "2023-09-01",
                "txn_type": "Expense",
                "doc_num": "1",
                "name": "Ellis Equipment Rental",
                "memo": "Equipment rental for 5 days",
                "split_acc": "Mastercard",
                "subt_nat_amount": "112.00",
                "rbal_nat_amount": "112.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-4-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "112.00",
                "rbal_nat_amount": "",
                "desc": "Total for Equipment Rental",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-4-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Insurance",
            "account_key": "11",
            "selfId": "1-5-5",
            "index_ui": "1-5-5",
            "children": [
              {
                "tx_date": "2023-08-27",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Brosnahan Insurance Agency",
                "memo": "",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "241.23",
                "rbal_nat_amount": "241.23",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-5-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "241.23",
                "rbal_nat_amount": "",
                "desc": "Total for Insurance",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-5-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Job Expenses",
            "account_key": "58",
            "selfId": "1-5-6",
            "index_ui": "1-5-6",
            "children": [
              {
                "tx_date": "2023-07-31",
                "txn_type": "Expense",
                "doc_num": "15",
                "name": "Tania's Nursery",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "108.09",
                "rbal_nat_amount": "108.09",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-6-1"
              },
              {
                "tx_date": "2023-09-02",
                "txn_type": "Expense",
                "doc_num": "108",
                "name": "Tania's Nursery",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "46.98",
                "rbal_nat_amount": "155.07",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-6-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "155.07",
                "rbal_nat_amount": "",
                "desc": "Total for Job Expenses",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-5-6-3"
              }
            ]
          }
        ]
      },
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Job Materials",
        "account_key": "",
        "selfId": "1-6",
        "index_ui": "1-6",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Decks and Patios",
            "account_key": "64",
            "selfId": "1-6-1",
            "index_ui": "1-6-1",
            "children": [
              {
                "tx_date": "2023-08-22",
                "txn_type": "Expense",
                "doc_num": "1",
                "name": "Hicks Hardware",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "88.09",
                "rbal_nat_amount": "88.09",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-1-1"
              },
              {
                "tx_date": "2023-08-31",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Norton Lumber and Building Materials",
                "memo": "Lumber",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "103.55",
                "rbal_nat_amount": "191.64",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-1-2"
              },
              {
                "tx_date": "2023-09-09",
                "txn_type": "Credit Card Expense",
                "doc_num": "",
                "name": "Hicks Hardware",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "42.40",
                "rbal_nat_amount": "234.04",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-1-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "234.04",
                "rbal_nat_amount": "",
                "desc": "Total for Decks and Patios",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-1-4"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Meals and Entertainment",
            "account_key": "13",
            "selfId": "1-6-10",
            "index_ui": "1-6-10",
            "children": [
              {
                "tx_date": "2023-08-25",
                "txn_type": "Cash Expense",
                "doc_num": "",
                "name": "Bob's Burger Joint",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "5.66",
                "rbal_nat_amount": "5.66",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-10-1"
              },
              {
                "tx_date": "2023-08-30",
                "txn_type": "Cash Expense",
                "doc_num": "",
                "name": "Bob's Burger Joint",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "3.86",
                "rbal_nat_amount": "9.52",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-10-2"
              },
              {
                "tx_date": "2023-09-08",
                "txn_type": "Credit Card Expense",
                "doc_num": "",
                "name": "Bob's Burger Joint",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "18.97",
                "rbal_nat_amount": "28.49",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-10-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "28.49",
                "rbal_nat_amount": "",
                "desc": "Total for Meals and Entertainment",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-10-4"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Office Expenses",
            "account_key": "15",
            "selfId": "1-6-11",
            "index_ui": "1-6-11",
            "children": [
              {
                "tx_date": "2023-08-28",
                "txn_type": "Check",
                "doc_num": "2",
                "name": "Mahoney Mugs",
                "memo": "Office Supplies",
                "split_acc": "Checking",
                "subt_nat_amount": "18.08",
                "rbal_nat_amount": "18.08",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-11-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "18.08",
                "rbal_nat_amount": "",
                "desc": "Total for Office Expenses",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-11-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Rent or Lease",
            "account_key": "17",
            "selfId": "1-6-12",
            "index_ui": "1-6-12",
            "children": [
              {
                "tx_date": "2023-08-18",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Hall Properties",
                "memo": "Building Lease",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "900.00",
                "rbal_nat_amount": "900.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-12-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "900.00",
                "rbal_nat_amount": "",
                "desc": "Total for Rent or Lease",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-12-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Plants and Soil",
            "account_key": "66",
            "selfId": "1-6-2",
            "index_ui": "1-6-2",
            "children": [
              {
                "tx_date": "2023-06-30",
                "txn_type": "Expense",
                "doc_num": "3",
                "name": "Tania's Nursery",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "158.08",
                "rbal_nat_amount": "158.08",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-1"
              },
              {
                "tx_date": "2023-07-24",
                "txn_type": "Expense",
                "doc_num": "9",
                "name": "Tania's Nursery",
                "memo": "Morning Glories and Sod",
                "split_acc": "Checking",
                "subt_nat_amount": "89.09",
                "rbal_nat_amount": "247.17",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-2"
              },
              {
                "tx_date": "2023-08-28",
                "txn_type": "Expense",
                "doc_num": "50",
                "name": "Tania's Nursery",
                "memo": "",
                "split_acc": "Mastercard",
                "subt_nat_amount": "82.45",
                "rbal_nat_amount": "329.62",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-3"
              },
              {
                "tx_date": "2023-09-06",
                "txn_type": "Cash Expense",
                "doc_num": "",
                "name": "Tania's Nursery",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "23.50",
                "rbal_nat_amount": "353.12",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-4"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "353.12",
                "rbal_nat_amount": "",
                "desc": "Total for Plants and Soil",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-5"
              },
              {
                "tx_date": "2023-08-31",
                "txn_type": "Invoice",
                "doc_num": "1032",
                "name": "Travis Waldron",
                "memo": "Sod",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "300.00",
                "rbal_nat_amount": "2251.97",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-6"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1036",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "2 cubic ft. bag",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "50.00",
                "rbal_nat_amount": "2301.97",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-7"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Invoice",
                "doc_num": "1036",
                "name": "Freeman Sporting Goods:0969 Ocean View Road",
                "memo": "Sod",
                "split_acc": "Accounts Receivable (A/R)",
                "subt_nat_amount": "50.00",
                "rbal_nat_amount": "2351.97",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-8"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "2351.97",
                "rbal_nat_amount": "",
                "desc": "Total for Plants and Soil",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-2-9"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Sprinklers and Drip Systems",
            "account_key": "67",
            "selfId": "1-6-3",
            "index_ui": "1-6-3",
            "children": [
              {
                "tx_date": "2023-08-28",
                "txn_type": "Expense",
                "doc_num": "13",
                "name": "Hicks Hardware",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "215.66",
                "rbal_nat_amount": "215.66",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-3-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "215.66",
                "rbal_nat_amount": "",
                "desc": "Total for Sprinklers and Drip Systems",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-3-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "802.82",
                "rbal_nat_amount": "",
                "desc": "Total for Job Materials",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-3-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "957.89",
                "rbal_nat_amount": "",
                "desc": "Total for Job Expenses with sub-accounts",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-3-4"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "4736.47",
                "rbal_nat_amount": "",
                "desc": "Total for Job Materials",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-3-5"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Legal & Professional Fees",
            "account_key": "12",
            "selfId": "1-6-4",
            "index_ui": "1-6-4",
            "children": [
              {
                "tx_date": "2023-09-03",
                "txn_type": "Expense",
                "doc_num": "76",
                "name": "Pam Seitz",
                "memo": "Counsel",
                "split_acc": "Checking",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "75.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-4-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "",
                "desc": "Total for Legal & Professional Fees",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-4-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Accounting",
            "account_key": "69",
            "selfId": "1-6-5",
            "index_ui": "1-6-5",
            "children": [
              {
                "tx_date": "2023-06-23",
                "txn_type": "Expense",
                "doc_num": "12",
                "name": "Robertson & Associates",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "250.00",
                "rbal_nat_amount": "250.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-5-1"
              },
              {
                "tx_date": "2023-08-20",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Books by Bessie",
                "memo": "",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "75.00",
                "rbal_nat_amount": "325.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-5-2"
              },
              {
                "tx_date": "2023-09-03",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Robertson & Associates",
                "memo": "",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "315.00",
                "rbal_nat_amount": "640.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-5-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "640.00",
                "rbal_nat_amount": "",
                "desc": "Total for Accounting",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-5-4"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Bookkeeper",
            "account_key": "70",
            "selfId": "1-6-6",
            "index_ui": "1-6-6",
            "children": [
              {
                "tx_date": "2023-07-24",
                "txn_type": "Check",
                "doc_num": "12",
                "name": "Books by Bessie",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "55.00",
                "rbal_nat_amount": "55.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-6-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "55.00",
                "rbal_nat_amount": "",
                "desc": "Total for Bookkeeper",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-6-2"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Lawyer",
            "account_key": "71",
            "selfId": "1-6-7",
            "index_ui": "1-6-7",
            "children": [
              {
                "tx_date": "2023-05-02",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Robertson & Associates",
                "memo": "",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "300.00",
                "rbal_nat_amount": "300.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-7-1"
              },
              {
                "tx_date": "2023-08-25",
                "txn_type": "Check",
                "doc_num": "",
                "name": "Tony Rondonuwu",
                "memo": "Consulting",
                "split_acc": "Checking",
                "subt_nat_amount": "100.00",
                "rbal_nat_amount": "400.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-7-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "400.00",
                "rbal_nat_amount": "",
                "desc": "Total for Lawyer",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-7-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "1170.00",
                "rbal_nat_amount": "",
                "desc": "Total for Legal & Professional Fees with sub-accounts",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-7-4"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Maintenance and Repair",
            "account_key": "72",
            "selfId": "1-6-8",
            "index_ui": "1-6-8",
            "children": [
              {
                "tx_date": "2023-08-26",
                "txn_type": "Check",
                "doc_num": "70",
                "name": "Chin's Gas and Oil",
                "memo": "",
                "split_acc": "Checking",
                "subt_nat_amount": "185.00",
                "rbal_nat_amount": "185.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-8-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "185.00",
                "rbal_nat_amount": "",
                "desc": "Total for Maintenance and Repair",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-8-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "300.00",
                "rbal_nat_amount": "",
                "desc": "Total for Labor",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-8-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "6513.97",
                "rbal_nat_amount": "",
                "desc": "Total for Landscaping Services with sub-accounts",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-8-4"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Equipment Repairs",
            "account_key": "75",
            "selfId": "1-6-9",
            "index_ui": "1-6-9",
            "children": [
              {
                "tx_date": "2023-09-01",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Diego's Road Warrior Bodyshop",
                "memo": "Repairs on the truck",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "755.00",
                "rbal_nat_amount": "755.00",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-9-1"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "755.00",
                "rbal_nat_amount": "",
                "desc": "Total for Equipment Repairs",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-9-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "940.00",
                "rbal_nat_amount": "",
                "desc": "Total for Maintenance and Repair with sub-accounts",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-6-9-3"
              }
            ]
          }
        ]
      },
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Utilities",
        "account_key": "",
        "selfId": "1-7",
        "index_ui": "1-7",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Gas and Electric",
            "account_key": "76",
            "selfId": "1-7-1",
            "index_ui": "1-7-1",
            "children": [
              {
                "tx_date": "2023-07-20",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "PG&E",
                "memo": "",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "86.44",
                "rbal_nat_amount": "86.44",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-1-1"
              },
              {
                "tx_date": "2023-08-18",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "PG&E",
                "memo": "",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "114.09",
                "rbal_nat_amount": "200.53",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-1-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "200.53",
                "rbal_nat_amount": "",
                "desc": "Total for Gas and Electric",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-1-3"
              }
            ]
          },
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Telephone",
            "account_key": "77",
            "selfId": "1-7-2",
            "index_ui": "1-7-2",
            "children": [
              {
                "tx_date": "2023-07-19",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Cal Telephone",
                "memo": "",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "56.50",
                "rbal_nat_amount": "56.50",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-2-1"
              },
              {
                "tx_date": "2023-08-18",
                "txn_type": "Bill",
                "doc_num": "",
                "name": "Cal Telephone",
                "memo": "Monthly Phone Bill",
                "split_acc": "Accounts Payable (A/P)",
                "subt_nat_amount": "74.36",
                "rbal_nat_amount": "130.86",
                "desc": "",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-2-2"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "130.86",
                "rbal_nat_amount": "",
                "desc": "Total for Telephone",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-2-3"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "331.39",
                "rbal_nat_amount": "",
                "desc": "Total for Utilities",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-2-4"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "5237.31",
                "rbal_nat_amount": "",
                "desc": "Total for Expenses",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-2-5"
              },
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "4558.46",
                "rbal_nat_amount": "",
                "desc": "Net Ordinary Income",
                "account_key": "",
                "selfId": "",
                "index_ui": "1-7-2-6"
              }
            ]
          }
        ]
      },
      {
        "tx_date": "",
        "txn_type": "",
        "doc_num": "",
        "name": "",
        "memo": "",
        "split_acc": "",
        "subt_nat_amount": "",
        "rbal_nat_amount": "",
        "desc": "Other Income/Expense",
        "account_key": "",
        "selfId": "1-8",
        "index_ui": "1-8",
        "children": [
          {
            "tx_date": "",
            "txn_type": "",
            "doc_num": "",
            "name": "",
            "memo": "",
            "split_acc": "",
            "subt_nat_amount": "",
            "rbal_nat_amount": "",
            "desc": "Other Expense",
            "account_key": "",
            "selfId": "1-8-1",
            "index_ui": "1-8-1",
            "children": [
              {
                "tx_date": "",
                "txn_type": "",
                "doc_num": "",
                "name": "",
                "memo": "",
                "split_acc": "",
                "subt_nat_amount": "",
                "rbal_nat_amount": "",
                "desc": "Miscellaneous",
                "account_key": "14",
                "selfId": "1-8-1-1",
                "index_ui": "1-8-1-1",
                "children": [
                  {
                    "tx_date": "2023-07-28",
                    "txn_type": "Bill",
                    "doc_num": "",
                    "name": "Hicks Hardware",
                    "memo": "",
                    "split_acc": "Accounts Payable (A/P)",
                    "subt_nat_amount": "250.00",
                    "rbal_nat_amount": "250.00",
                    "desc": "",
                    "account_key": "",
                    "selfId": "",
                    "index_ui": "1-8-1-1-1"
                  },
                  {
                    "tx_date": "2023-08-19",
                    "txn_type": "Bill",
                    "doc_num": "",
                    "name": "Tim Philip Masonry",
                    "memo": "",
                    "split_acc": "Accounts Payable (A/P)",
                    "subt_nat_amount": "666.00",
                    "rbal_nat_amount": "916.00",
                    "desc": "",
                    "account_key": "",
                    "selfId": "",
                    "index_ui": "1-8-1-1-2"
                  },
                  {
                    "tx_date": "2023-08-27",
                    "txn_type": "Bill",
                    "doc_num": "",
                    "name": "Brosnahan Insurance Agency",
                    "memo": "",
                    "split_acc": "Accounts Payable (A/P)",
                    "subt_nat_amount": "2000.00",
                    "rbal_nat_amount": "2916.00",
                    "desc": "",
                    "account_key": "",
                    "selfId": "",
                    "index_ui": "1-8-1-1-3"
                  },
                  {
                    "tx_date": "",
                    "txn_type": "",
                    "doc_num": "",
                    "name": "",
                    "memo": "",
                    "split_acc": "",
                    "subt_nat_amount": "2916.00",
                    "rbal_nat_amount": "",
                    "desc": "Total for Miscellaneous",
                    "account_key": "",
                    "selfId": "",
                    "index_ui": "1-8-1-1-4"
                  },
                  {
                    "tx_date": "",
                    "txn_type": "",
                    "doc_num": "",
                    "name": "",
                    "memo": "",
                    "split_acc": "",
                    "subt_nat_amount": "2916.00",
                    "rbal_nat_amount": "",
                    "desc": "Total for Other Expense",
                    "account_key": "",
                    "selfId": "",
                    "index_ui": "1-8-1-1-5"
                  },
                  {
                    "tx_date": "",
                    "txn_type": "",
                    "doc_num": "",
                    "name": "",
                    "memo": "",
                    "split_acc": "",
                    "subt_nat_amount": "-2916.00",
                    "rbal_nat_amount": "",
                    "desc": "Net Other Income",
                    "account_key": "",
                    "selfId": "",
                    "index_ui": "1-8-1-1-6"
                  },
                  {
                    "tx_date": "",
                    "txn_type": "",
                    "doc_num": "",
                    "name": "",
                    "memo": "",
                    "split_acc": "",
                    "subt_nat_amount": "1642.46",
                    "rbal_nat_amount": "",
                    "desc": "Net Income",
                    "account_key": "",
                    "selfId": "",
                    "index_ui": "1-8-1-1-7"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]








  };

  componentDidMount = () => {
    // const pltable = [];
    // this.state.pl.forEach(item => {
    //   pltable.push(
    //     <Tr>
    //       <Td>{item.category}</Td>
    //       <Td>{item.glCode}</Td>
    //       <Td>{item.amount}</Td>
    //       <Td
    //         textColor={item.amountPer > 0 ? 'green' : 'red'}
    //         fontWeight={'medium'}
    //       >
    //         {item.amountPer}
    //       </Td>
    //       <Td
    //         textColor={item.changeDollar > 0 ? 'green' : 'red'}
    //         fontWeight={'medium'}
    //       >
    //         {item.changeDollar}
    //       </Td>
    //       <Td
    //         textColor={parseInt(item.changePer) > 0 ? 'green' : 'red'}
    //         fontWeight={'medium'}
    //       >
    //         {item.changePer}
    //       </Td>
    //     </Tr>
    //   );
    // });
    //
    // this.setState({ pltable: pltable });
    var formData = new FormData();
    formData.append('screen', 1);
    formData.append('log',
      '');
    fetch('/api/pltable/', {
      method: 'POST',
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      body: formData
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ pltable: data['data'] })

        this.setState({ columns: data['columns'] })

      }).catch(err => console.error(err))



  };

  // Sort data functions
  getData = () => {

    if (this.state.sortColumn && this.state.sortType) {
      this.setState({
        testTable: this.state.testTable.sort((a, b) => {
          let x = a[this.state.sortColumn];
          let y = b[this.state.sortColumn];
          if (typeof x === 'string') {
            x = x.charCodeAt();

          }
          if (typeof y === 'string') {
            y = y.charCodeAt();
          }
          if (this.state.sortType === 'asc') {

            return x - y;
          } else {
            return y - x;
          }
        })
      })
    }

  };

  handleSortColumn = (sortColumn, sortType) => {
    this.setState({ loading: true, isTree: false })
    setTimeout(() => {
      this.setState({ loading: false, sortColumn: sortColumn, sortType: sortType, isTree: true }, () => {
        this.getData();
      });

    }, 500);

    console.log(this.state.testTable)
  };


  render() {
    const { Column, HeaderCell, Cell } = Table;
    return (
      <Card width={'100%'}>
        <CardHeader>
          <Flex>
            <Flex gap={2} flex={1} alignItems={'center'} width={'100%'}>
              <Icon as={FaList} />
              <Text fontSize={'md'}>P&L</Text>
            </Flex>
            <Flex flex={1} justifyContent={'flex-end'}>
              <Icon as={FaDownload} />
            </Flex>
          </Flex>
        </CardHeader>
        <Divider mt={0} />
        <CardBody overflowX={'scroll'} fontSize={'sm'} >
          <Table
            isTree={this.state.isTree}
            defaultExpandAllRows
            rowHeight={(rowData) => {
              return 20;
            }}
            rowKey=
            "index_ui"
            height={400}
            data={this.state.pltable}
            shouldUpdateScroll={false}
            //sortColumn={this.state.sortColumn}
            sortType={this.state.sortType}
            onSortColumn={this.handleSortColumn}
            loading={this.state.pltable.length > 0 ? false : true}
            className='custom-table'
            hover
            wordWrap={'break-word'}

          >
            {this.state.columnsTest ? this.state.columnsTest.map((value) => {
              return (
                <Column flexGrow={1} resizable className='custom-row'>
                  <HeaderCell className='custom-row'>{value.value}</HeaderCell>
                  <Cell dataKey={value.key}  >

                  </Cell>
                </Column>)
            }) : <></>}
            {/*<Column width={100} flexGrow={1} sortable>
              <HeaderCell>Period 1</HeaderCell>
              <Cell dataKey="value" />
    </Column>*/}
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default PLCard;
