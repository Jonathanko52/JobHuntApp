import React from "react";

const SheetRow = (props) => {
  return (
    <div className="row border border-secondary">
      <div className="col-xs-12">{props.data[0]}</div>
      <div className="col-xs-12">{props.data[1]}</div>
      <div className="col-xs-12">{props.data[2]}</div>
      <div className="col-xs-12">{props.data[3]}</div>
      <div className="col-xs-12">{props.data[4]}</div>
      <div className="col-xs-12">{props.data[5]}</div>
      <div className="col-xs-12">{props.data[6]}</div>
      <div className="col-xs-12">{props.data[7]}</div>
    </div>
  );
};

export default SheetRow;
