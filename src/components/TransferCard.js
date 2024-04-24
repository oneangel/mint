import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign, Entypo } from '@expo/vector-icons';

const TransferCard = ({ id, type, description, createdAt, amount }) => {
  const iconColor = type === "income" ? "#0d9488" : "#B91C1C";
  const amountColor = type === "income" ? "#0d9488" : "#B91C1C";

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  iconBackground: {
    borderRadius: 15,
    padding: 12,
  },
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
    fontSize: 15
  },
});

export default TransferCard;
