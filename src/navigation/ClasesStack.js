import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";
import DetalleClaseScreen from '../screens/DetalleClaseScreen';
import ConfirmarReservaScreen from '../screens/ConfirmarReservaScreen';
import { color} from "../theme";



const Stack = createNativeStackNavigator();

export default function ClasesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ClasesScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Clases"
        component={ClasesScreen}
        options={{ headerShown: false }}/>

        <Stack.Screen
          name="DetalleClase"
          component={DetalleClaseScreen}
          options={{titulo:"Detalle",headerBackTitle: "Atras"}}/>

        <Stack.Screen 
        name='ConfirmarReserva'
        component={ConfirmarReservaScreen}
        options={''}/>
        


    </Stack.Navigator>
  );
}
