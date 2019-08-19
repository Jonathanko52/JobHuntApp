import React from "react";
import PropTypes from "prop-types";

class RightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recruiterInput: "Yes",
      coverInput: "Yes"
    };
    //binding handle change functions
    this.handleChangeRecruiter = this.handleChangeRecruiter.bind(this);
    this.handleChangeCover = this.handleChangeCover.bind(this);
  }

  //handle changes to "Recruiter" value

  handleChangeRecruiter(event) {
    this.setState({ recruiterInput: event.target.value });
  }

  //handle changes to "Cover value"

  handleChangeCover(event) {
    this.setState({ coverInput: event.target.value });
  }

  render() {
    let Array = [];
    this.props.tasks.forEach((cur, ind) => {
      Array.push(
        <li key={ind}>
          <b>Source Website:</b> {cur.websiteInput}
          <br />
          <b>Company Name:</b> {cur.companyInput}
          <br />
          <b>Job Title:</b> {cur.titleInput}
          <br />
          <b>Recruiter Input:</b>
          <form>
            <input
              type="radio"
              //Radio Button To switch Recruiter info
              name="RecruiterRadio"
              className="RecruiterInput RadioInput"
              onChange={e => {
                this.handleChangeRecruiter(e);
              }}
              value="Yes"
            />
            Yes
            <input
              type="radio"
              name="RecruiterRadio"
              className="RecruiterInput RadioInput"
              onChange={e => {
                this.handleChangeRecruiter(e);
              }}
              value="No"
            />
            No
          </form>
          <br />
          <b>Location Input:</b> {cur.locationInput}
          <br />
          <b>Cover Letter:</b>
          <form>
            <input
              type="radio"
              //Radio Button to save cover letter info
              name="CoverLetter"
              className="CoverInput RadioInput"
              onChange={e => {
                this.handleChangeCover(e);
              }}
              value="Yes"
            />
            Yes
            <input
              type="radio"
              name="CoverLetter"
              className="CoverInput RadioInput"
              onChange={e => {
                this.handleChangeCover(e);
              }}
              value="No"
            />
            No
          </form>
          <br />
          <b href>Link:</b>{" "}
          <a href={cur.linkInput} target="_blank">
            {cur.linkInput}
          </a>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              //variable that indicates first empty row in sheet
              let emptyRow;

              //first google api call that finds first empty row (well, first with empty cell in column A)
              gapi.client.sheets.spreadsheets.values
                .get({
                  spreadsheetId: "1pLaxif0Ryvzs28ZqKTJRySdDWEdVRRrSreaja4L0FEw",
                  range: "Sheet2!A1:A1000"
                })
                .then(response => {
                  var result = response.result;
                  emptyRow = result.values.length + 1;
                  this.props.updateTotalJobsFromSheets(emptyRow);
                })
                .then(() => {
                  //second google api call (technically within first) that posts data to sheet
                  gapi.client.sheets.spreadsheets.values
                    .update({
                      spreadsheetId:
                        "1pLaxif0Ryvzs28ZqKTJRySdDWEdVRRrSreaja4L0FEw",
                      range: `Sheet2!A${emptyRow}:J${emptyRow}`,
                      valueInputOption: "RAW",
                      resource: {
                        values: [
                          [
                            cur.websiteInput,
                            cur.companyInput,
                            cur.titleInput,
                            this.state.recruiterInput,
                            `${new Date().getMonth() +
                              1}/${new Date().getDate()}`,
                            cur.locationInput,
                            this.state.coverInput,
                            "no",
                            "",
                            cur.linkInput
                          ]
                        ]
                      }
                    })
                    .then(response => {
                      //Removes item added to sheet form React App
                      var result = response.result;
                      this.props.removeFromList(ind);
                      this.props.saveToLocal();
                    })
                    .catch(err => {
                      console.log("inner error", err.result.error.message);
                    });
                })
                .catch(err => {
                  console.log("outter error", err.result.error.message);
                });
            }}
          >
            Done
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              //Removes Item form React App
              this.props.removeFromList(ind);
              this.props.saveToLocal();
            }}
          >
            Cancel
          </button>
        </li>
      );
    });

    return (
      <div className="rightBar col-xs-6">
        <h3>List of Jobs:{this.props.tasks.length}</h3>
        <ol className="TaskTable">{Array}</ol>
      </div>
    );
  }
}

//Testing Proptypes Functionality

// RightPage.propTypes ={
//     websiteInput:PropTypes.array,
//     // tasks:PropTypes.element.isRequired,
// }

// RightPage.defaultProps = {
//     websiteInput:'TEST'
// }

export default RightPage;
