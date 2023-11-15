import React, { Component } from "react";
import inuit from "../../config/inuitConfig";
import apiEndpoint from "../../config/data";
import MenuItemSide from "../../sidebar/menuItem";
import { FaDatabase } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";


class MenuSideBar extends Component {

    state = { screens: [], Dashboard: true }

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
            Dashboard: false,
            Cost: false,
            Benchmark: false,
            Task: false,
            Setting: false,
            Budget: false,
            Upload: false,
        });



    };

    componentDidMount = () => {
        fetch(apiEndpoint + '/api/screens/', {
            headers: { "Authorization": "Bearer " + localStorage['access'] }
        }).then(response => response.json())
            .then(data => {
                console.log(data)

                if (data.code === undefined) {
                    this.setState({ screens: data['screen_list'] })
                } else {
                    window.open("/login", "_self")
                    alert('Session Expired!.')
                }


            }).catch(err => console.log(err))

    }

    render() {
        return (
            <>
                <Flex direction={'column'} mt={2} align={'center'} gap={6} p={5} pt={1}>

                    {this.state.screens ? this.state.screens.map((screen) => (
                        <MenuItemSide
                            sidebarCollapse={this.props.sidebar}
                            icon={FaDatabase}
                            menuName={screen['name']}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                this.disableAll(screen['name']);
                                this.setState(this.objToJson(screen['name'], true))
                                this.props.onClick(screen['name']);
                                this.props.clickEvent(true)
                            }}
                            active={this.state[screen['name']]}
                        />
                    )) : <></>}

                    <MenuItemSide
                        sidebarCollapse={this.props.sidebar}
                        menuName={'Connect To Intuit'}
                        onClick={() => {


                            this.handleAuth()

                        }}

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

                    />
                </Flex></>
        )
    }
}

export default MenuSideBar