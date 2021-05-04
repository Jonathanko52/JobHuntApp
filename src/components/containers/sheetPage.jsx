import React from "react";
import sheetrow from "./../presentational/sheetrow.jsx";
const SheetPage = (props) => {
  let sheetcontents = [];
  console.log(props);
  // props.fullSheetData.forEach((cur) => {
  //   sheetcontents.push(sheetrow);
  // });

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
