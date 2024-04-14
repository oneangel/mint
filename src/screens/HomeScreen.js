import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import TransferList from "../components/TransferList";
import LastestTrans from "../components/LastestTrans";
import GeneralBalance from "../components/GeneralBalance";


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lowerContainer}>
        <LastestTrans />
      </View>
      <View style={styles.upperContainer}>
        {/* Imagen de fondo del upperContainer */}
        <Image
          source={require("../../assets/bg.jpg")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* Imagen de la izquierda */}
        <Image
          source={require("../../assets/Icons/mint1.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.h1}>Hola, Lalito!</Text>
        <Text style={styles.h2}>Aqui esta tu balance general.</Text>
        <GeneralBalance />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#334050",
  },
  upperContainer: {
    flex: 1,
    zIndex: 1,
    position: "relative",
    color: "#fff",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "140%",
    height: "100%",
    opacity: 0.08,
  },
  h1: {
    color: "#fff",
    fontSize: 25,
    marginTop: "30%",
    marginLeft: "5%",
    fontWeight: "bold",
  },
  h2: {
    color: "#fff",
    fontSize: 25,
    marginTop: "2%",
    marginLeft: "5%",
    fontWeight: "200",
  },
  h3: {
    color: "#363636",
    fontSize: 25,
    marginTop: "5%",
    marginLeft: "5%",
    fontWeight: "bold",
  },
  headerImage: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 80,
    height: 80,
    tintColor: "#fff",
    zIndex: 2,
  },
  lowerContainer: {
    flex: 2,
    backgroundColor: "#F9FDFE",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: "35%",
    zIndex: 2,
  },
  transferListContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
