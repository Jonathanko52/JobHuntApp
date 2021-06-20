import React from "react";

const SheetControlPanel = (props) => {
  return (
    <div className="text-center row m-4 ">
      <button
        className="btn btn-primary"
        onClick={() => {
          props.getAllOfSheet(props.spreadSheetId, props.sheetParameters);
        }}>
        Retrieve Sheet Data
      </button>

      <button
        className="btn btn-primary"
        onClick={() => {
          props.updateColumnOfSheet();
        }}>
        Update column of sheet
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          props.changeGoogleSheet();
        }}>
        Change Google Sheet
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          props.changeLocalSheet();
        }}>
        change Local Sheet
      </button>

      <div
        className="border border-secondary SheetPageDate"
        onChange={(e) => {
          props.handleSheetParameters(e.target.value);
        }}>
        Show contents of sheet from the last
        <select className="mx-2 text-dark">
          <option value="7">7</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="999">All</option>
        </select>
        days:
      </div>
    </div>
  );
};

export default SheetControlPanel;
