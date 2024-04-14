import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import TransferScreen from "../screens/TransferScreen";
import WalletScreen from "../screens/WalletScreen";
import ServicesScreen from "../screens/ServicesScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
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
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 12 }}
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
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 12 }}
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
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 12 }}
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
                  style={{ color: focused ? "#3E70A1" : "grey", fontSize: 12 }}
                >
                  Servicios
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
export default Tabs;
