import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ReservaProvider } from "./src/context/ReservasContext";
import { StatusBar } from "expo-status-bar";
import ClasesStack from "./src/navigation/ClasesStack";
import { Colors } from "./src/constants/theme";

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors?.light?.background || "#ffffff",
    card: Colors?.light?.backgroundElement || "#ffffff",
    text: Colors?.light?.text || "#000000",
    border: Colors?.light?.backgroundSelected || "#cccccc",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ReservaProvider>
        <NavigationContainer theme={temaNavegacion}>
          <StatusBar style="dark" />
          <ClasesStack />
        </NavigationContainer>
      </ReservaProvider>
    </SafeAreaProvider>
  );
}
