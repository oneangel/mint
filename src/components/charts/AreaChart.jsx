import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

const AreaChart = ({ currentData, lastData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      color: ["#80FFA5", "#FFFF00", "#37A2FF", "#FF0087", "#FFBF00"], // Cambiar el segundo color a amarillo
      title: {
        text: "Balance semanal",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["Actual", "Pasada"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          magicType: {
            type: ["line", "bar"],
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["L", "M", "X", "J", "V", "S", "D"],
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "Actual",
          type: "line",
          smooth: true,
          z: 2, // Asignar un z-index mayor
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: currentData,
        },
        {
          name: "Pasada",
          type: "line",
          smooth: true,
          z: 1, // Asignar un z-index menor
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 255, 0)", // Cambiar el color inicial a amarillo
              },
              {
                offset: 1,
                color: "rgb(255, 255, 77)", // Cambiar el color final a un amarillo más claro
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: lastData,
        },
      ],
    };
    option && myChart.setOption(option);

    // Limpiar el gráfico al desmontar el componente
    return () => {
      myChart.dispose();
    };
  }, [currentData, lastData]); // Agrega currentData y lastData a las dependencias de useEffect

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "400px" }}
      className="p-2 md:p-5"
    ></div>
  );
};

export default AreaChart;
