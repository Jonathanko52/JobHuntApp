import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      timer: null,
      timerRunning: false,
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) => {
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
      seconds: seconds,
    });
  }

  startTimer() {
    if (!this.state.timerRunning) {
      this.setState({
        timerRunning: true,
      });
      let timer = this.incrementTimer;
      let runTimer = setInterval(function () {
        timer();
      }, 1000);
      runTimer;
      this.setState({
        timer: runTimer,
      });
    }
  }
  stopTimer() {
    this.setState({
      timerRunning: false,
    });
    clearInterval(this.state.timer);
  }
  clearTimer() {
    this.setState({
      timerRunning: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
  saveToLocal() {
    localStorage.setItem("Time", [
      JSON.stringify(this.state.hours),
      JSON.stringify(this.state.minutes),
      JSON.stringify(this.state.seconds),
    ]);
  }

  loadFromLocal() {
    let loadedTime = localStorage.getItem("Time").split(",");
    this.setState(() => {
      return {
        hours: parseInt(loadedTime[0]),
        minutes: parseInt(loadedTime[1]),
        seconds: parseInt(loadedTime[2]),
      };
    });
  }

  //Google API Functions

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
        style={{ backgroundColor: this.state.color }}>
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
                }}>
                Start
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.stopTimer();
                }}>
                Stop
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.stopTimer();
                  this.clearTimer();
                }}>
                Clear
              </button>
            </div>
            <div className="buttonContainer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  let targetRow;
                  let spreadsheetId = this.props.spreadSheetId;

                  let newHours = this.state.hours;
                  let newMinutes = this.state.minutes;
                  let newSeconds = this.state.seconds;
                  let dateExists = false;
                  gapi.client.sheets.spreadsheets.values
                    .get({
                      spreadsheetId: spreadsheetId,
                      range: "Time!A1:D1000",
                    })
                    .then((response) => {
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
                                `${
                                  new Date().getMonth() + 1
                                }/${new Date().getDate()}`,
                                newHours,
                                newMinutes,
                                newSeconds,
                              ],
                            ],
                          },
                        })
                        .then((response) => {
                          //Removes item added to sheet form React App
                        })
                        .catch((err) => {
                          console.log("inner error", err.result.error.message);
                        });
                    })

                    .catch((err) => {
                      console.log("outter error", err);
                    });
                  this.clearTimer();
                  this.stopTimer();
                  this.saveToLocal();
                }}>
                Upload
              </button>
            </div>
          </div>
        </div>

        <div className="NavbarProper pt-5">
          <li className="py-2 pl-5">
            <Link to="/">Main</Link>
          </li>
          <li className="py-2 pl-5">
            <Link to="/InputPage">Input Page</Link>
          </li>
          <li className="py-2 pl-5">
            <Link to="/GraphPage">Graph Page</Link>
          </li>
        </div>
      </div>
    );
  }
}

export default NavBar;
