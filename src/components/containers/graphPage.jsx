import React from "react";
import LineGraph from "./../presentational/linegraph.jsx";
import BarGraph from "./../presentational/bargraph.jsx";
import Report from "./../presentational/Report.jsx";

class GraphPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      LineData: [],
      BarData: [],
      GraphDisplay: "Line",
      BarGraphCompany: "All",
      SearchParamDate: "7",
      ReportData: [],
    };

    this.retrieveData = this.retrieveData.bind(this);
    this.getConversionRate = this.getConversionRate.bind(this);
    this.getReportData = this.getReportData.bind(this);
    //Shared Options
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleParamDateChange = this.handleParamDateChange.bind(this);

    //Bar Graph Options
    this.handleParamCompanyChange = this.handleParamCompanyChange.bind(this);
  }

  retrieveData() {
    let spreadsheetId = this.props.spreadSheetId;

    //Date calculation
    //current Date

    let tempDate1 = new Date();
    console.log("teST", this.state.SearchParamDate);
    let tempDate2 = tempDate1.getDate() - parseInt(this.state.SearchParamDate);
    console.log("TEMPDATE2", tempDate2);
    let previousMonth = false;
    if (tempDate2 < 0) {
      tempDate1.setDate(1);
      tempDate1.setHours(-1);
      tempDate2 = tempDate1.getDate() + tempDate2;
      previousMonth = true;
    }
    let lastRow;
    let targetDate;
    if (previousMonth) {
      targetDate = `${new Date().getMonth() - 1 + 1}/${tempDate2}`;
    } else {
      targetDate = `${new Date().getMonth() + 1}/${tempDate2}`;
    }

    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: "Jobs!A2:D1000",
      })
      .then((response) => {
        lastRow = response.result.values.length;
        let index;
        let j = 0;
        while (!index && j < response.result.values.length) {
          if (
            response.result.values[j][3].split("/")[0] ===
            targetDate.split("/")[0]
          ) {
            if (
              parseInt(response.result.values[j][3].split("/")[1]) >=
              parseInt(targetDate.split("/")[1])
            ) {
              index = j;
            }
          }
          j++;
        }
        let filteredArray = response.result.values.slice(index, lastRow + 1);

        return filteredArray;
      })
      .then((response) => {
        let obj = {};
        response.forEach((cur) => {
          if (obj[cur[3]]) {
            obj[cur[3]]++;
          } else {
            obj[cur[3]] = 1;
          }
        });
        let dataArray = [];
        for (var key in obj) {
          dataArray.push({ name: key, uv: obj[key] });
        }
        this.setState({ LineData: dataArray });
      })
      .catch((err) => {
        console.log("outter error", err.result);
      });
  }

  getConversionRate() {
    let spreadsheetId = this.props.spreadSheetId;

    let tempDate1 = new Date();
    let tempDate2 = tempDate1.getDate() - parseInt(this.state.SearchParamDate);
    let previousMonth = false;
    if (tempDate2 < 0) {
      tempDate1.setDate(1);
      tempDate1.setHours(-1);
      tempDate2 = tempDate1.getDate() + tempDate2;
      previousMonth = true;
    }
    let lastRow;
    let targetDate;
    if (previousMonth) {
      targetDate = `${new Date().getMonth() - 1 + 1}/${tempDate2}`;
    } else {
      targetDate = `${new Date().getMonth() + 1}/${tempDate2}`;
    }

    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: "Jobs!A2:G1000",
      })
      .then((response) => {
        lastRow = response.result.values.length;
        let index;
        let j = 0;
        console.log("TARGET DATE", targetDate);
        while (!index && j < response.result.values.length) {
          if (
            response.result.values[j][3].split("/")[0] ===
            targetDate.split("/")[0]
          ) {
            if (
              parseInt(response.result.values[j][3].split("/")[1]) >=
              parseInt(targetDate.split("/")[1])
            ) {
              index = j;
            }
          }
          j++;
        }
        let filteredArray = response.result.values.slice(index, lastRow + 1);

        return filteredArray;
      })
      .then((response) => {
        let obj = {};
        let dataArray = response.filter((cur) => {
          if (this.state.BarGraphCompany === "All") {
            return true;
          }

          return cur[0] === this.state.BarGraphCompany;
        });
        let jobsArray = 0;
        let coversArray = 0;
        let phonesArray = 0;
        let interviewsArray = 0;
        let inpersonArray = 0;
        let offersArray = 0;
        let rejectedArray = 0;
        dataArray.forEach((cur) => {
          jobsArray++;
          if (cur[5]) {
            coversArray++;
          }
          if (cur[6] === "Phone") {
            phonesArray++;
          }
          if (cur[6] === "Tech") {
            interviewsArray++;
          }
          if (cur[6] === "Inperson") {
            inpersonArray++;
          }
          if (cur[6] === "Offer") {
            offersArray++;
          }
          if (cur[6] === "Rejected") {
            rejectedArray++;
          }
        });
        let BarData = [
          { name: "Jobs", uv: jobsArray },
          { name: "Cover Letters Sent", uv: coversArray },
          { name: "Phone Screens", uv: phonesArray },
          { name: "Tech Interviews", uv: interviewsArray },
          { name: "In Person Interviews", uv: inpersonArray },
          { name: "Offers", uv: offersArray },
          { name: "Rejected", uv: rejectedArray },
        ];

        this.setState({ BarData: BarData });
      })
      .catch((err) => {
        console.log("outter error", err);
      });
  }

  getReportData() {
    let spreadsheetId = this.props.spreadSheetId;
    let tempDate1 = new Date();
    let tempDate2 = tempDate1.getDate() - parseInt(this.state.SearchParamDate);
    let previousMonth = false;
    if (tempDate2 < 0) {
      tempDate1.setDate(1);
      tempDate1.setHours(-1);
      tempDate2 = tempDate1.getDate() + tempDate2;
      previousMonth = true;
    }
    let lastRow;
    let targetDate;
    if (previousMonth) {
      targetDate = `${new Date().getMonth() - 1 + 1}/${tempDate2}`;
    } else {
      targetDate = `${new Date().getMonth() + 1}/${tempDate2}`;
    }
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: "Jobs!A2:H1000",
      })
      .then((response) => {
        console.log("RESponSE", response);
        lastRow = response.result.values.length;

        let index;
        let j = 0;
        while (!index && j < response.result.values.length) {
          if (
            response.result.values[j][3].split("/")[0] ===
            targetDate.split("/")[0]
          ) {
            if (
              parseInt(response.result.values[j][3].split("/")[1]) >=
              parseInt(targetDate.split("/")[1])
            ) {
              index = j;
            }
          }
          j++;
        }
        let filteredArray = response.result.values.slice(index, lastRow + 1);

        return filteredArray;
      })
      .then((response) => {
        let dataArray = response;
        console.log("REPORT DATA", dataArray);
        this.setState({ ReportData: dataArray });
      })
      .catch((err) => {
        console.log("outter error line255", err);
      });
  }

  handleOptionChange(event) {
    let changeValue = event.target.value;
    let newPromise = new Promise((resolve, reject) => {
      resolve();
    });
    newPromise
      .then(() => {
        this.setState({ GraphDisplay: changeValue });
      })
      .then(() => {
        this.retrieveData();
      })
      .then(() => {
        this.getReportData();
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  handleParamDateChange(event) {
    let changeValue = event.target.value;
    console.log("CHANGEVALUE", changeValue);
    let newPromise = new Promise((resolve, reject) => {
      resolve();
    });
    newPromise
      .then(() => {
        this.setState({ SearchParamDate: changeValue });
      })
      .then(() => {
        this.retrieveData();
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  handleParamCompanyChange(event) {
    let changeValue = event.target.value;
    let newPromise = new Promise((resolve, reject) => {
      resolve();
    });
    newPromise
      .then(() => {
        this.setState({ BarGraphCompany: changeValue });
      })
      .then(() => {
        this.getConversionRate();
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  componentDidMount() {
    console.log("Mounted");
    this.retrieveData();
  }

  render() {
    let graphContainer = [];
    let graphOptionsContainer = [];
    if (this.state.GraphDisplay === "Line") {
      graphContainer.push(
        <LineGraph LineData={this.state.LineData}></LineGraph>
      );
    } else if (this.state.GraphDisplay === "Bar") {
      graphOptionsContainer.push(<label className="pr-3 h4"> Company </label>);
      graphOptionsContainer.push(
        <select
          onChange={(e) => {
            this.handleParamCompanyChange(e);
          }}
        >
          <option value="All">All Companies</option>
          <option value="Indeed">Indeed</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Angelist">Angelist</option>
          <option value="ZipRecruiter">ZipRecruiter</option>
          <option value="Dice">Dice</option>
          <option value="Monster">Monster</option>
        </select>
      );
      graphContainer.push(<BarGraph BarData={this.state.BarData}></BarGraph>);
    } else if (this.state.GraphDisplay === "Report") {
      graphOptionsContainer.push(<label className="pr-3 h4"> Report</label>);
      graphOptionsContainer.push(
        <Report ReportData={this.state.ReportData}></Report>
      );
    }

    return (
      <div className="col-xs-10">
        <div className="row justify-content-center pt-5">
          <label className="pr-3 h4"> Graph </label>
          <select
            onChange={(e) => {
              this.handleOptionChange(e);
            }}
          >
            <option label="Applications Submitted" value="Line"></option>
            <option label="Application Conversion Rate" value="Bar"></option>
            <option label="Application Conversion Rate" value="Report"></option>
          </select>

          <label className="pr-3 h4"> Timeline </label>
          <select
            onChange={(e) => {
              this.handleParamDateChange(e);
            }}
          >
            <option label="Past Week" value="7"></option>
            <option label="Past 15 Days" value="15"></option>
            <option label="Past Month" value="30"></option>
          </select>
          {graphOptionsContainer}
        </div>
        <div className="row d-flex ">{graphContainer}</div>
        <div className="row d-flex justify-content-center py-3"></div>
      </div>
    );
  }
}

export default GraphPage;
