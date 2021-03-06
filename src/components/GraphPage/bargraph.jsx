import React from "react";

import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const BarGraph = props => {
  return (
    <ResponsiveContainer width="100%" height={800}>
      <BarChart width={700} height={800} data={props.BarData}>
        <Bar type="monotone" dataKey="pv" stroke="#8884d8" />
        <Bar type="monotone" dataKey="uv" stroke="#82ca9d" />

        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
