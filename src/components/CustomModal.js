import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
  View
} from "react-native";
import { Modal, ModalTitle, ModalContent, ModalFooter, ModalButton } from "react-native-modals";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

const CustomModal = ({ isVisible, toggleModal, setValue, onSubmit }) => {
  const [date, setDate] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const slide = React.useRef(new Animated.Value(300)).current;

  const toggleDatePicker = () => {
    setShow(!show);
  };


  return (
    <Modal visible={isVisible} onTouchOutside={toggleModal}>
      <ModalContent>
        <MaterialIcons
          name="note-add"
          size={65}
          color="#0D9488"
          style={{ textAlign: "center", marginBottom: 15 }}
        />
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
            Agregar Transacción.
          </Text>
          <Text style={{ fontSize: 15, color: "#666", textAlign: "center", marginBottom: 4 }}>
            Estas a punto de agregar una transaccion.
          </Text>
        </View>
        <TextInput
          placeholder="Descripcion"
          onChangeText={text => setValue('description', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Cantidad"
          onChangeText={text => setValue('amount', text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={toggleDatePicker}>
          <TextInput
            placeholder="Fecha"
            style={styles.input}
            editable={false}
            value={date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}
          />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShow(false);
              if (selectedDate) {
                setDate(selectedDate);
                const adjustedDate = new Date(selectedDate);
                adjustedDate.setHours(selectedDate.getHours() - selectedDate.getTimezoneOffset() / 60);
                setValue("createdAt", adjustedDate.toISOString());
              }
            }}
          />
        )}
      </ModalContent>
      <ModalFooter>
        <ModalButton text="Cerrar" textStyle={{ color: "#B91C1C" }} onPress={toggleModal}></ModalButton>
        <ModalButton text="Aceptar" textStyle={{ color: "#fff" }} onPress={onSubmit} style={{ backgroundColor: "#0D9488" }}></ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;

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

{/* <Modal visible={isVisible} onTouchOutside={toggleModal}>
      <ModalContent>
        <ModalTitle title={
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="bag-add"
              size={65}
              color="#1B3E73"
              style={{ textAlign: "center" }}
            />
          </View>
        } hasTitleBar={false} style={{ marginBottom: 0 }} />

        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 14 }}>
            Agregar Transacción.
          </Text>
          <TextInput
            placeholder="Descripcion"
            onChangeText={text => setValue('description', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Cantidad"
            onChangeText={text => setValue('amount', text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleDatePicker}>
            <TextInput
              placeholder="Fecha"
              style={styles.input}
              editable={false}
              value={date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}
            />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShow(false);
              if (selectedDate) {
                setDate(selectedDate);
                const adjustedDate = new Date(selectedDate);
                adjustedDate.setHours(selectedDate.getHours() - selectedDate.getTimezoneOffset() / 60);
                setValue("createdAt", adjustedDate.toISOString());
              }
            }}
          />
        )}
      </ModalContent>
      <ModalFooter>
        <ModalButton text="Cancelar" textStyle={{ color: "#B91C1C" }} style={{ backgroundColor: "fff" }} onPress={toggleModal} />
        <ModalButton text="Aceptar" textStyle={{ color: "#fff" }} style={{ backgroundColor: "#1B3E73" }} onPress={onSubmit} />
      </ModalFooter>
    </Modal> */}