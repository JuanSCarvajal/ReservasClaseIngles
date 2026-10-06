import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../constants/theme";

export default function NivelFiltro({ etiqueta, activo, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        activo && styles.chipActivo,
        pressed && { opacity: 0.8},
      ]}
    >
      <Text style={[styles.texto, activo && styles.textoActivo]}>{etiqueta}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#fdfeff",
    borderWidth: 1,
    borderColor: "#0ebd34",
    marginRight: 10,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  chipActivo: {
    backgroundColor: "#0d8b20",
    borderColor: Colors.light.text,
  },
  texto: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    includeFontPadding: false,
  },
  textoActivo: {
    color: Colors.light.background,
  },
});
