import React from "react";

const SheetControlPanel = (props) => {
  return (
    <div className="text-center row">
      <div className="">
        <button
          className="btn btn-primary"
          onClick={() => {
            props.getAllOfSheet(props.spreadSheetId);
          }}>
          Retrieve Sheet Data
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
            props.updateColumnOfSheet();
            console.log("update column test");
          }}>
          update column of sheet
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            props.changeGoogleSheet();
          }}>
          change Google Sheet
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            props.changeLocalSheet();
          }}>
          change Local Sheet
        </button>
        <div
          className="col-2  border border-secondary"
          onChange={(e) => {
            props.handleSheetParameters(e.target.value);
          }}>
          Show contents of sheet form the last number of days:
          <select name="InterviewStatus">
            <option value="7">7</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="999">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SheetControlPanel;
