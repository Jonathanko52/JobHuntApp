import React from "react";
import Sheetrow from "./../presentational/sheetrow.jsx";
import Sheetheader from "./../presentational/sheetRowHeader.jsx";
const SheetPage = (props) => {
  let sheetcontents = [];
  props.fullSheetData.forEach((cur, ind) => {
    if (ind >= 1) {
      sheetcontents.push(<Sheetrow data={cur} key={ind}></Sheetrow>);
    }
  });

  return (
    <div className="col-xs-10 d-flex justify-content-center pt-5">
      <div className="container ml-4">
        <Sheetheader></Sheetheader>
        {sheetcontents}
        <div className="text-center col-xs-5">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.getAllOfSheet(props.spreadSheetId);
            }}>
            getAllOfSheet
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
            changeGoogleSheet{" "}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              props.changeLocalSheet();
            }}>
            changeLocalSheet
          </button>
          <p className="mt-3">
            Your Spreadsheet Id is:<br></br>
          </p>
          <p className="mt-3">
            Check out your spreadsheet yourself at:
            <br></br>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SheetPage;
