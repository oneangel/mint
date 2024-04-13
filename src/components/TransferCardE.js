import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TransferCardE = ({ id, type, description, date, amount }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleEdit = () => {
    // Lógica para editar la transferencia
    setEditModalVisible(false); // Cerrar el modal después de editar
  };

  const handleDelete = () => {
    // Lógica para eliminar la transferencia
    setDeleteModalVisible(false); // Cerrar el modal después de eliminar
  };

  const iconColor = type === "ingreso" ? "lightgreen" : "#465568";
  const amountColor = type === "ingreso" ? "lightgreen" : "#465568";
  const iconName = type === "ingreso" ? "chevron-up" : "chevron-down";

  return (
    <View style={styles.container}>
      <View style={[styles.iconBackground, { backgroundColor: iconColor }]}>
        <FontAwesome
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
      {/* Iconos de editar y eliminar */}
      <TouchableOpacity onPress={() => setEditModalVisible(true)}>
        <View style={styles.optionButton}>
          <FontAwesome name="edit" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
        <View style={[styles.optionButton, { backgroundColor: "red" }]}>
          <FontAwesome name="trash" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
      {/* Modal para editar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Contenido del modal para editar */}
            <TouchableOpacity onPress={handleEdit}>
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal para eliminar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Contenido del modal para eliminar */}
            <TouchableOpacity onPress={handleDelete}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
            <Text style={{ color: "red" }}>¿Estás seguro de eliminar esta transacción?</Text>
          </View>
        </View>
      </Modal>
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
    borderRadius: 20, // Hace que el fondo sea completamente circular
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
  optionButton: {
    width: 30,
    height: 30,
    borderRadius: 20, // Hace que el fondo sea completamente circular
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
});

export default TransferCardE;
