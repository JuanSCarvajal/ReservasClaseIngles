import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert, FlatList } from "react-native";
import { AppContext } from "../context/AppContext";
import { formatearPrecio } from "../data/classes";
import { color, typography } from "../theme/index";

export default function ConfirmarReservaScreen({ route, navigation }) {
  const { agregarReserva, reservas, cancelarReserva, Usuario } = useContext(AppContext);


  const { clase, horarioSeleccionado, nivel } = route.params || {};

  const [fechaActual, setFechaActual] = useState(new Date());
  const ipSimulada = "192.168.1.15";

  useEffect(() => {
    const timer = setInterval(() => setFechaActual(new Date()), 50);
    return () => clearInterval(timer);
  }, []);

  const confirmarFinal = () => {
    if (!clase || !horarioSeleccionado) {
      Alert.alert("Atención", "No has seleccionado ninguna clase u horario.");
      return;
    }

    Alert.alert("Confirmación", "¿Deseas confirmar tu reserva?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Aceptar",
        onPress: () => {
          if (agregarReserva) {
            const res = agregarReserva(clase, horarioSeleccionado);
            if (res?.ok) {
              Alert.alert("Éxito", `Reserva guardada a las ${fechaActual.toLocaleTimeString()}`);
              // Limpiamos los parámetros para que muestre la lista
              navigation.setParams({ clase: null, horarioSeleccionado: null });
            } else {
              Alert.alert("Atención", res?.mensaje || "Error al reservar.");
            }
          }
        },
      },
    ]);
  };

  const EliminarReserva = (idReserva, nombreClase) => {
    Alert.alert(
      "Eliminar Reserva",
      `¿Deseas cancelar tu reserva de ${nombreClase}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí, eliminar",
          style: "destructive",
          onPress: () => {
            if (cancelarReserva) {
              cancelarReserva(idReserva);
              Alert.alert("Eliminada", "Tu reserva ha sido cancelada.");
            }
          },
        },
      ]
    );
  };

  
  if (!clase) {
    return (
      <View style={styles.container}>
        <Text style={styles.saludo}>Mis Reservas Agendadas</Text>

        {Usuario && (
          <Text style={styles.subdato}>
            Cliente: {Usuario.nombre} {Usuario.apellido}
          </Text>
        )}

        <View style={styles.divisor} />

        {reservas && reservas.length > 0 ? (
          <FlatList
            data={reservas}
            keyExtractor={(item) => item.id.toString()}
            style={{ width: "100%" }}
            renderItem={({ item }) => (
              <View style={styles.cardReservaItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.texto}>Clase: {item.nombreClase}</Text>
                  <Text style={styles.subdato}>Horario: {item.horario}</Text>
                </View>

                <Pressable
                  style={styles.botonEliminar}
                  onPress={() => EliminarReserva(item.id, item.nombreClase)}
                >
                  <Text style={styles.textoBotonEliminar}>Eliminar</Text>
                </Pressable>
              </View>
            )}
          />
        ) : (
          <Text style={styles.textoVacio}>No tienes reservas agendadas.</Text>
        )}
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>
        ¡Hola{Usuario?.nombre ? ` ${Usuario.nombre}` : ""}!, confirma tu reserva
      </Text>

      <View style={styles.cardInfo}>
        <Text style={styles.texto}>
          Clase: {clase?.titulo || clase?.nombre || "Clase de Inglés"}
        </Text>
        <Text style={styles.texto}>Nivel: {nivel || "General"}</Text>
        <Text style={styles.texto}>Horario: {horarioSeleccionado}</Text>
        {clase?.precio && (
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
        )}

        <View style={styles.divisor} />

        <Text style={styles.subdato}>IP: {ipSimulada}</Text>
        <Text style={styles.subdato}>Fecha: {fechaActual.toLocaleDateString()}</Text>
        <Text style={styles.subdato}>Hora: {fechaActual.toLocaleTimeString()}</Text>
        <Text style={styles.subdato}>Milisegundos: {fechaActual.getMilliseconds()} ms</Text>
      </View>

      <Pressable style={styles.botonConfirmar} onPress={confirmarFinal}>
        <Text style={styles.textoBoton}>Confirmar Reserva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  saludo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#10ca38",
    textAlign: "center",
  },
  cardInfo: {
    width: "100%",
    backgroundColor: "#f4f4f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardReservaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  texto: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  subdato: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
    width: "100%",
  },
  botonConfirmar: {
    backgroundColor: "#10ca38",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonEliminar: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotonEliminar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  textoVacio: {
    fontSize: 14,
    color: "#8e8e93",
    marginTop: 30,
    textAlign: "center",
  },
  precio: {
    fontSize: 18,
    color: color?.primario || "#10ca38",
    fontWeight: "bold",
    marginTop: 5,
  },
});