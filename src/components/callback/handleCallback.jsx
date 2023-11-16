import React from "react"
import { Component } from "react"
import apiEndpoint from "../config/data"

export default class CallbackHandler extends Component {

    state={
        data:undefined,
    }

    updateTokens = async () =>{
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
                    console.log('success')
                    console.log(data)
                
                    if (data.code === undefined) {
                        window.open(data, "_self")
                    } else {
                        window.open('/', "_self")
                        alert('Session Expired!.')
                    }
            
                    
                }).catch(err => {
                    console.error(err)
                    window.open('/Dash', "_self")
                    alert('Error in registering.')
                })

        }
    

    componentDidMount = () => {
        this.updateTokens()
    
    }

    render() {
        return <h7>Loading!!</h7>
    }

}
