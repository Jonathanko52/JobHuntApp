import React from "react";
var GoogleAuth;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      color: ""
    };
  }

  changeColor(event) {
    this.setState({ color: event.target.value });
  }

  componentDidMount() {
    gapi.load("client:auth2", initClient);
    //Connects to google api on startup of application. Placed in Navbar because I was toying with idea with
    // over other functionality related to this page, forgot what
    function initClient() {
      gapi.client
        .init({
          apiKey: "AIzaSyDtozpl2iAtr2mB9OViJKsi0PNTIWg2Uq4",
          clientId:
            "218195582841-ejmmgqp5mfkbtghcchurat2qabul2anj.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/spreadsheets",
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4"
          ]
        })
        .then(function() {
          console.log("SO FAR SO GOOD");
          GoogleAuth = gapi.auth2.getAuthInstance();

          // Listen for sign-in state changes.
          GoogleAuth.signIn();
        });
    }
  }

  render() {
    return (
      <div
        className="NavBar col-xs-2"
        style={{ backgroundColor: this.state.color }}
      >
        <select
          className="WebsiteInput TaskInput"
          onChange={e => this.changeColor(e)}
        >
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
        </select>
      </div>
    );
  }
}

export default NavBar;
