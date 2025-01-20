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
    Skeleton,
    SkeletonCircle,
    SkeletonText,
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
import { Toggle, Dropdown, Button } from "rsuite";
import ReactApexChart from "react-apexcharts";
import apiEndpoint from "../../config/data";
import { secondsToMinutes } from "date-fns";
import DrillableChart from '../dashboard/chartDrilling';

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
    const [classification, setClassification] = useState({ value: "Expense", label: "Budget (Expense)" });
    const [dataFetch, setDataFetch] = useState([]);
    const [integrationData, setIntegrationData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [yearOptions, setYearOptions] = useState([2023, 2024, 2025]);
    const [monthOptions, setMonthOptions] = useState([]);
    const [selectedIntegration, setSelectedIntegration] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [company_data, setCompanyData] = useState([])
    const [company_integration, setCompanyIntegration] = useState([])
    const [integration_location, setIntegrationLocation] = useState([])
    const [years, setYears] = useState([])
    const [periodType, setPeriodType] = useState("Month")
    const [pieChartOptionsRevenueSeries, setPieChartOptionsRevenueSeries] = useState([0, 0])
    const [pieChartOptionsExpenseSeries, setPieChartOptionsExpenseSeries] = useState([0, 0])
    const [midSectionData, setMidSectionData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [integrationOptions, setIntegrationOptions] = useState([]); // Dynamically populated
    const months = [
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
    ]

    const fetchData = async () => {
        setLoading(true);
        const body = new FormData();
        body.append("type", classification.value);
        body.append("integration_id", selectedIntegration.value)
        body.append("year", selectedYear.value)
        body.append("month", selectedMonth.value)
        body.append("location_id", selectedLocation.value)

        try {
            const response = await fetch(apiEndpoint + "/api/fetch_budget/", {
                headers: { Authorization: "Bearer " + localStorage["access"] },
                method: "POST",
                body: body,
            });

            const data = await response.json();
            console.log(data, "datttaaaa");

            setDataFetch(data);
            setMidSectionData(data?.mid_section || []);
            setPieChartOptionsRevenueSeries([data.revenue_summary.achieved, data.revenue_summary.remaining < 0 ? 0 : data.revenue_summary.remaining])
            setPieChartOptionsExpenseSeries([data.expense_summary.achieved, data.expense_summary.remaining < 0 ? 0 : data.expense_summary.remaining])

            if (props.onDataFetched) {
                props.onDataFetched(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching budget settings:", error);
            // Set fallback values on error
            setPieChartOptionsRevenueSeries([0, 0]);
            setPieChartOptionsExpenseSeries([0, 0]);
        }
    };


    const populateDropdowns = async () => {
        try {
            const response = await fetch(apiEndpoint + '/api/fetch_budget/?' + new URLSearchParams({ initial_load: '1' }), {
                headers: { Authorization: 'Bearer ' + localStorage['access'] },
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
    
            const integrations = data['company_integration'].map((item) => ({
                value: item.integration_id,
                label: item.integration_name,
            }));
    
            setCompanyData(data['company']);
            setCompanyIntegration(data['company_integration']);
            setIntegrationLocation(data['integration_location']);
            setYears(data['years']);
            setIntegrationOptions(integrations);
    
            // Set default integration
            if (integrations.length > 0) {
                const defaultIntegration = integrations[0];
                setSelectedIntegration(defaultIntegration);
                populatePeriodsLocations(defaultIntegration);
            }
    
            // Set current year as default
            const currentYear = new Date().getFullYear();
            const currentYearOption = data['years']
                .map((year) => ({ value: year, label: year }))
                .find((year) => year.value === currentYear);
    
            if (currentYearOption) {
                setSelectedYear(currentYearOption);
            } else {
                console.warn("Current year not found in yearOptions.");
            }
        } catch (err) {
            console.error("Error populating dropdowns:", err);
        }
    };

    const generalFilter = (value, array, key) => {
        const ddFiltered = array.filter((item) => {
            return (
                (item[key] === value)
            );
        });

        return ddFiltered
    }

    const populatePeriodsLocations = (val) => {
        setLocationData([]);
        setSelectedLocation(null); // Reset the selected location
        setSelectedMonth(null); // Reset the selected month/period
        
        const filteredLocations = generalFilter(val.value, integration_location, "integration_id");
        const allLocationsOption = {
            value: "all",
            label: "All Locations",
        };
        
        // Add "All Locations" as the first option
        const updatedLocations = [allLocationsOption, ...filteredLocations];
        setLocationData(updatedLocations);
        
        const integration_sData = generalFilter(val.value, company_integration, "integration_id");
        console.log(integration_sData);
        
        const allMonthsOption = {
            value: "all",
            label: "All Months/Periods",
        };
        setMonthOptions([]);
        
        if (integration_sData[0]?.period_count === 0) {
            const monthsWithAll = [allMonthsOption, ...months.map((month) => ({ value: month, label: month }))];
            setMonthOptions(monthsWithAll);
            setPeriodType("Month");
        } else {
            setPeriodType("Period");
            const periods = Array.from({ length: integration_sData[0]?.period_count }, (_, index) => ({
                value: `P${index + 1}`,
                label: `P${index + 1}`,
            }));
            const periodsWithAll = [allMonthsOption, ...periods];
            setMonthOptions(periodsWithAll);
        }
        
        // Automatically set "All Locations" and "All Months/Periods" as the default selection
        setSelectedLocation(allLocationsOption);
        setSelectedMonth(allMonthsOption);
    };
    
    

    useEffect(() => {
        populateDropdowns();
        setPeriodType("Month");
    }, [])


    useEffect(() => {
        if (dataFetch.length > 0) {
            // setPieChartOptionsRevenueSeries([dataFetch.revenue_summary.achieved, dataFetch.revenue_summary.remaining < 0 ? 0 : dataFetch.revenue_summary.remaining])
            // console.log(pieChartOptionsRevenueSeries)
            // console.log(pieChartOptionsExpenseSeries)
        }

    }, [dataFetch])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Simulate data fetching
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (midSectionData?.length > 0) {
            // Format the mid_section data for the chart
            const chartDataTemp = {
                categories: midSectionData?.map(item => item.split), // Category names based on "split"
                series: [
                    {
                        name: 'Spent',
                        data: midSectionData?.map(item => item.spent), // Expense (spent)
                    },
                    {
                        name: 'Budget',
                        data: midSectionData?.map(item => item.budget), // Budget
                    }
                ]
            };

            setChartData(chartDataTemp);
        }
    }, [midSectionData]);

    const integration = company_integration.map((item) => ({
        value: item.integration_id,
        label: item.integration_name,
    }));

    useEffect(() => {
        if (integrationOptions.length > 0) {
            const defaultIntegration = integrationOptions[0];
            setSelectedIntegration(defaultIntegration);
            populatePeriodsLocations(defaultIntegration);
        }
    }, [integrationOptions]);

    const locationOptions = locationData?.map((item) => ({
        value: item.location_id,
        label: item.label || (item.location_name === "" ? item.integration_name : item.location_name),
    }));

    const yearOptionsFormatted = yearOptions.map((year) => ({ value: year, label: year }));
    const monthOptionsFormatted = monthOptions.map((month) => ({
        value: month.value || month, // Use `month.value` if it's an object, or `month` if it's a string
        label: month.label || month, // Use `month.label` if it's an object, or `month` if it's a string
    }));

    const pieChartOptionsRevenue = {
        series: Array.isArray(pieChartOptionsRevenueSeries) ? pieChartOptionsRevenueSeries : [0, 0],
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
        series: Array.isArray(pieChartOptionsExpenseSeries) ? pieChartOptionsExpenseSeries : [0, 0],
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

    // useEffect(()=>{

    // }, [dataFetch])

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
                            {integrationDataFetcdataFetch?.map((item) => (
                                <Dropdown.Item
                                    key={item.integration_id}
                                    onClick={() => setSelectedIntegration(item.integration_name)}
                                >
                                    {item.integration_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>

                        <Dropdown title={selectedLocation || "Select Location"}>
                            {locationDataFetcdataFetch?.map((item) => (
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
                            value={classification}
                            onChange={setClassification}
                            styles={customStyles}
                            placeholder="Select Classification"
                        />
                        <Select
                            options={integration}
                            value={selectedIntegration}
                            onChange={(val) => {
                                setSelectedIntegration(val)
                                populatePeriodsLocations(val)
                            }}
                            styles={customStyles}
                            placeholder="Select Integration"
                        />
                        <Select
                            options={locationOptions}
                            value={selectedLocation}
                            onChange={(val) => setSelectedLocation(val)}
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
                            placeholder={"Select " + periodType}
                        />
                        <Button onClick={fetchData}>View</Button>
                    </Flex>
                </Flex>
            </CardHeader>
            <Divider mt={0} />
            <CardBody>

                <Flex gap={6} flexWrap="wrap" justifyContent="space-between" p={4}>
                    {/* Revenue Box */}
                    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" textAlign="center" flex="1" minWidth="320px">
                        <Flex alignItems={"center"} flex={1} mb={4}>
                            {loading ? (
                                <SkeletonText noOfLines={1} width="40%" />
                            ) : (
                                <Text fontSize={"lg"} fontWeight="bold">
                                    Revenue
                                </Text>
                            )}
                        </Flex>
                        <Flex justifyContent={"center"} mb={6}>
                            {loading ? (
                                <SkeletonCircle size="120px" />
                            ) : (
                                pieChartOptionsRevenue.series && (
                                    <ReactApexChart
                                        options={pieChartOptionsRevenue}
                                        series={Array.isArray(pieChartOptionsRevenue.series) ? pieChartOptionsRevenue.series : [0, 0]}
                                        type="pie"
                                    />
                                )
                            )}
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
                            {loading ? (
                                <>
                                    <Skeleton height="20px" width="100px" />
                                    <Skeleton height="20px" width="100px" />
                                </>
                            ) : (
                                <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
                                    <Text fontSize="sm" color="gray.600">
                                        Achieved: {dataFetch?.currency}{dataFetch?.revenue_summary?.achieved || 0}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mt={0}>
                                        Target: {dataFetch?.currency}{dataFetch?.revenue_summary?.total || 0}
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Box>

                    {/* Expenses Box */}
                    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" textAlign="center" flex="1" minWidth="320px">
                        <Flex alignItems={"center"} flex={1} mb={4}>
                            {loading ? (
                                <SkeletonText noOfLines={1} width="40%" />
                            ) : (
                                <Text fontSize={"lg"} fontWeight="bold">
                                    Expenses
                                </Text>
                            )}
                        </Flex>
                        <Flex justifyContent={"center"} mb={6}>
                            {loading ? (
                                <SkeletonCircle size="120px" />
                            ) : (
                                pieChartOptionsExpenses.series && (
                                    <ReactApexChart
                                        options={pieChartOptionsExpenses}
                                        series={Array.isArray(pieChartOptionsExpenses.series) ? pieChartOptionsExpenses.series : [0, 0]}
                                        type="pie"
                                    />
                                )
                            )}
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
                            {loading ? (
                                <>
                                    <Skeleton height="20px" width="100px" />
                                    <Skeleton height="20px" width="100px" />
                                </>
                            ) : (
                                <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
                                    <Text fontSize="sm" color="gray.600">
                                        Spent: {dataFetch?.currency}{dataFetch?.expense_summary?.achieved || 0}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mt={0}>
                                        Budget: {dataFetch?.currency}{dataFetch?.expense_summary?.total || 0}
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </Flex>


                {midSectionData?.length > 0 && <Box bg="white" p={6} borderRadius="lg" boxShadow="md" textAlign="center" flex="1" minWidth="320px">
                    <DrillableChart
                        type="bar"
                        series={chartData?.series}
                        categories={chartData?.categories}
                        dataLoaded={true}
                    />
                </Box>
                }
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
                                {dataFetch?.table_section?.map((item) => {
                                    return (<Tr>
                                        <Td>{item.category}</Td>
                                        <Td>{dataFetch?.currency}{item.spent}</Td>
                                        <Td>{dataFetch?.currency}{item.budget}</Td>
                                        <Td>
                                            <ProgressBar percentage={100 * item.spent / item.budget} color="green" />
                                        </Td>
                                    </Tr>)
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </CardBody>
        </Card>
    );
};

export default BudgetDashboard;
