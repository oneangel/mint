// ActivityChart.js
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ActividadesChart = () => {
  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [3000, 2500, 4000, 5000, 4500, 3800],
        color: () => '#3E70A1',
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    declineBright: 100,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#3E70A1',
    },
    color: () => '#3E70A1',
    labelColor: () => '#3E70A1',
    style: {
      borderRadius: 16,
    },
    fillShadowGradientOpacity: 0.2,
    fillShadowGradient: '#3E70A1',
    useShadowColorFromDataset: false,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <LineChart
      data={chartData}
      width={screenWidth - 40}
      height={220}
      verticalLabelRotation={30}
      chartConfig={chartConfig}
      bezier
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  );
};

export default ActividadesChart;