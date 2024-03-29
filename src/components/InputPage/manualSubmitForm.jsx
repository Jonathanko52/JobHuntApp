import React from "react";

const ManualSubmitForm = (props) => {
  return (
    <div>
      <p className="text-center mt-3">
        Fill the fields below to add a job posting to the list
      </p>
      <div className="LeftSubBar">
        <h4>Website</h4>
        <select
          ref={props.webRef}
          className="WebsiteInput TaskInput"
          onChange={(e) => {
            props.handleChangeWebsite(e);
          }}>
          <option value="Wellfound">Wellfound</option>
          <option value="Indeed" selected>Indeed</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Simplify">
          Simplify
          </option>
          <option value="Hacker News">
            Hacker News
          </option>
          <option value="Other">Other</option>
        </select>
        <h4>Title</h4>
        <input
          ref={props.titleRef}
          className="TitleInput TaskInput"
          onChange={(e) => {
            props.handleChangeTitle(e);
          }}
        />
        <h4>Company</h4>
        <input
          ref={props.compRef}
          className="CompanyInput TaskInput"
          onChange={(e) => {
            props.handleChangeCompany(e);
          }}
        />
        <h4>Location</h4>
        <input
          ref={props.locRef}
          className="LocationInput TaskInput"
          onChange={(e) => {
            props.handleChangeLocation(e);
          }}
        />
        <h4>Link</h4>
        <input
          ref={props.linkRef}
          className="LinkInput TaskInput"
          onChange={(e) => {
            props.handleChangeLink(e);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            props.addToList();
            props.webRef.current.value = "Indeed";
            props.compRef.current.value = "";
            props.titleRef.current.value = "";
            props.locRef.current.value = "";
            props.linkRef.current.value = "";
            props.recruiterRef.current.value = "";
          }}>
          Add
        </button>
        <h4>Recruiter/Job Poster Profile</h4>
        <input
          ref={props.recruiterRef}
          className="LinkInput TaskInput"
          onChange={(e) => {
            props.priorityInput(e);
          }}
        />
      </div>
    </div>
  );
};

export default ManualSubmitForm;
