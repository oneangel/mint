import { View, Text, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress';
import React from 'react'

const GeneralBalance = () => {
  return (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.text}>INGRESOS</Text>
            <Text style={styles.text2}>$2,000</Text>
            <Progress.Bar progress={0.3} width={160} color='#3E70A1' unfilledColor='#fff'/>
        </View>

        <View style={styles.item}>
            <Text style={styles.text}>GASTOS</Text>
            <Text style={styles.text2}>$1,500</Text>
            <Progress.Bar progress={0.3} width={160} color='red' unfilledColor='#fff'/>
        </View>
    </View>
  )
}

export default GeneralBalance

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', 
        gap: 10,
        marginTop: 20
    },
    item: {
        flex: 1,
        marginBottom: 10,
        paddingLeft: 20
    },
    text: {
        color: '#fff',
        marginBottom: 5,
        fontSize: 12,
        
    },
    text2: {
        color: '#fff',
        marginBottom: 5,
        fontSize: 20,
        fontWeight: '900'
    },
})
