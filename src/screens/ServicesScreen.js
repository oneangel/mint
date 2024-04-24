import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import BottomSheet from "../components/BottomSheet";
import { Center } from "native-base";
import { LiquidGauge } from "react-native-liquid-gauge";

const ServicesScreen = () => {
  const [status, setStatus] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FDFE" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          top: 20,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#3E70A1" }}>
          Servicios
        </Text>
        <Image
          source={require("../../assets/Icons/mint1.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      {/* <View style={styles.container}>
        <Text style={styles.title}>No hay un medidor asociado 😢</Text>
        <TouchableOpacity onPress={() => setStatus(true)} style={styles.button}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Asociar Medidor
          </Text>
        </TouchableOpacity>
      </View>
      {status && <BottomSheet setStatus={setStatus} />} */}
      <Center
        bg="white"
        _text={{
          color: "white",
          fontWeight: "bold",
        }}
        height="300"
        width="300"
        alignSelf="center"
        shadow={2}
      >
        <LiquidGauge
          config={{
            textVertPosition: 0.8,
            waveAnimateTime: 5000,
            waveHeight: 0.15,
            waveAnimate: false,
            waveOffset: 0.25,
            valueCountUp: false,
            textSuffix: '',
          }}
          value={30}
          width={200}
          height={200}
        />
      </Center>
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
    top: 4,
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
