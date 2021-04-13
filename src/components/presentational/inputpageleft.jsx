import React from "react";
import ManualSubmitForm from "./manualSubmitForm.jsx";
import AutoSubmitForm from "./autoSubmitForm.jsx";
const LeftPage = (props) => {
  //Input boxes that take in input regarding relevant information to a job application.
  return (
    <div className="leftBar col-xs-6">
      <ManualSubmitForm></ManualSubmitForm>
      <h3 className="text-center"> OR </h3>
      <AutoSubmitForm></AutoSubmitForm>
    </div>
  );
};

export default LeftPage;
