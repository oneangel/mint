import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import LastestTrans from "../components/LastestTrans";
import GeneralBalance from "../components/GeneralBalance";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lowerContainer}>
        <Text style={styles.h3}>Servicios</Text>

        <View style={styles.horizontalScrollViewContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.waterContainer}>
              <Text style={styles.textContainer}>Agua</Text>
              <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingTop: 5 }}>
                <Ionicons name="water" size={24} color="blue" />
                <Text style={styles.subititle}>$2.00</Text>
              </View>
            </View>
            <View style={styles.energyContainer}>
              <Text style={styles.textContainer}>Electricidad</Text>
              <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingTop: 5 }}>
                <Ionicons name="flash" size={24} color="orange" />
                <Text style={styles.subititle}>$2.00</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <LastestTrans />
      </View>
      <View style={styles.upperContainer}>
        <Image
          source={require("../../assets/bg.jpg")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
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
    backgroundColor: "#3E70A1",
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
    top: "38%",
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
    marginTop: 90,
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
  waterContainer: {
    width: 240,
    height: 90,
    backgroundColor: "#ECF6FF",
    borderWidth: 1,
    borderColor: "#D3DFE7",
    borderRadius: 25,
    padding: 5,
  },
  energyContainer: {
    width: 200,
    height: 90,
    backgroundColor: "#ECF6FF",
    borderWidth: 1,
    borderColor: "#D3DFE7",
    borderRadius: 25,
    padding: 5,
    marginLeft: 20,
  },
  textContainer: {
    color: "gray",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  subititle: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 5,
  },
});

export default HomeScreen;
