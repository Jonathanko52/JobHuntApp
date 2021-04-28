import React from "react";

const TaskItem = (props) => (
  <li>
    <b>Source Website: </b> {props.websiteInput}
    <br />
    <b>Company Name: </b>
    <a href={props.companyLinkInput} target="_blank">
      {props.companyInput}
    </a>
    <br />
    <b>Job Title: </b> {props.titleInput}
    <br />
    <b>Location Input: </b> {props.locationInput}
    <br />
    <b>Cover Letter:</b>
    <form>
      <input
        type="radio"
        name="CoverLetter"
        className="CoverInput RadioInput"
        onChange={(e) => {
          props.handleChangeCover(e);
        }}
        value="Yes"
      />
      Yes
      <input
        type="radio"
        name="CoverLetter"
        className="CoverInput RadioInput"
        onChange={(e) => {
          props.handleChangeCover(e);
        }}
        value="No"
      />
      No
    </form>
    <b href>Link:</b>
    <a href={props.linkInput} target="_blank">
      {props.linkInput}
    </a>
    <br />
    <button
      className="btn btn-primary"
      onClick={() => {
        //variable that indicates first empty row in sheet
        let emptyRow;
        let spreadsheetId = props.spreadSheetId;
        //first google api call that finds first empty row (well, first with empty cell in column A)
        gapi.client.sheets.spreadsheets.values
          .get({
            spreadsheetId: spreadsheetId,
            range: "Jobs!A1:A1000",
          })
          .then((response) => {
            var result = response.result;
            emptyRow = result.values.length + 1;
            props.updateTotalJobsFromSheets(emptyRow);
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
                      props.websiteInput,
                      props.companyInput,
                      props.titleInput,
                      `${new Date().getMonth() + 1}/${new Date().getDate()}`,
                      props.locationInput,
                      props.coverInput,
                      props.interviewInput,
                      props.linkInput,
                    ],
                  ],
                },
              })
              .then((response) => {
                //Removes item added to sheet from React App
                props.increaseNumberAppliedToday();
                props.removeFromList(ind);
                alert("Submitted successfully to google sheets");
              })
              .catch((err) => {
                alert("Submission Failed Inner in task Item.");
              });
          })
          .catch((err) => {
            alert("Submission Failed Outter in task Item.");
          });
      }}>
      Submit
    </button>
    <button
      className="btn btn-primary"
      onClick={() => {
        //Removes Item form React App
        props.removeFromList(props.index);
      }}>
      Cancel
    </button>
    <button
      className="btn btn-primary"
      onClick={() => {
        //Moves to end of list
        props.moveToBack(props.index);
      }}>
      Postpone
    </button>
  </li>
);

export default TaskItem;
