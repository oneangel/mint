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
          <Text style={{marginLeft:20}}>Grafica....📊</Text>
        </View>
      ) : (
        <View>
          <Text style={{marginLeft:20}}>Grafica....📊</Text>
        </View>
      )}
      <View style={{ height: 500 }}>
        <TransferList />
      </View>
      
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
    alignSelf: "center",
    top: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    marginHorizontal:20,
    marginVertical: 10,
    gap: 20
  },
  optionText: {
    fontSize: 18,
    color: "gray",
  },
  selectedOption: {
    fontWeight: "bold",
    color: "#000",
    textDecorationLine: "underline",
  },
});
