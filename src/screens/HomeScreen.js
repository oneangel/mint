import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import LastestTrans from "../components/LastestTrans";
import GeneralBalance from "../components/GeneralBalance";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { useGetTE, useGetTI, useGetLT } from "../hooks/transaction.hooks";

const HomeScreen = () => {

  const {
    data: totalExpense,
    isLoading: isLoadingTotalExpense,
    isError: isErrorTotalExpense
  } = useQuery("totalExpense", useGetTE);

  const {
    data: totalIncome,
    isLoading: isLoadingTotalIncome,
    isError: isErrorTotalIncome
  } = useQuery("totalIncome", useGetTI);

  const {
    data: lastTransactions,
    isLoading: isLoadingLT,
    isError: isErrorLT
  } = useQuery("lastTransactions", useGetLT);

  return (
    <View style={styles.container}>
      <View style={styles.lowerContainer}>
        <Text style={styles.h3}>Servicios</Text>

        <View style={{ flexDirection: "row", justifyContent: 'start', marginLeft: 20, marginTop: 20, }}>
          <View style={styles.waterContainer}><Ionicons name="water-sharp" size={20} color="#000" /><Text>Agua</Text></View>
          <View style={styles.energyContainer}><Ionicons name="flash-sharp" size={20} color="#000" /><Text>Agua</Text></View>
        </View>
        {!isLoadingLT && (
          <LastestTrans data={lastTransactions.data} />
        )}
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
        {!isLoadingTotalExpense && !isLoadingTotalIncome && (
          <GeneralBalance expenses={totalExpense.data.expenseTotal} incomes={totalIncome.data.incomeTotal} />
        )}
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
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#B8D3ED",
    borderWidth: 1,
    borderColor: "#7797B7",
    borderRadius: 10,
    padding: 5,
  },
  energyContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FBE0B8",
    borderWidth: 1,
    borderColor: "#E3B775",
    borderRadius: 10,
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
