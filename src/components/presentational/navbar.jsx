import React from 'react';
var GoogleAuth


class NavBar extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
        console.log('componentdidmount')
        gapi.load('client:auth2', initClient);

        function initClient(){
            gapi.client.init({
                'apiKey': 'AIzaSyDtozpl2iAtr2mB9OViJKsi0PNTIWg2Uq4',
                'clientId': '218195582841-ejmmgqp5mfkbtghcchurat2qabul2anj.apps.googleusercontent.com',
                'scope': 'https://www.googleapis.com/auth/spreadsheets',
                'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"]

            }).then(function () {
                console.log('SO FAR SO GOOD')
                GoogleAuth = gapi.auth2.getAuthInstance();
        
                // Listen for sign-in state changes.
                GoogleAuth.signIn()
            });
        }

    }


    render(){
        return(
    <div class='NavBar col-md-2'>
    
            
    </div>)
    
}}

export default NavBar