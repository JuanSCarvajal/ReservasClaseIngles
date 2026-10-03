import React from "react";
import { NavigationContainer, DefaultTheme } from "expo-router/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ClasesStack from "../src/navigation/ClasesStack"; 
import { Colors } from "../src/constants/theme";

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
    card: Colors.light.backgroundElement,
    text: Colors.light.text,
    border: Colors.light.backgroundSelected,
  },
};

export default function Page() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={temaNavegacion}>
        <ClasesStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}