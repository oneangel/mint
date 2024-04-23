import React, { useEffect } from "react";
import * as echarts from "echarts";
import "echarts-liquidfill";

function LiquidFillChart({ litros }) {
  useEffect(() => {
    // Inicializar el gráfico
    const chart = echarts.init(document.getElementById("liquidfill-chart"));

    // Configurar opciones del gráfico
    const option = {
      series: [
        {
          type: "liquidFill",
          data: [litros / 340687.06056], // Porcentaje de llenado (0.6 = 60%)
          radius: "80%", // Tamaño del gráfico
          color: ["#2C7AD6"], // Color del agua
          outline: {
            show: false, // Ocultar borde del gráfico
          },
          backgroundStyle: {
            color: "#eee", // Color de fondo
          },
          label: {
            fontSize: 24,
            fontWeight: "bold",
            formatter: function (param) {
              return (param.value * 100).toFixed(0) + "%"; // Formato de etiqueta
            },
          },
        },
      ],
    };

    // Aplicar opciones al gráfico
    chart.setOption(option);

    // Limpiar el gráfico al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div
      id="liquidfill-chart"
      className="w-[400px] h-[400px]"
    ></div>
  );
}

export default LiquidFillChart;
