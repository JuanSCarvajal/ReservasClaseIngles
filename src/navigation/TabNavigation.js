import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClasesScreen from "../screens/ClasesScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ConfirmarReservaScreen from "../screens/ConfirmarReservaScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation (){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={ClasesScreen}
                options={{titulo: "Inicio"}} />
        
        <Tab.Screen
                name="perfil"
                component={PerfilScreen}
                options={{titulo: "Perfil"}} />

        <Tab.Screen
                name="Reserva"
                component={ConfirmarReservaScreen}
                options={{titulo: "Reservas"}} />

        </Tab.Navigator>


    )

    
}