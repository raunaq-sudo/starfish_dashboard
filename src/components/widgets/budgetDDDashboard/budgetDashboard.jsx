import React, { useState, useEffect, useRef } from "react";
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
    Button,
    Link
} from "@chakra-ui/react";
import { FaUniversalAccess } from "react-icons/fa";
import Select from "react-select";
// import { Button } from "rsuite";
import ReactApexChart from "react-apexcharts";
import apiEndpoint from "../../config/data";
import DrillableChart from '../dashboard/chartDrilling';
import { downloadExcel } from 'react-export-table-to-excel';
import { FaDownload } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { setDefaultDateValue, setPeriodFrom, setPeriodTo } from "../../../redux/slices/dateSlice";
import { setLocation } from "../../../redux/slices/locationSlice";

const ProgressBar = ({ percentage, color }) => (
    <Progress value={percentage} colorScheme={color} size="sm" borderRadius="md" />
);

const customStyles = {
    control: (base, state) => ({
        ...base,
        borderRadius: "8px",
        padding: "4px",
        borderColor: state.isFocused ? "#3182CE" : "#CBD5E0",
        boxShadow: state.isFocused ? "0 0 0 1px #3182CE" : "none",
        "&:hover": {
            borderColor: "#3182CE",
        },
        width: "200px",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "8px",
        overflow: "hidden",
        width: "200px",
    }),
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isSelected
            ? "#c0cddf" // Apply background color only to explicitly selected options
            : isFocused
            ? "#E2E8F0" // Apply background color to focused options
            : "white", // Default background color
        color: isSelected ? "#1A202C" : "#4A5568", // Text color for selected and unselected options
        padding: "10px",
        cursor: "pointer",
        width: "200px",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#1A202C", // Text color for the selected value
    }),
};



const formatNumber = (num) => {
    return num?.toLocaleString();
};

