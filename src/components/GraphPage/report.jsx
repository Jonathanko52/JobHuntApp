import React from "react";

const Report = (props) => {
  let Data = props.ReportData;
  let ReportArray = [];
  Data.forEach((cur) => {
    ReportArray.push(
      <div class="row">
        {/* Website */}
        <div class="col-1 border">{cur[0]}</div>
        {/* Company */}
        <div class="col-2 border">{cur[1]}</div>
        {/* Position */}
        <div class="col-2 border">{cur[2]}</div>
        {/* Date */}
        <div class="col-1 border">{cur[3]}</div>
        {/* Location */}
        <div class="col-2 border">{cur[4]}</div>
        {/* Cover Letter */}
        <div class="col-1 border">{cur[5]}</div>
        {/* Interview */}
        <div class="col-1 border">{cur[6]}</div>
        {/* Url */}
        <div class="col-2 border">
          <a href={cur[7]}>{cur[1]}</a>
        </div>
      </div>
    );
  });

  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Test</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-1 border">Website</div>
        <div class="col-2 border">Company</div>
        <div class="col-2 border">Position</div>
        <div class="col-1 border">Date</div>
        <div class="col-2 border">Location</div>
        <div class="col-1 border">Cover Letter Included</div>
        <div class="col-2 border">Interview Phase</div>
        <div class="col border">URL</div>
      </div>
      <div>{ReportArray}</div>
    </div>
  );
};

export default Report;
