import React, { Component } from "react";
import inuit from "../../config/inuitConfig";
import apiEndpoint from "../../config/data";
import MenuItemSide from "../../sidebar/menuItem";
import { FaDatabase } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";
import MenuItemDropdown from "../../sidebar/menuItemDropdown";


class MenuSideBar extends Component {

    state = { screens: [], 
        dashboard: true,
            cost: false,
            benchmark: false,
            task: false,
            setting: false,
            budget: false,
            upload: false,
            excelDat: false,
            financialAnalysis: false,
            aiSummary: false,
            activeBtn : 'dashboard',
        
        
    clickThruScreen: this.props.clickThruScreen}

    handleAuth = () => {

        var data = new FormData()
        data.append('client_id', this.state.client_id)
        data.append('secret_key', this.state.secret_key)
        data.append('inuit_company_id', this.state.inuit_company_id)
        data.append('type', inuit['type'])

        fetch(apiEndpoint + '/api/inuit_auth/', {
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            method: 'POST',
            body: data,

        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.redirect(data)

            }).catch(err => {
                console.error(err)
                alert('Error occured.')
            })
    }

    redirect = (url) => {
        this.setState({ modalButtonLoading: false, modalOpen: false })
        window.open(url)
    }


    objToJson = (key, value) => {
        var res = {}
        res[key] = value
        console.log(res)
        return res
    }

    disableAll = () => {
        this.setState({
            dashboard: false,
            cost: false,
            benchmark: false,
            task: false,
            setting: false,
            budget: false,
            upload: false,
            excelDat: false,
            financialAnalysis: false,
            aiSummary: false
        });



    };

   getActiveScreen = (screen) =>{
    const obj = this.state.screens.find(ob => ob.name === this.state.clickThruScreen)
    var screenName = ''
    if (screen['key']===this.props.clickThruScreen && obj!==undefined){
        screenName = this.props.clickThruScreen
        this.disableAll();
        this.setState(this.objToJson(screenName, true))
    }
    
    

   }
   onClickFunc = (screen, active_button) => {
    console.log(active_button);
    // Save active button to state
    this.setState({ activeBtn: active_button });
    // Save active button to localStorage
    localStorage.setItem("activeBtn", active_button);

    const authFlag = this.state.screens.includes(this.props.clickThruScreen);
    const screenName = authFlag ? this.props.clickThruScreen : screen["key"];

    window.scrollTo(0, 0);
    this.disableAll();
    this.setState(this.objToJson(active_button, true));
    this.props.onClick(screenName);
    this.props.clickEvent(true);
};

componentDidMount = () => {
    // Clear localStorage when the page is refreshed
    window.onbeforeunload = () => {
        localStorage.removeItem("activeBtn");
    };

    fetch(apiEndpoint + "/api/screens/", {
        headers: { Authorization: "Bearer " + localStorage["access"] },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if (data.code === undefined) {
                this.setState({ screens: data["screen_list"] });

                // Retrieve activeBtn from localStorage (if it exists)
                const activeBtn = localStorage.getItem("activeBtn");
                if (activeBtn) {
                    this.setState({ activeBtn: activeBtn });
                }
            } else {
                window.open("/login", "_self");
                alert("Session Expired!.");
            }
        })
        .catch((err) => console.log(err));
};



    render() {
        return (
            <>
                <Flex direction={'column'} mt={2} align={'center'} gap={3} p={5} pt={1} maxHeight={'90vh'}  overflowY={'auto'}  boxSizing="border-box">

                    {this.state.screens ? this.state.screens.map((screen) => (
                        <MenuItemSide
                            sidebarCollapse={this.props.sidebar}
                            icon={FaDatabase}
                            //menuName={screen['key']}
                            menuObj={screen}
                            onClick={(value, active_button) => {
                                console.log(value)
                                this.onClickFunc(value, active_button)
                            }}
                            active={
                                this.props.clickThruScreen !== null
                                    ? screen["key"] === this.state.activeBtn
                                        ? true
                                        : false
                                    : this.state[screen["key"]]
                            }
                        />
                    )) : <></>}
       {/*
                    <MenuItemDropdown
                        sidebarCollapse={this.props.sidebar}
                        menuName={'Financial Insights Test'}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            this.disableAll('Comparator');
                            this.setState(this.objToJson('Comparator', true))
                            this.props.onClick('Comparator');
                            this.props.clickEvent(true)

                        }}
                        active={this.props.clickThruScreen!==null?false:this.state['Comparator']}
                    />
                    
                   <MenuItemSide
                        sidebarCollapse={this.props.sidebar}
                        menuName={'Excel Data'}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            this.disableAll('excelData');
                            this.setState(this.objToJson('ExcelDat', true))
                            this.props.onClick('ExcelDat');
                            this.props.clickEvent(true)

                        }}
                        active={this.state['ExcelDat']}
                    />
                    <MenuItemSide
                        sidebarCollapse={this.props.sidebar}
                        menuName={'Setting'}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            this.disableAll('Setting');
                            this.setState(this.objToJson('Setting', true))
                            this.props.onClick('Setting');
                            this.props.clickEvent(true)
                        }}
                        active={this.state['Setting']}

                    /> */}
                </Flex></>
        )
    }
}

export default MenuSideBar