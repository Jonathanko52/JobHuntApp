import React from "react";

const SheetRow = (props) => {
  return (
    <div>
      <div className="col-xs-10 d-flex justify-content-center pt-5">
        <div className="container">
          <div className="row">
            <div className="text-center col-xs-5">
              <button
                className="btn btn-primary"
                onClick={() => {
                  let result = props.getAllOfSheet(props.spreadSheetId);
                  console.log(result);
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

export default SheetRow;
