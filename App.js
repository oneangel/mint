import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  HomeScreen,
  TransScreen,
  WalletScreen,
  ProfileScreen
} from './screens/Screens';

const homeName = () => <HomeScreen/>
const transName = () => <TransScreen/>
const walletName = () => <WalletScreen/>
const profileName = () => <ProfileScreen/>

export default function App () {
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'home', title: 'Home', focusedIcon: 'home',},
      { key: 'trans', title: 'Transacción', focusedIcon: 'bank-transfer'},
      { key: 'wallet', title: 'Cartera', focusedIcon: 'wallet' },
      { key: 'profile', title: 'Perfil', focusedIcon: 'account',},
    ]);

    const renderScene = BottomNavigation.SceneMap({
      home: homeName,
      trans: transName,
      wallet: walletName,
      profile: profileName,
    });

  return(
    <SafeAreaProvider>
      <BottomNavigation
        theme={{colors: {secondaryContainer: false, }}}
        labelMaxFontSizeMultiplier={3}
        activeColor='#3E70A1'
        inactiveColor='#606060'
        barStyle= {{backgroundColor:'#ECF6FF'}}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
    
  )
}