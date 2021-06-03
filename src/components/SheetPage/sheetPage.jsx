import React from "react";
import Sheetrow from "./sheetrow.jsx";
import Sheetheader from "./sheetRowHeader.jsx";
import SheetControlPanel from "./sheetControlPanel.jsx";

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
          sheetParameters={props.sheetParameters}
          spreadSheetId={props.spreadSheetId}
          changeLocalSheet={props.changeLocalSheet}
          getAllOfSheet={props.getAllOfSheet}
          changeGoogleSheet={props.changeGoogleSheet}
          updateColumnOfSheet={props.updateColumnOfSheet}
          handleSheetParameters={
            props.handleSheetParameters
          }></SheetControlPanel>
      </div>
    </div>
  );
};

export default SheetPage;
