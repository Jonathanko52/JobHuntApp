import React from "react";
import Sheetrow from "./../presentational/sheetrow.jsx";
import Sheetheader from "./../presentational/sheetRowHeader.jsx";
const SheetPage = (props) => {
  let sheetcontents = [];
  props.fullSheetData.forEach((cur, ind) => {
    if (ind >= 1) {
      sheetcontents.push(
        <Sheetrow
          data={cur}
          num={ind}
          key={ind}
          updateColumnOfSheet={props.updateColumnOfSheet}></Sheetrow>
      );
    }
  });

  return (
    <div className="col-xs-10 d-flex justify-content-center pt-5">
      <div className="container ml-4">
        <Sheetheader></Sheetheader>
        {sheetcontents}
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
      </div>
    </div>
  );
};

export default SheetPage;
