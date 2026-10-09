import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const { Registrar, IniciarSesion } = useContext(AppContext);
  const [modo, setModo] = useState("login"); 

 
  const [loginEmail, setLoginEmail] = useState("");

 
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [foto] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZF78tfSWvwzUFV2t8DaAGY4xfY0hl_sY2XjqqtxHew&s=10"
  );

  const IniciaSesion = () => {
    if (!loginEmail) {
      Alert.alert("Atención", "Por favor ingresa tu email.");
      return;
    }
    const res = IniciarSesion(loginEmail);
    if (!res.ok) {
      Alert.alert("Error", res.mensaje);
    }
  };

  const Registro = () => {
    if (!nombre || !apellido || !telefono || !email) {
      Alert.alert("Atención", "Por favor completa todos los campos.");
      return;
    }
    Registrar({ nombre, apellido, telefono, email, foto });
    Alert.alert("Éxito", "Usuario registrado correctamente.");
  };

  return (
    <View style={styles.container}>
      {modo === "login" ? (
        <>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu Email registrado"
            keyboardType="email-address"
            value={loginEmail}
            onChangeText={setLoginEmail}
            autoCapitalize="none"
          />
          <Button title="Ingresar" onPress={IniciaSesion} />

          <View style={styles.switchBox}>
            <Text style={styles.subLabel}>¿No tienes cuenta?</Text>
            <Button title="Registrarme" onPress={() => setModo("registro")} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Registrar Perfil</Text>
          <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
          <TextInput style={styles.input} placeholder="Teléfono" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
          <Button title="Crear Cuenta" onPress={Registro} />

          <View style={styles.switchBox}>
            <Text style={styles.subLabel}>¿Ya tienes cuenta?</Text>
            <Button title="Iniciar Sesión" onPress={() => setModo("login")} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 8 },
  subLabel: { fontSize: 14, color: "#666", marginBottom: 5, textAlign: "center" },
  switchBox: { marginTop: 20, alignItems: "center" },
});