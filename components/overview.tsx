"use client";
import { formatRupees } from "@/lib/utils";
import React, { FunctionComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  RectangleProps,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// Custom Tooltip content
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataEntry = payload[0].payload;
    return (
      <div className="minimal_shadow text-sm bg-white rounded-lg">
        <p className="font-semibold text-slate-500 w-[250px] p-2 pb-1 border-b">
          Title: {dataEntry.title}
        </p>

        <div className="font-semibold flex">
          <p className=" flex flex-col p-2 pr-3 border-r">
            <span className="text-xs">Locked Budget</span>
            <span>{formatRupees(dataEntry.lockedBudget)}</span>
          </p>
          <p className=" flex flex-col p-2 pr-3">
            <span className="text-xs">Actual Cost</span>
            <span>{formatRupees(dataEntry.actualCost)}</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export function Overview(props: any) {
  let data = props.data;
  // console.log(props.data);

  const customLegendNames = [
    { value: "Locked Budget", type: "circle", id: "lockedBudget" },
    { value: "Actual Cost", type: "circle", id: "actualCost" },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 60,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />

        <XAxis
          dataKey="title"
          tick={{ fontSize: 10, width: 100 }} // Set the font size and maximum width for XAxis labels
          interval={0} // Show all labels, even if they overlap
          angle={-45} // Rotate the labels by -45 degrees to improve readability
          textAnchor="end" // Anchor the text to the end of the label
          height={50} // Increase the height to make space for rotated labels
          tickLine={false} // Remove the tick line to improve appearance
          tickFormatter={(value) =>
            value.length > 15 ? value.slice(0, 12) + "..." : value
          } // Display ellipsis for long labels
        />
        <YAxis
          axisLine={false}
          tickFormatter={formatRupees}
          tick={{ fontSize: 10 }}
          tickLine={false}
          tickCount={8}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          align="right"
          verticalAlign="top"
          iconType="circle" // Change the shape to a circle
          iconSize={8} // Adjust the size of the circle
          wrapperStyle={{
            padding: "5px", // Add padding to the legend
            borderRadius: "8px", // Add border radius to the legend
            fontSize: "14px", // Set the font size to a smaller value
          }}
        />

        <defs>
          <linearGradient
            id="lockedBudgetGradient"
            gradientTransform="rotate(90)"
          >
            <stop offset="0%" stopColor="#25ff0a" />
            <stop offset="100%" stopColor="#25ff0ac9" />
          </linearGradient>

          <linearGradient
            id="actualCostGradient"
            gradientTransform="rotate(90)"
          >
            <stop offset="0%" stopColor="#950aff" />
            <stop offset="100%" stopColor="#950affcf" />
          </linearGradient>
        </defs>
        <Bar fill="url(#lockedBudgetGradient)" dataKey="lockedBudget" />
        <Bar dataKey="actualCost" fill="url(#actualCostGradient)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
