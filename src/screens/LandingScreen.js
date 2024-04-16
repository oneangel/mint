import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const LandingScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <View style={styles.lowerContainer}>
        <Text style={styles.h1}>
          Ahorra <Text style={styles.blueText}>fresco</Text>, vive sin límites.
        </Text>
        <Text style={styles.p}>
          Analizar tus gastos anteriores garantiza una mejor retroalimentacion y
          control al tomar una decisión financiera.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={handleLoginPress}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={handleRegisterPress}
          >
            <Text style={[styles.buttonText, styles.signUpButtonText]}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("../../assets/piggy.png")}
        style={styles.Image}
      ></Image>
      <View style={styles.upperContainer}>
        <Image
          source={require("../../assets/Icons/mint2.png")}
          style={styles.mint}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#3E70A1",
  },
  upperContainer: {
    flex: 1,
    zIndex: 1,
    position: "relative",
    color: "#fff",
  },
  lowerContainer: {
    flex: 2,
    backgroundColor: "#F9FDFE",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: "50%",
    zIndex: 2,
    alignItems: "center",
  },
  h1: {
    color: "#000",
    fontSize: 35,
    marginTop: "20%",
    textAlign: "center",
    fontWeight: "bold",
  },
  p: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    fontWeight: "300",
  },
  blueText: {
    color: "#3290E7",
  },
  Image: {
    zIndex: 2,
    position: "absolute",
    overflow: "hidden",
    width: 380,
    alignSelf: "center",
    height: 230,
    top: "30%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#3290E7",
    zIndex: 1,
  },
  signUpButton: {
    backgroundColor: "#ccc",
    marginLeft: -50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signUpButtonText: {
    marginLeft: 10,
    color: "#000",
  },
  mint: {
    position: "absolute",
    top: 30,
    width: 120,
    height: 120,
    alignSelf: "center",
    tintColor: "#fff",
  },
});

export default LandingScreen;
