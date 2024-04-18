import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';

const TransferCard = ({ id, type, description, date, amount }) => {
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
    paddingHorizontal: 29,
    marginTop: 20,
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
    fontWeight: "bold",
  },
  lightText: {
    fontWeight: "200",
  },
  number: {
    fontWeight: "bold",
  },
});

export default TransferCard;