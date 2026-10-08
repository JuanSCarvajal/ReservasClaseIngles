import React, { useLayoutEffect, useState,useContext} from 'react';
import {ReservasContext} from '../context/ReservasContext';
import { View, Text, Image, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfirmarReservaScreen from '../screens/ConfirmarReservaScreen';


import EtiquetaNivel from '../components/EtiquetaNivel';
import  useResponsive  from '../hooks/useResponsive';
import { color, spacing, typography, sombra } from '../theme/index';
import { formatearPrecio } from '../data/classes'; 

export default function DetalleClaseScreen({ route, navigation }) {
  const { clase } = route.params || {};

  const { paddingHorizontal, esTablet } = useResponsive();
  const insets = useSafeAreaInsets();

  const titulo = (clase?.título || clase?.titulo || '').trim();
  const descripcion = (clase?.descripción || clase?.descripcion || '').trim();
  const modalidad = (clase?.modalidad || '').trim();
  const duracion = clase?.duración || clase?.duracion;
  const profeObj = clase?.profesor || clase?.profesora;
  const nombreProfe = profeObj?.nombre ? profeObj.nombre.trim() : '';
  const fotoProfe = profeObj?.foto ? profeObj.foto.trim() : '';
  const [Horario, setHorario] = useState (null)
  const { agregarReserva } = useContext(ReservasContext);

  useLayoutEffect(() => { if (titulo) { navigation.setOptions({ title: titulo }); } }, [navigation, titulo]);

  if (!clase) {
    return (
      <View style={[styles.pantalla, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={typography.secundario}>No se encontró la información de la clase.</Text>
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false} >
        <Image
          source={{ uri: (clase.imagen || '').trim() }}
          style={[
            styles.portada,
            {
              height: esTablet ? 300 : 220,
            },
          ]}
          resizeMode="cover" />

        <View
          style={{
            paddingHorizontal,
            paddingTop: spacing.xl,
            gap: spacing.lg,
          }} >


          <View style={{ gap: spacing.sm }}>
            <EtiquetaNivel nivel={clase.nivel} />
            <Text style={typography.titulo}>{titulo}</Text>
          </View>

          <View style={[styles.datos, sombra]}>
            {modalidad ? (
              <View style={styles.datoItem}>
                <Ionicons name="desktop-outline" size={18} color={color.primario} />
                <Text style={typography.secundario}>{modalidad}</Text>
              </View>
            ) : null}

            {duracion ? (
              <View style={styles.datoItem}>
                <Ionicons name="time-outline" size={18} color={color.primario} />
                <Text style={typography.secundario}>{duracion} min</Text>
              </View>
            ) : null}

            {nombreProfe ? (
              <View style={styles.datoItem}>
                {fotoProfe?(
                    <Image source= {{uri: fotoProfe}} style={styles.fotoProfesor}/>
                ): (
                <Ionicons name="person-outline" size={18} color={color.primario} />
                )}
                <Text style={typography.secundario}>{nombreProfe}</Text>
              </View>
            ) : null}
          </View>

          <View>
            <Text style={typography.subtitulo}>Sobre la clase</Text>
            <Text style={styles.descripcion}>{descripcion}</Text>
          </View>


          {clase.horarios && clase.horarios.length > 0 && (
  <View>
    <Text style={[typography?.subtitulo, { marginBottom: spacing?.md || 12 }]}>
      Elige tu horario
    </Text>
    <View style={styles.contenedorHorarios}>
      {clase.horarios.map((horario, index) => {
        const textoHorario = horario.trim();
        const esSeleccionado = Horario === textoHorario;

        return (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.chipHorario,
              esSeleccionado && styles.chipHorario,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => setHorario(textoHorario)}
          >
            <Ionicons
              name="time-outline"
              size={14}
              color={esSeleccionado ? "#10ca38" : (color?.primario || "#10ca38")}
            />
            <Text
              style={[
                typography?.secundario,
                esSeleccionado && styles.textoChipSeleccionado,
              ]}
            >
              {textoHorario}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </View>
)}
        </View>
      </ScrollView>

      <View
        style={[
          styles.barra,{
            paddingHorizontal,
            paddingBottom: insets.bottom + spacing.lg,
            paddingTop: spacing.md,
          },
        ]}
      >
        <View>
          <Text style={typography.secundario}>Precio por clase</Text>
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
        </View>

        <Pressable
  style={({ pressed }) => [
    styles.botonReserva,
    pressed && { opacity: 0.8 },
  ]}
  onPress={() => {
    if (!Horario) {
      Alert.alert('Horario requerido', 'Por favor, selecciona un horario antes de continuar.');
      return;
    }

    navigation.navigate('ConfirmarReserva', {
      clase: clase,
      horarioSeleccionado: Horario,
      precio: clase.precio,
      nivel: clase.nivel,
    });
  }}
>
  <Text style={styles.textoBoton}>Reservar</Text>
</Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: color.background || '#FFFFFF',
  },
  portada: {
    width: '100%',
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: color.card || '#FFFFF',
    borderRadius: 12,
  },
  datoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  descripcion: {
    ...typography.secundario,
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  contenedorHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chipHorario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: color.backgroundElement || '#F3F4F6',
    borderRadius: 8,
  },
  barra: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.card || '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor:  "#10ca38",
  },
  precio: {
    ...typography.subtitulo,
    color: color.primario,
    fontWeight: 'bold',
  },
  botonReserva: {
    backgroundColor: color.primario,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fotoProfesor: {
  width: 60,
  height: 60,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#E5E7EB',
},
Horario: {
  backgroundColor: '#007AFF',
  borderColor:  '#007AFF',
},
textoChipSeleccionado: {
  color: "#10ca38",
  fontWeight: 'bold',
},
});