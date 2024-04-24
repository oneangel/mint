import React, { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import { Modal, ModalContent, ModalFooter, ModalButton } from "react-native-modals";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const UpdateModal = ({ isVisible, toggleModal, onUpdate, item, setItem }) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);
  const toggleDatePicker = () => {
    setShow(!show);
  };

  const handleDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      const adjustedDate = new Date(selectedDate);
      adjustedDate.setHours(selectedDate.getHours() - selectedDate.getTimezoneOffset() / 60);
      setItem(prevState => ({
        ...prevState,
        createdAt: adjustedDate
      }));
    }
    inputRef.current.blur(); // Ocultar el teclado numérico
  };

  return (
    <Modal visible={isVisible} onTouchOutside={toggleModal}>
      <ModalContent>
        <MaterialIcons
          name="edit"
          size={65}
          color="#0D9488"
          style={{ textAlign: "center", marginBottom: 15 }}
        />
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
            Editar Transacción.
          </Text>
          <Text style={{ fontSize: 15, color: "#666", textAlign: "center", marginBottom: 4 }}>
            La informacion de esta transaccion sera actualizada.
          </Text>
        </View>
        <TextInput
          placeholder="Descripcion"
          onChangeText={text => {
            setItem(prevState => ({
              ...prevState,
              description: text
            }));
          }}
          style={styles.input}
          value={item.description}
        />
        <TextInput
          placeholder="Cantidad"
          onChangeText={text => {
            setItem(prevState => ({
              ...prevState,
              amount: text
            }));
          }}
          style={styles.input}
          value={`${item.amount}`}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={toggleDatePicker}>
          <TextInput
            ref={inputRef} // Asignar la referencia al TextInput
            placeholder="Fecha"
            style={styles.input}
            editable={false}
            value={item.createdAt ? new Date(new Date(item.createdAt).getTime() - new Date(item.createdAt).getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}
          />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={new Date(item.createdAt) || new Date()}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </ModalContent>
      <ModalFooter>
        <ModalButton text="Cerrar" textStyle={{ color: "#B91C1C" }} onPress={toggleModal}></ModalButton>
        <ModalButton text="Aceptar" textStyle={{ color: "#fff" }} onPress={() => onUpdate(item)} style={{ backgroundColor: "#0D9488" }}></ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bcbcbc",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#40A2E3",
    alignItems: "center",
    marginTop: 15,
  },
});
