import React from "react";
// import { AreaChart, Area } from "recharts";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

class GraphPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      graphData: []
    };

    this.retrieveData = this.retrieveData.bind(this);
  }

  retrieveData() {
    let spreadsheetId = localStorage.getItem("SpreadSheetId");
    let tempDate1 = new Date();
    let tempDate2 = tempDate1.getDate() - 30;
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
        console.log(response);
        console.log(response.result);
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

        console.log(dataArray);
        this.setState({ graphData: dataArray });
      })
      .then(res => {
        console.log(this.state);
      })
      .catch(err => {
        console.log("outter error", err);
      });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="LandingPage col-xs-10 d-flex justify-content-center pt-5">
        <ResponsiveContainer width="100%" height={700}>
          <LineChart width={600} height={300} data={this.state.graphData}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />

            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
        <button
          onClick={() => {
            this.retrieveData();
          }}
        >
          RetrieveDAta
        </button>
      </div>
    );
  }
}

// import { LineChart, Line } from 'recharts';
// const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

// const renderLineChart = () => (
//   <div className="LandingPage col-xs-10 d-flex justify-content-center pt-5">
//     <LineChart width={600} height={300} data={data}>
//       <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//       <CartesianGrid stroke="#ccc" />
//       <XAxis dataKey="name" />
//       <YAxis />
//     </LineChart>
//   </div>
// );

export default GraphPage;
