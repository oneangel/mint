import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TransferList from "../components/TransferList";
import { ScrollView } from "react-native-gesture-handler";
import SheetTransfer from "../components/SheetTransfer";


const TransferScreen = () => {
  const [selectedOption, setSelectedOption] = useState("ingresos");
  const [status, setStatus] = useState(false);

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
          <Text style={{ marginLeft: 20 }}>Grafica 1....📊</Text>
        </View>
      ) : (
        <View>
          <Text style={{ marginLeft: 20 }}>Grafica 2....📊</Text>
        </View>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.h3}>Transacciones</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setStatus(true)}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ height: 500 }}>
         <TransferList />
      </ScrollView>
      {status && <SheetTransfer setStatus={setStatus} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FDFE",
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
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 20,
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
  h3: {
    color: "#363636",
    fontSize: 25,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 25,
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopColor: "#ccc",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingStart: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TransferScreen;
