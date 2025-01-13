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
import { Toggle, Dropdown, Button } from "rsuite";
import ReactApexChart from "react-apexcharts";
import apiEndpoint from "../../config/data";
import { secondsToMinutes } from "date-fns";

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
    const [pieChartOptionsRevenueSeries, setPieChartOptionsRevenueSeries] = useState([0,0])
    const [pieChartOptionsExpenseSeries, setPieChartOptionsExpenseSeries] = useState([0,0])
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
            setPieChartOptionsRevenueSeries([data.revenue_summary.achieved, data.revenue_summary.remaining < 0 ? 0 : data.revenue_summary.remaining])
            setPieChartOptionsExpenseSeries([data.expense_summary.achieved, data.expense_summary.remaining < 0 ? 0 : data.expense_summary.remaining])
            
            if (props.onDataFetched) {
                props.onDataFetched(data);
            }
        } catch (error) {
            console.error("Error fetching budget settings:", error);
        }
    };



    const popuplateDropdowns = async () =>{
        await fetch(apiEndpoint + '/api/fetch_budget/?' + new URLSearchParams({
            initial_load:'1'
          }), {
                headers: { Authorization: 'Bearer ' + localStorage['access'] },
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setCompanyData(data['company'])
                    setCompanyIntegration(data['company_integration'])
                    setIntegrationLocation(data['integration_location'])
                    setYears(data['years'])
                })
                .catch((err) => console.error(err));
    }

    const generalFilter = (value, array, key) =>{
        const ddFiltered = array.filter((item) => {
          return (
            (item[key] === value)
          );
        });

        return ddFiltered
      }
      
    const populatePeriodsLocations = (val) => {
        setLocationData([])
        setSelectedLocation([])
        setSelectedMonth([])
        setSelectedYear([])
        setLocationData(generalFilter(val['value'], integration_location, 'integration_id'))
        const integration_sData = generalFilter(val['value'], company_integration, 'integration_id')
        console.log(integration_sData)
        setMonthOptions([])
        if (integration_sData[0]['period_count']===0){
            setMonthOptions(months)
            setPeriodType("Month")
        }else{
            setPeriodType("Period")
            var periods = []
            for (let index = 0; index < integration_sData[0]['period_count']; index++) {
                var coll = "P" + (index + 1)
                periods.push(coll)
            }
            setMonthOptions(periods)
        }
    }

    useEffect(()=>{
        popuplateDropdowns()
        setPeriodType("Month")
    }, [])


    useEffect(()=>{
        if (dataFetch.length>0){
            // setPieChartOptionsRevenueSeries([dataFetch.revenue_summary.achieved, dataFetch.revenue_summary.remaining < 0 ? 0 : dataFetch.revenue_summary.remaining])
            // console.log(pieChartOptionsRevenueSeries)
            // console.log(pieChartOptionsExpenseSeries)
        }
        
    }, [dataFetch])
    const integrationOptions = company_integration.map((item) => ({
        value: item.integration_id,
        label: item.integration_name,
    }));

    const locationOptions = locationData?.map((item) => ({
            value: item.location_id,
            label: item.location_name===""?item.integration_name:item.location_name,
    }));

    const yearOptionsFormatted = yearOptions.map((year) => ({ value: year, label: year }));
    const monthOptionsFormatted = monthOptions.map((month) => ({ value: month, label: month }));

    const pieChartOptionsRevenue = {
        series: pieChartOptionsRevenueSeries,
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
        series: pieChartOptionsExpenseSeries,
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
                            options={integrationOptions}
                            value={selectedIntegration}
                            onChange={(val)=>{
                                setSelectedIntegration(val)
                                populatePeriodsLocations(val)
                            }}
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
                            placeholder={"Select " + periodType}
                        />
                        <Button onClick={fetchData}>View</Button>
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
                            <Text>Achieved: {dataFetch?.currency}{dataFetch?.revenue_summary?.achieved}</Text>
                            <Text mt={0}>Target: {dataFetch?.currency}{dataFetch?.revenue_summary?.total}</Text>
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
                            <Text>Spent: {dataFetch?.currency}{dataFetch?.expense_summary?.achieved}</Text>
                            <Text mt={0}>Budget: {dataFetch?.currency}{dataFetch?.expense_summary?.total}</Text>
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
                                {dataFetch?.table_section?.map((item)=>{
                                return(<Tr>
                                    <Td>{item.category}</Td>
                                    <Td>{dataFetch?.currency}{item.spent}</Td>
                                    <Td>{dataFetch?.currency}{item.budget}</Td>
                                    <Td>
                                        <ProgressBar percentage={100*item.spent/item.budget} color="green" />
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
