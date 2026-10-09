import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null); 
  const [reservas, setReservas] = useState([]);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);

  // 1. Guardar nuevo usuario en la lista Y en la sesión activa
  const registrarUsuario = (nuevoUsuario) => {
    const emailLimpio = nuevoUsuario.email.trim().toLowerCase();

    // Validar si ya existe
    const yaExiste = usuariosRegistrados.some(
      (u) => u.email.trim().toLowerCase() === emailLimpio
    );

    if (yaExiste) {
      return { exito: false, mensaje: 'El correo electrónico ya está registrado.' };
    }

    const usuarioAInsertar = { ...nuevoUsuario, email: emailLimpio };
    
    // Guardamos en la lista de usuarios
    setUsuariosRegistrados((prev) => [...prev, usuarioAInsertar]);
    // Iniciamos sesión automáticamente
    setUsuario(usuarioAInsertar);

    return { exito: true };
  };

  // 2. Iniciar sesión buscando en usuariosRegistrados
  const iniciarSesion = (email) => {
    const usuarioEncontrado = usuariosRegistrados.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (!usuarioEncontrado) {
      return { exito: false, mensaje: 'El correo ingresado no está registrado.' };
    }

    setUsuario(usuarioEncontrado);
    return { exito: true };
  };

  const actualizarUsuario = ({ email, telefono }) => {
    setUsuario((prev) => ({
      ...prev,
      email,
      telefono,
    }));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setReservas([]);
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
        usuario,
        usuariosRegistrados,
        registrarUsuario,
        iniciarSesion,
        actualizarUsuario,
        cerrarSesion,
        reservas,
        agregarReserva,
        cancelarReserva,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}