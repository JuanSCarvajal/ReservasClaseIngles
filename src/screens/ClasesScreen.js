import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import NivelFiltro from "../components/NivelFiltro";
import { CLASES, NIVELES } from "../data/classes";
import { Colors } from "../constants/theme";


export default function ClasesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [nivel, setNivel] = useState(" Todos ");
  const [Busqueda, setBusqueda] = useState("");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Aplicación de clases de inglés</Text>
        
        <View style={styles.searchBox}>
          <Ionicons name="search" size={15} color={Colors.light.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Buscar por nivel"
            placeholderTextColor={Colors.light.textSecondary}
            value={Busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
          />

          {Busqueda.length > 0 && (
            <Ionicons 
              name="close-circle" 
              size={15} 
              color={Colors.light.textSecondary}
              onPress={() => setBusqueda("")} 
            />
          )}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        >
          {NIVELES.map((item, index) => (
            <NivelFiltro
              key={index}
              etiqueta={item}
              activo={item === nivel}
              onPress={() => setNivel(item)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: Colors.light.text,
  },
});