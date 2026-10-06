import React, { useState,useMemo } from "react";
import { View, Text, TextInput,FlatList, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EstadoVacio from "../components/EstadoVacio";

import { Ionicons } from "@expo/vector-icons";

import useResponsive from "../hooks/useResponsive";
import Card from "../components/Card";
import NivelFiltro from "../components/NivelFiltro";
import { CLASES, NIVELES } from "../data/classes";
import { Colors, Spacing, spacing, Radius, radius } from "../constants/theme";
import { typography } from "@/theme";


export default function ClasesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const {columnas,paddingHorizontal} = useResponsive();
  const [nivel, setNivel] = useState("Todos");
  const [Busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() =>{
    const textoBusqueda=Busqueda.trim().toLowerCase();
    return CLASES.filter((Clase)=>{
        const coincideNivel=nivel==="Todos" || Clase.nivel===nivel;
        const coincideTextoBusqueda=textoBusqueda==="" || 
        Clase.título?.toLowerCase().includes(textoBusqueda) ||
        Clase.profesor?.nombre?.toLowerCase().includes(textoBusqueda);
        return coincideNivel && coincideTextoBusqueda;

    })

  },[nivel,Busqueda]);

    


  return (
    <View style={[styles.pantalla,{paddingTop:insets.top + spacing.md}]}>
      <View style={{paddingHorizontal:spacing.md}}>
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
          style={{ flexGrow: 0 }}
        >
          {NIVELES.map((item) => (
            <NivelFiltro
            key={item}r
              etiqueta={item}
              activo={item === nivel}
              onPress={() => setNivel(item)}
            />
          ))
          }
        </ScrollView>

        <FlatList
        
          data={resultados}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>(
            <Card
              clase={item}
              onPress={()=>navigation.navigate("DetalleClase",{clase:item})}
              />
  )}
   ListEmptyComponent={
              <EstadoVacio
              titulo="no se encontraron clases"
              mensaje="Intenta ajustar la búsqueda o seleccionar otro nivel."
              />
}

          numColumns={columnas}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal,
            flexGrow:1,
          paddingBottom: spacing.xl
        }}
        
        
        />
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
const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colors.light.background },
  buscador: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: Colors.light.backgroundElement,
  borderRadius: Radius.sm,          
  paddingHorizontal: Spacing.lg,    
  height: 46,
  marginTop: Spacing.lg,            
  borderWidth: 1,
  borderColor: Colors.light.borde || Colors.light.backgroundSelected,
},
  input: { flex: 1, fontSize: 14, color: Colors.texto, paddingVertical: 0 },
});