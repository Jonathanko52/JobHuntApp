import React from "react";
import ManualSubmitForm from "./manualSubmitForm.jsx";

const LeftPage = (props) => {
  //Input boxes that take in input regarding relevant information to a job application.
  return (
    <div className="leftBar col-xs-6">
      <ManualSubmitForm></ManualSubmitForm>
      <h3 className="text-center"> OR </h3>
      <p className="text-center mt-4">
        Copy and paste the url of the job page (Currently supports LinkedIn and
        Indeed).
      </p>
      <div className="LeftSubBar">
        <h4>Website</h4>

        <select
          ref={props.directWebRef}
          className="WebsiteInput TaskInput"
          onChange={(e) => {
            props.handleChangeDirectWebsite(e);
          }}>
          <option value="Indeed">Indeed</option>
          <option defaultValue="selected" value="LinkedIn">
            LinkedIn
          </option>
          <option value="BuiltInLA">BuiltInLA</option>
          <option value="Angelist">Angelist</option>
        </select>

        <h4>Link</h4>
        <input
          ref={props.directLinkRef}
          className="CompanyInput TaskInput"
          onChange={(e) => {
            props.handleChangeDirectLink(e);
          }}
        />

        <button
          className="btn btn-primary"
          onClick={() => {
            props.directLinkRef.current.value = "";

            if (props.directWebsiteInput === "LinkedIn") {
              props.retrieveHtmlLinkedin();
            } else if (props.directWebsiteInput === "Indeed") {
              props.retrieveHtmlIndeed();
            } else if (props.directWebsiteInput === "BuiltInLA") {
              props.retrieveHtmlBuiltInLA();
            } else if (props.directWebsiteInput === "Angelist") {
              props.retrieveHtmlAngelist();
            }
          }}>
          Add
        </button>
      </div>
    </div>
  );
};

export default LeftPage;
