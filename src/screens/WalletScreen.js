import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

const WalletScreen = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <View style={styles.circle}>
        <Text style={styles.circleText}>Balance General</Text>
        <Text style={styles.circleText2}>$14,400</Text>
        <Text style={styles.circleText3}>{formatDate(currentDateTime)} </Text>
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: -40,
    width: '120%',
    height: '33%',
    backgroundColor: '#334050',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  circle: {
    position: 'absolute',
    top: '25%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3E70A1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  circleText2: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 30,
    marginTop: 5,
  },
  circleText3: {
    color: 'lightgray',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
  },
});
