import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Card, IconButton} from 'react-native-paper';
import { Text, View, Image, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

import styles from '../styles/styles';

const data = {
  data: [0.8],
  strokeWidth: 10,
  radius: 25,
  color: (opacity = 1) => `rgba(28, 151, 130, ${opacity})`, // Adjust color as needed
};

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/mint-logo.png')}></Image>
      
      <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={styles.title1}>¡Hola Lalo!</Text>

        <View style={{flexDirection:'row'}}>
          <IconButton
            mode='contained-tonal'
            containerColor='#F5F6FA'
            iconColor='#606060'
            icon={'bell'}
            size={23}
            onPress={() => console.log('Notificacion')}
          />

          <IconButton
            mode='contained-tonal'
            containerColor='#F5F6FA'
            iconColor='#606060'
            icon={'cog'}
            size={23}
            onPress={() => console.log('Configuracion')}
          />
        </View>
      </View>

      <View style={{marginTop:50, marginBottom: 80}}>
        <Text style={styles.titleBalance}>Saldo de la Cuenta</Text>
        <Text style={styles.titleMoney}>$25,000</Text>
      </View>
      
      <View style={{flexDirection: 'row', marginBottom: 55}}>

        <View style={{alignItems:'center'}}>
          <IconButton
            icon={'send'}
            iconColor='#3E70A1'
            size={23}
            onPress={() => console.log('Transferir')}
          />
          <Text style={styles.title2}>Transferir</Text>
        </View>

        <View style={{alignItems:"center"}}>
          <IconButton
            icon={'credit-card'}
            iconColor='#3E70A1'
            size={23}
            onPress={() => console.log('Depositar')}
          />
          <Text Text style={styles.title2}>Depositar</Text>
        </View>
      </View>
      
      <ScrollView>
        <View style={{paddingLeft: 20,paddingRight:20, marginBottom: 15}}>
          <Text style={styles.title3}>Ahorros Recientes</Text>
        </View>

        <ScrollView style={{paddingBottom: 45}}horizontal showsHorizontalScrollIndicator={false}>
          <View style={{paddingLeft:10, paddingBottom:10, alignItems: 'center'}}>
            <Card mode='contained' style={{width: 236, height: 90, marginRight:10, borderRadius: 20, backgroundColor: '#ECF6FF'}}>
              <Card.Content style={{justifyContent:'flex-end'}}>
                <ProgressChart style={{paddingTop:10}}
                  data={data}
                  width={80}
                  height={80}
                  strokeWidth={data.strokeWidth}
                  radius={data.radius}
                  chartConfig={{
                    backgroundGradientFrom: '#ECF6FF',
                    backgroundGradientTo: '#ECF6FF',
                    color: data.color,
                    }}
                  hideLegend={true}
                  
                />
              </Card.Content>
            </Card>
            
          </View>
            <Card mode='contained' style={{width: 236, height: 90, marginRight:10, borderRadius: 20, backgroundColor: '#ECF6FF'}}>
              <Card.Content style={{justifyContent:'flex-end'}}>
                <ProgressChart style={{paddingTop:10}}

                  data={data}
                  width={80}
                  height={80}
                  strokeWidth={data.strokeWidth}
                  radius={data.radius}
                  chartConfig={{
                    backgroundGradientFrom: '#ECF6FF',
                    backgroundGradientTo: '#ECF6FF',
                    color: data.color,
                    
                    }}
                  hideLegend={true}
                  
                />
              </Card.Content>
            </Card>
        </ScrollView>

        <View style={{paddingLeft: 20,paddingRight:20, flexDirection:'row', }}>
          <Text style={styles.title3}>Transacciones Recientes</Text>
          <Text Text style={[styles.title4, {paddingLeft: 30}]}>Ver Todos</Text>
        </View>
        
      </ScrollView>
      
      
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;