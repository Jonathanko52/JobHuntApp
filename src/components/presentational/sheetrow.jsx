import React from "react";

const SheetRow = (props) => {
  console.log(props.data);
  return (
    <div>
      <div className="">{props.data[0]}</div>
      <div className="">{props.data[1]}</div>
      <div className="">{props.data[2]}</div>
      <div className="">{props.data[3]}</div>
      <div className="">{props.data[4]}</div>
      <div className="">{props.data[5]}</div>
      <div className="">{props.data[6]}</div>
      <div className="">{props.data[7]}</div>
    </div>
  );
};

export default SheetRow;
