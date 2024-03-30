import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const GastosGenerales = () => {
    
  const data = [
    {
      name: 'Comida',
      percentage: 50,
      color: '#00B050',
      legendFontColor: '#B9B9B9',
      legendFontSize: 14,
    },
    {
      name: 'Novia',
      percentage: 25,
      color: '#FF3D67',
      legendFontColor: '#B9B9B9',
      legendFontSize: 14,
    },
    {
      name: 'Escuela',
      percentage: 15,
      color: '#36A2EB',
      legendFontColor: '#B9B9B9',
      legendFontSize: 14,
    },
    {
      name: 'Random',
      percentage: 10,
      color: '#FFCE56',
      legendFontColor: '#B9B9B9',
      legendFontSize: 14,
    },
  ];

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    chartPadding: 0,
    centerRadius: '15%',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 12,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeframeContainer}>
        <Text style={styles.timeText}>Diario</Text>
        <Text style={styles.timeText}>Semanal</Text>
        <Text style={styles.timeText}>Mensual</Text>
        <Text style={styles.timeText}>Anual</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>$475</Text>
        <Text style={styles.amount}>$3,327</Text>
        <Text style={styles.amount}>$10,126</Text>
        <Text style={styles.amount}>$30,689</Text>
      </View>

      <PieChart
        data={data}
        width={250}
        height={180}
        chartConfig={chartConfig}
        accessor="percentage"
        backgroundColor="transparent"
        paddingLeft="5"
        
        center={[6, 0]}
        hasLegend={true}
        avoidFalseZero={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 15,
    fontWeight:'500',
    color: '#363636',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#363636',
  },
});

export default GastosGenerales;