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
          get All Of Sheet
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
      </div>
    </div>
  );
};

export default SheetControlPanel;
