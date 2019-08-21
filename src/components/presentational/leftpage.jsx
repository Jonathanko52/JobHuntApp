import React from "react";
import { Link } from "react-router-dom";

const LeftPage = props => {
  let total = "N/A";
  if (props.totalJobsFromSheets > 0) {
    total = props.totalJobsFromSheets + 150;
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
      <button
        className="btn btn-primary"
        onClick={() => {
          let url;
          url = props.linkRef.current.value.split("/");
          let test = props.retrieveHtml(url[url.length - 2]);
          console.log("test", test);
        }}
      >
        HttpRequest
      </button>
    </div>
  );
};

export default LeftPage;
