import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  LineSeriesCanvas,
} from "react-vis";

export const BarGraph = ({ data, xDomain, yDomain, width=300,height=300 }) => {
  const axisStyle = {
    ticks: {
      fontSize: "14px",
      color: "#333",
    },
    title: {
      fontSize: "16px",
      color: "#333",
    },
  };

  return (
    <>
      <XYPlot width={width} height={height} {...{xDomain,yDomain}}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis on0={false} />
        <YAxis on0={false} />
        <LineSeries data={data} />
      </XYPlot>
    </>
  );
};

export default BarGraph;
