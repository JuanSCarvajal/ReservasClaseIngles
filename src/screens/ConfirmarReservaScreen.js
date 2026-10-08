import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, } from 'react-native';
import { ReservasContext } from '../context/ReservasContext';

import { formatearPrecio } from '../data/classes'; 
import { color, typography } from '../theme/index';

export default function ConfirmarReservaScreen({ route, navigation }) {
  const { agregarReserva } = useContext(ReservasContext);
  const { clase, horarioSeleccionado, precio, nivel } = route.params || {};

  const [fechaActual, setFechaActual] = useState(new Date());
  const ipSimulada = "192.168.1.15"; 

  useEffect(() => {
    const timer = setInterval(() => setFechaActual(new Date()), 50);
    return () => clearInterval(timer);
  }, []);

  const confirmarFinal = () => {
    Alert.alert(
      'Confirmación',
      '¿Esta seguro que desea reservar la clase?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: () => {
            const res = agregarReserva(clase, horarioSeleccionado);
            if (res?.ok) {
              Alert.alert('Éxito', `Reserva guardada a las ${fechaActual.toLocaleTimeString()}`);
              navigation.popToTop(); 
            } else {
              Alert.alert('Atención', res?.mensaje || 'Error al reservar.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>¡Hola!, esta es tu reserva</Text>

      <View style={styles.cardInfo}>
        <Text style={styles.texto}>Clase: {clase?.titulo || clase.título }</Text>
        <Text style={styles.texto}>Nivel: {nivel}</Text>
        <Text style={styles.texto}>Horario: {horarioSeleccionado}</Text>
        <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
        
        <View style={styles.divisor} />
        
        <Text style={styles.subdato}>IP: {ipSimulada}</Text>
        <Text style={styles.subdato}>Fecha: {fechaActual.toLocaleDateString()}</Text>
        <Text style={styles.subdato}>Hora actual: {fechaActual.toLocaleTimeString()}</Text>
        <Text style={styles.subdato}>Milisegundos: {fechaActual.getMilliseconds()} ms</Text>
      </View>

      <Pressable style={styles.botonConfirmar} onPress={confirmarFinal}>
        <Text style={styles.textoBoton}>Confirmar Reserva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

    container: { flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
    alignItems: 'center' },

  saludo: { 
    fontSize: 24, 
    fontWeight: 'bold',
     marginBottom: 10, 
     color: '#10ca38' },

  imagenClase: { 
    width: '100%',
     height: 150, 
     borderRadius: 10, 
     marginBottom: 15 },

  cardInfo: { 
    width: '100%', 
    backgroundColor: '#f4f4f5', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 20 },

  texto: { 
    fontSize: 16,
     fontWeight: '600', 
     marginBottom: 5 },

  subdato: { 
    fontSize: 13, 
    color: '#666', 
    marginTop: 2 },

  divisor: { 
    height: 1, 
    backgroundColor: '#ddd', 
    marginVertical: 10 },

  botonConfirmar: 
  { 
    backgroundColor: '#10ca38', 
    padding: 15, borderRadius: 10, 
    width: '100%', 
    alignItems: 'center' },

  textoBoton: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  precio: {
      ...typography.subtitulo,
      color: color.primario,
      fontWeight: 'bold',
    },
});