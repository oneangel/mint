import React from 'react';
import * as Components from '../components/Components'
import { StatusBar, ScrollView } from 'react-native';
import { Text, View, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styles from '../styles/styles';

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

          <View>
            <Text style={styles.title5}>Total de Abonos</Text>
            <Components.CardAbonos/>
          </View>
          
          
          <View style={{ marginTop: 35}}>
            <Text style={styles.title5}>Total de Gastos</Text>
            <Components.CardGastos/>
          </View>

          <View style={{ marginTop: 50}}>
            <Components.TransactionList/>
          </View>
         
        </View>
         
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};
export default TransScreen;