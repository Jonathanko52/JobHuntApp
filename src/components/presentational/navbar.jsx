import React from 'react';
var GoogleAuth


class NavBar extends React.Component {
    constructor(props) {
      super(props);
    }

    // componentDidMount(){
    //     console.log('componentdidmount')
    //     gapi.load('client:auth2', initClient);

    //     function initClient(){
    //         gapi.client.init({
    //             'apiKey': 'AIzaSyDtozpl2iAtr2mB9OViJKsi0PNTIWg2Uq4',
    //             'clientId': '218195582841-ejmmgqp5mfkbtghcchurat2qabul2anj.apps.googleusercontent.com',
    //             'scope': 'https://www.googleapis.com/auth/spreadsheets',
    //             'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
    //             // 'apiKey': 'AIzaSyBb0YFWcBDP-_SIs7Go-KkLmr2jWGltbzw',
    //             // 'clientId': '378958687274-a3mtd0dvan6i5g4b6h6i7t4so9lfrgb0.apps.googleusercontent.com',
    //             // 'scope': 'https://www.googleapis.com/auth/calendar',
    //             // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    //         }).then(function () {
    //             console.log('SO FAR SO GOOD')
    //             GoogleAuth = gapi.auth2.getAuthInstance();
        
    //             // Listen for sign-in state changes.
    //             GoogleAuth.signIn()
    //         });
    //     }

    // }


    render(){
        return(
    <div class='NavBar col-md-2'>
    
            {/* <button onClick={()=>{
                console.log("BUtton for sheet pressed")
                let emptyRow;


                // gapi.client.sheets.spreadsheets.values.get({
                //     spreadsheetId: '10Ei-LVr-PVj8hmacpNS4R-ybpjn6Hm7yzGUC8o2iARI',
                //     range: 'Sheet1!A1:A1000'
                // }).then((response) => {
                //     var result = response.result;
                //     console.log(result.values.length)
                //     emptyRow = result.values.length + 1
                // })

                    gapi.client.sheets.spreadsheets.values.update({
                        spreadsheetId: '10Ei-LVr-PVj8hmacpNS4R-ybpjn6Hm7yzGUC8o2iARI',
                        // range:`Sheet1!A${emptyRow}:B${emptyRow}`,
                        range:`Sheet1!A1:B1`,
                        valueInputOption:'RAW',
                        resource:{
                            values: ['testBLARGH', 'test2']
                        }
                    }).then((response) => {
                        var result = response.result;
                        console.log(result);
                    }).catch((err)=>{
                        console.log(err.result.error.message)
                    });


                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: '10Ei-LVr-PVj8hmacpNS4R-ybpjn6Hm7yzGUC8o2iARI',
                    range: 'Sheet1!A1:B2'
                }).then((response) => {
                    var result = response.result;
                    var numRows = result.values ? result.values.length : 0;
                    result = JSON.stringify(result)
                    console.log(`${numRows} rows retrieved.${result}`);
                });


            }}> Done
            </button> */}
    </div>)
    
}}

export default NavBar