import React from "react";
import { Link } from "react-router-dom";

const LeftPage = props => {
  let total = "N/A";
  if (props.totalJobsFromSheets > 0) {
    total = props.totalJobsFromSheets;
  }
  //Input boxes that take in input regarding relevant information to a job application.
  return (
    <div className="leftBar col-xs-6">
      <h3>Total Jobs at this point: {total}</h3>
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
        Done
      </button>
      <div className="DirectWebSelect">
        <h4>Website</h4>

        <select
          ref={props.directWebRef}
          className="WebsiteInput TaskInput"
          onChange={e => {
            props.handleChangeDirectWebsite(e);
          }}
        >
          <option value="Angelist">Angelist</option>
          <option value="Indeed">Indeed</option>
          <option selected="selected" value="LinkedIn">
            LinkedIn
          </option>
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
            } else if (props.directWebsiteInput === "Angelist") {
              props.retrieveHtmlAngelist();
            }
          }}
        >
          HttpRequest
        </button>
      </div>
    </div>
  );
};

export default LeftPage;
