import React from "react";

const SheetRow = (props) => {
  return (
    <div className="row border border-secondary">
      <div className="col-1  border border-secondary">{props.data[0]}</div>
      <div className="col-1  border border-secondary">{props.data[1]}</div>
      <div className="col-1  border border-secondary">{props.data[2]}</div>
      <div className="col-1  border border-secondary">{props.data[3]}</div>
      <div className="col-1  border border-secondary">{props.data[4]}</div>
      <div className="col-1  border border-secondary">{props.data[5]}</div>
      <div className="col-1  border border-secondary">{props.data[6]}</div>
      <div className="col-1 border border-secondary">
        <a href={props.data[7]}>Link to Site</a>
        {props.data[7]}
      </div>
    </div>
  );
};

export default SheetRow;
