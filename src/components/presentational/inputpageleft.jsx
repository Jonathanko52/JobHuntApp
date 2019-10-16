import React from "react";

const LeftPage = props => {
  // let total = "N/A";
  // if (props.totalJobsFromSheets > 0) {
  //   total = props.totalJobsFromSheets;
  // }
  //Input boxes that take in input regarding relevant information to a job application.
  return (
    <div className="leftBar col-xs-6">
      <p className="text-center mt-3">
        Fill the fields below to add a job posting to the list
      </p>
      <div className="LeftSubBar">
        <h4>Website</h4>
        <select
          ref={props.webRef}
          className="WebsiteInput TaskInput"
          onChange={e => {
            props.handleChangeWebsite(e);
          }}
        >
          <option value="Angelist">Angelist</option>
          <option value="Indeed">Indeed</option>
          <option selected="selected" value="LinkedIn">
            LinkedIn
          </option>
        </select>
        <h4>Company</h4>
        <input
          ref={props.compRef}
          className="CompanyInput TaskInput"
          onChange={e => {
            props.handleChangeCompany(e);
          }}
        />
        <h4>Title</h4>
        <input
          ref={props.titleRef}
          className="TitleInput TaskInput"
          onChange={e => {
            props.handleChangeTitle(e);
          }}
        />
        <h4>Location</h4>
        <input
          ref={props.locRef}
          className="LocationInput TaskInput"
          onChange={e => {
            props.handleChangeLocation(e);
          }}
        />
        <h4>Link</h4>
        <input
          ref={props.linkRef}
          className="LinkInput TaskInput"
          onChange={e => {
            props.handleChangeLink(e);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            props.addToList();
            props.webRef.current.value = "LinkedIn";
            props.compRef.current.value = "";
            props.titleRef.current.value = "";
            props.locRef.current.value = "";
            props.linkRef.current.value = "";
          }}
        >
          Add
        </button>
      </div>
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
          onChange={e => {
            props.handleChangeDirectWebsite(e);
          }}
        >
          <option value="Indeed">Indeed</option>
          <option selected="selected" value="LinkedIn">
            LinkedIn
          </option>
          <option value="BuiltInLA">BuiltInLA</option>
        </select>

        <h4>Link</h4>
        <input
          ref={props.directLinkRef}
          className="CompanyInput TaskInput"
          onChange={e => {
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
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default LeftPage;
