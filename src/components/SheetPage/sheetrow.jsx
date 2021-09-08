import React from "react";

const SheetRow = (props) => {
  console.log(props.data);
  //Table values
  let JobPostingSource = props.data[0];
  let Company = props.data[1];
  let PositionTitle = props.data[2];
  let Date = props.data[3];
  let Location = props.data[4];
  let CoverLetter = props.data[5];
  let InterviewPage = props.data[6];
  let PositionLink = props.data[7];
  let rowNum = props.data[8];

  //Table values set in HTML to be dynamically rendered
  let coverLetterArray;
  let interviewPhaseArray;

  function setCoverLetterSelect() {
    let states = ["Yes", "No"];
    states = states.map((cur) => {
      if (cur === CoverLetter) {
        return (
          <div>
            <input
              type="radio"
              name="CoverLetter"
              className="CoverInput RadioInput"
              value={cur}
              checked={true}
            />
            <label>{cur}</label>
          </div>
        );
      } else {
        return (
          <div>
            <input
              type="radio"
              name="CoverLetter"
              className="CoverInput RadioInput"
              value={cur}
            />
            <label>{cur}</label>
          </div>
        );
      }
    });
    return states;
  }

  function setInterviewPhaseSelect() {
    let states = [
      "Submitted",
      "Phone Screen Scheduled",
      "Technical Interview Scheduled",
      "Rejected",
    ];

    states = states.map((cur) => {
      if (cur === InterviewPage) {
        return (
          <option value={cur} selected={true}>
            {cur}
          </option>
        );
      } else {
        return <option value={cur}>{cur}</option>;
      }
    });
    console.log("STATES", states);
    return states;
  }

  interviewPhaseArray = setInterviewPhaseSelect();
  coverLetterArray = setCoverLetterSelect();

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
        {coverLetterArray}
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
        <select className="col-12" name="InterviewStatus">
          {interviewPhaseArray}
        </select>
      </div>
      <div className="col-1 pt-2 border border-secondary">
        <a href={PositionLink}>Link to Site</a>
      </div>
    </div>
  );
};

export default SheetRow;
