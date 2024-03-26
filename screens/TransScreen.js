import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { Text, View, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styles from '../styles/styles';
import TotalAbonos from '../components/CardAbonos';
import TotalGastos from '../components/CardGastos';
import TransactionList from '../components/TransactionList';

const TransScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/mint-logo.png')}></Image>
      <Text style={styles.title1}>Transacciones</Text>
      <Searchbar
        style={styles.searchbar}
        elevation={1}
        iconColor="#3E70A1"
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView>
        <View style={{ marginTop: 35, marginBottom: 35 }}>
          <Text style={styles.titulo}>Total de Abonos</Text>
          <TotalAbonos/>

          <Text style={styles.titulo}>Total de Gastos</Text>
          <TotalGastos/>
        </View>
        
        <TransactionList />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

export default TransScreen;