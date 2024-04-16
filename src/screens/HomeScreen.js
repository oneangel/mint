import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import TransferList from "../components/TransferList";
import LastestTrans from "../components/LastestTrans";
import GeneralBalance from "../components/GeneralBalance";


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lowerContainer}>
      <Text style={styles.h3}>Ahorros Recientes</Text>

        <View style={styles.horizontalScrollViewContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

            <View style={styles.card}>
              <Text style={styles.cardText}>Tarjeta 1</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Tarjeta 2</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Tarjeta 3</Text>
            </View>
          </ScrollView>
        </View>
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
  transferListContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  horizontalScrollViewContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#ECF6FF",
    width: 180,
    height: 80,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default HomeScreen;
