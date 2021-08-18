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
          <option value="Angelist">Angelist</option>
          <option value="Indeed">Indeed</option>
          <option value="LinkedIn">LinkedIn</option>
          <option defaultValue="selected" value="Hacker News">
            Hacker News
          </option>
          <option value="Other">Other</option>
        </select>
        <h4>Company</h4>
        <input
          ref={props.compRef}
          className="CompanyInput TaskInput"
          onChange={(e) => {
            props.handleChangeCompany(e);
          }}
        />
        <h4>Title</h4>
        <input
          ref={props.titleRef}
          className="TitleInput TaskInput"
          onChange={(e) => {
            props.handleChangeTitle(e);
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
            props.webRef.current.value = "LinkedIn";
            props.compRef.current.value = "";
            props.titleRef.current.value = "";
            props.locRef.current.value = "";
            props.linkRef.current.value = "";
          }}>
          Add
        </button>
        <h4>Recruiter/Job Poster Profile</h4>
        <input
          ref={props.linkRef}
          className="LinkInput TaskInput"
          onChange={(e) => {
            props.additionalInput1(e);
          }}
        />
        <h4>Additional Input Field</h4>
        <input
          ref={props.linkRef}
          className="LinkInput TaskInput"
          onChange={(e) => {
            props.additionalInput2(e);
          }}
        />
        <h4>Additional Input Field</h4>
        <input
          ref={props.linkRef}
          className="LinkInput TaskInput"
          onChange={(e) => {
            props.additionalInput3(e);
          }}
        />
        <h4>Additional Input Field</h4>
        <input
          ref={props.linkRef}
          className="LinkInput TaskInput"
          onChange={(e) => {
            props.additionalInput4(e);
          }}
        />
        <h4>Additional Input Field</h4>
        <input
          ref={props.linkRef}
          className="LinkInput TaskInput"
          onChange={(e) => {
            props.additionalInput5(e);
          }}
        />
      </div>
    </div>
  );
};

export default ManualSubmitForm;
