import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const GoalCard = ({ item, setItem }) => {
  const { _id, description, createdAt, amountGoal } = item;

  return (
    <TouchableOpacity style={styles.container} onPress={() => setItem(item)}>
      <View style={styles.iconBackground}>
        <MaterialIcons
          name="savings"
          size={15}
          color="white"
          style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{description}</Text>
        <Text style={styles.lightText}>{createdAt.split('T')[0]}</Text>
      </View>
      <Text style={styles.number}>${amountGoal}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    marginTop: 10
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B3E73"
  },
  icon: {
    color: "#fff",
    fontSize: 25
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  boldText: {
    color: "#606060",
    fontWeight: "bold",
    fontSize: 15
  },
  lightText: {
    color: "#606060",
    fontWeight: "200",
    fontSize: 16
  },
  number: {
    color: "#606060",
    fontWeight: "bold",
    fontSize: 15
  },
});

export default GoalCard;
