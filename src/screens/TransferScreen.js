import { View, StyleSheet, Text, Image } from "react-native";
import React from "react";
import TransferList from "../components/TransferList";

const TransferScreen = () => {
  return (
    <View style={styles.container}>
      <Image
          source={require("../../assets/Icons/mint1.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      <Text style={styles.title}>Grafiquita 😋</Text>

      <TransferList />
    </View>
  );
};

export default TransferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FDFE",
  },
  title: {
    color: "#363636",
    fontSize: 25,
    marginTop: "5%",
    marginLeft: "5%",
    fontWeight: "bold",
  },
  headerImage: {
    width: 80,
    height: 80,
    tintColor: "#3E70A1",
    top: 20,
    left: 20,
  },
});
