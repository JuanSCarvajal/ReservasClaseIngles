import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Radius } from "../constants/theme";

export default function Card({ titulo, descripcion, nivel, duracion, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tarjeta,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.etiquetaNivel}>{nivel}</Text>
        <Text style={styles.duracion}>{duracion}</Text>
      </View>

      <Text style={styles.titulo}>{titulo}</Text>
      {descripcion ? <Text style={styles.descripcion}>{descripcion}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  etiquetaNivel: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.light.primario,
    textTransform: "uppercase",
  },
  duracion: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  descripcion: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
});