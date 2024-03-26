import React from 'react';
import { Text, View, } from 'react-native';
import { IconButton } from 'react-native-paper';

const ButtonTrans = () => {
  return (
    <IconButton
      icon={'send'}
      iconColor='#3E70A1'
      size={23}
      onPress={() => console.log('Transferir')}
    />
  );
};

export default ButtonTrans;
