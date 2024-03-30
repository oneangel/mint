import React from 'react';
import * as Components from '../components/Components'
import { Text, View, Image, ScrollView } from 'react-native';
import ProgressCard from '../components/CardChart';
import { IconButton} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/styles';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/mint-logo.png')}></Image>
      
      <View style={{flexDirection:'row', alignItems: 'center',}}>
        <Text style={styles.title1}>¡Hola Lalo!</Text>
        <View>
          <IconButton
            mode='contained-tonal'
            containerColor='#F5F6FA'
            iconColor='#606060'
            icon={'bell'}
            size={23}
            onPress={() => console.log('Notificacion')}
          />
        </View>
      </View>

      <View style={{marginTop:50, marginBottom: 40, alignItems: 'center'}}>
        <Text style={styles.titleBalance}>Balance Actual</Text>
        <Text style={styles.titleMoney}>$25,000</Text>
        <Text style={styles.titleDate}>Martes 11, 2024 • 6:25 PM</Text>
      </View>
      
      <View style={{flexDirection: 'row', marginBottom: 55}}>
        <View style={{alignItems:'center'}}>
          <Components.ButtonTrans/>
          <Text
            style={styles.title2}
            onPress={() => console.log('Transferir')}
            accessible={true}
            accessibilityLabel="Transferir"
          >
            Transferir
          </Text>
        </View>

        <View style={{alignItems:"center"}}>
          <Components.ButtonDeposit/>
          <Text
            style={styles.title2}
            onPress={() => console.log('Depositar')}
            accessible={true}
            accessibilityLabel="Depositar"
          >
            Depositar
          </Text>
        </View>
      </View>
      
      <ScrollView>
        <View style={{paddingLeft: 20,paddingRight:20, marginBottom: 15}}>
          <Text style={styles.title3}>Ahorros Recientes</Text>
        </View>

        <ScrollView style={{paddingBottom: 45}}horizontal showsHorizontalScrollIndicator={false}>
          <View style={{paddingLeft:10, paddingBottom:10, alignItems: 'center'}}>
            <ProgressCard/>
          </View>
            <ProgressCard/>
        </ScrollView>

        <View style={{paddingLeft: 20,paddingRight:20, flexDirection:'row', }}>
          <Text style={styles.title3}>Transacciones Recientes</Text>
          <Text style={[styles.title4, {paddingLeft: 30}]}>Ver Todos</Text>
        </View>

        <View style={{paddingTop:15, paddingLeft: 20,paddingRight:20, alignSelf:'center'}}>
          <Components.TransactionList />
        </View>
         
      </ScrollView>
      
      <StatusBar style="auto" />
    </View>
  );
}
export default HomeScreen;