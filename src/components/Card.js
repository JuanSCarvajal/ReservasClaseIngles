import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { spacing, colors, typography } from "../theme";
import EtiquetaNivel from "./EtiquetaNivel";
import { CLASES } from "../data/classes";

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: clase.Image }} />
      <View>
        <EtiquetaNivel nivel={clase.nivel} />
        <Text style={styles.titulo}>{clase.titulo}</Text>
        <Text style={styles.precio}>{clase.precio}</Text>
        <Text style={styles.nivel}>{clase.nivel}</Text>

        <Text style={styles.nombreDocente}>{clase.nombreDocente}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 16, color: colors.texto },
  precio: { fontSize: 14, color: colors.texto },
  nivel: { fontSize: 12, color: colors.texto },
  nombreDocente: { fontSize: 12, color: colors.texto },
});
