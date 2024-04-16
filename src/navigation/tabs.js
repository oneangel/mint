import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import TransferScreen from "../screens/TransferScreen";
import WalletScreen from "../screens/WalletScreen";
import ServicesScreen from "../screens/ServicesScreen";
import LoginScreen from "../screens/LoginScreen";
import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing" >
      <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Main" component={Tabs} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};


const Tabs = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/Icons/mint2.png")}
          style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          tintColor: "#3E70A1",}}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#3E70A1" />
      </View>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 30,
          height: 70,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                <Image
                  source={require("../../assets/Icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#3E70A1" : "grey",
                  }}
                />
                <Text
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 10 }}
                >
                  Inicio
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                <Image
                  source={require("../../assets/Icons/transfer.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#3E70A1" : "grey",
                  }}
                />
                <Text
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 10 }}
                >
                  Transferencias
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                <Image
                  source={require("../../assets/Icons/wallet.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#3E70A1" : "grey",
                  }}
                />
                <Text
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 10 }}
                >
                  Cartera
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                <Image
                  source={require("../../assets/Icons/services.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#3E70A1" : "grey",
                  }}
                />
                <Text
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 10 }}
                >
                  Servicios
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                <Image
                  source={require("../../assets/Icons/profile.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#3E70A1" : "grey",
                  }}
                />
                <Text
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 10 }}
                >
                  Perfil
                </Text>
              </View>
            );
          },
        }}
      />
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#3290E7",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default MainStackNavigator;
