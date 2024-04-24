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
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../screens/LoadingScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabArr = [
  {
    name: "Inicio",
    component: HomeScreen,
    icon: "home",
    tabBarColor: "#3E70A1",
  },
  {
    name: "Transacciones",
    component: TransferScreen,
    icon: "swap-horizontal",
    tabBarColor: "#3E8FA1",
  },
  {
    name: "Cartera",
    component: WalletScreen,
    icon: "wallet",
    tabBarColor: "#3EA189",
  },
  {
    name: "Servicios",
    component: ServicesScreen,
    icon: "layers",
    tabBarColor: "#583EA1",
  },
  {
    name: "Perfil",
    component: ProfileScreen,
    icon: "person-circle",
    tabBarColor: "#A13E3E",
  },
];

const Tabs = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen text="Cargando..." />
    );
  }

  return (
    <Tab.Navigator>
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#ABABAB",
            tabBarStyle: {
              backgroundColor: "#3E70A1",
              height: 60,
              paddingBottom: 5,
            },
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={item.icon}
                size={30}
                color={focused ? "#fff" : "#ABABAB"}
              />
            ),
          }}
        />
      ))}
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
