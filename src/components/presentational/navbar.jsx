import React from "react";
import axios from "axios";

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

    this.googleAuth = this.googleAuth.bind(this);
    this.createSheet = this.createSheet.bind(this);
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

  //Google API Functions
  googleAuth() {
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
  }

  createSheet() {
    gapi.client.sheets.spreadsheets
      .create({
        properties: {
          title: "Job Hunt Progress"
        },
        sheets: [
          {
            properties: {
              title: "Summary"
            },
            data: [
              {
                startRow: 1,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Indeed"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*Indeed*")'
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!F:F,"*yes*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!G:G,"*Phone*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!H:H,"*Tech") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!G:G,"*Onsite*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!H:H,"*Offer*") '
                        }
                      }
                    ]
                  }
                ]
              },
              {
                startRow: 2,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "LinkedIn"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*LinkedIn*")'
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!F:F,"*yes*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!G:G,"*Phone*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!G:G,"*Tech*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!G:G,"*Onsite*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!H:H,"*Offer*") '
                        }
                      }
                    ]
                  }
                ]
              },
              {
                startRow: 3,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "AngelList"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*AngelList*")'
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!F:F,"*yes*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!G:G,"*Phone*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!G:G,"*Tech*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!G:G,"*Onsite*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!H:H,"*Offer*") '
                        }
                      }
                    ]
                  }
                ]
              },
              {
                startRow: 4,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "ZipRecruiter"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*ZipRecruiter*")'
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!F:F,"*yes*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!G:G,"*Phone*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!G:G,"*Tech*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!G:G,"*Onsite*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!H:H,"*Offer*") '
                        }
                      }
                    ]
                  }
                ]
              },
              {
                startRow: 5,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Dice"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*Dice*")'
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!F:F,"*yes*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!G:G,"*Phone*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!G:G,"*Tech*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!G:G,"*Onsite*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!H:H,"*Offer*") '
                        }
                      }
                    ]
                  }
                ]
              },
              {
                startRow: 6,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Monster"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*Monster*")'
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!F:F,"*yes*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!G:G,"*Phone*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!G:G,"*Tech*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!G:G,"*Onsite*") '
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!H:H,"*Offer*") '
                        }
                      }
                    ]
                  }
                ]
              },
              {
                startRow: 8,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Total"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!B2:B7)"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!C2:C7)"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!D2:D7)"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!E2:E7)"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!F2:F7)"
                        }
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!G2:G7)"
                        }
                      }
                    ]
                  }
                ]
              },

              {
                // object (GridProperties)
                startRow: 0,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Website"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Number of Jobs Applied To"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Number of Cover Letters Sent"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to Phone Screens"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to Tech Interviews"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to In Person"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to Offer"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            properties: {
              title: "Jobs"
            },
            data: [
              {
                // object (GridProperties)
                startRow: 0,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Job Posting Source"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Company"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Position Title"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Date"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Location"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Cover Letter Included?"
                        }
                      },

                      {
                        userEnteredValue: {
                          stringValue: "Interview Phase"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Posting URL"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Notes"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            properties: {
              title: "Time"
            },
            data: [
              {
                // object (GridProperties)
                startRow: 0,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Date"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Hours"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Minutes"
                        }
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Seconds"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })
      .then(response => {
        let parsedResponse = JSON.parse(response.body);
        console.log("response", parsedResponse.spreadsheetId);
        localStorage.setItem("SpreadSheetId", parsedResponse.spreadsheetId);

        // localStorage.setItem('spreadsheetId',parsedResponse.spreadsheetId)
      })
      .catch((res, err) => {
        console.log("error", res.body);
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
                  let spreadsheetId = localStorage.getItem("SpreadSheetId");

                  let newHours = this.state.hours;
                  let newMinutes = this.state.minutes;
                  let newSeconds = this.state.seconds;
                  let dateExists = false;
                  gapi.client.sheets.spreadsheets.values
                    .get({
                      spreadsheetId: spreadsheetId,
                      range: "Time!A1:D1000"
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
                          spreadsheetId: spreadsheetId,
                          range: `Time!A${targetRow}:D${targetRow}`,
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
              this.googleAuth();
            }}
          >
            Sign In
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              this.createSheet();
            }}
          >
            Create?
          </button>
        </div>
      </div>
    );
  }
}

export default NavBar;
