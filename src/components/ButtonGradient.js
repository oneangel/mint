import React from "react";
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";

export default function  ButtonGradient () {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        navigation.navigate("Main");
      };
    return (
        <TouchableOpacity style={styles.container} onPress={handleLoginPress}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#32BBE7', '#3E70A1']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}    
                style={styles.button}
            >
                <Text style={styles.text}>Iniciar Sesión</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: "90%",
        marginTop: 60,
    },

    text: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
  });