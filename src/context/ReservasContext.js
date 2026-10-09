import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reserva_ingles';

export const ReservasContext = createContext(null);

export function ReservaProvider({ children }) {
  const [Reservas, setReservas] = useState([]);
  const [Cargando, setCargando] = useState(true);

  // Cargar las reservas guardadas al iniciar
  useEffect(() => {
    const cargar = async () => {
      try {
        const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
        if (guardado !== null) {
          setReservas(JSON.parse(guardado));
        }
      } catch (error) {
        console.log('Error leyendo las reservas: ', error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // Guardar en AsyncStorage automáticamente cuando cambie Reservas
  useEffect(() => {
    if (Cargando) return;
    AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(Reservas)).catch((error) =>
      console.log('Ocurrió un error guardando la reserva:', error)
    );
  }, [Reservas, Cargando]);

  // Agregar reserva evitando duplicados por ID o por mismo horario
  const agregarReserva = useCallback((clase, horario) => {
    if (!clase || !horario) return { ok: false, mensaje: 'Datos incompletos' };

    const profeObj = clase.profesor || clase.profesora;
    const nombreProfe = typeof profeObj === 'object'
      ? `${profeObj?.nombre || ''} ${profeObj?.apellido || ''}`.trim()
      : (profeObj || '');

    const idUnico = `${clase.id}-${horario}`;

    // Validar antes del setState para retornar el mensaje correcto a la UI
    let existeDuplicado = false;
    setReservas((previa) => {
      if (previa.some((r) => r.id === idUnico || r.horario === horario)) {
        existeDuplicado = true;
        return previa;
      }

      const nueva = {
        id: idUnico,
        claseId: clase.id,
        titulo: clase.titulo || clase.título || '',
        nivel: clase.nivel || '',
        profesor: nombreProfe,
        precio: clase.precio || 0,
        horario,
        creadaEn: new Date().toISOString(),
      };

      return [nueva, ...previa];
    });

    if (existeDuplicado) {
      return { ok: false, mensaje: 'Ya tienes una clase reservada en este horario' };
    }

    return { ok: true };
  }, []);

  // Eliminar / Cancelar reserva por ID
  const eliminarReserva = useCallback((idReserva) => {
    setReservas((previas) => previas.filter((reserva) => reserva.id !== idReserva));
    return { ok: true };
  }, []);

  // Memoizar el objeto del contexto
  const valor = useMemo(
    () => ({
      Reservas,
      Cargando,
      agregarReserva,
      eliminarReserva,
    }),
    [Reservas, Cargando, agregarReserva, eliminarReserva]
  );

  return (
    <ReservasContext.Provider value={valor}>
      {children}
    </ReservasContext.Provider>
  );
}