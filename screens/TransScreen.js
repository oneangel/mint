import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { List, Searchbar, Divider } from 'react-native-paper';

import styles from '../styles/styles';

const TransScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/mint-logo.png')}></Image>

      <Text style={styles.title1}>Transacciones</Text>
      <Searchbar style={styles.searchbar}
        elevation={1}
        iconColor='#3E70A1'
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View>
        <List.Item
          title="First Item"
          
          left={props => <List.Icon {...props} icon="arrow-up-bold" />}
        />
        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="arrow-down-bold" />}
        />
        <Divider/>

        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="arrow-up-bold" />}
        />
        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="arrow-down-bold" />}
        />
        <Divider/>
        
        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="arrow-up-bold" />}
        />
        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="arrow-down-bold" />}
        />
        <Divider/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default TransScreen;