import apiEndpoint from "../config/data"

export async function fetchData(url, method, body){
    var returnData = undefined
    if (method==='POST'){
        await fetch(apiEndpoint + url, {
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            method: method,
            body:body
        }).then(response => response.json())
        .then(data => {
            if (data.code === undefined) {
               returnData = data
                
            } else {
                window.open("/login", "_self")
                alert('Session Expired!.')
            }
        })
        .catch(error => console.error(error))
    } else{
        await fetch(apiEndpoint + url, {
            headers: { "Authorization": "Bearer " + localStorage['access'] },
            method: method,
        }).then(response => response.json())
        .then(data => {
            if (data.code === undefined) {
               returnData = data
                
            } else {
                window.open("/login", "_self")
                alert('Session Expired!.')
            }
        })
        .catch(error => console.error(error))
    }
   

    return returnData
}
