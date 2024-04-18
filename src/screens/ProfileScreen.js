import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";

const ProfileScreen = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Eduardo");
  const [email, setEmail] = useState("lalo@gmail.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [birthdate, setBirthdate] = useState("1990-01-01"); // Estado para la fecha de nacimiento
  const [password, setPassword] = useState("********"); // Estado para la contraseña
  const [profileImage, setProfileImage] = useState(
    "https://s.france24.com/media/display/451ed2b8-eed6-11ea-afdd-005056bf87d6/w:980/p:16x9/messi-1805.jpg"
  );

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleClose = () => {};

  const handleEditImage = () => {};

  return (
    <ScrollView style={{ backgroundColor: "#F9FDFE" }}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleEditImage}>
            <Image source={profileImage} style={styles.profileImage} transition={1000}/>
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.label}>Nombre:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
            />
          ) : (
            <Text style={styles.text}>{name}</Text>
          )}
          <Text style={styles.label}>Correo Electrónico:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Correo Electrónico"
            />
          ) : (
            <Text style={styles.text}>{email}</Text>
          )}
          <Text style={styles.label}>Teléfono:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Teléfono"
            />
          ) : (
            <Text style={styles.text}>{phone}</Text>
          )}
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={birthdate}
              onChangeText={setBirthdate}
              placeholder="Fecha de Nacimiento"
            />
          ) : (
            <Text style={styles.text}>{birthdate}</Text>
          )}
          <Text style={styles.label}>Contraseña:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              secureTextEntry={true}
            />
          ) : (
            <Text style={styles.text}>********</Text>
          )}
        </View>
        {editing && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        )}
        {!editing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.logOutButton}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FDFE",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileDetails: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logOutButton: {
    backgroundColor: "#971C1C",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
