import React from "react";

const SheetPage = (props) => {
  return (
    <div>
      <div className="col-xs-10 d-flex justify-content-center pt-5">
        <div className="container">
          <div className="row">
            <div className="text-center col-xs-5">
              <button
                className="btn btn-primary"
                onClick={() => {
                  props.getAllOfSheet();
                }}>
                getAllOfSheet
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  props.updateColumnOfSheet();
                }}>
                getAllOfSheet
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
