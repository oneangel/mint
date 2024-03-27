// SavingsGoals.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const MetaAhorros = () => {
  const savingsData = [
    { progress: 0.3, saved: 5250, goal: 17500 },
    { progress: 0.95, saved: 6480, goal: 6800 },
    { progress: 0.55, saved: 1760, goal: 3200 },
    { progress: 0.62, saved: 3890, goal: 6275 },
    { progress: 0.17, saved: 1475, goal: 8260 },
  ];

  return (
    <View style={styles.container}>
      {savingsData.map((item, index) => (
        <View key={index} style={styles.goalContainer}>
          <Text style={styles.goalName}>{item.name}</Text>
          <Progress.Bar
            progress={item.progress}
            width={200}
            height={20}
            color="#1C9782"
            unfilledColor="#F0F0F0"
            borderWidth={0}
          />
          <Text style={styles.goalSaved}>${item.saved}</Text>
          <Text style={styles.goalTarget}>${item.goal}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalSaved: {
    marginLeft: 10,
    color: '#1C9782',
  },
  goalTarget: {
    marginLeft: 10,
    color: '#363636',
  },
});

export default MetaAhorros;