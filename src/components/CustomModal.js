import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Modal, ModalTitle, ModalContent, ModalFooter, ModalButton } from "react-native-modals";
import { Input, Icon } from "native-base";

import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

const CustomModal = ({ isVisible, toggleModal, setValue, onSubmit, title, subtitle, icon, data }) => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const onClick = (data) => {
    setDate(null);
    onSubmit(data);
  };


  return (
    <Modal visible={isVisible} onTouchOutside={toggleModal}>
      <ModalTitle style={{ backgroundColor: "#3E70A1" }} title={<View>
        {icon}
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 10 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 15, color: "#eee", textAlign: "center", marginBottom: 4 }}>
            {subtitle}
          </Text>
        </View>
      </View>} />

      <ModalContent>
        {data.map((input, index) => {
          return input.name != "createdAt" && input.name != "finalDate" ? (
            <Input
              key={index}
              placeholder={input.label}
              onChangeText={text => setValue(`${input.name}`, text)}
              style={styles.input}
              keyboardType={input.name === "amount" ? "numeric" : "default"}
              bg="white"
              variant="rounded"
              marginBottom={3}
              w={{
                base: "100%",
                md: "25%",
              }}
              h={{ base: "12" }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name={input.icon} />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
          ) : (
            <View key={index}>
              <TouchableOpacity onPress={toggleDatePicker}>
                <Input
                  placeholder="Fecha"
                  style={styles.input}
                  editable={false}
                  value={date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}
                  bg="white"
                  variant="rounded"
                  marginBottom={3}
                  w={{
                    base: "100%",
                    md: "25%",
                  }}
                  h={{ base: "12" }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name={input.icon} />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
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
                      setValue(`${input.name}`, adjustedDate.toISOString());
                    }
                  }}
                />
              )}
            </View>



          )
        })}
      </ModalContent>
      <ModalFooter>
        <ModalButton text="Cerrar" textStyle={{ color: "#B91C1C" }} onPress={toggleModal}></ModalButton>
        <ModalButton text="Aceptar" textStyle={{ color: "#fff" }} onPress={(data) => onClick(data)} style={{ backgroundColor: "#3E70A1" }}></ModalButton>
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
    fontSize: 15,
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