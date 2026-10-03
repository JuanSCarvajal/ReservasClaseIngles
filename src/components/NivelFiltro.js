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
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={[styles.texto, activo && styles.textoActivo]}>{etiqueta}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.backgroundSelected,
    marginRight: Spacing.two,
  },
  chipActivo: {
    backgroundColor: Colors.light.text,
    borderColor: Colors.light.text,
  },
  texto: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.textSecondary,
  },
  textoActivo: {
    color: Colors.light.background,
  },
});
