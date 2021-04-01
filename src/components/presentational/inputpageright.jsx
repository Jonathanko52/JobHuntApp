import React from "react";

class RightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberAppliedToday: 0,
      recruiterInput: "Yes",
      coverInput: "Yes",
      interviewInput: "Submitted",
    };
    //binding handle change functions
    this.handleChangeRecruiter = this.handleChangeRecruiter.bind(this);
    this.handleChangeCover = this.handleChangeCover.bind(this);
    this.increaseNumberAppliedToday = this.increaseNumberAppliedToday.bind(
      this
    );
  }

  //handle changes to "Recruiter" value

  handleChangeRecruiter(event) {
    this.setState({ recruiterInput: event.target.value });
  }

  //handle changes to "Cover value"

  handleChangeCover(event) {
    this.setState({ coverInput: event.target.value });
  }

  handleChangeInterview(event) {
    this.setState({ interviewInput: event.target.value });
  }

  increaseNumberAppliedToday() {
    this.setState((state) => {
      numberAppliedToday: state.numberAppliedToday++;
    });
  }

  render() {
    let Array = [];
    this.props.tasks.forEach((cur, ind) => {
      if (cur) {
        Array.push(
          <li key={ind}>
            <b>Source Website: </b> {cur.websiteInput}
            <br />
            <b>Company Name: </b>
            <a href={cur.companyLinkInput} target="_blank">
              {cur.companyInput}
            </a>
            <br />
            <b>Job Title: </b> {cur.titleInput}
            <br />
            <b>Location Input: </b> {cur.locationInput}
            <br />
            <b>Cover Letter:</b>
            <form>
              <input
                type="radio"
                //Radio Button to save cover letter info
                name="CoverLetter"
                className="CoverInput RadioInput"
                onChange={(e) => {
                  this.handleChangeCover(e);
                }}
                value="Yes"
              />
              Yes
              <input
                type="radio"
                name="CoverLetter"
                className="CoverInput RadioInput"
                onChange={(e) => {
                  this.handleChangeCover(e);
                }}
                value="No"
              />
              No
            </form>
            <b href>Link:</b>
            <a href={cur.linkInput} target="_blank">
              {cur.linkInput}
            </a>
            <br />
            <button
              className="btn btn-primary"
              onClick={() => {
                //variable that indicates first empty row in sheet
                let emptyRow;
                let spreadsheetId = this.props.spreadSheetId;
                //first google api call that finds first empty row (well, first with empty cell in column A)
                gapi.client.sheets.spreadsheets.values
                  .get({
                    spreadsheetId: spreadsheetId,
                    range: "Jobs!A1:A1000",
                  })
                  .then((response) => {
                    var result = response.result;
                    emptyRow = result.values.length + 1;
                    this.props.updateTotalJobsFromSheets(emptyRow);
                  })
                  .then(() => {
                    //second google api call (technically within first) that posts data to sheet
                    gapi.client.sheets.spreadsheets.values
                      .update({
                        spreadsheetId: spreadsheetId,
                        range: `Jobs!A${emptyRow}:J${emptyRow}`,
                        valueInputOption: "RAW",
                        resource: {
                          values: [
                            [
                              cur.websiteInput,
                              cur.companyInput,
                              cur.titleInput,
                              `${
                                new Date().getMonth() + 1
                              }/${new Date().getDate()}`,
                              cur.locationInput,
                              this.state.coverInput,
                              this.state.interviewInput,
                              cur.linkInput,
                            ],
                          ],
                        },
                      })
                      .then((response) => {
                        //Removes item added to sheet from React App
                        this.increaseNumberAppliedToday();
                        this.props.removeFromList(ind);
                        alert("Submitted successfully to google sheets");
                      })
                      .catch((err) => {
                        alert("Submission Failed Inner.");
                      });
                  })
                  .catch((err) => {
                    alert("Submission Failed Outter.");
                  });
              }}>
              Submit
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                //Removes Item form React App
                this.props.removeFromList(ind);
              }}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                //Moves to end of list
                this.props.moveToBack(ind);
              }}>
              Postpone
            </button>
          </li>
        );
      }
    });

    return (
      <div className="rightBar col-xs-6">
        <h3>List of Jobs: {this.props.tasks.length}</h3>
        <h3>
          Number of Jobs Applied to Today: {this.state.numberAppliedToday}
        </h3>
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.clearList();
            }}>
            Clear List
          </button>
        </div>
        <div className="row"></div>
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
