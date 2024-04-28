import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { userServices, clientServices } from "../services/services";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import ButtonGradient from "../components/ButtonGradient";
import LoadingScreen from "./LoadingScreen";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const registerUserMutation = useMutation(userServices.registerUser, {
    onError: (error) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hubo un error al Registrarte intentalo de nuevo!",
        textBody:
          "Por favor, ingresa tus credenciales nuevamente.",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
      console.log(error);
    },
  });

  const registerClientMutation = useMutation(clientServices.registerClient, {
    onSuccess: () => {
      setIsLoading(false);
      navigation.navigate("Login");
    },
    onError: (error) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hubo un error al Registrarte intentalo de nuevo!",
        textBody:
          "Por favor, ingresa tus credenciales nuevamente.",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    try {
      console.log("IMprmir dataaaa");
      console.log(data);
      registerUserMutation.mutateAsync(data).then(() => {
        registerClientMutation.mutate(data);
      });
    } catch (error) {
      console.log(error);
    }
  };


  if (isLoading) {
    return <LoadingScreen text="Registrando..." />;
  }

  if (!isLoading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.containerSVG}>
          <Image
            source={require("../../assets/Icons/mint2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.titulo}>Regístrate</Text>
          <Text style={styles.subTitle}>
            Ingresa tus datos para crear una cuenta
          </Text>
          <TextInput
            placeholder="Nombre de usuario"
            style={styles.textInput}
            onChangeText={(text) => setValue("username", text)}
          />
          <TextInput
            placeholder="Correo electrónico"
            style={styles.textInput}
            onChangeText={(text) => setValue("email", text)}
          />
          <TextInput
            placeholder="Número de teléfono"
            style={styles.textInput}
            onChangeText={(text) => setValue("phone", text)}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(text) => setValue("password", text)}
          />
          <TextInput
            placeholder="Nombre"
            style={styles.textInput}
            onChangeText={(text) => setValue("firstname", text)}
          />
          <TextInput
            placeholder="Apellidos"
            style={styles.textInput}
            onChangeText={(text) => setValue("lastname", text)}
          />
          <ButtonGradient
            title="Registrarse"
            route="Login"
            onSubmit={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
          <StatusBar style="auto" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerSVG: {
    width: width,
    marginTop: -100,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titulo: {
    fontSize: 50,
    color: "#34434D",
    fontWeight: "bold",
    marginTop: 50,
  },
  subTitle: {
    fontSize: 20,
    color: "gray",
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    fontSize: 14,
    color: "gray",
    marginTop: 20,
  },
  button: {},
  logo: {
    position: "relative",
    width: 200,
    height: 200,
    top: 100,
  },
});
