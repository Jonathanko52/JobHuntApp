import React from "react";

const SheetPage = (props) => {
  return (
    <div>
      <div className="LandingPage col-xs-10 d-flex justify-content-center pt-5">
        <div className="container">
          <div className="row">
            <div className="text-center col-xs-5 LandingPageLeftCol ">
              <p>
                Thank you, you are now connected with your google account. If
                this is your first time, click on the Create Sheet button below
                to create a spreadsheet that will store all your submitted
                information regarding your job hunt, then, clicked on the Input
                Jobs on the left to get started. Good Luck!
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  props.createSheet();
                }}>
                Create Sheet
              </button>
              <p className="mt-3">
                Your Spreadsheet Id is:<br></br>
                {props.spreadSheetId}
              </p>
              <p className="mt-3">
                Check out your spreadsheet yourself at:
                <br></br>
                <a
                  href={`https://docs.google.com/spreadsheets/d/${props.spreadSheetId}/edit#gid=2094364220`}
                  target="_blank">
                  https://docs.google.com/spreadsheets/d/{props.spreadSheetId}
                  /edit#gid=2094364220
                </a>
              </p>
            </div>
            <div className="col-xs-1"></div>
            <div className="text-center col-xs-5 LandingPageRightCol ">
              <p>
                If you're a return user, your spreadsheet address should be
                saved to your browser. Otherwise, enter the ID of your
                spreadsheet below to re-connect the App.
              </p>
              <input
                onChange={(e) => {
                  props.handleSpreadsheetIdSubmit(e);
                }}></input>
              <button
                className="btn btn-primary"
                onClick={() => {
                  let tempSpreadsheetID = localStorage.getItem("SpreadSheetId");
                  tempSpreadsheetID = tempSpreadsheetID.replace(/['"]+/g, "");
                  props.setSpreadsheetId(tempSpreadsheetID);
                }}>
                Retrieve ID
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  props.setSpreadsheetIdFromTemp();
                  localStorage.setItem(
                    "SpreadSheetId",
                    JSON.stringify(props.tempSpreadsheetID)
                  );
                }}>
                Submit ID
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetPage;
