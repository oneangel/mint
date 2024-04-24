import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AnimatedProgressWheel from 'react-native-progress-wheel';
import React, { useState, useEffect } from "react";
import GoalList from "../components/GoalList";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import GoalSheet from "../components/GoalSheet";
import { useQuery } from "react-query";
import { useGetB } from "../hooks/transaction.hooks";
import { useGetGL } from "../hooks/goal.hooks";

const WalletScreen = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [status, setStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useQuery("balance", useGetB);

  const {
    data: goalsData,
    isLoading: isLoadingGoals,
    isError: isErrorGoals,
  } = useQuery("goals", useGetGL);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}></View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Balance General</Text>
          {!isLoadingBalance && (<Text style={styles.circleText2}>${balanceData.data.balance.toFixed(2)}</Text>)}
          <Text style={styles.circleText3}>{formatDate(currentDateTime)}</Text>
        </View>
        <View style={styles.metaContainer}>
          {selectedItem === null && (
            <View style={{ height: 190, justifyContent: "center" }}>
              <Text style={{ fontSize: 18, alignSelf: "center" }}>No se ha seleccionado una meta</Text>
            </View>
          )}
          {selectedItem != null && (<>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 18, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  style={{ backgroundColor: "#0D9488", borderRadius: 50, padding: 7 }}
                  name="piggy-bank"
                  size={35}
                  color="#fff" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.metaText}>Meta seleccionada</Text>
                  <Text style={styles.metaText}>{selectedItem.description}</Text>
                </View>
              </View>

              <TouchableOpacity>
                <Ionicons name="add-circle" size={35} color="#1B3E73" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <AnimatedProgressWheel
                size={120}
                width={20}
                color={'#1C9782'}
                progress={((selectedItem.amount / selectedItem.amountGoal) * 100)}
                labelStyle={{ color: "#0D9488", fontSize: 20 }}
                backgroundColor={'#f1f1f1'}
                showProgressLabel={true}
                showPercentageSymbol={true}
              />
              <View style={{ marginLeft: 20 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "#aaa", fontSize: 16, marginBottom: 4 }}>Monto actual</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>${selectedItem.amount.toFixed(2)}</Text>
                </View>
                <View>
                  <Text style={{ color: "#aaa", fontSize: 16, marginBottom: 4 }}>Meta</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>${selectedItem.amountGoal.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </>)}

        </View>
        <View style={styles.goalListContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.goalText}>Metas</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setStatus(true)}>
              <FontAwesome5 name="piggy-bank" size={15} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ maxHeight: 160, minHeight: 160 }}>
            {!isLoadingGoals && (<GoalList data={goalsData.data} setItem={setSelectedItem} />)}
          </ScrollView>
        </View>
        {status && <GoalSheet setStatus={setStatus} />}
      </View>
    </>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },
  background: {
    position: "absolute",
    top: -40,
    width: "120%",
    height: "25%",
    backgroundColor: "#334050",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  circle: {
    position: "absolute",
    top: "20%",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#3E70A1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -120,
  },
  circleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  circleText2: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 30,
    marginTop: 5,
  },
  circleText3: {
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 5,
  },
  metaContainer: {
    position: "absolute",
    top: "35%",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
  },
  metaText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  metaSelected: {
    alignItems: "center",
    marginVertical: 10,
  },
  goalListContainer: {
    height: 260,
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    top: 235,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 25,
    padding: 8
    ,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginLeft: 10,
    top: 10,
  },
});
