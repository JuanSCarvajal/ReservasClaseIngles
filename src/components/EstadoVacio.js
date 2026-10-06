import React from "react";
import { View , Text, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {color,spacing} from "../theme";

export default function EstadoVacio({icono="search-outline",titulo,mensaje,textoAccion,onAction}){

    return(
        <View style={style.contenedor}>
            <View style={style.circulo}>
                <Ionicons name={icono} size={25} color={color.primario}/>
            </View>
            <Text style={style.titulo}>{titulo}</Text>
            <Text style={style.mensaje}>{mensaje}</Text>


        </View>
    )

    
}

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: color.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  titulo: { fontSize: 17, fontWeight: '700', color: color.texto, textAlign: 'center' },
  mensaje: {
    fontSize: 14,
    color: color.textoSuave,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
});