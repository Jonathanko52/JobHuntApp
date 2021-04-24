import React from "react";
import taskItem from "./taskItem.jsx";

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
          <taskItem
            key={ind}
            websiteInput={cur.websiteInput}
            companyLinkInput={cur.companyLinkInput}
            companyInput={cur.companyInput}
            titleInput={cur.titleInput}
            locationInput={cur.locationInput}
            handleChangeCover={this.handleChangeCover}
            linkInput={cur.linkInput}
            spreadSheetId={this.props.spreadSheetId}
            updateTotalJobsFromSheets={this.props.updateTotalJobsFromSheets(
              emptyRow
            )}
            websiteInput={cur.websiteInput}
            companyInput={cur.companyInput}
            titleInput={cur.titleInput}
            coverInput={this.state.coverInput}
            interviewInput={this.state.interviewInput}
            increaseNumberAppliedToday={this.increaseNumberAppliedToday}
            removeFromList={this.props.removeFromList}
            moveToBack={this.props.moveToBack}
            index={ind}></taskItem>
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
          <button
            onClick={() => {
              let addToList = false;
              addToList = window.confirm(
                "Are you sure you want to load from sheets"
              );
              if (addToList) {
                this.props.saveToGoogleSheets();
              }
            }}>
            Save To Google
          </button>
          <button
            onClick={() => {
              let addToList = false;
              addToList = window.confirm(
                "Are you sure you want to load from sheets"
              );
              if (addToList) {
                this.props.loadFromGoogleSheets;
              }
            }}>
            Load From Google
          </button>
        </div>
        <div className="row"></div>
        <ol className="TaskTable">{Array}</ol>
      </div>
    );
  }
}

export default RightPage;
