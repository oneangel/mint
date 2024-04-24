import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const LargeAreaChart = ({ data, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data:
          type === "income" || type === "expense"
            ? data.map((item) => item._id)
            : data.map((item) => item.createdAt),
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        splitLine: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
        },
      ],
      series: [
        {
          name:
            type === "income"
              ? "Ingreso"
              : type === "expense"
              ? "Gasto"
              : "Medicion",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: `${
              type === "income" ? "rgb(13, 148, 136)" : "rgb(208, 0, 0)"
            }`,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `${
                  type === "income" ? "rgb(27, 62, 115)" : "rgb(255, 0, 0)"
                }`,
              },
              {
                offset: 1,
                color: `${
                  type === "income" ? "rgb(13, 148, 136)" : "rgb(208, 0, 0)"
                }`,
              },
            ]),
          },
          data:
            type === "income" || type === "expense"
              ? data.map((item) => [item._id, item.total])
              : data.map((item) => [item.createdAt, item.measurement]),
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>;
};

export default LargeAreaChart;
