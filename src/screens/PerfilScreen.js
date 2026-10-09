import React, { useContext, useState } from "react";
import { View,Text,Image,StyleSheet,Alert,TextInput,Button,} from "react-native";
import { AppContext } from "../context/AppContext";

export default function PerfilScreen() {
  const { Usuario, Registrar, Actualizar, actualizarUsuario } = useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState( "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZF78tfSWvwzUFV2t8DaAGY4xfY0hl_sY2XjqqtxHew&s=10"
  );

  const [editEmail, setEditEmail] = useState(Usuario?.email || "");
  const [editTelefono, setEditTelefono] = useState(Usuario?.telefono || "");
  const [editando, setEditando] = useState(false);

  // Guardar nuevo registro
  const handleRegistrar = () => {
    if (!nombre || !apellido || !telefono || !email) {
      Alert.alert("Atención", "Por favor completa todos los campos.");
      return;
    }

    const funcionRegistrar = Registrar;
    if (funcionRegistrar) {
      funcionRegistrar({
        nombre,
        apellido,
        telefono,
        email,
        foto,
      });
      Alert.alert("Éxito", "Usuario registrado correctamente.");
    }
  };

  const GuardarCambios = () => {
    const funcionActualizar = Actualizar || actualizarUsuario;
    if (funcionActualizar) {
      funcionActualizar({
        email: editEmail,
        telefono: editTelefono,
      });
      setEditando(false);
      Alert.alert("Éxito", "Datos actualizados correctamente.");
    }
  };

  // CASO 1: Si NO existe un registro de usuario
  if (!Usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Perfil</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Button title="Registrar" onPress={handleRegistrar} />
      </View>
    );
  }

  // CASO 2: Si SÍ existe un usuario registrado
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <Image source={{ uri: Usuario.foto }} style={styles.avatar} />

      <Text style={styles.label}>
        Nombre: {Usuario.nombre} {Usuario.apellido}
      </Text>

      {editando ? (
        <>
          <Text style={styles.subLabel}>Email (Editable):</Text>
          <TextInput
            style={styles.input}
            value={editEmail}
            onChangeText={setEditEmail}
            keyboardType="email-address"
          />

          <Text style={styles.subLabel}>Teléfono (Editable):</Text>
          <TextInput
            style={styles.input}
            value={editTelefono}
            onChangeText={setEditTelefono}
            keyboardType="phone-pad"/>

          <Button title="Guardar Cambios" onPress={GuardarCambios} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Email: {Usuario.email}</Text>
          <Text style={styles.label}>Teléfono: {Usuario.telefono}</Text>

          <Button
            title="Editar Email y Teléfono"
            onPress={() => {
              setEditEmail(Usuario.email);
              setEditTelefono(Usuario.telefono);
              setEditando(true);
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  label: { fontSize: 16, marginBottom: 10 },
  subLabel: { fontSize: 14, color: "#666", marginTop: 10 },
});