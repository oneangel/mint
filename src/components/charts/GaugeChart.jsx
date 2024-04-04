import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const GaugeChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const option = {
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          center: ["50%", "75%"],
          radius: "90%",
          min: 0,
          max: 1,
          splitNumber: 2, // Solo 3 grados
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0, "#FF6E76"], // Primer grado
                [0.33, "#FF6E76"], // Primer grado
                [0.33, "#FDDD60"], // Segundo grado
                [0.66, "#FDDD60"], // Segundo grado
                [0.66, "#58D9F9"], // Tercer grado
                [1, "#58D9F9"], // Tercer grado
              ],
            },
          },
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
            length: "12%",
            width: 20,
            offsetCenter: [0, "-60%"],
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: "auto",
              width: 2,
            },
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: "auto",
              width: 5,
            },
          },
          axisLabel: {
            color: "#464646",
            fontSize: 20,
            distance: -60,
            rotate: "tangential",
            formatter: function (value) {
              if (value === 0) {
                return "Grade A";
              } else if (value === 0.5) {
                return "Grade B";
              } else if (value === 1) {
                return "Grade C";
              }
              return "";
            },
          },
          title: {
            offsetCenter: [0, "-10%"],
            fontSize: 20,
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, "-35%"],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value * 100) + "";
            },
            color: "inherit",
          },
          data: [
            {
              value: 800,
              name: "Kw",
            },
          ],
        },
      ],
    };
    myChart.setOption(option);

    // Cleanup
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default GaugeChart;
