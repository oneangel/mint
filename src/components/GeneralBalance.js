import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const GeneralBalance = ({ expenses, incomes }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.item}>

          <MaterialIcons name="attach-money"
            style={[styles.icon, { backgroundColor: "#1C9782" }]}
            size={30}
          />
          <View>
            <Text style={styles.text}>Ingresos</Text>
            <Text style={styles.text2}>${incomes.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <MaterialIcons name="money-off"
            style={[styles.icon, { backgroundColor: "#B91C1C" }]}
            size={30} />
          <View>
            <Text style={styles.text}>Gastos</Text>
            <Text style={styles.text2}>${expenses.toFixed(2)}</Text>
          </View>
        </View>

      </View>
    </>
  );
};

export default GeneralBalance;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 20,
    marginHorizontal: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10
  },
  text: {
    color: "#000",
    marginBottom: 5,
    fontSize: 12,
  },
  text2: {
    color: "#000",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "900",
  },
  icon: {
    backgroundColor: "#3E70A1",
    color: "#fff",
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
  }
});

