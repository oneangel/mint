import React from 'react';
import { Text, View, } from 'react-native';
import { IconButton } from 'react-native-paper';

const ButtonDeposit = () => {
  return (
    <IconButton
      icon={'credit-card'}
      iconColor='#3E70A1'
      size={23}
      onPress={() => console.log('Depositar')}
    />
  );
};

export default ButtonDeposit;
