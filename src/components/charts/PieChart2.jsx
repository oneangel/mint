import React, { useEffect } from "react";
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
  }, []);

  return <div id="main" style={{ width: "100%", height: "400px" }} className="p-4 pt-10"/>;
};

export default PieChart2;
