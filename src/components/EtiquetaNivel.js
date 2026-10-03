import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

export default function EtiquetaNivel({ nivel }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.texto}>{nivel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.light.backgroundSelected,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  texto: {
    color: Colors.light.text,
    fontSize: 12,
  },
});