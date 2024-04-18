import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const GoalSheet = ({ setStatus }) => {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const slide = React.useRef(new Animated.Value(300)).current;

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };
  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    slideUp();
  });

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 800);
  };

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={{ width: "100%", height: "50%" }}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Crear nueva meta
          </Text>
          <View style={{ marginTop: 20 }}>
            <TextInput placeholder="Descripción" style={styles.input} />
            <TextInput placeholder="Meta" style={styles.input} />
            {!show && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  placeholder="Fecha de meta"
                  style={styles.input}
                  editable={false}
                />
              </Pressable>
            )}

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
              />
            )}

            <TouchableOpacity style={styles.button}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Crear
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default GoalSheet;

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
