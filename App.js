import * as React from 'react';
import * as Screens from './screens/Screens'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigation } from 'react-native-paper';

const homeName = () => <Screens.HomeScreen/>
const transName = () => <Screens.TransScreen/>
const walletName = () => <Screens.WalletScreen/>
const servicesName = () => <Screens.ServicesScreen/>
const profileName = () => <Screens.ProfileScreen/>

export default function App () {
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'home', title: 'Home', focusedIcon: 'home',},
      { key: 'trans', title: 'Transacción', focusedIcon: 'bank-transfer'},
      { key: 'wallet', title: 'Cartera', focusedIcon: 'wallet' },
      { key: 'services', title: 'Servicios', focusedIcon: 'file-cog' },
      { key: 'profile', title: 'Perfil', focusedIcon: 'account',},
    ]);

    const renderScene = BottomNavigation.SceneMap({
      home: homeName,
      trans: transName,
      wallet: walletName,
      services: servicesName,
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