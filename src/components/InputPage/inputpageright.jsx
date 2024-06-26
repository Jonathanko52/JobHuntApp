import React from "react";
import TaskItem from "./taskItem.jsx";

class RightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberAppliedToday: 0,
      numberAppliedTodayCover:0,
      recruiterInput: "Yes",
      coverInput: "Yes",
      interviewInput: "Submitted",
    };
    //binding handle change functions
    this.handleChangeRecruiter = this.handleChangeRecruiter.bind(this);
    this.handleChangeCover = this.handleChangeCover.bind(this);
    this.increaseNumberAppliedToday = this.increaseNumberAppliedToday.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
  }

  //handle changes to "Recruiter" value

  handleChangeRecruiter(event) {
    this.setState({ recruiterInput: event.target.value });
  }

  //handle changes to "Cover value"

  handleChangeCover(event) {
    this.setState({ coverInput: event.target.value });
  }
  handleChangePriority(event) {
    
  }

  handleChangeInterview(event) {
    this.setState({ interviewInput: event.target.value });
  }

  increaseNumberAppliedToday() {
    this.setState((state) => {
      let newCoverAppliedToday = state.numberAppliedTodayCover
      let newAppliedToday = state.numberAppliedToday
      if(state.coverInput === "Yes"){
        newCoverAppliedToday++
      }
      newAppliedToday++
    return {
      numberAppliedTodayCover: newCoverAppliedToday,
      numberAppliedToday: newAppliedToday
    }});
  }

  render() {
    let Array = [];
    this.props.tasks.forEach((cur, ind) => {
      if (cur) {
        Array.push(
          <TaskItem
            key={ind}
            companyLinkInput={cur.companyLinkInput}
            companyInput={cur.companyInput}
            titleInput={cur.titleInput}
            locationInput={cur.locationInput}
            handleChangeCover={this.handleChangeCover}
            handlePriorityInput={this.props.handlePriorityInput}
            linkInput={cur.linkInput}
            spreadSheetId={this.props.spreadSheetId}
            updateTotalJobsFromSheets={this.props.updateTotalJobsFromSheets}
            websiteInput={cur.websiteInput}
            companyInput={cur.companyInput}
            titleInput={cur.titleInput}
            coverInput={this.state.coverInput}
            interviewInput={this.state.interviewInput}
            increaseNumberAppliedToday={this.increaseNumberAppliedToday}
            removeFromList={this.props.removeFromList}
            moveToBack={this.props.moveToBack}
            moveDownInList={this.props.moveDownInList}
            moveUpInList={this.props.moveUpInList}
            index={ind}></TaskItem>
        );
      }
    });

    return (
      <div className="rightBar col-xs-6 text-center mt-3">
        <h4>List of Jobs: {this.props.tasks.length}</h4>
        <h4>
          Number of Jobs Applied to Today: {this.state.numberAppliedToday}
        </h4>
  
        <div className="row">
          <div className="d-flex justify-content-center" id="BUtton Row">
            <button
                className="btn btn-primary"
                onClick={() => {
                  // console.log(this.props.tasks)
                  console.log("TEST", this.increaseNumberAppliedToday())
                  
                }}>
                log state
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.props.clearList();
                }}>
                Clear List
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  let addToList = false;
                  addToList = window.confirm(
                    "Are you sure you want to save the jobs you haven't applied to yet to sheets?"
                  );
                  if (addToList) {
                    this.props.saveTasklistToGoogleUnapplied();
                  }
                }}>
                Save To Google
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  let addToList = false;
                  addToList = window.confirm(
                    "Do you want to load your unapplied positions from sheets?"
                  );
                  if (addToList) {
                    this.props.loadTasklistFromGoogleUnapplied();
                  }
                }}>
                Load From Google
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  let addToList = false;
                  addToList = window.confirm(
                    "Are you sure you want to wipe the google unapplied list?"
                  );
                  if (addToList) {
                    this.props.clearTasklistFromGoogleUnapplied();
                  }
                }}>
                Clear Google
              </button>
          </div>
        </div>
        <div className="row"></div>
        <ol className="TaskTable">{Array}</ol>
      </div>
    );
  }
}

export default RightPage;
