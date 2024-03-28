import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = null;

    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "20%", // Ajusta la posición vertical de la leyenda
          left: "5%", // Coloca la leyenda al lado derecho
          orient: "vertical", // Cambia la orientación de la leyenda a vertical
          itemWidth: 20, // Ancho de los elementos de la leyenda
          itemHeight: 10, // Alto de los elementos de la leyenda
          textStyle: {
            color: "black", // Color del texto de la leyenda
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "80%"],
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
                fontSize: 10,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };

      myChart.setOption(option);
    }

    return () => {
      if (myChart !== null) {
        myChart.dispose();
      }
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "180px" }} />;
};

export default PieChart;
