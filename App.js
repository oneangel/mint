import React from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/tabs";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalPortal } from "react-native-modals";
import { AlertNotificationRoot } from "react-native-alert-notification";


const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("./assets/Icons/mint2.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            tintColor: "#3E70A1",
          }}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#3E70A1" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AlertNotificationRoot>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </AlertNotificationRoot>
      <ModalPortal />
    </QueryClientProvider>
  );
}