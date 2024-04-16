import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TransferList from "../components/TransferList";


const TransferScreen = () => {
  const [selectedOption, setSelectedOption] = useState("ingresos");
  const [showAddForm, setShowAddForm] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [fecha, setFecha] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleAddButtonPress = () => {
    setShowAddForm(true);
  };

  const handleSaveButtonPress = () => {
    // Aquí puedes manejar la lógica para guardar los datos ingresados en el formulario
    // por ejemplo, puedes enviarlos a una función de guardado o a un servicio API
    // Luego, puedes limpiar los campos del formulario y ocultar el formulario de nuevo
    setDescripcion("");
    setCantidad("");
    setDestinatario("");
    setFecha("");
    setShowAddForm(false);
  };

  const handleCloseButtonPress = () => {
    // Aquí simplemente ocultamos el formulario
    setShowAddForm(false);
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
          <Text style={{ marginLeft: 20 }}>Grafica....📊</Text>
        </View>
      ) : (
        <View>
          <Text style={{ marginLeft: 20 }}>Grafica....📊</Text>
        </View>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.h3}>Transacciones</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {showAddForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={(text) => setDescripcion(text)}
            placeholder="Descripción"
          />
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={(text) => setCantidad(text)}
            placeholder="Cantidad"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={destinatario}
            onChangeText={(text) => setDestinatario(text)}
            placeholder="Destinatario"
          />
          <TextInput
            style={styles.input}
            value={fecha}
            onChangeText={(text) => setFecha(text)}
            placeholder="Fecha"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveButtonPress}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseButtonPress}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{ height: 500 }}>
        <TransferList />
      </View>
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
