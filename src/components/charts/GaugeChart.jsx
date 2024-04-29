import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const GaugeChart = ({
  kw,
  basic,
  middle,
  excedent,
  t1,
  t2,
  t3,
  name,
  c1,
  c2,
  c3,
}) => {
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
          max: excedent,
          splitNumber: 2, // Solo 3 grados
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0, `${c1}`], // Primer grado
                [0.3333, `${c1}`], // Primer grado
                [0.3333, `${c2}`], // Segundo grado
                [0.6666, `${c2}`], // Segundo grado
                [0.6666, `${c3}`], // Tercer grado
                [1, `${c3}`], // Tercer grado
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
              if (value <= basic) {
                return `${t1}`;
              } else if (value > basic && value < middle + basic) {
                return `${t2}`;
              } else if (value > basic + middle) {
                return `${t3}`;
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
              return (value * 100).toFixed(3) + "";
            },
            color: "inherit",
          },
          data: [
            {
              value: kw ? kw : 0,
              name: `${name}`,
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
  }, [kw, basic, middle, excedent]);

  return <div ref={chartRef} style={{ width: "100%", height: "350px" }}></div>;
};

export default GaugeChart;
