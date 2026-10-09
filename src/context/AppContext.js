import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [Usuario, setUsuario] = useState(null); 
  const [reservas, setReservas] = useState([]);

  const Registrar = (nuevoUsuario) => {
    setUsuario(nuevoUsuario);
  };

  const Actualizar = ({ email, telefono }) => {
    setUsuario((prev) => ({
      ...prev,
      email,
      telefono,
    }));
  };

  const agregarReserva = (clase, horario) => {
    const horarioOcupado = reservas.some(
      (reserva) => reserva.horario === horario
    );

    if (horarioOcupado) {
      return {
        ok: false,
        mensaje: 'Ya tienes una reserva agendada en este horario.',
      };
    }

    const nuevaReserva = {
      id: Date.now(), 
      nombreClase: clase.nombre || clase.titulo || 'Clase de Inglés',
      horario: horario,
      fechaCreacion: new Date(),
    };

    setReservas([...reservas, nuevaReserva]);
    return { ok: true };
  };

  const cancelarReserva = (idReserva) => {
    setReservas(reservas.filter((reserva) => reserva.id !== idReserva));
  };

  return (
    <AppContext.Provider
      value={{
        Usuario,
        Registrar,
        Actualizar,
        reservas,
        agregarReserva,
        cancelarReserva,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}