const BudgetDashboard = (props) => {
    const [classification, setClassification] = useState({ value: "Expense", label: "Budget (Expense)" });
    const [dataFetch, setDataFetch] = useState([]);
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
    const [sortByCategory, setSortByCategory] = useState(null);
    const [sortBySpent, setSortBySpent] = useState(null);
    const [sortByBudget, setSortByBudget] = useState(null);
    const [initialFetchCompleted, setInitialFetchCompleted] = useState(false); // Track initial fetch
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

    const dispatch = useDispatch()

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

    const sortData = (data, column, sortState) => {
        if (!sortState) return data;
        return data.slice().sort((a, b) => {
            if (sortState === 'asc') {
                return a[column] < b[column] ? -1 : 1;
            } else {
                return a[column] > b[column] ? -1 : 1;
            }
        });
    };

    const toggleSort = (column) => {
        if (column === "category") {
            setSortByCategory(sortByCategory === "asc" ? "desc" : "asc");
            setSortBySpent(null);
            setSortByBudget(null);
        } else if (column === "spent") {
            setSortBySpent(sortBySpent === "asc" ? "desc" : "asc");
            setSortByCategory(null);
            setSortByBudget(null);
        } else if (column === "budget") {
            setSortByBudget(sortByBudget === "asc" ? "desc" : "asc");
            setSortByCategory(null);
            setSortBySpent(null);
        }
    };

    const sortedData = sortData(dataFetch?.table_section || [], "category", sortByCategory);
    const sortedBySpent = sortData(sortedData, "spent", sortBySpent);
    const sortedByBudget = sortData(sortedBySpent, "budget", sortByBudget);

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
    
    // const calculateBars = () => {
    //     if (ref?.current) {
    //         const containerWidth = ref.current.offsetWidth; // Get container width
    //         const barWidth = 80; // Fixed width of each bar
    //         const gap = 16; // Gap between bars
    //         const totalBarSpace = barWidth + gap; // Total space per bar
    //         const count = Math.floor(containerWidth / totalBarSpace); // Calculate bar count
    //         this.setState({ barCount: count });
    //     }
    // };

    const integration = company_integration.map((item) => ({
        value: item.integration_id,
        label: item.integration_name,
    }));

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

    useEffect(() => {
        if (integrationOptions.length > 0) {
            const defaultIntegration = integrationOptions[0];
            setSelectedIntegration(defaultIntegration);
            populatePeriodsLocations(defaultIntegration);
        }
    }, [integrationOptions]);

    // Automatically fetch data when both integration and year are selected
    useEffect(() => {
        if (selectedIntegration && selectedYear && !initialFetchCompleted) {
            fetchData(); // Call fetchData only for the first time
            setInitialFetchCompleted(true); // Mark the initial fetch as completed
        }
    }, [selectedIntegration, selectedYear, initialFetchCompleted]);
    
    const handleViewButtonClick = () => {
        fetchData(); // Explicitly call fetchData on button click
    };

    return (
        <Card width={"100%"}>
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
                            className="dropdown"
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
                            className="dropdown"
                            options={integration}
                            value={selectedIntegration}
                            onChange={(val) => {
                                setSelectedIntegration(val);
                                populatePeriodsLocations(val);
                            }}
                            styles={customStyles}
                            placeholder="Select Integration"
                        />
                        <Select
                            className="dropdown"
                            options={locationOptions}
                            value={selectedLocation}
                            onChange={(val) => setSelectedLocation(val)}
                            styles={customStyles}
                            placeholder="Select Location"
                        />
                        <Select
                            className="dropdown"
                            options={yearOptionsFormatted}
                            value={selectedYear}
                            onChange={setSelectedYear}
                            styles={customStyles}
                            placeholder="Select Year"
                        />
                        <Select
                            className="dropdown"
                            options={monthOptionsFormatted}
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            styles={customStyles}
                            placeholder={"Select " + periodType}
                        />
                        <Button onClick={handleViewButtonClick}>View</Button>
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
                                pieChartOptionsRevenue?.series && (
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
                                        Achieved: {dataFetch?.currency}{formatNumber(Math.round(dataFetch?.revenue_summary?.achieved)) || 0}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mt={0}>
                                        Target: {dataFetch?.currency}{formatNumber(Math.round(dataFetch?.revenue_summary?.total)) || 0}
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
                                pieChartOptionsExpenses?.series && (
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
                                        Spent: {dataFetch?.currency}{formatNumber(Math.round(dataFetch?.expense_summary?.achieved))|| 0}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mt={0}>
                                        Budget: {dataFetch?.currency}{formatNumber(Math.round(dataFetch?.expense_summary?.total)) || 0}
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </Flex>

                {/* {midSectionData?.length > 0 && <Box bg="white" p={6} borderRadius="lg" boxShadow="md" textAlign="center" flex="1" minWidth="320px">
                    <DrillableChart
                        type="bar"
                        series={chartData?.series}
                        categories={chartData?.categories}
                        dataLoaded={true}
                    />
                </Box>
                } */}
                {loading ? <div
                        //   ref={this.containerRef}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            height: '350px',
                            padding: '10px',
                            gap: '16px',
                            overflow: 'hidden',
                          }}
                        >
                          {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                              key={index}
                              height={`${Math.random() * 150 + 150}px`}
                              width="80px"
                            />
                          ))}
                        </div> : midSectionData?.length > 0 && <Box bg="white" p={6} borderRadius="lg" boxShadow="md" textAlign="center" flex="1" minWidth="320px">
                    <DrillableChart
                        type="bar"
                        series={chartData?.series}
                        categories={chartData?.categories}
                        dataLoaded={true}
                    />
                </Box>}
                <Box bg="white" p={5} borderRadius="md" boxShadow="md" mt={5}>
                <Flex justifyContent="space-between" alignItems="center" mb={5}>
                    <Text fontSize="lg" fontWeight="bold">
                        Spending to Budget
                    </Text>
                    <Button 
                        onClick={() => {
                            downloadExcel({
                                fileName: "Spending_to_Budget",
                                sheet: "Budget Summary",
                                tablePayload: {
                                    header: ["Category", "Spent", "Budget"],
                                    body: sortedByBudget?.map(item => [
                                        item.category, 
                                        formatNumber(Math.round(item?.spent)), 
                                        formatNumber(Math.round(item?.budget))
                                    ]),
                                },
                            });
                        }}
                    >
                        <Icon as={FaDownload} size='lg'/>
                    </Button>
                </Flex>
                    <Box overflowX="auto">
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th
                                        onClick={() => toggleSort("category")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Category {sortByCategory === 'asc' ? '↑' : sortByCategory === 'desc' ? '↓' : ''}
                                    </Th>
                                    <Th
                                        onClick={() => toggleSort("spent")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Spent {sortBySpent === 'asc' ? '↑' : sortBySpent === 'desc' ? '↓' : ''}
                                    </Th>
                                    <Th
                                        onClick={() => toggleSort("budget")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Budget {sortByBudget === 'asc' ? '↑' : sortByBudget === 'desc' ? '↓' : ''}
                                    </Th>
                                    <Th>Progress</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {sortedByBudget?.map((item) => {
                                    // Ensure spent is non-negative
                                    const spentValue = Math.max(0, item?.spent);

                                    return (
                                        <Tr key={item?.category}>
                                            {/* <Td>{item?.category}</Td> */}
                                            {
             
                                            <Button variant="ghost" justifyContent={'left'}  width={'100%'} as={Link} size={'xs'} onClick={()=>{
                                                props.clickThru('cost', item.category)
                                                dispatch(setDefaultDateValue([new Date(dataFetch.start_date[0], dataFetch.start_date[1] - 1, dataFetch.start_date[2]).toISOString(), new Date(dataFetch.end_date[0], dataFetch.end_date[1] - 1, dataFetch.end_date[2]).toISOString()]))
                                                dispatch(setPeriodFrom(dataFetch.period_from))
                                                dispatch(setPeriodTo(dataFetch.period_to))
                                                dispatch(setLocation(dataFetch.ui_label))
                                                props.handleDateChange()
                                                props.handleLocationChange(dataFetch.ui_label)
                                                }}>
                                            <Text isTruncated >{item.category}</Text></Button>

                                            }
                                            <Td>
                                                {dataFetch?.currency}
                                                {formatNumber(Math.round(item?.spent))}
                                            </Td>
                                            <Td>
                                                {dataFetch?.currency}
                                                {formatNumber(Math.round(item?.budget))}
                                            </Td>
                                            <Td>
                                                <ProgressBar
                                                    percentage={Math.min(100, (100 * spentValue) / item?.budget)} // Adjust percentage calculation
                                                    color="green"
                                                />
                                            </Td>
                                        </Tr>
                                    );
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
