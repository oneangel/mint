import React from 'react';
import { Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/styles';

const ProfileScreen = () => {
 
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/mint-logo.png')}></Image>
      <Text style={styles.title1}>Perfil</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

export default ProfileScreen;