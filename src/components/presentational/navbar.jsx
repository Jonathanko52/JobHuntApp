import React from "react";
var GoogleAuth;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // this.changeColor = this.changeColor.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.state = {
      // color: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
      timer: null
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      // return (ev.returnValue = "Are you sure you want to close?");
    });
  }

  // changeColor(event) {
  //   this.setState({ color: event.target.value });
  // }

  incrementTimer() {
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    let hours = this.state.hours;

    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  startTimer() {
    let timer = this.incrementTimer;
    let runTimer = setInterval(function() {
      timer();
    }, 1000);
    runTimer;
    this.setState({
      timer: runTimer
    });
  }
  stopTimer() {
    clearInterval(this.state.timer);
  }
  clearTimer() {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  }
  saveToLocal() {
    localStorage.setItem("Time", [
      JSON.stringify(this.state.hours),
      JSON.stringify(this.state.minutes),
      JSON.stringify(this.state.seconds)
    ]);
  }

  loadFromLocal() {
    let loadedTime = localStorage.getItem("Time").split(",");
    this.setState(() => {
      return {
        hours: parseInt(loadedTime[0]),
        minutes: parseInt(loadedTime[1]),
        seconds: parseInt(loadedTime[2])
      };
    });
  }

  render() {
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    let hours = this.state.hours;
    if (hours < 10) {
      hours = "0" + hours.toString();
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    return (
      <div
        className="NavBar col-xs-2"
        style={{ backgroundColor: this.state.color }}
      >
        {/* <select
          className="WebsiteInput TaskInput"
          onChange={e => this.changeColor(e)}
        >
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
        </select> */}
        <div className="clockContainer">
          <div className="counterContainer">
            <div className="counterNumbers" />
            {hours}:{minutes}:{seconds}
          </div>
          <div className="buttonsContainer">
            <div className="buttonContainer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.startTimer();
                }}
              >
                Start
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.stopTimer();
                }}
              >
                Stop
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.stopTimer();
                  this.clearTimer();
                }}
              >
                Clear
              </button>
            </div>
            <div className="buttonContainer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.saveToLocal();
                }}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.stopTimer();
                  this.clearTimer();
                  this.loadFromLocal();
                }}
              >
                Load
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  let targetRow;
                  let newHours = this.state.hours;
                  let newMinutes = this.state.minutes;
                  let newSeconds = this.state.seconds;
                  let dateExists = false;
                  gapi.client.sheets.spreadsheets.values
                    .get({
                      spreadsheetId:
                        "1pLaxif0Ryvzs28ZqKTJRySdDWEdVRRrSreaja4L0FEw",
                      range: "Sheet3!A1:D1000"
                    })
                    .then(response => {
                      //first call. Finds empty row in sheets
                      var result = response.result;

                      result.values.forEach((cur, ind) => {
                        if (
                          cur[0] ===
                          `${new Date().getMonth() + 1}/${new Date().getDate()}`
                        ) {
                          dateExists = ind;
                        }
                      });
                      if (dateExists) {
                        targetRow = dateExists + 1;
                        newHours =
                          parseInt(newHours) +
                          parseInt(result.values[dateExists][1]);
                        newMinutes =
                          parseInt(newMinutes) +
                          parseInt(result.values[dateExists][2]);
                        newSeconds =
                          parseInt(newSeconds) +
                          parseInt(result.values[dateExists][3]);

                        if (newSeconds >= 60) {
                          newSeconds = newSeconds - 60;
                          newMinutes++;
                          if (newMinutes >= 60) {
                            newMinutes = newMinutes - 60;
                            newHours++;
                          }
                        }
                      } else {
                        targetRow = result.values.length + 1;
                      }
                    })
                    .then(() => {
                      //second google api call (technically within first) that posts data to sheet

                      gapi.client.sheets.spreadsheets.values
                        .update({
                          spreadsheetId:
                            "1pLaxif0Ryvzs28ZqKTJRySdDWEdVRRrSreaja4L0FEw",
                          range: `Sheet3!A${targetRow}:D${targetRow}`,
                          valueInputOption: "RAW",
                          resource: {
                            values: [
                              [
                                `${new Date().getMonth() +
                                  1}/${new Date().getDate()}`,
                                newHours,
                                newMinutes,
                                newSeconds
                              ]
                            ]
                          }
                        })
                        .then(response => {
                          //Removes item added to sheet form React App
                          console.log("savedtosheets", response.result);
                        })
                        .catch(err => {
                          console.log("inner error", err.result.error.message);
                        });
                    })

                    .catch(err => {
                      console.log("outter error", err);
                    });
                  this.clearTimer();
                  this.stopTimer();

                  this.saveToLocal();
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <button
            className="btn btn-primary"
            onClick={() => {
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
                    GoogleAuth = gapi.auth2.getAuthInstance();

                    // Listen for sign-in state changes.
                    GoogleAuth.signIn();
                  });
              }
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default NavBar;
