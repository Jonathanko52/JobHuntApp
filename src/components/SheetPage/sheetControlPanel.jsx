import React from "react";

const SheetControlPanel = (props) => {
  return (
    <div className="text-center row">
      <div className="">
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
          Show contents of sheet from the last
          <select name="SheetPageDate">
            <option value="7">7</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="999">All</option>
          </select>
          days:
        </div>
      </div>
    </div>
  );
};

export default SheetControlPanel;
