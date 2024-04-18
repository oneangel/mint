import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import React, { useState, useEffect } from "react";
import GoalList from "../components/GoalList";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import GoalSheet from "../components/GoalSheet";

const WalletScreen = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [status, setStatus] = useState(false);


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
          <Text style={styles.circleText2}>$14,400</Text>
          <Text style={styles.circleText3}>{formatDate(currentDateTime)}</Text>
        </View>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Meta seleccionada</Text>
          <View style={styles.metaSelected}>
            <Text>Pc Gamer</Text>
            <Text>$2,000</Text>
            <Progress.Bar
              progress={0.3}
              width={160}
              color="#1C9782"
              unfilledColor="#fff"
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>Fecha de incio:</Text>
              <Text>Marzo 31, 2024</Text>
            </View>
            <View>
              <Text>Fecha límite:</Text>
              <Text>Agosto 31, 2024</Text>
            </View>
          </View>
        </View>
        <View style={styles.goalListContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.goalText}>Transacciones</Text>
            <TouchableOpacity style={styles.addButton}  onPress={() => setStatus(true)}>
              <FontAwesome5 name="piggy-bank" size={15} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ maxHeight: 160, minHeight: 160 }}>
            <GoalList />
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
    height: 220,
    backgroundColor: "#fff",
    width: "90%",
    height: 220,
    borderRadius: 10,
    top: 160,
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
