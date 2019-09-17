import React from "react";
import LineGraph from "./../presentational/linegraph.jsx";
import BarGraph from "./../presentational/bargraph.jsx";
// import { AreaChart, Area } from "recharts";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

class GraphPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      LineData: [],
      BarData: [],
      GraphDisplay: "Line",
      BarGraphCompany: "",
      SearchParamDate: "7"
    };

    this.retrieveData = this.retrieveData.bind(this);
    this.getConversionRate = this.getConversionRate.bind(this);

    //Shared Options
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleParamDateChange = this.handleParamDateChange.bind(this);

    //Bar Graph Options
    this.handleParamCompanyChange = this.handleParamCompanyChange.bind(this);
  }

  retrieveData() {
    let spreadsheetId = localStorage.getItem("SpreadSheetId");
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
        range: "Jobs!A2:D1000"
      })
      .then(response => {
        lastRow = response.result.values.length;
        let index;
        let j = 0;
        while (!index && j < response.result.values.length) {
          if (response.result.values[j][3] === targetDate) {
            index = j;
          }
          j++;
        }

        return response.result.values.slice(index, lastRow + 1);
      })
      .then(response => {
        let obj = {};

        response.forEach(cur => {
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
      .catch(err => {
        console.log("outter error", err);
      });
  }

  getConversionRate() {
    let spreadsheetId = localStorage.getItem("SpreadSheetId");
    let targetRow = parseInt(this.state.BarGraphCompany);
    console.log("TARGET ROW", targetRow);
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: `Summary!A${targetRow}:G${targetRow}`
      })
      .then(response => {
        console.log(response.result.values[0][0]);
        let BarData = [
          { name: "Jobs", uv: response.result.values[0][1] },
          { name: "Cover Letters Sent", uv: response.result.values[0][2] },
          { name: "Phone Screens", uv: response.result.values[0][3] },
          { name: "Tech Interviews", uv: response.result.values[0][4] },
          { name: "In Person Interviews", uv: response.result.values[0][5] },
          { name: "Offers", uv: response.result.values[0][6] }
        ];
        this.setState({ BarData: BarData });
        return response.result.values;
      })
      .then(res => {
        console.log("TEST RES", res);
      })

      .catch(err => {
        console.log("outter error", err);
      });
  }

  handleOptionChange(event) {
    this.setState({ GraphDisplay: event.target.value });
    this.retrieveData();
  }

  handleParamDateChange(event) {
    this.setState({ SearchParamDate: event.target.value });
    this.retrieveData();
  }

  handleParamCompanyChange(event) {
    // console.log("EVENET", event);
    // console.log("EVENET target", event.target);
    // console.log("EVENET values", event.target.value);
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
      .catch(err => {
        console.log("error", err);
      });
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
          onChange={e => {
            this.handleParamCompanyChange(e);
          }}
        >
          <option value="">--Pick a Company--</option>
          <option value="2">Indeed</option>
          <option value="3">LinkedIn</option>
          <option value="4">Angelist</option>
          <option value="5">ZipRecruiter</option>
          <option value="6">Dice</option>
          <option value="7">Monster</option>
        </select>
      );
      graphContainer.push(<BarGraph BarData={this.state.BarData}></BarGraph>);
    }

    return (
      <div className="col-xs-10">
        <div className="row justify-content-center pt-5">
          <label className="pr-3 h4"> Graph </label>
          <select
            onChange={e => {
              this.handleOptionChange(e);
            }}
          >
            <option label="Applications Submitted" value="Line"></option>
            <option label="Application Conversion Rate" value="Bar"></option>
          </select>

          <label className="pr-3 h4"> Timeline </label>
          <select
            onChange={e => {
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
