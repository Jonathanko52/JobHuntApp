import React from "react";
import Sheetrow from "./../presentational/sheetrow.jsx";
const SheetPage = (props) => {
  let sheetcontents = [];
  props.fullSheetData.forEach((cur, ind) => {
    sheetcontents.push(<Sheetrow data={cur} key={ind}></Sheetrow>);
  });

  return (
    <div>
      <div className="col-xs-10 d-flex justify-content-center pt-5">
        <div className="container">
          {sheetcontents}
          <div className="row">
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
              <p className="mt-3">
                Your Spreadsheet Id is:<br></br>
              </p>
              <p className="mt-3">
                Check out your spreadsheet yourself at:
                <br></br>
              </p>
            </div>
            <div className="col-xs-1"></div>
            <div className="text-center col-xs-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetPage;
