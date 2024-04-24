import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";

const LoadingScreen = ({ text }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/Icons/mint2.png")}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          tintColor: "#3E70A1",
        }}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#3E70A1" />
      <Text>{text}</Text>
    </View>
  );
};
export default LoadingScreen;
