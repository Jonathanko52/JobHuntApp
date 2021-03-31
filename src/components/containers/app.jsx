import React from "react";
import "./../../assets/css/app.css";
import NavBar from "../presentational/navbar.jsx";
import InputPage from "../presentational/inputPage.jsx";
import TitleBar from "../presentational/titlebar.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "../presentational/landingpage.jsx";
import GraphPage from "./graphPage.jsx";
var GoogleAuth;

import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super();
    this.directWebRef = React.createRef();
    this.directLinkRef = React.createRef();
    this.webRef = React.createRef();
    this.compRef = React.createRef();
    this.titleRef = React.createRef();
    this.locRef = React.createRef();
    this.linkRef = React.createRef();

    this.state = {
      tasks: [],
      websiteInput: "LinkedIn",
      companyInput: "",
      titleInput: "",
      locationInput: "",
      linkInput: "",
      totalJobsFromSheets: 0,
      directWebsiteInput: "LinkedIn",
      directLinkInput: "",
      companyLinkInput: "",
      spreadSheetId: "",
      totalJobs: "",
      SignedInOnGoogle: false,
      SheetCreationSuccessful: false,
      tempSpreadsheetID: "",
    };
    //Event Listener Function Bindings
    this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
    this.handleChangeCompany = this.handleChangeCompany.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.updateTotalJobsFromSheets = this.updateTotalJobsFromSheets.bind(this);
    this.handleChangeDirectWebsite = this.handleChangeDirectWebsite.bind(this);
    this.handleChangeDirectLink = this.handleChangeDirectLink.bind(this);
    this.handleSpreadsheetIdSubmit = this.handleSpreadsheetIdSubmit.bind(this);

    //Add/Remove from list
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.clearList = this.clearList.bind(this);
    this.moveToBack = this.moveToBack.bind(this);

    //Save/load List to LocalStorage
    this.saveToLocal = this.saveToLocal.bind(this);
    this.loadFromLocal = this.loadFromLocal.bind(this);
    this.clearLocal = this.clearLocal.bind(this);

    //Http Request
    this.retrieveHtmlLinkedin = this.retrieveHtmlLinkedin.bind(this);
    this.retrieveHtmlIndeed = this.retrieveHtmlIndeed.bind(this);
    this.retrieveHtmlBuiltInLA = this.retrieveHtmlBuiltInLA.bind(this);
    this.retrieveHtmlMonster = this.retrieveHtmlMonster.bind(this);
    this.retrieveHtmlAngelist = this.retrieveHtmlAngelist.bind(this);

    //GoogleAPI stuff
    this.googleAuth = this.googleAuth.bind(this);
    this.signInChange = this.signInChange.bind(this);
    this.createSheet = this.createSheet.bind(this);
    this.setSpreadsheetId = this.setSpreadsheetId.bind(this);
    this.setSpreadsheetIdFromTemp = this.setSpreadsheetIdFromTemp.bind(this);

    //Data Stuff
  }

  //Event Listeners handling event changes on left(input) page
  handleChangeWebsite(event) {
    console.log(event.target.value);
    this.setState({ websiteInput: event.target.value });
  }
  handleChangeCompany(event) {
    this.setState({ companyInput: event.target.value });
  }
  handleChangeTitle(event) {
    this.setState({ titleInput: event.target.value });
  }
  handleChangeLocation(event) {
    this.setState({ locationInput: event.target.value });
  }
  handleChangeLink(event) {
    this.setState({ linkInput: event.target.value });
  }
  updateTotalJobsFromSheets(value) {
    this.setState({ totalJobsFromSheets: value });
  }
  handleChangeDirectWebsite(event) {
    this.setState({ directWebsiteInput: event.target.value });
  }
  handleChangeDirectLink(event) {
    this.setState({ directLinkInput: event.target.value });
  }
  handleSpreadsheetIdSubmit(event) {
    this.setState({ tempSpreadsheetID: event.target.value });
  }

  //Adds item to task list
  addToList() {
    let wantToAddAnyway = true;
    this.state.tasks.forEach((cur) => {
      if (
        cur.companyInput === this.state.companyInput &&
        cur.companyInput !== ""
      ) {
        wantToAddAnyway = window.confirm(
          "This company is already on the list. Are you sure you want to add it?"
        );
      }
    });
    if (wantToAddAnyway) {
      this.setState((state) => {
        let newTasks = state.tasks.slice();
        newTasks.unshift({
          websiteInput: state.websiteInput,
          companyInput: state.companyInput,
          titleInput: state.titleInput,
          recruiterInput: state.recruiterInput,
          locationInput: state.locationInput,
          coverInput: state.coverInput,
          linkInput: state.linkInput,
        });
        return {
          tasks: newTasks,
          websiteInput: "LinkedIn",
          companyInput: "",
          titleInput: "",
          locationInput: "",
          linkInput: "",
        };
      });
    }
    this.saveToLocal();
  }

  //removes item from task list
  removeFromList(index) {
    this.setState((state) => {
      let newTasks = state.tasks.slice();
      newTasks.splice(index, 1);
      return {
        tasks: newTasks,
        input: state.input,
      };
    });
    this.saveToLocal();
  }

  clearList() {
    this.setState((state) => {
      let newTasks = [];
      return {
        tasks: newTasks,
        input: state.input,
      };
    });
    this.saveToLocal();
  }

  moveToBack(index) {
    this.setState((state) => {
      let newTasks = state.tasks.slice();
      let lastItem = newTasks.splice(index, 1);
      newTasks.push(lastItem[0]);
      return {
        tasks: newTasks,
        input: state.input,
      };
    });
    this.saveToLocal();
  }

  saveToLocal() {
    setTimeout(() => {
      localStorage.setItem("Tasks", JSON.stringify(this.state.tasks));
    }, 500);
  }

  loadFromLocal() {
    let loadedTasks = JSON.parse(localStorage.getItem("Tasks"));

    if (Array.isArray(loadedTasks)) {
      this.setState((state) => {
        let newTasks = state.tasks.slice().concat(loadedTasks);

        return {
          tasks: newTasks,
          websiteInput: "LinkedIn",
          companyInput: "",
          titleInput: "",
          locationInput: "",
          linkInput: "",
        };
      });
    }
  }

  clearLocal() {
    localStorage.removeItem("Tasks");
  }

  retrieveHtmlLinkedin() {
    let url = this.state.directLinkInput.split("/");
    url = url[url.length - 2];
    axios
      .get("/RetrieveHtmlLinkedIn/" + url)
      .then((res, req) => {
        let addToList = true;
        this.state.tasks.forEach((cur) => {
          if (cur.companyInput === res.data[1]) {
            addToList = false;
            addToList = window.confirm(
              "This company is already on the list. Are you sure you want to add it?"
            );
          }
        });
        if (addToList) {
          this.setState((state) => {
            let newTasks = state.tasks.slice();
            newTasks.unshift({
              websiteInput: state.directWebsiteInput,
              companyInput: res.data[1],
              titleInput: res.data[0],
              recruiterInput: state.recruiterInput,
              locationInput: res.data[3],
              coverInput: state.coverInput,
              linkInput: state.directLinkInput,
              companyLinkInput: res.data[2],
            });
            return {
              tasks: newTasks,
              websiteInput: "LinkedIn",
              companyInput: "",
              titleInput: "",
              locationInput: "",
              linkInput: "",
              companyLinkInput: "",
            };
          });
        }
        return res;
      })
      .then((res) => {
        this.saveToLocal();
      })
      .catch((error) => console.error(error));
    this.saveToLocal();
  }

  retrieveHtmlIndeed() {
    let url = this.state.directLinkInput.split("?");
    url = url[url.length - 1];
    axios
      .get("/RetrieveHtmlIndeed/" + url)
      .then((res, request) => {
        this.setState((state) => {
          let newTasks = state.tasks.slice();
          newTasks.unshift({
            websiteInput: state.directWebsiteInput,
            companyInput: res.data[1],
            titleInput: res.data[0],
            recruiterInput: state.recruiterInput,
            locationInput: res.data[3],
            coverInput: state.coverInput,
            linkInput: state.directLinkInput,
            companyLinkInput: res.data[2],
          });
          return {
            tasks: newTasks,
            websiteInput: "LinkedIn",
            companyInput: "",
            titleInput: "",
            locationInput: "",
            linkInput: "",
            companyLinkInput: "",
          };
        });
      })
      .then((res) => {
        this.saveToLocal();
      })
      .catch((error) => console.error(error));
  }
  retrieveHtmlBuiltInLA() {
    let url = this.state.directLinkInput.split("/");
    url = url[url.length - 1];
    axios
      .get("/RetrieveHtmlBuiltInLA/" + url)
      .then((res, request) => {})
      .then((res) => {
        this.saveToLocal();
      })
      .catch((error) => console.error(error));
  }

  retrieveHtmlMonster() {}
  retrieveHtmlAngelist() {
    let url = this.state.directLinkInput.split("/");
    url = url.slice(3);
    url = url.join("+");
    axios
      .get("/RetrieveHtmlAngelist/" + url)

      .then((res, request) => {
        // this.setState(state => {
        //   let newTasks = state.tasks.slice();
        //   newTasks.push({
        //     websiteInput: state.directWebsiteInput,
        //     companyInput: res.data[1],
        //     titleInput: res.data[0],
        //     recruiterInput: state.recruiterInput,
        //     locationInput: res.data[3],
        //     coverInput: state.coverInput,
        //     linkInput: state.directLinkInput,
        //     companyLinkInput: res.data[2]
        //   });
        //   return {
        //     tasks: newTasks,
        //     websiteInput: "LinkedIn",
        //     companyInput: "",
        //     titleInput: "",
        //     locationInput: "",
        //     linkInput: "",
        //     companyLinkInput: ""
        //   };
        // });
      })
      .then((res) => {
        this.saveToLocal();
      })
      .catch((error) => console.error(error));
  }
  //Google API functions
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
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        })
        .then(function () {
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
          title: "Job Hunt Progress",
        },
        sheets: [
          {
            properties: {
              title: "Summary",
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
                          stringValue: "Indeed",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*Indeed*")',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!F:F,"*yes*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!G:G,"*Phone*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!H:H,"*Tech") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!G:G,"*Onsite*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Indeed*",Jobs!H:H,"*Offer*") ',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                startRow: 2,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "LinkedIn",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*LinkedIn*")',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!F:F,"*yes*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!G:G,"*Phone*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!G:G,"*Tech*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!G:G,"*Onsite*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*LinkedIn*",Jobs!H:H,"*Offer*") ',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                startRow: 3,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "AngelList",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*AngelList*")',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!F:F,"*yes*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!G:G,"*Phone*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!G:G,"*Tech*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!G:G,"*Onsite*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*AngelList*",Jobs!H:H,"*Offer*") ',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                startRow: 4,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "ZipRecruiter",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*ZipRecruiter*")',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!F:F,"*yes*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!G:G,"*Phone*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!G:G,"*Tech*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!G:G,"*Onsite*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*ZipRecruiter*",Jobs!H:H,"*Offer*") ',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                startRow: 5,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Dice",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*Dice*")',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!F:F,"*yes*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!G:G,"*Phone*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!G:G,"*Tech*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!G:G,"*Onsite*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Dice*",Jobs!H:H,"*Offer*") ',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                startRow: 6,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Monster",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: '=COUNTIF(Jobs!A:A,"*Monster*")',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!F:F,"*yes*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!G:G,"*Phone*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!G:G,"*Tech*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!G:G,"*Onsite*") ',
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue:
                            '=COUNTIFS(Jobs!A:A,"*Monster*",Jobs!H:H,"*Offer*") ',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                startRow: 8,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          stringValue: "Total",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!B2:B7)",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!C2:C7)",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!D2:D7)",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!E2:E7)",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!F2:F7)",
                        },
                      },
                      {
                        userEnteredValue: {
                          formulaValue: "=SUM(Summary!G2:G7)",
                        },
                      },
                    ],
                  },
                ],
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
                          stringValue: "Website",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Number of Jobs Applied To",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Number of Cover Letters Sent",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to Phone Screens",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to Tech Interviews",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to In Person",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Converted to Offer",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            properties: {
              title: "Jobs",
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
                          stringValue: "Job Posting Source",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Company",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Position Title",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Date",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Location",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Cover Letter Included?",
                        },
                      },

                      {
                        userEnteredValue: {
                          stringValue: "Interview Phase",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Posting URL",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Notes",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            properties: {
              title: "Time",
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
                          stringValue: "Date",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Hours",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Minutes",
                        },
                      },
                      {
                        userEnteredValue: {
                          stringValue: "Seconds",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((response) => {
        let parsedResponse = JSON.parse(response.body);
        localStorage.setItem("SpreadSheetId", parsedResponse.spreadsheetId);
        this.setState({
          spreadSheetId: parsedResponse.spreadsheetId,
        });
      })
      .catch((res, err) => {
        console.log("error", res.body);
      });
  }

  signInChange() {
    if (this.state.SignedInOnGoogle) {
      this.setState({ SignedInOnGoogle: false });
    } else {
      this.setState({ SignedInOnGoogle: true });
    }
  }

  setSpreadsheetId(newId) {
    this.setState({
      spreadSheetId: newId,
    });
  }

  setSpreadsheetIdFromTemp() {
    this.setState({
      spreadSheetId: this.state.tempSpreadsheetID,
    });
  }

  componentDidMount() {
    this.loadFromLocal();
  }

  render() {
    return (
      <div>
        <Router>
          <div className="app">
            <TitleBar />
            <div className="row">
              <NavBar spreadSheetId={this.state.spreadSheetId} />
              <Route
                path="/"
                exact
                render={(props) => {
                  return (
                    <LandingPage
                      spreadSheetId={this.state.spreadSheetId}
                      googleAuth={this.googleAuth}
                      signInChange={this.signInChange}
                      SignedInOnGoogle={this.state.SignedInOnGoogle}
                      createSheet={this.createSheet}
                      handleSpreadsheetIdSubmit={this.handleSpreadsheetIdSubmit}
                      setSpreadsheetIdFromTemp={this.setSpreadsheetIdFromTemp}
                      setSpreadsheetId={this.setSpreadsheetId}
                      tempSpreadsheetID={this.state.tempSpreadsheetID}
                    />
                  );
                }}
              />
              <Route
                path="/InputPage"
                render={(props) => {
                  return (
                    <InputPage
                      directWebRef={this.directWebRef}
                      directLinkRef={this.directLinkRef}
                      webRef={this.webRef}
                      compRef={this.compRef}
                      titleRef={this.titleRef}
                      locRef={this.locRef}
                      linkRef={this.linkRef}
                      handleChangeWebsite={this.handleChangeWebsite}
                      handleChangeTitle={this.handleChangeTitle}
                      handleChangeRecruiter={this.handleChangeRecruiter}
                      handleChangeLocation={this.handleChangeLocation}
                      handleChangeCompany={this.handleChangeCompany}
                      handleChangeCover={this.handleChangeCover}
                      handleChangeLink={this.handleChangeLink}
                      handleChangeDirectWebsite={this.handleChangeDirectWebsite}
                      handleChangeDirectLink={this.handleChangeDirectLink}
                      addToList={this.addToList}
                      clearList={this.clearList}
                      moveToBack={this.moveToBack}
                      totalJobsFromSheets={this.state.totalJobsFromSheets}
                      retrieveHtmlLinkedin={this.retrieveHtmlLinkedin}
                      retrieveHtmlIndeed={this.retrieveHtmlIndeed}
                      retrieveHtmlBuiltInLA={this.retrieveHtmlBuiltInLA}
                      retrieveHtmlAngelist={this.retrieveHtmlAngelist}
                      directWebsiteInput={this.state.directWebsiteInput}
                      directLinkInput={this.state.directLinkInput}
                      saveToLocal={this.saveToLocal}
                      totalJobs={this.state.totalJobs}
                      tasks={this.state.tasks}
                      spreadSheetId={this.state.spreadSheetId}
                      removeFromList={this.removeFromList}
                      websiteInput={this.state.websiteInput}
                      updateTotalJobsFromSheets={this.updateTotalJobsFromSheets}
                      saveToLocal={this.saveToLocal}
                      loadFromLocal={this.loadFromLocal}
                      clearLocal={this.clearLocal}
                    />
                  );
                }}
              />
              <Route
                path="/GraphPage"
                exact
                render={(props) => {
                  return <GraphPage spreadSheetId={this.state.spreadSheetId} />;
                }}
              />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
