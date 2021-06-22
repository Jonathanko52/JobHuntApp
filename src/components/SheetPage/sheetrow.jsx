import React from "react";

const SheetRow = (props) => {
  let JobPostingSource = props.data[0];
  let Company = props.data[1];
  let PositionTitle = props.data[2];
  let Date = props.data[3];
  let Location = props.data[4];
  let CoverLetter = props.data[5];
  let InterviewPage = props.data[6];
  let PositionLink = props.data[7];
  let rowNum = props.num;

  //HTML to be dynamically rendered
  let coverLetterArray;
  let interviewArray;

  function setCoverLetterSelect() {
    let states = ["Yes", "No"];
    states = states.map((cur) => {
      if (cur === CoverLetter) {
        return (
          <input
            type="radio"
            name="CoverLetter"
            className="CoverInput RadioInput"
            value={cur}
            selected={true}>
            {cur}
          </input>
        );
      } else {
        return (
          <input
            type="radio"
            name="CoverLetter"
            className="CoverInput RadioInput"
            value={cur}>
            {cur}
          </input>
        );
      }
    });
    return states;
  }

  function setInterviewPageSelect() {
    let states = [
      "Applied",
      "Phone Screen Scheduled",
      "Technical Interview Scheduled",
      "Rejected",
    ];

    states = states.map((cur) => {
      console.log("TEST");
      if (cur === InterviewPage) {
        console.log("IF");
        return (
          <option value={cur} selected={true}>
            {cur}
          </option>
        );
      } else {
        console.log("ELSE");
        return <option value={cur}>{cur}</option>;
      }
    });
    return states;
  }

  interviewArray = setInterviewPageSelect();

  return (
    <div className="row border border-secondary">
      <div className="col-1 pt-1 border border-secondary">
        {JobPostingSource}
      </div>
      <div className="col-2 pt-2 pr-4  border border-secondary">{Company}</div>
      <div className="col-2 pt-2 border border-secondary">{PositionTitle}</div>
      <div className="col-1 pt-1 border border-secondary">{Date}</div>
      <div className="col-2 pt-2 border border-secondary">{Location}</div>
      <div
        className="col-1 pt-1 border border-secondary"
        onChange={(e) => {
          props.updateColumnOfSheet(
            e.target.value,
            rowNum,
            "F",
            props.spreadSheetId
          );
        }}>
        <input
          type="radio"
          name="CoverLetter"
          className="CoverInput RadioInput"
        />
        Yes
        <br></br>
        <input
          type="radio"
          name="CoverLetter"
          className="CoverInput RadioInput"
          value="No"
        />
        No
      </div>
      <div
        className="col-2 pt-2  border border-secondary"
        onChange={(e) => {
          props.updateColumnOfSheet(
            e.target.value,
            rowNum,
            "G",
            props.spreadSheetId
          );
        }}>
        <select name="InterviewStatus">{interviewArray}</select>
      </div>
      <div className="col-1 pt-2 border border-secondary">
        <a href={PositionLink}>Link to Site</a>
      </div>
    </div>
  );
};

export default SheetRow;
