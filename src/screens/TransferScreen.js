import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TransferList from "../components/TransferList";

const TransferScreen = () => {
  const [selectedOption, setSelectedOption] = useState("ingresos");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Icons/mint1.png")}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Grafiquita 😋</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handleOptionChange("ingresos")}>
          <Text style={[styles.optionText, selectedOption === "ingresos" && styles.selectedOption]}>
            Ingresos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionChange("gastos")}>
          <Text style={[styles.optionText, selectedOption === "gastos" && styles.selectedOption]}>
            Gastos
          </Text>
        </TouchableOpacity>
      </View>

      {selectedOption === "ingresos" ? (
        <View>
          {/* Aquí renderiza el contenido de los ingresos */}
          <Text style={{marginLeft:20}}>Grafica ingresos 😴</Text>
        </View>
      ) : (
        <View>
          {/* Aquí renderiza el contenido de los gastos */}
          <Text style={{marginLeft:20}}>grafica de gastos 😴</Text>
        </View>
      )}

      <TransferList />
    </View>
  );
};

export default TransferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FDFE",
  },
  title: {
    color: "#363636",
    fontSize: 25,
    marginTop: "5%",
    marginLeft: "5%",
    fontWeight: "bold",
  },
  headerImage: {
    width: 80,
    height: 80,
    tintColor: "#3E70A1",
    top: 20,
    left: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    marginHorizontal:20,
    marginVertical: 20,
    gap: 20
  },
  optionText: {
    fontSize: 18,
    color: "#363636",
  },
  selectedOption: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
