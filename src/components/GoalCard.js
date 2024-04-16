import { View, Text, StyleSheet } from "react-native";
import React from "react";

const GoalCard = ({ id,description, date, goal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{description}</Text>
        <Text style={styles.lightText}>{date}</Text>
      </View>
      <Text style={styles.number}>${goal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconBackground: {
    borderRadius: 50,
    padding: 8,
  },
  icon: {
    
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  boldText: {
    color: "#606060",
    fontWeight: "bold",
  },
  lightText: {
    color: "#606060",
    fontWeight: "200",
  },
  number: {
    color: "#606060",
    fontWeight: "bold",
  },
});

export default GoalCard;
