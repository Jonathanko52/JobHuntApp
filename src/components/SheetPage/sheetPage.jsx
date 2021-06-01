import React from "react";
import Sheetrow from "../presentational/sheetrow.jsx";
import Sheetheader from "../presentational/sheetRowHeader.jsx";
import SheetControlPanel from "../presentational/sheetControlPanel.jsx";

const SheetPage = (props) => {
  let sheetcontents = [];
  props.fullSheetData.forEach((cur, ind) => {
    if (ind >= 1) {
      sheetcontents.push(
        <Sheetrow
          data={cur}
          num={ind}
          key={ind}
          updateColumnOfSheet={props.updateColumnOfSheet}
          spreadSheetId={props.spreadSheetId}></Sheetrow>
      );
    }
  });

  return (
    <div className="col-xs-10 d-flex justify-content-center pt-5">
      <div className="container ml-4">
        <Sheetheader></Sheetheader>
        {sheetcontents}
        <SheetControlPanel
          spreadSheetId={props.spreadSheetId}
          changeLocalSheet={props.changeLocalSheet}
          getAllOfSheet={props.getAllOfSheet}
          changeGoogleSheet={props.changeGoogleSheet}
          updateColumnOfSheet={props.updateColumnOfSheet}></SheetControlPanel>
      </div>
    </div>
  );
};

export default SheetPage;
