import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ClasesScreen from "../screens/ClasesScreen";
import DetalleClaseScreen from "../screens/DetalleClaseScreen";
import ConfirmarReservaScreen from "../screens/ConfirmarReservaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { color } from "../theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackInterno() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonMenuEnabled: false, // 🟢 Previene el conflicto al desmontar la pantalla nativa
      }}
    >
      <Stack.Screen
        name="Home"
        component={ClasesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalleClase"
        component={DetalleClaseScreen}
        options={{ title: "Detalle", headerBackTitle: "Atrás" }}
      />
      <Stack.Screen
        name="ConfirmarReserva"
        component={ConfirmarReservaScreen}
        options={{ title: "Confirmar Reserva" }}
      />
    </Stack.Navigator>
  );
}

export default function ClasesStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: color?.primario || "#10ca38",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: "#FFFFFF",
          borderRadius: 25,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Hogar") {
            iconName = "home-outline";
          } else if (route.name === "Reserva") {
            iconName = "calendar-outline";
          } else if (route.name === "perfil") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Hogar"
        component={StackInterno}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="Reserva"
        component={ConfirmarReservaScreen}
        options={{ title: "Mis Reservas" }}
      />
      <Tab.Screen
        name="perfil"
        component={PerfilScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}