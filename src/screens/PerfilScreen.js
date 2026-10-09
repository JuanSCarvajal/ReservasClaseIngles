import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function PerfilScreen() {
  // Validación de seguridad para evitar que crashee si el Provider no está listo
  const context = useContext(AppContext);

  if (!context) {
    return (
      <View style={styles.contenedorFormulario}>
        <Text style={styles.titulo}>Error de Contexto</Text>
        <Text style={{ textAlign: 'center', color: '#6B7280' }}>
          PerfilScreen debe estar envuelto dentro de AppProvider en App.js.
        </Text>
      </View>
    );
  }

  const { usuario, registrarUsuario, iniciarSesion, cerrarSesion } = context;

  const [modoRegistro, setModoRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Atención', 'Por favor ingresa tu correo electrónico.');
      return;
    }

    const resultado = iniciarSesion(email);

    if (!resultado.exito) {
      Alert.alert('No encontrado', resultado.mensaje);
    } else {
      setEmail('');
    }
  };

  const handleRegistro = () => {
    if (!email.trim() || !nombre.trim()) {
      Alert.alert('Atención', 'Por favor ingresa tu nombre y correo.');
      return;
    }

    const resultado = registrarUsuario({
      id: Date.now().toString(),
      nombre: nombre.trim(),
      email: email.trim(),
    });

    if (!resultado.exito) {
      Alert.alert('Error', resultado.mensaje);
    } else {
      setNombre('');
      setEmail('');
    }
  };

  if (usuario) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Mis Datos</Text>

        <View style={styles.tarjeta}>
          <Text style={styles.label}>Nombre completo:</Text>
          <Text style={styles.valor}>{usuario.nombre}</Text>

          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={styles.valor}>{usuario.email}</Text>
        </View>

        <Pressable style={styles.botonCerrar} onPress={cerrarSesion}>
          <Text style={styles.textoBotonCerrar}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.contenedorFormulario}>
      <Text style={styles.titulo}>
        {modoRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </Text>

      {modoRegistro && (
        <TextInput
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Correo electrónico registrado"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      {modoRegistro ? (
        <Pressable style={styles.boton} onPress={handleRegistro}>
          <Text style={styles.textoBoton}>Registrarse e Ingresar</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.boton} onPress={handleLogin}>
          <Text style={styles.textoBoton}>Ingresar a Mis Datos</Text>
        </Pressable>
      )}

      <Pressable
        style={styles.botonCambio}
        onPress={() => setModoRegistro(!modoRegistro)}
      >
        <Text style={styles.textoCambio}>
          {modoRegistro
            ? '¿Ya tienes cuenta? Inicia sesión aquí'
            : '¿No tienes cuenta? Regístrate aquí'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#FFFFFF', 
    paddingTop: 60 
  },
  contenedorFormulario: { 
    flex: 1, 
    padding: 20,
    justifyContent: 'center', // 🟢 CORREGIDO
    backgroundColor: '#FFFFFF' 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  tarjeta: { 
    backgroundColor: '#F9FAFB', 
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20 
  },
  label: { 
    fontSize: 12, 
    color: '#6B7280',
    marginTop: 8 
  },
  valor: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#111827' 
  },
  input: { 
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14, 
    borderRadius: 10,
    marginBottom: 14, 
    fontSize: 16 
  },
  boton: { 
    backgroundColor: '#10ca38',
    padding: 14, 
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6 
  },
  textoBoton: {
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  botonCerrar: {
    backgroundColor: '#EF4444', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  textoBotonCerrar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16 
  },
  botonCambio: {
    marginTop: 20, 
    alignItems: 'center' 
  },
  textoCambio: { 
    color: '#10ca38', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
});