import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const TransferCardE = ({ item, toggleModal, toggleModalUp, setItem }) => {
  const { _id, type, description, createdAt, amount } = item;
  const iconColor = type === "income" ? "#0D9488" : "#B91C1C";
  const amountColor = type === "income" ? "#465568" : "#465568";
  const iconName = type === "income" ? "smile-circle" : "frown";

  return (
    <View style={styles.container}>
      <View style={[styles.iconBackground, { backgroundColor: iconColor }]}>
        <AntDesign
          name={iconName}
          size={22}
          color="white"
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{description}</Text>
        <Text style={styles.lightText}>${amount}</Text>
      </View>
      <Text style={[styles.number, { color: amountColor }]}>{createdAt.split('T')[0]}</Text>
      <TouchableOpacity onPress={() => {
        setItem(item)
        toggleModal();
      }}>
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="#B91C1C"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setItem(item)
        toggleModalUp();
      }}>
        <MaterialIcons
          name="edit"
          size={30}
          color="#1B3E73"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    justifyContent: "center",
    marginTop: 3,
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
    fontSize: 15
  },
  lightText: {
    fontWeight: "300",
    fontSize: 16
  },
  number: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 15
  },
});

export default TransferCardE;
