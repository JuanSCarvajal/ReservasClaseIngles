import React, { useState, useMemo } from "react";
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import EstadoVacio from "../components/EstadoVacio";
import useResponsive from "../hooks/useResponsive";
import Card from "../components/Card";
import NivelFiltro from "../components/NivelFiltro";
import { CLASES, NIVELES } from "../data/classes";
import { Colors, Spacing, spacing, Radius } from "../constants/theme";
import { typography } from "@/theme";


export default function ClasesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { columnas, paddingHorizontal } = useResponsive();
  const [nivel, setNivel] = useState("Todos");
  const [Busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() => {
    const textoBusqueda = Busqueda.trim().toLowerCase();
    return CLASES.filter((Clase) => {
      const coincideNivel = nivel === "Todos" || Clase.nivel === nivel;
      const tituloClase = Clase.nivel;
      const coincideTextoBusqueda =  textoBusqueda === "" ||
        tituloClase.toLowerCase().includes(textoBusqueda) ||
        Clase.profesor?.nombre?.toLowerCase().includes(textoBusqueda);
      return coincideNivel && coincideTextoBusqueda;
    });
  }, [nivel, Busqueda]);

  
  return (
    <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        numColumns={columnas}
        key={columnas}

        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <Text style={typography.titulo}>Aplicación de clases de inglés</Text>

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
              style={{ flexGrow: 0, marginBottom: 12 }}
            >
              {NIVELES.map((item) => (
                <NivelFiltro
                  key={item}
                  etiqueta={item}
                  activo={item === nivel}
                  onPress={() => setNivel(item)}
                />
              ))}
            </ScrollView>
          </View>
        }

        renderItem={({ item }) => (
          <Card
            titulo={item.titulo || item.título}
            descripcion={item.descripcion || item.descripción}
            nivel={item.nivel}
            imagen={item.imagen}
            duracion={item.duracion }
            clase={item}
            onPress={() => navigation.navigate("DetalleClase", { clase: item })}
          />
        )}
        ListEmptyComponent={
          <EstadoVacio
            titulo="No se encontraron clases"
            mensaje="Intenta ajustar la búsqueda o seleccionar otro nivel."
          />
        }
        contentContainerStyle={{
          paddingHorizontal: paddingHorizontal || spacing.md,
          paddingBottom: 45,
          flexGrow: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.sm || 8,
    paddingHorizontal: Spacing.md || 12,
    height: 46,
    marginVertical: Spacing.md || 12,
    borderWidth: 1,
    borderColor: Colors.light.border || Colors.light.backgroundSelected,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.light.text,
  },
});