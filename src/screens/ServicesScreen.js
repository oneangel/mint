import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '../components/BottomSheet';

const ServicesScreen = () => {
  const [status, setStatus] = React.useState(false);

  return(
    <View style={ styles.container }>
      <TouchableOpacity 
        onPress={() => setStatus(true)}
        style={ styles.button }
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Launch Modal</Text>
      </TouchableOpacity>

      { status && <BottomSheet setStatus={ setStatus } /> }

      
    </View>
  )
}
export default ServicesScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#40A2E3'
  }
})