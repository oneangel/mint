import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

const Percentage = ({ value, max }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    console.log("Maximo");
    console.log(max);
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const _panelImageURL =
      "https://res.cloudinary.com/dko2qqtae/image/upload/v1713140934/drqzulatfyvwl1t21gfh.png";
    const _animationDuration = 1000;
    const _animationEasingUpdate = "quarticInOut";
    const _valOnRadianMax = 300;
    const _outerRadius = 80;
    const _innerRadius = 65;
    const _pointerInnerRadius = 15;
    const _insidePanelRadius = 55;

    const renderItem = (params, api) => {
      const valOnRadian = api.value(1);
      const coords = api.coord([api.value(0), valOnRadian]);
      const polarEndRadian = coords[3];
      const imageStyle = {
        image: _panelImageURL,
        x: params.coordSys.cx - _outerRadius,
        y: params.coordSys.cy - _outerRadius,
        width: _outerRadius * 2,
        height: _outerRadius * 2,
      };

      const convertToPolarPoint = (renderItemParams, radius, radian) => [
        Math.cos(radian) * radius + renderItemParams.coordSys.cx,
        -Math.sin(radian) * radius + renderItemParams.coordSys.cy,
      ];

      const makePionterPoints = (renderItemParams, polarEndRadian) => [
        convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
        convertToPolarPoint(
          renderItemParams,
          _outerRadius,
          polarEndRadian + Math.PI * 0.03
        ),
        convertToPolarPoint(
          renderItemParams,
          _pointerInnerRadius,
          polarEndRadian
        ),
      ];

      const makeText = (valOnRadian) => {
        if (valOnRadian < -10) {
          alert("illegal during val: " + valOnRadian);
        }
        return ((value / max) * 100).toFixed(1) + "%";
      };

      return {
        type: "group",
        children: [
          {
            type: "image",
            style: imageStyle,
            clipPath: {
              type: "sector",
              shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: _outerRadius,
                r0: _innerRadius,
                startAngle: 0,
                endAngle: -polarEndRadian,
                transition: "endAngle",
                enterFrom: { endAngle: 0 },
              },
            },
          },
          {
            type: "image",
            style: imageStyle,
            clipPath: {
              type: "polygon",
              shape: {
                points: makePionterPoints(params, polarEndRadian),
              },
              extra: {
                polarEndRadian: polarEndRadian,
                transition: "polarEndRadian",
                enterFrom: { polarEndRadian: 0 },
              },
              during: function (apiDuring) {
                apiDuring.setShape(
                  "points",
                  makePionterPoints(
                    params,
                    apiDuring.getExtra("polarEndRadian")
                  )
                );
              },
            },
          },
          {
            type: "circle",
            shape: {
              cx: params.coordSys.cx,
              cy: params.coordSys.cy,
              r: _insidePanelRadius,
            },
            style: {
              fill: "#fff",
              shadowBlur: 25,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(13, 148, 136, 0.4)",
            },
          },
          {
            type: "text",
            extra: {
              valOnRadian: valOnRadian,
              transition: "valOnRadian",
              enterFrom: { valOnRadian: 0 },
            },
            style: {
              text: makeText(valOnRadian),
              fontSize: 30,
              fontWeight: 700,
              x: params.coordSys.cx,
              y: params.coordSys.cy,
              fill: "rgb(13, 148, 136)",
              align: "center",
              verticalAlign: "middle",
              enterFrom: { opacity: 0 },
            },
            during: function (apiDuring) {
              apiDuring.setStyle(
                "text",
                makeText(apiDuring.getExtra("valOnRadian"))
              );
            },
          },
        ],
      };
    };

    const option = {
      animationEasing: _animationEasingUpdate,
      animationDuration: _animationDuration,
      dataset: {
        source: [[1, value]],
      },
      tooltip: {},
      angleAxis: {
        type: "value",
        startAngle: 0,
        show: false,
        min: 0,
        max: max,
      },
      radiusAxis: {
        type: "value",
        show: false,
      },
      polar: {},
      series: [
        {
          type: "custom",
          coordinateSystem: "polar",
          renderItem: renderItem,
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [value, max]);

  return <div ref={chartRef} style={{ width: "100%", height: "200px" }}></div>;
};

export default Percentage;
