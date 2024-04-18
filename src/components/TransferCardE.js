import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const TransferCardE = ({ id, type, description, date, amount }) => {
  const iconColor = type === "ingreso" ? "lightgreen" : "#465568";
  const amountColor = type === "ingreso" ? "lightgreen" : "#465568";
  const iconName = type === "ingreso" ? "caretup" : "caretdown";

  return (
      <View style={styles.container}>
        <View style={[styles.iconBackground, { backgroundColor: iconColor }]}>
          <AntDesign
            name={iconName}
            size={15}
            color="white"
            style={styles.icon}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>{description}</Text>
          <Text style={styles.lightText}>{date}</Text>
        </View>
        <Text style={[styles.number, { color: amountColor }]}>${amount}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {},
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  lightText: {
    fontWeight: "200",
  },
  number: {
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default TransferCardE;
