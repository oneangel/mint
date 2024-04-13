/* import React, { useEffect } from "react";
import * as echarts from "echarts";

const PieChart2 = ({ expenses, incomes }) => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      color: ["#2DD683", "#E74A51"],
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: incomes, name: "Ingresos" },
            { value: Math.abs(expenses), name: "Gastos" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup function to dispose the chart
    return () => {
      myChart.dispose();
    };
  }, [expenses, incomes]);

  return (
    <div
      id="main"
      style={{ width: "100%", height: "400px" }}
      className="p-4 pt-10"
    />
  );
};

export default PieChart2;
 */

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieChart2 = ({ expenses, incomes }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      color: ["#2DD683", "#E74A51"],
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: incomes, name: "Ingresos" },
            { value: Math.abs(expenses), name: "Gastos" },
          ],
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup
    return () => {
      myChart.dispose();
    };
  }, [expenses, incomes]);

  return <div ref={chartRef} style={{ width: "100%", height: "600px" }}></div>;
};

export default PieChart2;
