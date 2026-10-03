import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../constants/theme";

export default function Card({ titulo, descripcion, nivel }) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
      <EtiquetaNivel nivel={nivel} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.backgroundElement,
    padding: Spacing.three,
    borderRadius: 12,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: Colors.light.backgroundSelected,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  descripcion: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: Spacing.one,
  },
});