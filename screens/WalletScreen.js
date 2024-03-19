import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';

import styles from '../styles/styles';

const WalletScreen = () => {
 
  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require('../assets/mint-logo.png')}></Image>

      <Text style={styles.title1}>Cartera</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

export default WalletScreen;