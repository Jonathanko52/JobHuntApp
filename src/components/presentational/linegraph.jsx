import React from "react";

import {
  ResponsiveContainer,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const LineGraph = props => {
  return (
    <ResponsiveContainer width="100%" height={700}>
      <LineChart width={600} height={700} data={props.LineData}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />

        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
