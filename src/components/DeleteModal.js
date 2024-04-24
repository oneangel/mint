import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { Modal, ModalContent, ModalFooter, ModalButton } from "react-native-modals";
import { FontAwesome } from "@expo/vector-icons";

const DeleteModal = ({ isVisible, toggleModal, onDelete }) => {
  const [date, setDate] = React.useState(null);
  const [show, setShow] = React.useState(false);

  return (
    <Modal visible={isVisible} onTouchOutside={toggleModal}>
      <ModalContent>
        <FontAwesome
          name="trash"
          size={65}
          color="#B91C1C"
          style={{ textAlign: "center", marginBottom: 15 }}
        />
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
            Estas apunto de eliminar esta transaccion.
          </Text>
          <Text style={{ fontSize: 15, color: "#666", textAlign: "center", marginBottom: 4 }}>
            Esta transaccion sera eliminada para siempre
          </Text>
          <Text style={{ fontSize: 15, color: "#666", textAlign: "center" }}>
            Estas seguro?
          </Text>
        </View>

      </ModalContent>
      <ModalFooter>
        <ModalButton text="Cerrar" textStyle={{ color: "#B91C1C" }} onPress={toggleModal}></ModalButton>
        <ModalButton text="Aceptar" textStyle={{ color: "#fff" }} onPress={onDelete} style={{ backgroundColor: "#B91C1C" }}></ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;

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
