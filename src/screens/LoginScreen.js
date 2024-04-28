import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import ButtonGradient from "../components/ButtonGradient";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLogin } from "../hooks/user.hooks";
import { useNavigation } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import LoadingScreen from "./LoadingScreen";
import { Input, Stack, Icon } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
    loginMutation.mutate(data);
  };

  const loginMutation = useMutation(useLogin, {
    onSuccess: () => {
      navigation.navigate("Main");
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "¡Credenciales incorrectas!",
        textBody:
          "Por favor, ingresa credenciales validas. Si no tienes cuenta registrate",
        button: "Aceptar",
        onPressButton: () => Dialog.hide(),
      });
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  function SvgTop() {
    return (
      <Svg
        width={500}
        height={350}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
          fill="url(#prefix__paint0_linear_103:6)"
          fillOpacity={0.5}
        />
        <Path
          d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
          fill="url(#prefix__paint1_linear_103:6)"
        />
        <Defs>
          <LinearGradient
            id="prefix__paint0_linear_103:6"
            x1={492.715}
            y1={231.205}
            x2={480.057}
            y2={364.215}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3290E7" />
            <Stop offset={1} stopColor="#32BBE7" />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint1_linear_103:6"
            x1={7.304}
            y1={4.155}
            x2={144.016}
            y2={422.041}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#32BBE7" />
            <Stop offset={1} stopColor="#3E70A1" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }

  if (isLoading) {
    return <LoadingScreen text="Iniciando sesion..." />;
  }

  if (!isLoading) {
    return (
      <AlertNotificationRoot>
        <View style={styles.mainContainer}>
          <View style={styles.containerSVG}>
            <Image
              source={require("../../assets/Icons/mint2.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <SvgTop />
          </View>
          <View style={styles.container}>
            <Text style={styles.titulo}>Hola otra vez!</Text>
            <Text style={styles.subTitle}>Inicia sesión con tu cuenta</Text>
            <Stack space={4} w="100%" alignItems="center" paddingTop={10}>
              <Input
                onChangeText={(text) => setValue("username", text)}
                variant="rounded"
                bg="white"
                w={{
                  base: "80%",
                  md: "25%",
                }}
                h={{ base: "12" }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Nombre de usuario"
              />
              <Input
                onChangeText={(text) => setValue("password", text)}
                w={{
                  base: "80%",
                  md: "25%",
                }}
                h={{ base: "12" }}
                type={show ? "text" : "password"}
                variant="rounded"
                bg="white"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Contraseña"
              />
            </Stack>
            <ButtonGradient
              onSubmit={handleSubmit(onSubmit)}
              title="Iniciar Sesión"
              valid={!isValid}
              route="Main"
            />
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.forgotPassword}>
                ¿No tienes una cuenta? Registrate
              </Text>
            </Pressable>
            <StatusBar style="auto" />
          </View>
        </View>
      </AlertNotificationRoot>
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
    position: "relative",
  },
  titulo: {
    fontSize: 50,
    color: "#34434D",
    fontWeight: "bold",
    marginTop: 20,
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
    position: "absolute",
    width: 200,
    height: 200,
    top: 100,
    zIndex: 1,
  },
});
