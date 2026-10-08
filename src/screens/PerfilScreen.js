import React from "react";
import {appContext} from '../context/AppContext';
import { View, Text, Image, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';

export default function PerfilScreen (){
    
    const { Usuario, Registrar, } = useContext(appContext);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZF78tfSWvwzUFV2t8DaAGY4xfY0hl_sY2XjqqtxHew&s=10');

  const [editEmail, setEditEmail] = useState(usuario?.email || '');
  const [editTelefono, setEditTelefono] = useState(usuario?.telefono || '');
  const [editando, setEditando] = useState(false);

  // Guardar nuevo registro
  const handleRegistrar = () => {
    if (!nombre || !apellido || !telefono || !email) {
      Alert.alert('Atención', 'Por favor completa todos los campos.');
      return;
    }

    registrarUsuario({
      nombre,
      apellido,
      telefono,
      email,
      foto,
    });
    Alert.alert('Éxito', 'Usuario registrado correctamente.');
  };

  // Guardar cambios editados (Email y Teléfono)
  const handleGuardarCambios = () => {
    actualizarUsuario({
      email: editEmail,
      telefono: editTelefono,
    });
    setEditando(false);
    Alert.alert('Éxito', 'Datos actualizados correctamente.');
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

      <Text style={styles.label}>Nombre: {Usuario.nombre} {Usuario.apellido}</Text>

      {editando ? (
        <>
          <Text style={styles.subLabel}>Email (Editable):</Text>
          <TextInput 
            style={styles.input} 
            value={editEmail} 
            onChangeText={setEditEmail} 
          />

          <Text style={styles.subLabel}>Teléfono (Editable):</Text>
          <TextInput 
            style={styles.input} 
            value={editTelefono} 
            keyboardType="phone-pad"
            onChangeText={setEditTelefono} 
          />

          <Button title="Guardar Cambios" onPress={handleGuardarCambios} />
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