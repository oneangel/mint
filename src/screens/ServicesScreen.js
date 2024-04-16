import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import BottomSheet from "../components/BottomSheet";

const ServicesScreen = () => {
  const [status, setStatus] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FDFE" }}>
      <Image
        source={require("../../assets/Icons/mint1.png")}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Text style={styles.title}>No hay un medidor asociado 😢</Text>
        <TouchableOpacity onPress={() => setStatus(true)} style={styles.button}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Asociar Medidor
          </Text>
        </TouchableOpacity>
      </View>
      {status && <BottomSheet setStatus={setStatus} />}
    </View>
  );
};
export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: 80,
    height: 80,
    tintColor: "#3E70A1",
    alignSelf: "center",
    top: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#40A2E3",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
