import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";

export const BarGraph = ({data}) => {
  // const data = [
  //   { x: "A", y: 12 },
  //   { x: "B", y: 2 },
  //   { x: "C", y: 11 },
  // ];

  return (
    <>
      <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          data={data}
        />
      </XYPlot>
    </>
  );
};

export default BarGraph;
