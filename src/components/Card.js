import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Colors, Spacing, Radius } from "../constants/theme";

export default function Card({ titulo, nivel, precio, profesor, imagen, onPress, clase,}) {


  const tituloTexto = (titulo || clase?.título || clase?.titulo || "").trim();
  const precioTexto = precio || clase?.precio;
  const nivelTexto = (nivel || clase?.nivel || "").trim();

  const profeObj = profesor || clase?.profesor || clase?.profesora;
  const nombreProfesor = profeObj?.nombre? profeObj.nombre.trim(): typeof profeObj === "string" ? profeObj.trim() : "";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tarjeta,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
       ]} >


      <Image
        source={{ uri: (imagen || clase?.imagen || "").trim() }}
        style={styles.imagen}
        resizeMode="cover"/>


      <View style={styles.contenido}>
        <Text style={styles.titulo} numberOfLines={1}>
          {tituloTexto}
        </Text>

        <Text style={styles.costo}>
          Costo: <Text style={styles.montoCosto}>{precioTexto}</Text>
        </Text>

        <Text style={styles.detalleTexto}>Nivel: {nivelTexto}</Text>

        {nombreProfesor ? (
          <Text style={styles.detalleTexto}>Profesor: {nombreProfesor}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: Colors.light.backgroundElement || "#FFFFFF",
    borderRadius: Radius.md || 12,
    overflow: "hidden", // Para recortar los bordes superiores de la imagen
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  imagen: {
    width: "100%",
    height: 130,
  },
  contenido: {
    padding: Spacing.md,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 4,
  },
  costo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#10ca38",
    marginBottom: 2,
  },
  montoCosto: {
    fontWeight: "bold",
    color: "#10ca38",
  },
  detalleTexto: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
});