import React, { useState } from "react";
import {View,Text,TextInput,FlatList,ScrollView,StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import NivelFiltro from "../components/NivelFiltro";
import { CLASES,NIVELES } from "../data/classes";


export default function ClasesScreen({ avigation }) {
  const [nivel, setNivel] = useState(" Todos ");
  const [Busqueda, setBusqueda] = useState("");
  return (
    <View>
      <View>
        <Text>Aplicacion de clases de ingles</Text>
        <View>
          <Ionicons name="search" size={15} />
          <TextInput
            placeholder="Buscar por nivel"
            value={Busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
            autoComplete={false}
          />

          {Busqueda.length > 0 && (
            <Ionicons 
            name="close-circle" 
            size={15} 
            onPress={() => setBusqueda("")} />

          )}


        </View>
        <ScrollView 
          style={{flexGrow: 0}}>

          {
            NIVELES.map((item) => (
              <NivelFiltro
                  etiqueta={item}
                  activo={item===nivel}
                  onPress={ ()=> setNivel(item)}
                  />
            ))
          }
          


        </ScrollView>
      </View>
    </View>
  );
}
