import React from "react"
import { Component } from "react"
import apiEndpoint from "../config/data"

export default class CallbackHandler extends Component {


    componentDidMount = () => {
        const queryParameters = new URLSearchParams(window.location.search)
        const code = queryParameters.get("code")
        const realmId = queryParameters.get("realmId")

        var formdata = new FormData()
        formdata.append('code', code)
        formdata.append('realmId', realmId)

        fetch(apiEndpoint + '/api/auth/', {
            method: 'POST',
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            body: formdata
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === undefined) {
                    window.open(data, "_self")
                } else {
                    window.open('/', "_self")
                    alert('Session Expired!.')
                }
            }).catch(err => {
                window.open('/Dash', "_self")
                alert('Error in registering.')
            })


    }

    render() {
        return <h7>Loading!!</h7>
    }

}
