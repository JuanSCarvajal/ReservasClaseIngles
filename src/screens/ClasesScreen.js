import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function ClasesScreen({ Navigation }) {
  const [nivel, setNivel] = useState(" Todos ");
  return (
    <View>
      <View>
        <Text>Aplicacion de clases de ingles</Text>
        <View>
          <Ionicons name="search" size={15} />
          <TextInput
            placeholder="Buscar clase"
            value={"nivel"}
            onChangeText={setNivel}
            autoCorrect={false}
          />
        </View>
      </View>
    </View>
  );
}
