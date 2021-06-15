import React from "react";

const SheetRow = (props) => {
  let JobPostingSource = props.data[0];
  let Company = props.data[1];
  let PositionTitle = props.data[2];
  let Date = props.data[3];
  let Location = props.data[4];
  // let CoverLetter = props.data[5];
  // let InterviewPage = props.data[6];
  let PositionLink = props.data[7];
  let rowNum = props.num;
  return (
    <div className="row border border-secondary">
      <div className="col-1 pt-2 border border-secondary">
        {JobPostingSource}
      </div>
      <div className="col-1 pt-2 pr-4  border border-secondary">{Company}</div>
      <div className="col-2 pt-2 border border-secondary">{PositionTitle}</div>
      <div className="col-2 pt-2 border border-secondary">{Date}</div>
      <div className="col-1 pt-2 border border-secondary">{Location}</div>
      <div
        className="col-2 pt-2 border border-secondary"
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
          value="Yes"
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
        <select name="InterviewStatus">
          <option value="Applied">Applied</option>
          <option value="Phoned">Phone Screened</option>
          <option value="Technicaled">Technical</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="col-2 pt-2 border border-secondary">
        <a href={PositionLink}>Link to Site</a>
      </div>
    </div>
  );
};

export default SheetRow;
