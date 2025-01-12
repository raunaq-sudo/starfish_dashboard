import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    Icon,
    Progress,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { FaUniversalAccess } from "react-icons/fa";
import Select from "react-select";
import { Toggle, Dropdown } from "rsuite";
import ReactApexChart from "react-apexcharts";
import apiEndpoint from "../../config/data";

const ProgressBar = ({ percentage, color }) => (
    <Progress value={percentage} colorScheme={color} size="sm" borderRadius="md" />
);

const customStyles = {
    control: (base) => ({
        ...base,
        borderRadius: "8px",
        padding: "4px",
        borderColor: "#CBD5E0",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#3182CE",
        },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "8px",
        overflow: "hidden",
    }),
    option: (base, { isFocused }) => ({
        ...base,
        backgroundColor: isFocused ? "#E2E8F0" : "white",
        color: isFocused ? "#1A202C" : "#4A5568",
        padding: "10px",
        cursor: "pointer",
    }),
};


const BudgetDashboard = (props) => {
    const [classification, setClassification] = useState("Expense");
    const [data, setData] = useState(null);
    const [integrationData, setIntegrationData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [yearOptions, setYearOptions] = useState([2023, 2024, 2025]);
    const [monthOptions, setMonthOptions] = useState([
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ]);
    const [selectedIntegration, setSelectedIntegration] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const fetchData = async () => {
        const body = new FormData();
        body.append("type", classification);

        try {
            const response = await fetch(apiEndpoint + "/api/fetch_budget_settings/", {
                headers: { Authorization: "Bearer " + localStorage["access"] },
                method: "POST",
                body: body,
            });

            const data = await response.json();
            console.log(data, "datttaaaa");
            setData(data);
            if (props.onDataFetched) {
                props.onDataFetched(data);
            }
        } catch (error) {
            console.error("Error fetching budget settings:", error);
        }
    };

    const fetchIntegrationLocationData = async () => {
        try {
            const response = await fetch(apiEndpoint + "/api/fetch_data_aisummary/", {
                headers: { Authorization: "Bearer " + localStorage["access"] },
                method: "GET",
            });

            const data = await response.json();
            console.log(data);
            setIntegrationData(data.company_integration);
            setLocationData(data.integration_location);
        } catch (error) {
            console.error("Error fetching integration and location data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchIntegrationLocationData();
    }, [classification]);

    const integrationOptions = integrationData.map((item) => ({
        value: item.integration_id,
        label: item.integration_name,
    }));

    const locationOptions = locationData.map((item) => ({
        value: item.location_id,
        label: item.location_name,
    }));

    const yearOptionsFormatted = yearOptions.map((year) => ({ value: year, label: year }));
    const monthOptionsFormatted = monthOptions.map((month) => ({ value: month, label: month }));

    const pieChartOptionsRevenue = {
        series: [75, 25],
        chart: {
            width: 150,
            type: "pie",
        },
        labels: ["Achieved", "Remaining"],
        legend: {
            show: true,
            position: "bottom",
            fontSize: "14px",
            markers: {
                width: 12,
                height: 12,
            },
        },
        colors: ["#38A169", "#E2E8F0"],
    };

    const pieChartOptionsExpenses = {
        series: [45, 55],
        chart: {
            width: 150,
            type: "pie",
        },
        labels: ["Spent", "Remaining"],
        legend: {
            show: true,
            position: "bottom",
            fontSize: "14px",
            markers: {
                width: 12,
                height: 12,
            },
        },
        colors: ["#E53E3E", "#E2E8F0"],
    };

    return (
        <Card width={"100%"}>
            {/* <CardHeader height={{ base: "auto", sm: "auto", md: "auto", lg: "auto" }} p={4}>
                <Flex
                    gap={{ base: 4, sm: 3, md: 2 }}
                    height="100%"
                    direction={{ base: "column", sm: "row" }}
                    flexWrap="wrap"
                    justifyContent="space-between"
                >

                    <Flex gap={2} alignItems="center" flex="1 1 auto">
                        <Icon as={FaUniversalAccess} />
                        <Text fontSize={{ base: "lg", sm: "md" }}>Period</Text>
                    </Flex>


                    <Flex
                        gap={2}
                        direction={{ base: "column", sm: "row" }}
                        justifyContent={{ base: "flex-start", sm: "center" }}
                        alignItems={{ base: "flex-start", sm: "center" }}
                        flex="2 1 auto"
                        flexWrap="wrap"
                    >
                        <Dropdown title={classification}>
                            <Dropdown.Item onClick={() => setClassification("Expense")}>Budget (Expense)</Dropdown.Item>
                            <Dropdown.Item onClick={() => setClassification("Revenue")}>Revenue</Dropdown.Item>
                        </Dropdown>

                        <Dropdown title={selectedIntegration || "Select Integration"}>
                            {integrationData.map((item) => (
                                <Dropdown.Item
                                    key={item.integration_id}
                                    onClick={() => setSelectedIntegration(item.integration_name)}
                                >
                                    {item.integration_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>

                        <Dropdown title={selectedLocation || "Select Location"}>
                            {locationData.map((item) => (
                                <Dropdown.Item
                                    key={item.location_id}
                                    onClick={() => setSelectedLocation(item.location_name)}
                                >
                                    {item.location_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>

                        <Dropdown title={selectedYear || "Select Year"}>
                            {yearOptions.map((year) => (
                                <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                                    {year}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>

                        <Dropdown title={selectedMonth || "Select Month"}>
                            {monthOptions.map((month) => (
                                <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>
                                    {month}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                    </Flex>
                </Flex>
            </CardHeader> */}

            <CardHeader height="auto" p={4}>
                <Flex gap={4} flexWrap="wrap" justifyContent="space-between" alignItems="center">
                    <Flex gap={2} alignItems="center">
                        <Icon as={FaUniversalAccess} />
                        <Text fontSize="lg" fontWeight="bold">
                            Period
                        </Text>
                    </Flex>

                    <Flex gap={4} flexWrap="wrap">
                        <Select
                            options={[
                                { value: "Expense", label: "Budget (Expense)" },
                                { value: "Revenue", label: "Revenue" },
                            ]}
                            value={{ value: classification, label: classification }}
                            onChange={(option) => setClassification(option.value)}
                            styles={customStyles}
                            placeholder="Select Classification"
                        />
                        <Select
                            options={integrationOptions}
                            value={selectedIntegration}
                            onChange={setSelectedIntegration}
                            styles={customStyles}
                            placeholder="Select Integration"
                        />
                        <Select
                            options={locationOptions}
                            value={selectedLocation}
                            onChange={setSelectedLocation}
                            styles={customStyles}
                            placeholder="Select Location"
                        />
                        <Select
                            options={yearOptionsFormatted}
                            value={selectedYear}
                            onChange={setSelectedYear}
                            styles={customStyles}
                            placeholder="Select Year"
                        />
                        <Select
                            options={monthOptionsFormatted}
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            styles={customStyles}
                            placeholder="Select Month"
                        />
                    </Flex>
                </Flex>
            </CardHeader>
            <Divider mt={0} />
            <CardBody>
                <Flex gap={5} flexWrap="wrap" justifyContent={{ base: "center", md: "space-between" }}>
                    <Box bg="white" p={5} borderRadius="md" boxShadow="md" textAlign="center" flex="1" minWidth="300px">
                        <Flex alignItems={"center"} flex={1}>
                            <Text fontSize={"md"} fontWeight="bold">
                                Revenue
                            </Text>
                        </Flex>
                        <Flex justifyContent={"center"}>
                            <ReactApexChart
                                options={pieChartOptionsRevenue}
                                series={pieChartOptionsRevenue.series}
                                type="pie"
                            />
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
                            <Text>Achieved: $75,000</Text>
                            <Text mt={0}>Target: $100,000</Text>
                        </Flex>
                    </Box>

                    <Box bg="white" p={5} borderRadius="md" boxShadow="md" textAlign="center" flex="1" minWidth="300px">
                        <Flex alignItems={"center"} flex={1}>
                            <Text fontSize={"md"} fontWeight="bold">
                                Expenses
                            </Text>
                        </Flex>
                        <Flex justifyContent={"center"}>
                            <ReactApexChart
                                options={pieChartOptionsExpenses}
                                series={pieChartOptionsExpenses.series}
                                type="pie"
                            />
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
                            <Text>Spent: $45,000</Text>
                            <Text mt={0}>Budget: $100,000</Text>
                        </Flex>
                    </Box>
                </Flex>

                <Box bg="white" p={5} borderRadius="md" boxShadow="md" mt={5}>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                        Spending to Budget
                    </Text>
                    <Box overflowX="auto">
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th>Category</Th>
                                    <Th>Spent</Th>
                                    <Th>Budget</Th>
                                    <Th>Progress</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Management Fees</Td>
                                    <Td>$7,500</Td>
                                    <Td>$10,000</Td>
                                    <Td>
                                        <ProgressBar percentage={75} color="green" />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>City Tax</Td>
                                    <Td>$2,000</Td>
                                    <Td>$5,000</Td>
                                    <Td>
                                        <ProgressBar percentage={40} color="red" />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Electric</Td>
                                    <Td>$3,000</Td>
                                    <Td>$6,000</Td>
                                    <Td>
                                        <ProgressBar percentage={50} color="blue" />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </CardBody>
        </Card>
    );
};

export default BudgetDashboard;
