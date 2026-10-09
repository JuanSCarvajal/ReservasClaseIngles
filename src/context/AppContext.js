import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null); 

  const registrarUsuario = (nuevoUsuario) => {
    setUsuario(nuevoUsuario);
  };

  const actualizarUsuario = ({ email, telefono }) => {
    setUsuario((prev) => ({
      ...prev,
      email,
      telefono,
    }));
  };

  return (
    <AppContext.Provider value={{ usuario, registrarUsuario, actualizarUsuario }}>
      {children}
    </AppContext.Provider>
  );
}