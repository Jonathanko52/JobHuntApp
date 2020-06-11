import React from "react";

const Report = (props) => {
  let Data = props.ReportData;
  let ReportArray = [];
  Data.forEach((cur) => {
    ReportArray.push(
      <div class="row">
        {/* Website */}
        <div class="col">{cur[0]}</div>
        {/* Company */}
        <div class="col">{cur[1]}</div>
        {/* Position */}
        <div class="col">{cur[2]}</div>
        {/* Date */}
        <div class="col">{cur[3]}</div>
        {/* Location */}
        <div class="col">{cur[4]}</div>
        {/* Cover Letter */}
        <div class="col">{cur[5]}</div>
        {/* Interview */}
        <div class="col">{cur[6]}</div>
        {/* Url */}
        <a href={cur[7]}>{cur[1]}</a>
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
        <div class="col">Website</div>
        <div class="col">Company</div>
        <div class="col">Position</div>
        <div class="col">Date</div>
        <div class="col">Location</div>
        <div class="col">Cover Letter Included</div>
        <div class="col">Interview Phase</div>
        <div class="col">URL</div>
      </div>
      <div>{ReportArray}</div>
    </div>
  );
};

export default Report;
