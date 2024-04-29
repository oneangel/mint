import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const LargeAreaChart = ({ data, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 1) {
      if (data[0]._id != null && data[0]._id !== undefined) {
        let fecha = new Date(data[0]._id);
        // Obtener un día antes
        let unDiaAntes = new Date(fecha);
        unDiaAntes.setDate(fecha.getDate() - 1);

        let unDiaDespues = new Date(fecha);
        unDiaDespues.setDate(fecha.getDate() + 1);

        data.unshift({
          _id: unDiaAntes.toISOString().slice(0, 10),
          total: 0,
        });
        data.push({
          _id: unDiaDespues.toISOString().slice(0, 10),
          total: 0,
        });
      } else {
        let fecha = new Date(data[0].createdAt);
        // Obtener un día antes
        let unDiaAntes = new Date(fecha);
        unDiaAntes.setDate(fecha.getDate() - 1);

        let unDiaDespues = new Date(fecha);
        unDiaDespues.setDate(fecha.getDate() + 1);

        data.unshift({
          createdAt: unDiaAntes.toISOString().slice(0, 10),
          measurement: 0,
        });
        data.push({
          createdAt: unDiaDespues.toISOString().slice(0, 10),
          measurement: 0,
        });
      }
    }

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
            ? data.map((item) => new Date(item._id).toISOString().slice(0, 10))
            : data.map((item) =>
                new Date(item.createdAt).toISOString().slice(0, 10)
              ),
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
              type === "income" ? "rgb(128, 255, 165)" : "rgb(208, 0, 0)"
            }`,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `${
                  type === "income" ? "rgb(128, 255, 165)" : "rgb(255, 0, 0)"
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
              ? data.map((item) => [
                  new Date(item._id).toISOString().slice(0, 10),
                  Math.abs(item.total),
                ])
              : data.map((item) => [
                  new Date(item.createdAt).toISOString().slice(0, 10),
                  item.measurement,
                ]),
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
