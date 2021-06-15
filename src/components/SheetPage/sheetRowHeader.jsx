import React from "react";

const SheetRowHeader = (props) => {
  return (
    <div className="row border border-secondary">
      <div className="col-1  border border-secondary">Job Posting Source</div>
      <div className="col-2  border border-secondary">Company</div>
      <div className="col-2  border border-secondary">Position Title</div>
      <div className="col-1  border border-secondary">Date</div>
      <div className="col-2  border border-secondary">Location</div>
      <div className="col-1  border border-secondary">
        Cover Letter Included
      </div>
      <div className="col-2  border border-secondary">Interview Phase</div>
      <div className="col-2 border border-secondary">Link to Site</div>
    </div>
  );
};

export default SheetRowHeader;
