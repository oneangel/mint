import React from 'react';
import { StatusBar, View, Text, Image } from 'react-native';
import styles from '../styles/styles';
import GastosMes from '../components/GastosMes';
import ActividadesChart from '../components/ActividadesChart';
import { ScrollView } from 'react-native';
import MetaAhorros from '../components/MetaAhorros';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/mint-logo.png')}></Image>
      <Text style={styles.title1}>Cartera</Text>

      <View style={{ marginTop: 50, marginBottom: 35, alignItems: 'center'}}>
        <Text style={styles.titleBalance}>Balance Actual</Text>
        <Text style={styles.titleMoney}>$25,000</Text>
        <Text style={styles.titleDate}>Martes 11, 2024 • 6:25 PM</Text>
      </View>

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title5}>Gastos del Mes: Marzo</Text>
          <GastosMes/>
        </View>
      
        <View style={{marginTop: 60, paddingLeft: 20, paddingRight:20}}>
          <Text style={styles.title3}>Actividad Recientes</Text>
          <ActividadesChart/>
        </View>

        <View style={{ marginTop: 60, paddingLeft: 20, paddingRight:20, flexDirection:'row', }}>
          <Text style={styles.title3}>Mis Ahorros</Text>
          <Text style={[styles.title4, {paddingLeft: 130}]}>Ver Todos</Text>
          
        </View>
      
        <View style={{paddingTop:15, paddingLeft: 20,paddingRight:20, alignSelf:'center'}}>
          <MetaAhorros/>
        </View>
      </ScrollView>
      

      <StatusBar style="auto" />
    </View>
  );
};

export default WalletScreen;